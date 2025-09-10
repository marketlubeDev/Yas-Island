import apiClient from "../../../config/axiosInstance";
import { checkBasketEndpoint } from "../../../config/endpoints";

export const basketService = {
  checkBasket: async (data) => {
    const response = await apiClient.post(`${checkBasketEndpoint}`, data);
    return response.data;
  },
};
