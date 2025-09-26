import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      // Save token in context / localStorage
      login({ token }); 
      navigate("/"); // redirect after login
    } else {
      navigate("/login"); // fallback
    }
  }, [location, login, navigate]);

  return <div className="text-center mt-20">Logging you in...</div>;
}
