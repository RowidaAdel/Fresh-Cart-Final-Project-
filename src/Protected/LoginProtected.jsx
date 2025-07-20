import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../Context/authContext";
import { Navigate } from "react-router";

export default function LoginProtected({ children }) {
  const { token } = useContext(authContext);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return <>{children}</>;
  }

  if (token) {
    return <Navigate to="/home" />;
  }
  
  return <>{children}</>;
}
