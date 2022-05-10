import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Apps from "./routes/apps";
import Plans from "./routes/plans";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="apps" element={<Apps />} />
      <Route path="plans" element={<Plans />} />
    </Routes>
  </BrowserRouter>
);
