import { makeAutoObservable } from "mobx";
import App from "./App";
import _ from "lodash";
import axios from "axios";

export default class AppStore {
	apps = {};
	selectedAppId = "";

	constructor(rootStore) {
		makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore
	}

	fetchApps = () => {
		axios.get("/api/v1/app/").then((res) => {
      _.forEach(res.data, (app) => {
      	this.apps[app.id] = new App(this.rootStore, app);
      })
      return res.data
    })
	}

	createApp = () => {
		this.apps["new"] = new App(this.rootStore)
	}
}
