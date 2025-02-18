import { Webview } from "@webview/webview";

// Read the entire HTML file as a string
const html = await Deno.readTextFile("./dist/index.html");
const javascript = await Deno.readTextFile("./dist/main.jsx");
const manifest = JSON.parse(
  await Deno.readTextFile("./dist/.vite/manifest.json")
);

// const viewportProperties = {
//   width: 200,
//   height: 200,
//   hint: SizeHint.NONE,
// };

const webview = new Webview(true);
webview.title = "test";

async function getCSSContent() {
  try {
    const cssFile = manifest["src/index.css"]?.file || "assets/index.css";
    const cssFilePath = `dist/${cssFile}`;

    console.log(`✅ Loading CSS: ${cssFilePath}`);
    return await Deno.readTextFile(cssFilePath);
  } catch (error) {
    console.error("❌ Failed to read CSS file:", error);
    return "";
  }
}

function init() {
  console.log("Initialising Backend");
  return javascript;
}

function test(text: string) {
  console.log("test", `"${text}"`);

  Deno.writeTextFile(`./test.txt`, text);
}

const cssContent = await getCSSContent();

webview.bind("init", init);
webview.bind("test", test);

webview.bind("log", (msg: string) => console.log("JS Log:", msg));
webview.bind("error", (msg: string) => console.error("JS Error:", msg));

const modifiedHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>${cssContent}</style>
    <script>
      (async () => {
        window.log("Initializing Frontend");

        if (window.init) {
          try {
            const js = await window.init();

            if (js) {
              eval(js);
              window.log("✅ JavaScript Loaded!");
            } else {
              window.log("❌ JavaScript is empty!");
            }
          } catch (error) {
            window.error("❌ Error calling init():", error);
          }
        } else {
          window.error("❌ window.init is not available!");
        }
      })();
    </script>
  </head>
  <body>
  ${html}
  </body>
</html>`;

// Convert the HTML file into a Data URL
webview.navigate(`data:text/html,${encodeURIComponent(modifiedHtml)}`);
webview.run();
