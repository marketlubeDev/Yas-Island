// utils/apiEndpoints.js
// Runtime-loaded endpoints with explicit initialization to avoid top-level await.
let cachedEndpoints = null;

export let validatePromocodeEndpoint = "";
export let getProductListEndpoint = "";
export let getPerformanceEndpoint = "";
export let checkBasketEndpoint = "";
export let emailVerificationEndpoint = "";
export let createOrderEndpoint = "";
export let updateSurveyEndpoint = "";
export let getTermsAndConditionEndpoint = "";
export let getPerformanceEndpointList = "";
export let validateQRcodeEndpoint = "";
export let retriveCartEndpoint = "";

export const initEndpoints = async () => {
  if (cachedEndpoints) return;
  const response = await fetch("/config/endpoints.json", { cache: "no-store" });
  cachedEndpoints = await response.json();

  validatePromocodeEndpoint = cachedEndpoints.validatePromocodeEndpoint;
  getProductListEndpoint = cachedEndpoints.getProductListEndpoint;
  getPerformanceEndpoint = cachedEndpoints.getPerformanceEndpoint;
  checkBasketEndpoint = cachedEndpoints.checkBasketEndpoint;
  emailVerificationEndpoint = cachedEndpoints.emailVerificationEndpoint;
  createOrderEndpoint = cachedEndpoints.createOrderEndpoint;
  updateSurveyEndpoint = cachedEndpoints.updateSurveyEndpoint;
  getTermsAndConditionEndpoint = cachedEndpoints.getTermsAndConditionEndpoint;
  getPerformanceEndpointList = cachedEndpoints.getPerformanceEndpointList;
  validateQRcodeEndpoint = cachedEndpoints.validateQRcodeEndpoint;
  retriveCartEndpoint = cachedEndpoints.retriveCartEndpoint;
};
