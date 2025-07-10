import apiClient from "../../../config/axiosInstance";

export const paymentService = {
    createOrder: async (data) => {
        const response = await apiClient.post(`/orders/createorder`, data);
        return response.data;
    }
};


