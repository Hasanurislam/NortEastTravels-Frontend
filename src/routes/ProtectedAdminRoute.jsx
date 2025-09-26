import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LoaderCircle } from "lucide-react";

/**
 * This component protects routes that should only be accessible by an admin.
 * It uses the global AuthContext to check for a logged-in user and ensures 
 * their role is 'admin'.
 */
export default function ProtectedAdminRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // 1. While the auth context is verifying the session from localStorage, 
  //    show a loading indicator to prevent premature redirects.
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="w-12 h-12 animate-spin text-indigo-600"/>
      </div>
    );
  }

  // 2. If loading is finished and there's no user, OR the user's role
  //    is not 'admin', redirect them to the admin login page.
  if (!user || user.role !== "admin") {
    // We pass the original location they tried to access in the state.
    // This allows the login page to redirect them back after a successful login.
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // 3. If the user is logged in and is an admin, render the requested page.
  return children;
}
