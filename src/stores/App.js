import { makeAutoObservable } from "mobx";
import _ from "lodash";
import axios from "axios";

export default class App {
  id = ""
  name = ""
  description = ""
  owner = ""
  isNew = true;
  editing = false;

  constructor(rootStore, existingApp = {}) {
    makeAutoObservable(this, {
      rootStore: false,
    });
    this.rootStore = rootStore;
    this.isNew = !_.size(existingApp);
    this.updateFromDb(existingApp);
  }

  updateFromDb = (existingApp) => {
    this.id = existingApp.id;
    this.name = existingApp.name;
    this.description = existingApp.description;
    this.owner = existingApp.owner;
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

  save = () => {
    const saveMethod = this.isNew ? this.create : this.update;
    saveMethod().then((res) => {
      this.updateFromDb(res.data);
      this.editing = false;
    })
  }

  create = () => {
    return this.rootStore.API.post("/api/v1/app/", this.serializedData)
  }

  update = () => {
    return this.rootStore.API.put(`/api/v1/app/${this.id}/`, this.serializedData)
  }

  get serializedData() {
    return {
      "name": this.name,
      "description": this.description,
      // TODO make sure API is locked down so you can only access your own apps
      "owner": this.owner,
    }
  }
}
