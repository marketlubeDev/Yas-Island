import axios from "axios";
import apiClient from "../../config/axiosInstance";

export const getTokenizationFormData = async (paymentRequest) => {
  try {
    const tokenizationRequest = {
      vivaOrderId: paymentRequest.merchantReference,
      panOrderId: generateGuid(),
      amount: paymentRequest.amount,
      currency: paymentRequest.currency || 'AED',
      customerEmail: paymentRequest.customerEmail || '',
      language: paymentRequest.language || 'en',
      customerName: paymentRequest.customerName || '',
      orderDescription: paymentRequest.orderDescription || ''
    };

    const response = await axios.post(
      "https://payfort.dev.panashi.ae/api/tokenization/request-tokenization", 
      tokenizationRequest
    );

    const apiResponse = response.data;

    if (apiResponse.formParameters) {
      const formParams = apiResponse.formParameters;
      return {
        // Get the action URL from the top-level of the response
        actionUrl: apiResponse.actionUrl || '',

        // Get the form fields from the nested dictionary
        serviceCommand: formParams['service_command'] || '',
        accessCode: formParams['access_code'] || '',
        merchantIdentifier: formParams['merchant_identifier'] || '',
        merchantReference: formParams['merchant_reference'] || '',
        language: formParams['language'] || '',
        tokenName: formParams['token_name'] || '',
        signature: formParams['signature'] || '',
        merchantExtra: formParams['merchant_extra'] || '',
        returnUrl: formParams['return_url'] || ''
      };
    } else {
      console.warn('Tokenization response was successful but content was invalid or empty. Content:', response.data);
    }


  } catch (error) {
    console.error('Tokenization request failed:', error);
    throw new Error(error.response?.data?.message || 'Failed to get tokenization form data');
  }
};

function generateGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

