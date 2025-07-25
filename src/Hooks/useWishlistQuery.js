import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { authContext } from "../Context/authContext";

export function useWishlistQuery() {
    const { token } = useContext(authContext);

    const fetchWishlist = async () => {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
            headers: { token },
        });
        return data?.data || [];
    };

    return useQuery({
        queryKey: ["wishlist"],
        queryFn: fetchWishlist,
        enabled: !!token,
        staleTime: 1000 * 60 * 5,
    });
}
