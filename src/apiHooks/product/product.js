import apiClient from "../../../config/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";  
import { setProducts } from "../../global/productSlice";
import queryClient from "../../../config/reactQuery"; 
const useGetProductList = () => {

  const language = useSelector((state) => state.language.currentLanguage);
  const dispatch = useDispatch();



  const response = useQuery({
    queryKey: ["productList", language],
    queryFn: () => apiClient.get(`/products/GetProductList?lang=${language}`),
  });

  // Dispatch to Redux only when data changes
  useEffect(() => {
    if(response.data && response.data.data && response.data.data.results){
      let orderedProducts = [...response?.data?.data?.results]?.sort((a, b) => a.display_order - b.display_order);
      dispatch(setProducts(orderedProducts));
    }
  }, [response.data, dispatch]);
 
  return {
    data: response.data,
    productList: response?.data?.data?.results,
    isLoading: response.isLoading,
    isError: response.isError,
    refetch: response.refetch,
  };
};

export default useGetProductList;