import apiClient from "../../../config/axiosInstance";

const getPerformance = async (fromDate, toDate, productId) => {

    const response = await apiClient.get(`/products/getperformances?fromDate=${fromDate}&toDate=${toDate}&productId=${productId}`);
    return response.data;
};

export default getPerformance;
