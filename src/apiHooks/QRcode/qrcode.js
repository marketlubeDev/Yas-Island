import { useEffect } from "react";
import apiClient from "../../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const useValidateQRcode = (qrcode = "a6d171b0-666a-4538-8adb-82e796c6d3ff") => {
  console.log(qrcode, "qrcode in qrcode");
  const response = useQuery({
    queryKey: ["validateQRcode", qrcode],
    queryFn: () =>
      apiClient.get(
        `/qrcode/log-locations?qrlocation=a6d171b0-666a-4538-8adb-82e796c6d3ff`
      ),
    // enabled: !!qrcode,
  });

  return {
    isLoading: response.isLoading,
    isError: response.isError,
    data: response.data,
  };
};

export default useValidateQRcode;
