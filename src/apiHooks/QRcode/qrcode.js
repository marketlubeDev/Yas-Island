import { useEffect } from "react";
import apiClient from "../../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const useValidateQRcode = (qrcode) => {
  console.log(qrcode, "qrcode in qrcode");
  const response = useQuery({
    queryKey: ["validateQRcode", qrcode],
    queryFn: () => apiClient.get(`/qrcode/log-locations?qrlocation=${qrcode}`),
    enabled: !!qrcode,
  });

  return {
    isLoading: response.isLoading,
    isError: response.isError,
    data: response.data,
  };
};

export default useValidateQRcode;
