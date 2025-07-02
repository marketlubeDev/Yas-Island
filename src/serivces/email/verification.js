import apiClient from "../../../config/axiosInstance";


const emailService = {
    verification: async (data) => {
        const response = await apiClient.post(`/email/verifyemail?email=${data}`);
        return response.data;
    }
}

export default emailService;
