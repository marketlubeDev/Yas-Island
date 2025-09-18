import axios from "axios";
import { toast } from "sonner";
import { getConfig } from "./environment.js";

let BaseURL = "https://yas-uat-qrapi.dev.panashi.ae/api";

const apiClient = axios.create({
  baseURL: BaseURL, // Default fallback
  // withCredentials: true,
});

// Load environment and update baseURL
getConfig()
  .then((config) => {
    if (config?.baseURL) {
      apiClient.defaults.baseURL = config.baseURL;
    }
  })
  .catch(console.error);

// Global network error handling: show a non-blocking toast and let components decide further
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only toast for network or 5xx errors to avoid duplicating business-logic errors
    const status = error?.response?.status;
    if (!status || status >= 500) {
      try {
        toast.error(
          "We\u2019re having trouble reaching the server. Please try again.",
          {
            position: "top-center",
          }
        );
      } catch {}
    }
    return Promise.reject(error);
  }
);

export default apiClient;
