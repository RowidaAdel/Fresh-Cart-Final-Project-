import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const authContext = createContext(null);

export default function AuthContextProvider({ children }) {
    let [token, setToken] = useState(localStorage.getItem("token"))

    async function verifyToken() {
        if (localStorage.getItem('token')) {
            try {
                let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                })
                console.log(data);
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message)
                setToken(null)
                localStorage.removeItem("token")
            }
        }
    }

    useEffect(() => {
        verifyToken()
    }, [])


    return (
            <authContext.Provider value={{ token, setToken }}>
                {children}
            </authContext.Provider>
    );
}