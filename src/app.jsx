import { useState } from "preact/hooks";

const App = () => {
  const [text, setText] = useState("");

  function clicked() {
    window.log("clicked");
    test(text);
  }

  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <h1 class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        Hello from Deno + Preact!
      </h1>
      <input
        type="text"
        value={text}
        onInput={(e) => setText(e.currentTarget.value)}
        placeholder="Type something..."
      />
      <p>You typed: {text}</p>
      <button onClick={clicked} class="mx-2">
        Click Me
      </button>
    </div>
  );
};

export default App;
