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
import AddBoxIcon from '@mui/icons-material/AddBox';
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';

const PlanButton = observer(({...props}) => {
  const plan = props.plan;
  return (
    <Button
      variant={props.isSelected ? "contained" : "outlined"}
      onClick={() => props.select(plan.id)}
    >
      {plan.name}
      {
        plan.price > 0 && ` - ($${plan.price})`
      }

    </Button>
  )
});

const EditApp = observer(({...props}) => {
  const app = props.app;
  const rootStore = React.useContext(RootStoreContext);
  return (
    <div>
      <TextField
        label="Name"
        defaultValue={app.name}
        onChange={app.updateName}
      />
      <br/>
      <TextField
        label="Description"
        defaultValue={app.description}
        onChange={app.updateDescription}
        multiline
        rows={4}
        style={{marginBottom: 15, marginTop: 30}}
      />
      <br/>
      {
        !app.isNew && (
          <ButtonGroup variant="contained" style={{marginBottom: 15}}>
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
          </ButtonGroup>
        )
      }
      <br/>
      <Button
        variant="contained"
        onClick={() => {
          app.save().then(() => {
            props.closeModal()
          })
        }}
      >
        Save
      </Button>
      {
        !app.isNew && (

          <Button
            color="error"
            variant="contained"
            style={{marginLeft: 15}}
            onClick={() => {
              app.delete().then(() => {
                props.closeModal()
              })
            }}
          >
            Delete
          </Button>
        )
      }
    </div>
  )
});

const App = observer(({...props}) => {
  const app = props.app;
  const rootStore = React.useContext(RootStoreContext);
  return (
    <div className="app-card">
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
          <Button
            size="small"
            onClick={() => {
              props.select(app.id)
              props.openModal()
            }}
          >
            {app.editing ? "View" : "Edit"}
          </Button>
        </CardActions>
      </Card>
    </div>
  )
});


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const Apps = observer(({...props}) => {
  const rootStore = React.useContext(RootStoreContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <h2 style={{display: "flex", justifyContent: "space-between"}}>
        <div>Apps</div>
        <AddBoxIcon
          style={{cursor: "pointer"}}
          onClick={() => {
            rootStore.appStore.createApp()
            handleOpen();
          }}
        />
      </h2>
      <div className="app-wrapper">
        {
          _.map(rootStore.appStore.apps, (app) => {
            return <App
                    key={app.id}
                    app={app}
                    openModal={handleOpen}
                    select={rootStore.appStore.selectApp}
                  />
          })
        }
      </div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={modalStyle}>
          <EditApp
            closeModal={handleClose}
            app={rootStore.appStore.hydratedSelectedApp}
          />
        </Box>
      </Modal>
    </div>
  );
});

export default Apps
