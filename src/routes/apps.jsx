import React from "react";
import {RootStoreContext} from "../index";
import { observer } from "mobx-react";
import _ from "lodash";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
    <div className="app-card">
      {/*<button onClick={app.toggleEdit}>{app.editing ? "View" : "Edit"}</button>*/}
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
        <Card sx={{ width: 275 }}>
          <CardHeader
            title={app.name}
            action={
              <IconButton aria-label="View" onClick={app.view}>
                <VisibilityIcon />
              </IconButton>
            }
          />
          <CardContent>
            <b>{_.get(app, "hydratedPlan.name")}</b>
            <p>{app.description}</p>
          </CardContent>
          <CardActions>
            <button onClick={app.delete}>Delete</button>
            <button onClick={app.toggleEdit}>{app.editing ? "View" : "Edit"}</button>
          </CardActions>
        </Card>
        )
      }
    </div>
  )
});

const Apps = observer(({...props}) => {
  const rootStore = React.useContext(RootStoreContext);

  return (
    <div>
      <h2>Apps</h2>
      <button onClick={rootStore.appStore.createApp}>New</button>
      <div className="app-wrapper">
        {
          _.map(rootStore.appStore.apps, (app) => {
            return <App key={app.id} app={app}/>
          })
        }
      </div>
    </div>
  );
});

export default Apps
