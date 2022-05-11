import React from "react";
import AppStore from "../stores/AppStore";
import {RootStoreContext} from "../index";
import { observer } from "mobx-react";
import _ from "lodash";

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

const Plan = observer(({...props}) => {
  const plan = props.plan;
  return (
    <Card sx={{ width: 275, marginRight: 5 }}>
      <CardHeader title={plan.name}/>
      <CardContent>
        <b>${plan.price}</b>
        <p>{plan.description}</p>
      </CardContent>
    </Card>
  )
});

const Plans = observer(({...props}) => {
  const rootStore = React.useContext(RootStoreContext);

  return (
    <div>
      <h2>Plans</h2>
      <div
        className="app-wrapper"
        style={{
        display: "flex",
        justifyContent: "center"
      }}>

        {
          _.map(rootStore.planStore.sortedPlans, (plan) => {
            return <Plan key={plan.id} plan={plan}/>
          })
        }
      </div>
    </div>
  );
});

export default Plans
