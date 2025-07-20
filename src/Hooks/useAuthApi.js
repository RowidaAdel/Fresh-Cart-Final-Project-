import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const useAuthApi = ({ endpoint, method = 'POST' }) => {
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const toastId = toast.loading('Processing...');
      try {
        const { data } = await axios({
          url: `https://ecommerce.routemisr.com/api/v1/auth/${endpoint}`,
          method,
          data: formData,
        });
        toast.dismiss(toastId);
        return data;
      } catch (error) {
        toast.dismiss(toastId);
        throw error;
      }
    },
  });

  return {
    mutate: mutation.mutate,
    error: mutation.error,
  };
};