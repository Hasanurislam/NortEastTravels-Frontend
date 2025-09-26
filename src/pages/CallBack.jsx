import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import jwtDecode from "jwt-decode";


// This component handles the redirect from the backend after Google login.
export default function GoogleCallback() {
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Extract the token from the URL query parameters.
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      try {
        // 2. Decode the token to get the user's information.
        const decodedUser = jwtDecode(token);
        
        // 3. Create the user object to be stored.
        const userData = {
          token: token,
          ...decodedUser
        };

        // 4. Use the login function from AuthContext to set the user state.
        login(userData);

        // 5. Redirect the user to the homepage.
        navigate("/");
      } catch (error) {
        console.error("Failed to decode JWT or login:", error);
        navigate("/login?error=auth_failed");
      }
    } else {
      // If no token is found, redirect to the login page with an error.
      navigate("/login?error=token_missing");
    }
  }, [location, login, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Authenticating...</h2>
        <p className="text-gray-600">Please wait while we log you in.</p>
      </div>
    </div>
  );
}