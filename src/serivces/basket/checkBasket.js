import apiClient from "../../../config/axiosInstance";



export const checkBasket = async (data) => {
    
    const response = await apiClient.post(`/products/checkbasket`);
    return response.data;
};



