import apiClient from "../../../config/axiosInstance";

const getPerformance = async (productId) => {

    const response = await apiClient.get(`/products/getperformanceslist?productId=${productId}`);
    return response.data;
};

export default getPerformance;
