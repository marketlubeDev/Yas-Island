import apiClient from "../../../config/axiosInstance";
import { getPerformanceEndpointList } from "../../../config/endpoints";

const getPerformance = async (productId) => {
  const response = await apiClient.get(
    `${getPerformanceEndpointList}?productId=${productId}`
  );
  return response.data;
};

export default getPerformance;
