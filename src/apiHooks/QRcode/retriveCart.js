import apiClient from "../../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const useRetriveCart = (qrcode) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart", qrcode],
    queryFn: () => apiClient.get(`/qrcode/retrievecart?qrcode=${qrcode}`),
    enabled: !!qrcode,
  });

  return { data, isLoading, isError };
};

export default useRetriveCart;
