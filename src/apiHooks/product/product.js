import apiClient from "../../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setParks, setProducts } from "../../global/productSlice";

const useGetProductList = () => {
  const language = useSelector((state) => state.language.currentLanguage);
  const dispatch = useDispatch();

  const response = useQuery({
    queryKey: ["productList", language],
    queryFn: () => apiClient.get(`/products/GetProductList?lang=${language}`),
  });

  // Dispatch to Redux only when data changes
  useEffect(() => {
    const arr = response?.data?.data?.results;
    if (response.data && response.data.data && arr && arr.length > 0) {
      let orderedProducts = [...arr]?.sort(
        (a, b) => a.display_order - b.display_order
      );
      dispatch(setProducts(orderedProducts));

      const allParks = arr
        ?.map((item) => item?.parks)
        ?.flat()
        ?.map((item) => item?.parkname_localized);

      const uniqueParks = [...new Set(allParks)];

      dispatch(setParks(uniqueParks));
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
