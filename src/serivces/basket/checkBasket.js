import apiClient from "../../../config/axiosInstance";

export const basketService = {
    checkBasket: async (data) => {
        console.log(data, "data");
        const response = await apiClient.post(`/products/checkbasket`, data);
        return response.data;
    }
}



