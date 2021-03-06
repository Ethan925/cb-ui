import { makeAutoObservable } from "mobx";
import _ from "lodash";
import axios from "axios";

export default class App {
  id = ""
  name = ""
  description = ""
  owner = ""
  plan = ""
  isNew = true;
  editing = false;

  constructor(rootStore, existingApp = {}) {
    makeAutoObservable(this, {
      rootStore: false,
    });
    this.rootStore = rootStore;
    this.isNew = !_.size(existingApp);
    this.editing = this.isNew
    this.updateFromDb(existingApp);
  }

  updateFromDb = (existingApp) => {
    this.id = existingApp.id || "new";
    this.name = existingApp.name;
    this.description = existingApp.description;
    this.owner = existingApp.owner;
    this.plan = _.get(existingApp, "current_subscription.plan")
  };

  toggleEdit = () => {
    this.editing = !this.editing;
  };

  updateName = (event) => {
    this.name = event.target.value;
  }

  updateDescription = (event) => {
    this.description = event.target.value;
  }

  setSubscription = (planId) => {
    return this.rootStore.API.post("/api/v1/subscription/", {
      app: this.id,
      plan: planId
    }).then((res) => {
      this.plan = res.data.plan;
    })
  }

  get serializedSubscriptionData() {
    return {
      app: this.id,
      plan: this.plan
    }
  }

  get hydratedPlan() {
    return _.get(this.rootStore.planStore.plans, this.plan);
  }

  save = () => {
    const saveMethod = this.isNew ? this.create : this.update;
    return saveMethod().then((res) => {
      this.updateFromDb(res.data);
      this.editing = false;
    })
  }

  create = () => {
    return this.rootStore.API.post("/api/v1/app/", this.serializedData).then((res) => {
      delete this.rootStore.appStore.apps["new"]
      this.isNew = false;
      this.rootStore.appStore.apps[res.data.id] = this
      return res
    })
  }

  update = () => {
    return this.rootStore.API.put(`/api/v1/app/${this.id}/`, this.serializedData)
  }

  delete = () => {
    return this.rootStore.API.delete(`/api/v1/app/${this.id}/`).then(() => {
      delete this.rootStore.appStore.apps[this.id]
    })
  }

  get serializedData() {
    return {
      "name": this.name,
      "description": this.description,
      // TODO make sure API is locked down so you can only access your own apps
      // and pull down info about the current user so it can be used here
      "owner": this.owner || 1,
    }
  }

  view = () => {
    alert(`Open a new tab to view app: ${this.name}`)
  }
}
