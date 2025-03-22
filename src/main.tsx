// main.tsx
import React, { StrictMode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import Login from "./Login";
import CreateClient from "./CreateClient";
import EditClient from "./EditClient";
import ListCompanies from "./ListCompanies";
import ListClients from "./ListClients";
import ComparisonView from "./ComparisonView";
import ProtectedRoute from "./ProtectedRout";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />}>
          <Route
            path="/create-client"
            element={
              <ProtectedRoute>
                <CreateClient />
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
            path="/list-clients"
            element={
              <ProtectedRoute>
                <ListClients />
              </ProtectedRoute>
            }
          />
          <Route
            path="/compare-companies"
            element={
              <ProtectedRoute>
                <ComparisonView />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
