import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const useAuthApi = ({
  endpoint,
  method = 'POST',
  successMessage,
  onSuccessCallback,
  onErrorCallback,
}) => {
  return useMutation({
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
    onSuccess: (data) => {
      toast.success(successMessage || 'Success');
      onSuccessCallback?.(data);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Something went wrong');
      onErrorCallback?.(error);
    },
  });
};
