import React, { JSX, StrictMode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import CreateClient from "./CreateClient";
import EditClient from "./EditClient";
import ListCompanies from "./ListCompanies";
import ComparisonView from "./ComparisonView";
import { useAuthStore } from "./store/authStore";
import { createRoot } from "react-dom/client";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <div>Loading...</div>; // You can show a loading spinner here
  }

  return user ? children : <Login />;
};

// In your main render
const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/create-client"
          element={
            <ProtectedRoute>
              <CreateClient brokerId="someBrokerId" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-client/:clientId"
          element={
            <ProtectedRoute>
              <EditClient clientId="someClientId" onClientUpdated={() => {}} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/list-companies"
          element={
            <ProtectedRoute>
              <ListCompanies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/comparison"
          element={
            <ProtectedRoute>
              <ComparisonView selectedCompanies={[]} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </StrictMode>
);
