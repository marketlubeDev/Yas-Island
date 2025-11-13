import apiClient from "../../../config/axiosInstance";
import { validateOTPEndpoint } from "../../../config/endpoints";

const validateOTPService = async (email, otp, metadata) => {
  const response = await apiClient.post(validateOTPEndpoint, {
    email,
    otp,
    metadata,
  });
  return response;
};

export default validateOTPService;
