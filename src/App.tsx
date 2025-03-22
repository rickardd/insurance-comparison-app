import { Outlet } from "react-router-dom";
import "./App.css";
import { MainMenu } from "./MainMenu";
import { useAuthStore } from "./store/authStore";

function App() {
  const { user } = useAuthStore();
  return (
    <div>
      <h1>Welcome ({user?.name})</h1>
      <MainMenu />

      <Outlet />
    </div>
  );
}

export default App;
