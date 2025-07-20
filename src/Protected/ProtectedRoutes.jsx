import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { authContext } from "../Context/authContext";

export default function ProtectedRoutes({ children }) {
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

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
