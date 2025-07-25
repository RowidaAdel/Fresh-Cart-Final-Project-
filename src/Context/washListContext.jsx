import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { authContext } from "./authContext";

export const WashlistContext = createContext(null);

export default function WashlistContextProvider({ children }) {
  const { token } = useContext(authContext);
  const [wishlist, setWishlist] = useState(null);
  const [wishlistLike, setWishlistLike] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getLoggedUserWishlist(showToast = false) {
    if (!token) return;
    console.log("Fetching wishlist...");
    setLoading(true);
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token }
      });
      setWishlist(data?.data || []);
      setWishlistLike(data?.data || []);
      if (showToast) {
        toast.dismiss();
        toast.success("Wishlist loaded ✅", { id: "wishlist-load" });
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to load wishlist", { id: "wishlist-load" });
    } finally {
      setLoading(false);
    }
  }

  async function addProductToWishlist(productId) {
    if (!token) return;
    setLoading(true);
    getLoggedUserWishlist()
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers: { token } }
      );
      setWishlist(data.data || []);
      toast.dismiss();
      toast.success("Product added to wishlist ✅", { id: "wishlist-add" });
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to add product", { id: "wishlist-add" });
      await getLoggedUserWishlist(false);
    } finally {
      setLoading(false);
    }
  }

  async function removeProductFromWishlist(wishlistItemId) {
    if (!token) return;
    setLoading(true);
    getLoggedUserWishlist()
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${wishlistItemId}`,
        { headers: { token } }
      );
      toast.dismiss();
      toast.success("Product removed from wishlist ❌", { id: "wishlist-remove" });
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to remove product", { id: "wishlist-remove" });
      await getLoggedUserWishlist(false);
    } finally {
      setLoading(false);
    }
  }

  const didFetchRef = useRef(false);

  useEffect(() => {
    if (token && !didFetchRef.current) {
      getLoggedUserWishlist();
      didFetchRef.current = true;
    }
  }, [token]);

  return (
    <WashlistContext.Provider
      value={{ wishlist, wishlistLike, loading, getLoggedUserWishlist, addProductToWishlist, removeProductFromWishlist }} >
      {children}
    </WashlistContext.Provider>
  );
}
