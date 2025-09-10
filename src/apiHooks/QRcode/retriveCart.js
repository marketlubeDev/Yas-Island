import apiClient from "../../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { retriveCartEndpoint } from "../../../config/endpoints";

const useRetriveCart = (qrcode) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart", qrcode],
    queryFn: () => apiClient.get(`${retriveCartEndpoint}?qrcode=${qrcode}`),
    enabled: !!qrcode,
  });

  return { data, isLoading, isError };
};

export default useRetriveCart;
