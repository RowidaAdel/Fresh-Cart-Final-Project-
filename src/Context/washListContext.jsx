import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let WashlistContext = createContext(null)

export default function WashListContextProvider({ children }) {
    let [wishlist, setWishlist] = useState([])
    let [loading, setLoading] = useState(false)

    async function getLoggedUserWishlist() {
        setLoading(true)
        try {
            let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            setWishlist(data.data || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    async function addProductToWishlist(productId) {
        try {
            setLoading(true);
            const { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/wishlist",
                { productId },
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );
            setWishlist(data.data);
            toast.success("Product Added ✅");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    async function removeProductFromWishlist(cartItemId) {
        try {
            setLoading(true)
            const { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${cartItemId}`,
                {
                    headers: { token: localStorage.getItem("token") }
                }
            );
            setWishlist(data.data || []);
            toast.success("Product Deleted ❌")
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getLoggedUserWishlist()
    }, [])
    return (
        <WashlistContext.Provider value={{ wishlist, loading, addProductToWishlist, getLoggedUserWishlist, removeProductFromWishlist }}>
            {children}
        </WashlistContext.Provider>
    );
}