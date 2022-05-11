import { makeAutoObservable } from "mobx";
import Plan from "./Plan";
import _ from "lodash";
import axios from "axios";

export default class AppStore {
	plans = {};

	constructor(rootStore) {
		makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore
	}

	fetchPlans = () => {
		axios.get("/api/v1/plan/").then((res) => {
      _.forEach(res.data, (plan) => {
      	this.plans[plan.id] = new Plan(this.rootStore, plan);
      })
      return res.data
    })
	}

	get sortedPlans() {
		return _.sortBy(_.map(this.plans), "price")
	}
}
