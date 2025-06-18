import apiClient from "../../../config/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const useGetProductList = () => {
  const queryClient = useQueryClient();
  const language = useSelector((state) => state.language.currentLanguage);

  // Clear cache when language changes
  useEffect(() => {
    queryClient.removeQueries(["productList"]);
  }, [language, queryClient]);

  const response = useQuery({
    queryKey: ["productList", language],
    queryFn: () => apiClient.get(`/products/GetProductList?lang=${language}`),
    keepPreviousData: false,
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: true
  });
 
  return {
    data: response.data,
    productList: response?.data?.data?.results,
    isLoading: response.isLoading,
    isError: response.isError,
    refetch: response.refetch,
  };
};

export default useGetProductList;