import { useEffect } from "react";
import apiClient from "../../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { validateQRcodeEndpoint } from "../../../config/endpoints";

const useValidateQRcode = (qrcode) => {
  console.log(qrcode, "qrcode in qrcode");
  const response = useQuery({
    queryKey: ["validateQRcode", qrcode],
    queryFn: () =>
      apiClient.get(`${validateQRcodeEndpoint}?qrlocation=${qrcode}`),
    enabled: !!qrcode,
  });

  return {
    isLoading: response.isLoading,
    isError: response.isError,
    data: response.data,
  };
};

export default useValidateQRcode;
