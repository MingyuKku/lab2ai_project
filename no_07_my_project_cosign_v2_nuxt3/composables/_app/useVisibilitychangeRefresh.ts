export const useVisibilitychangeRefresh = () => {

    const VISIBILITY_STORAGE_KEY = 'visibilityTimeStamp';

    const onvisibilitychange = (event: Event) => {
        const refreshTimeStamp = 1000 * 60 * 30; // 30 분

        if (document.hidden) {
            window.localStorage.setItem(VISIBILITY_STORAGE_KEY, String(event.timeStamp));

        } else { // 브라우저 탭에서 활성화되었을 때
            const hiddenStateTimeStamp = Number(window.localStorage.getItem(VISIBILITY_STORAGE_KEY));
            if ((event.timeStamp - hiddenStateTimeStamp) > refreshTimeStamp) { // 비활성화된 시간이 refreshTimeStamp 이상으로 경과했다면 화면 리프레시
                window.location.reload();
            }
        }
    }

    onMounted(() => {
        window.addEventListener('visibilitychange', onvisibilitychange);
    })
    
    onBeforeUnmount(() => {
        window.removeEventListener('visibilitychange', onvisibilitychange);
    })
}