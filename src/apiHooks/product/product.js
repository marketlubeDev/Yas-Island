import apiClient from "../../../config/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setProducts } from "../../global/productSlice";

const useGetProductList = () => {
  const queryClient = useQueryClient();
  const language = useSelector((state) => state.language.currentLanguage);
  const dispatch = useDispatch();

  // Clear cache when language changes
  useEffect(() => {
    queryClient.removeQueries(["productList"]);
  }, [language, queryClient]);

  const response = useQuery({
    queryKey: ["productList", language],
    queryFn: () => apiClient.get(`/products/GetProductList?lang=${language}`),
  });

  if(response.data){
    dispatch(setProducts(response.data.data.results));
  }
 
  return {
    data: response.data,
    productList: response?.data?.data?.results,
    isLoading: response.isLoading,
    isError: response.isError,
    refetch: response.refetch,
  };
};

export default useGetProductList;