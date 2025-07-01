import { useMutation } from "@tanstack/react-query";
import { basketService } from "../../serivces/basket/checkBasket";

const useCheckBasket = () => {
    const response = useMutation({
        mutationFn: (data) => basketService.checkBasket(data),
    });

    return {
        checkBasket: response.mutate,
        isLoading: response.isPending,
        error: response.error,
    };
};



export default useCheckBasket;
