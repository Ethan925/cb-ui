import './App.css';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          Crowdbotics
        </div>
        <Link to="/apps">apps</Link>
        <Link to="/plans">plans</Link>
      </header>
    </div>
  );
}

export default App;
