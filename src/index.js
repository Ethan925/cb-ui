import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Apps from "./routes/apps";
import Plans from "./routes/plans";
import AppStore from "./stores/AppStore";
import PlanStore from "./stores/PlanStore";
import axios from "axios"
import Cookies from "js-cookie";

class RootStore {
    constructor() {
      this.appStore = new AppStore(this);
      this.planStore = new PlanStore(this);
      this.API = axios.create({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        withCredentials: true,
      });
    }

    bootstrap = () => {
      return Promise.all([
        this.appStore.fetchApps(),
        this.planStore.fetchPlans(),
      ])
    }
}
const rootStore = new RootStore()
export const RootStoreContext = React.createContext();
const RootStoreProvider = ({ children, store }) => {
  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  );
};

rootStore.bootstrap();

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <RootStoreProvider store={rootStore}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="apps" element={<Apps />} />
        <Route path="plans" element={<Plans />} />
      </Routes>
    </BrowserRouter>
  </RootStoreProvider>
);
