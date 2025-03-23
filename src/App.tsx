import { Outlet } from "react-router-dom";
import "./App.css";
import { MainMenu } from "./MainMenu";
import { useAuthStore } from "./store/authStore";
import { ToastContainer } from "react-toastify";

function App() {
  const { user } = useAuthStore();
  return (
    <div>
      <h1>Welcome ({user?.email})</h1>
      <MainMenu />

      <Outlet />

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
