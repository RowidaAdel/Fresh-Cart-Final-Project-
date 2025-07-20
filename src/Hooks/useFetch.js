import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/";

export default function useFetch(endpoint, queryKey, options = {}) {
    return useQuery({
        queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
        queryFn: async () => {
            const { data } = await axios.get(`${BASE_URL}${endpoint}`, {
                headers: options.headers || {},
                params: options.params || {},
            });
return data.data ?? data;
        },
        staleTime: options.staleTime || 0,
        enabled: options.enabled !== undefined ? options.enabled : true,
        ...options,
    });
}