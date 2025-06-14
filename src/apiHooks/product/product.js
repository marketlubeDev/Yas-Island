import apiClient from "../../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";


const useGetProductList = () => {
  const response = useQuery({
    queryKey: ["productList"],
    queryFn: () => apiClient.get("/products/GetProductList?langcode=en"),
  });
  return {
    data: response.data,
    isLoading: response.isLoading,
    isError: response.isError,
  };
};

export default useGetProductList;