import apiClient from "../../../config/axiosInstance";
import { updateSurveyEndpoint } from "../../../config/endpoints";

const updateSurvey = async (answer) => {
  const response = await apiClient.get(
    `${updateSurveyEndpoint}?answerText=${answer}`
  );
  return response;
};

export default updateSurvey;
