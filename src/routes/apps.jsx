import React from "react";
import AppStore from "../stores/AppStore";
import {RootStoreContext} from "../index";
import { observer } from "mobx-react";
import _ from "lodash";

const App = observer(({...props}) => {
  const app = props.app;
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
            <button onClick={app.save}>Save</button>
          </div>
        ) : (
        <div>
          <button onClick={app.delete}>Delete</button>
          <h3>{app.name}</h3>
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
