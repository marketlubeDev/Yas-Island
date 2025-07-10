import { useMutation } from "@tanstack/react-query";
import { paymentService } from "../../serivces/payment/payment";

const usePayment = () => {
    return useMutation({
        mutationFn: (data) => paymentService.createOrder(data),
    });
};



export default usePayment;
