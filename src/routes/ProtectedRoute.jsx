import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * A component to protect routes that require a user to be logged in.
 *
 * How it works:
 * 1. It checks the `user` and `loading` states from the AuthContext.
 * 2. If the context is still loading the session, it shows a "Loading..." message.
 * 3. If loading is finished and there's no user, it redirects to the `/login` page.
 * 4. If a user exists, it renders the child component (the page you're protecting).
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Show a loading indicator while the auth state is being determined.
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading session...</p>
      </div>
    );
  }

  // If the user is not authenticated, redirect them to the login page.
  // `state={{ from: location }}` is a neat trick to redirect the user back
  // to the page they were trying to access after they log in.
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is authenticated, render the protected component.
  return children;
}

