// PayFort service for handling payment tokenization and processing
const PAYFORT_API_BASE = "http://localhost:3000/api/payfort";

export const payfortService = {
  /**
   * Create a PayFort payment token
   * @param {Object} paymentData - Payment details
   * @param {number} paymentData.amount - Payment amount (in main currency unit, e.g., 100.00 for AED 100)
   * @param {string} paymentData.currency - Currency code (default: AED)
   * @param {string} paymentData.customer_email - Customer email address (optional)
   * @returns {Promise<Object>} Tokenization response with form parameters
   */
  async createPaymentToken(paymentData) {
    try {
      const response = await fetch(`${PAYFORT_API_BASE}/create-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to create payment token");
      }

      return data.tokenizationResponse;
    } catch (error) {
      console.error("Error creating PayFort token:", error);
      throw new Error(`Failed to create payment token: ${error.message}`);
    }
  },

  /**
   * Process PayFort callback response
   * @param {Object} callbackData - Response data from PayFort
   * @returns {Promise<Object>} Processed payment result
   */
  async processCallback(callbackData) {
    try {
      const response = await fetch(`${PAYFORT_API_BASE}/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(callbackData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error processing PayFort callback:", error);
      throw new Error(`Failed to process payment: ${error.message}`);
    }
  },

  /**
   * Check server health
   * @returns {Promise<Object>} Server health status
   */
  async checkHealth() {
    try {
      const response = await fetch(
        `${PAYFORT_API_BASE.replace("/api/payfort", "")}/health`
      );
      return await response.json();
    } catch (error) {
      console.error("Error checking server health:", error);
      return { status: "ERROR", error: error.message };
    }
  },
};
