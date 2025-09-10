import apiClient from "../../../config/axiosInstance";
import { getTermsAndConditionEndpoint } from "../../../config/endpoints";

const getTermsAndCondition = async (language, productId, source) => {
  const response = await apiClient.get(
    `${getTermsAndConditionEndpoint}?language=${language}&productId=${productId}&source=${source}`
  );
  return response.data;
};

export default getTermsAndCondition;
