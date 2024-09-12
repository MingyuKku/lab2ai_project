import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
    scrollBehavior: (to, from, savedPosition) => {
        const nuxtApp = useNuxtApp();
    
        nuxtApp.hooks.hookOnce('page:finish', () => {
            if (savedPosition !== null) {
                window.scrollTo({
                    left:0,
                    top:savedPosition.top,
                })
            } else {
                
                if (to.name === 'chat') return; // 채팅 페이지의 스크롤 위치는 예외

                window.scrollTo({
                    left:0,
                    top:0
                })
            }
        })  
    }
}