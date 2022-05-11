import React from "react";
import AppStore from "../stores/AppStore";
import {RootStoreContext} from "../index";
import { observer } from "mobx-react";
import _ from "lodash";

const App = observer(({...props}) => {
  const app = props.app;
  return (
    <div>
      <h3>{app.name}</h3>
      <p>{app.description}</p>
    </div>
  )
});

const Apps = observer(({...props}) => {
  const rootStore = React.useContext(RootStoreContext);

  return (
    <div>
      <h2>Apps test</h2>
      {
        _.map(rootStore.appStore.apps, (app) => {
          return <App key={app.id} app={app}/>
        })
      }
    </div>
  );
});

export default Apps
