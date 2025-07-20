import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function usePaginatedProducts(page = 1) {
  return useQuery({
    queryKey: ['products', page],
    queryFn: async () => {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`);
      return data;
    },
    keepPreviousData: true, 
  });
}