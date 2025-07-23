import apiClient from "../../../config/axiosInstance";

const updateSurvey = async (answer) => {
  const response = await apiClient.get(
    `/survey/update-survey?answerText=${answer}`
  );
  return response;
};

export default updateSurvey;
