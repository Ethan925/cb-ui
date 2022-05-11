import { makeAutoObservable } from "mobx";
import _ from "lodash";
import axios from "axios";

export default class Plan {
  id = ""
  name = ""
  description = ""
  price = 0

  constructor(rootStore, existingPlan = {}) {
    makeAutoObservable(this, {
      rootStore: false,
    });
    this.rootStore = rootStore;
    this.updateFromDb(existingPlan);
  }

  updateFromDb = (existingPlan) => {
    this.id = existingPlan.id;
    this.name = existingPlan.name;
    this.description = existingPlan.description;
    this.price = existingPlan.price;
  };
}
