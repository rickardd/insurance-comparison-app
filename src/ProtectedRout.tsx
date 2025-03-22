import { Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { JSX } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const queryClient = new QueryClient();
  const { user, loading } = useAuthStore();

  if (loading) {
    return <div>Loading...</div>;
  }

  // return user ? <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> : <Login />;
  return user ? <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
