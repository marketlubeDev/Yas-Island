import apiClient from "../../../config/axiosInstance";
import { emailVerificationEndpoint } from "../../../config/endpoints";

const emailService = {
  verification: async (data) => {
    const response = await apiClient.post(
      `${emailVerificationEndpoint}?email=${data}`
    );
    return response.data;
  },
};

export default emailService;
