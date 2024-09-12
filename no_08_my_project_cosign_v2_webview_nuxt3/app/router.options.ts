import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
    scrollBehavior: (to, from, savedPosition) => {
        const nuxtApp = useNuxtApp();
    
        nuxtApp.hooks.hookOnce('page:finish', () => {
            if(savedPosition === null) {
                window.scrollTo({
                    left:0,
                    top:0
                })
        
            } else {
                window.scrollTo({
                    left:0,
                    top:savedPosition.top,
                })
            }
        })  
    }
}