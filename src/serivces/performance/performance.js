import apiClient from "../../../config/axiosInstance";

const getPerformance = async (fromDate, toDate, productId) => {
    console.log(fromDate, toDate, productId, "fromDate, toDate, productId");
    const response = await apiClient.get(`/products/getperformances?fromDate=${fromDate}&toDate=${toDate}&productId=${productId}`);
    console.log(response.data, "response.data");
    return response.data;
};

export default getPerformance;
