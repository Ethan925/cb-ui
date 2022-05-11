import React from "react";
import AppStore from "../stores/AppStore";
import {RootStoreContext} from "../index";
import { observer } from "mobx-react";
import _ from "lodash";

const Plan = observer(({...props}) => {
  const plan = props.plan;
  return (
    <div>
      <hr/>
      <div>
        <h3>{plan.name}</h3>
        <b>${plan.price}</b>
        <p>{plan.description}</p>
      </div>
    </div>
  )
});

const Plans = observer(({...props}) => {
  const rootStore = React.useContext(RootStoreContext);

  return (
    <div>
      <h2>Plans</h2>
      {
        _.map(rootStore.planStore.sortedPlans, (plan) => {
          return <Plan key={plan.id} plan={plan}/>
        })
      }
    </div>
  );
});

export default Plans
