import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const adminInfo = JSON.parse(localStorage.getItem("userAdmin")) || {};

  console.log({ adminInfo });

  const isAuthenticated = Object.keys(adminInfo).length > 0;

  console.log("ProtectedRoute component");
  console.log({ isAuthenticated });

  useEffect(() => {
    console.log("Protected Route Use-Effect");
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
