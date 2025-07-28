import apiClient from "../../../config/axiosInstance";

const getTermsAndCondition = async (language, productId, source) => {
  const response = await apiClient.get(
    `/TermsAndCondition?language=${language}&productId=${productId}&source=${source}`
  );
  return response.data;
};

export default getTermsAndCondition;
