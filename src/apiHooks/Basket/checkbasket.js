import { useMutation } from "@tanstack/react-query";
import { basketService } from "../../serivces/basket/checkBasket";

const useCheckBasket = () => {
    return useMutation({
        mutationFn: (data) => basketService.checkBasket(data),
    });
};



export default useCheckBasket;
