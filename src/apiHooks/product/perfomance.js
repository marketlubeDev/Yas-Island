import apiClient from "../../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const useGetPerformance = () => {
    const { startDate, endDate, productId } = useSelector((state) => state.performance);
    console.log(startDate, endDate, productId, "startDate, endDate, productId");
    const response = useQuery({
        queryKey: ["performance", startDate, endDate, productId],
        queryFn: () => apiClient.get(`/products/getperformances?fromDate=${startDate}&toDate=${endDate}&productId=${productId}`),
    });

    return {
        data: response.data,
        isLoading: response.isLoading,
        error: response.error,
    };
};



export default useGetPerformance;
