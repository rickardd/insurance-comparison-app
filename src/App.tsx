import "./App.css";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Insurance Comparison Tool</h1>
      <nav>
        <Link to="/create-client">Create Client</Link>
        <Link to="/list-clients">List Clients</Link>
        <Link to="/list-companies">List Companies</Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default App;
