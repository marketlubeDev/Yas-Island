import apiClient from "../../../config/axiosInstance";
import { validatePromocodeEndpoint } from "../../../config/endpoints";

const validatePromocode = async (promocode) => {
  const response = await apiClient.post(
    `${validatePromocodeEndpoint}`,
    JSON.stringify(promocode),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};

export default validatePromocode;
