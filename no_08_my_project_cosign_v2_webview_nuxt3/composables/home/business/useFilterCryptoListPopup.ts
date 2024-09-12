export const useFilterCryptoListPopup = ({
    popupToggle
}: {
    popupToggle: () => void;
}) => {

    const controlPopupClassName = 'home-filter-crypto-list-popup';
    
    const popupTimeout = ref<NodeJS.Timeout>()

    const windowClick = (e: Event) => {
        const target = e.target as HTMLElement;

        if (!target.closest(`.${controlPopupClassName}`)) {
            popupToggle();
        }
    }

    onMounted(() => {
        if (popupTimeout.value) clearTimeout(popupTimeout.value);
        popupTimeout.value = setTimeout(() => {
            window.addEventListener('click', windowClick, { passive: false })
        })
    })

    onUnmounted(() => {
        if (popupTimeout.value) clearTimeout(popupTimeout.value);
        window.removeEventListener('click', windowClick);
    })


    return {
        controlPopupClassName,
    }
}