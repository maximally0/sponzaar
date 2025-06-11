import { useAuth } from "../contexts/AuthContext";
import { Login } from "../pages/Login";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Check for auth token in localStorage
  const authToken = localStorage.getItem("auth_token");
  
  if (!user || !authToken) {
    return <Login />;
  }

  return <>{children}</>;
};