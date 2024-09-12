import { jwtDecode } from "~/composables/_auth/_methods";
import { useAuthTokenCookies } from "~/composables/useCookie/auth-token";

export const useDecodeToken = () => {

    const userType = ref<string | null>(null);
    const { getAccToken } = useAuthTokenCookies();

    const initTokenDecode = () => {
        const token = getAccToken();

        if (!token.value) return;
        
        const decode = jwtDecode(token.value);
        userType.value = decode['social'];
    }
    

    return {
        userType,
        initTokenDecode,
    }
}