import apiClient from "../../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const useValidatePromocode = (promocode) => {
    const response = useQuery({
        queryKey: ["validatePromocode", promocode],
        queryFn: () => apiClient.get(`/orders/validatepromocode?promocode=${promocode}`),
    });

    return {isLoading: response.isLoading, isError: response.isError, data: response.data, refetch: response.refetch};
}

export default useValidatePromocode;