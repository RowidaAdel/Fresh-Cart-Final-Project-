import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";

export default function NetworkStatusWrapper({ children }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const previousStatus = useRef(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      if (!previousStatus.current) {
        toast.success("You're back online! ✅");
      }
      previousStatus.current = true;
      setIsOnline(true);
    };

    const handleOffline = () => {
      if (previousStatus.current) {
        toast.error("You're offline! Please check your connection. ⚠️");
      }
      previousStatus.current = false;
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return children(isOnline);
}
