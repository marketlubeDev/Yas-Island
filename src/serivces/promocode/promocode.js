import apiClient from "../../../config/axiosInstance";

const validatePromocode = async (promocode) => {
  const response = await apiClient.get(
    `/orders/validatepromocode?promocode=${promocode}`
  );
  return response;
};

export default validatePromocode;
