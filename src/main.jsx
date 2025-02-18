import "./index.css";
import { render } from "preact";
import App from "./app.jsx";

const root = document.getElementById("app");

if (root) {
  render(
    <>
      <App />
    </>,
    root
  );
  window.log("✅ React app mounted!");
} else {
  window.error("❌ Root element not found!");
}
