import './App.css';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';


const NavCard = ({...props}) => {
  return (
    <Link to={props.path} style={{textDecoration: "none", marginRight: 15}}>
      <Card sx={{ width: 275 }}>
        <CardHeader
          title={props.name}
        />
        <CardContent style={{textDecorationStyle: "none"}}>
          {props.description}
        </CardContent>
      </Card>
    </Link>
  )
};

function App() {
  return (
    <div className="App">
      <NavCard name="Apps" description="View your Apps" path="/apps"/>
      <NavCard name="Plans" description="All available plans" path="/plans"/>
    </div>
  );
}

export default App;
