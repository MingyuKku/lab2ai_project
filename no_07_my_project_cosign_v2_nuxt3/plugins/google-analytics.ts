declare global {
    interface Window {
        dataLayer: undefined | null | any[];
        gtag: (...args: any[]) => void;
    }
}

export default defineNuxtPlugin(() => {
    if(process.client) {        
        const { GTM_ID } = useRuntimeConfig().public;

        window.dataLayer = window.dataLayer || [];

        function gtag(...args: any[]){
            window.dataLayer?.push(args);
        }

        gtag('js', new Date());
        
        gtag('config', GTM_ID);
        
        window.gtag = gtag;
    }
})