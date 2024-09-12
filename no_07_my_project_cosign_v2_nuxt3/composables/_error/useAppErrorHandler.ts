export const useAppErrorHandler = (msg: string) => {
    const errorMsg = String(msg);
    
    const FAILED_LOAD_CASES: RegExp[] = [
        /Failed to fetch dynamically imported module/, // 동적 모듈을 찾지 못했을 때
        /Importing a module script failed/,  // 모듈 불러오기 실패
        /Failed to load resource:/,  // 리소스를 로드하지 못했을 때
        /Cannot find static asset/,  // 정적 js파일을 찾지 못했을 때
    ]


    FAILED_LOAD_CASES.forEach((errorCase) => {
        if (errorCase.test(errorMsg)) return webRefresh();
    });


    function webRefresh() {
        if (process.server) return;

        window.location.reload();
    }
}