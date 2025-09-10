import apiClient from "../../../config/axiosInstance";

const validatePromocode = async (promocode) => {
  const response = await apiClient.post(
    `/products/validatepromocode`,
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
