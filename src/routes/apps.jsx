import React from "react";
import {RootStoreContext} from "../index";
import { observer } from "mobx-react";
import _ from "lodash";

const PlanButton = observer(({...props}) => {
  const plan = props.plan;
  return (
    <button
      style={{fontWeight: props.isSelected ? "bold" : "normal"}}
      onClick={() => props.select(plan.id)}
    >
      {plan.name} - {plan.price}
    </button>
  )
});

const App = observer(({...props}) => {
  const app = props.app;
  const rootStore = React.useContext(RootStoreContext);
  return (
    <div>
      <hr/>
      <button onClick={app.toggleEdit}>{app.editing ? "View" : "Edit"}</button>
      {
        app.editing ? (
          <div>
            Name: <input defaultValue={app.name} onChange={app.updateName}/>
            <br/>
            Description: <textarea defaultValue={app.description} onChange={app.updateDescription}/>
            <br/>
            <button onClick={app.save}>Save</button>
            <br/>
            {
              !app.isNew && (
                <React.Fragment>
                  <b>Plan</b>
                  {
                    _.map(rootStore.planStore.sortedPlans, (plan) => {
                      return <PlanButton
                                key={plan.id}
                                plan={plan}
                                isSelected={app.plan == plan.id}
                                select={app.setSubscription}
                              />
                    })
                  }
                </React.Fragment>
              )
            }
          </div>
        ) : (
        <div>
          <button onClick={app.delete}>Delete</button>
          <h3>{app.name}</h3>
          <b>{_.get(app, "hydratedPlan.name")}</b>
          <p>{app.description}</p>
        </div>
        )
      }
    </div>
  )
});

const Apps = observer(({...props}) => {
  const rootStore = React.useContext(RootStoreContext);

  return (
    <div>
      <h2>Apps test</h2>
      <button onClick={rootStore.appStore.createApp}>New</button>
      {
        _.map(rootStore.appStore.apps, (app) => {
          return <App key={app.id} app={app}/>
        })
      }
    </div>
  );
});

export default Apps
