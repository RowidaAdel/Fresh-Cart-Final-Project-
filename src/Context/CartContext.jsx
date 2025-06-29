import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let cartContext = createContext(null)

export default function CartContextProvider({ children }) {
    let [cart, setCart] = useState(null)
    let [loading, setLoading] = useState(false)
    let [disabledbtn, setDisabled] = useState(false)

    async function getLoggedUserCart() {
        setLoading(true)
        try {
            let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            console.log(data);
            setCart(data)
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    }
    async function addProductToCart(productId) {
        try {
            setLoading(true)
            const { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/cart",
                { productId },
                {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                }
            );
            console.log(data);
            toast.success("Product Added ✅")
            setCart(data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    async function removeCartItem(cartItemId) {
        try {
            setLoading(true)
            const { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,
                {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                }
            );
            console.log(data);
            toast.success("Product Deleted ❌")
            setCart(data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    async function clearCart() {
        try {
            setLoading(true)
            const { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart`,
                {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                }
            );
            console.log(data);
            toast.success("None Carts 💭")
            await getLoggedUserCart();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    async function updateCartItem(cartItemId, count) {
        setDisabled(true)
        try {
            const { data } = await axios.put(
                `https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,
                { count },
                {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                }
            );
            console.log(data);
            toast.success("Updating Done 💯")
            setCart(data)
        } catch (error) {
            console.log(error);
        } finally{
        setDisabled(false)
        }
    }

    useEffect(() => {
        getLoggedUserCart()
    }, [])

    return (
        <cartContext.Provider value={{ cart,disabledbtn, loading, addProductToCart, getLoggedUserCart, removeCartItem, clearCart, updateCartItem }}>
            {children}
        </cartContext.Provider>
    );
}