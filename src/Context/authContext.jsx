import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const authContext = createContext(null);

export default function AuthContextProvider({ children }) {
    let [token, setToken] = useState(localStorage.getItem("token"))

    async function verifyToken() {
  const localToken = localStorage.getItem("token");
  if (!localToken) return false;
  try {
    await axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
      headers: {
        token: localToken,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Invalid token");
    setToken(null);
    localStorage.removeItem("token");
    return false;
  }
}

   useEffect(() => {
  verifyToken();
}, []);

    return (
            <authContext.Provider value={{ token, setToken }}>
                {children}
            </authContext.Provider>
    );
}