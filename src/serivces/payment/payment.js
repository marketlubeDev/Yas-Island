import apiClient from "../../../config/axiosInstance";
import { createOrderEndpoint } from "../../../config/endpoints";

export const paymentService = {
  createOrder: async (data) => {
    const response = await apiClient.post(`${createOrderEndpoint}`, data);
    return response.data;
  },
};
