import { piniaAuthInfoValues } from "~/pinia/user/piniaAuthInfoValues";

export const useRedirectPage = () => {
    const { authState, updateAuthState } = piniaAuthInfoValues();
    const { options } = useRouter();
    const { params } = useRoute();
    
    const backRoute = options.history.state.back;

    if (authState.redirectRoutePage) {
        navigateTo(authState.redirectRoutePage, { replace: true });
        updateAuthState({ redirectRoutePage: null });
        return;

    }
    
    if (backRoute) {
        const currentRoute = options.history.state.current;

        if (backRoute === currentRoute) return;

        navigateTo(backRoute as string, { replace: true });

    } else {
        navigateTo('/');
    }
}