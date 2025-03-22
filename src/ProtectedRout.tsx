import { Navigate } from "react-router-dom";
import { JSX } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isLoggedIn } from "./utils/utils";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const queryClient = new QueryClient();

  const WrappedChildren = <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

  return isLoggedIn() ? WrappedChildren : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
