import apiClient from "../../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";



const useGetProductList = () => {
  const language = useSelector((state) => state.language.currentLanguage);
  const response = useQuery({
    queryKey: ["productList", language],
    queryFn: () => apiClient.get(`/products/GetProductList?lang=${language}`),
    keepPreviousData: false,
  });
 
  return {
    data: response.data,
    productList: response?.data?.data?.results,
    isLoading: response.isLoading,
    isError: response.isError,
  };
};

export default useGetProductList;