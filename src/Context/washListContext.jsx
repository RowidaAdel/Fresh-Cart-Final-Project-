import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { authContext } from "./authContext";
import { useQueryClient } from "@tanstack/react-query";

export const WashlistContext = createContext(null);

export default function WashlistContextProvider({ children }) {
  const { token } = useContext(authContext);
  const [wishlistLike, setWishlistLike] = useState([]);
  const queryClient = useQueryClient();

  async function addProductToWishlist(productId) {
    if (!token) return;
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers: { token } }
      );
      toast.dismiss();
      toast.success("Product added to wishlist ✅", { id: "wishlist-add" });
      queryClient.invalidateQueries(['wishlist']);
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to add product", { id: "wishlist-add" });
    }
  }

  async function removeProductFromWishlist(wishlistItemId) {
    if (!token) return;
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${wishlistItemId}`,
        { headers: { token } }
      );
      toast.dismiss();
      toast.success("Product removed from wishlist ❌", { id: "wishlist-remove" });
      queryClient.invalidateQueries(['wishlist']);
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to remove product", { id: "wishlist-remove" });
    }
  }

  return (
    <WashlistContext.Provider value={{ wishlistLike, addProductToWishlist, removeProductFromWishlist }}>
      {children}
    </WashlistContext.Provider>
  );
}
