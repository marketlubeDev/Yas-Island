import { useMutation } from "@tanstack/react-query";
import emailService from "../../serivces/email/verification";

const useVerification = () => {
    return useMutation({
        mutationFn: (data) => emailService.verification(data),
    });
};



export default useVerification;