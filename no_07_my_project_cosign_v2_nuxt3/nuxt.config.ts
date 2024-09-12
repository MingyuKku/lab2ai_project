// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    // nitro: {
    //     experimental: {
    //         websocket: true,
    //     }
    // },
    runtimeConfig: {
        public: {
            GTM_ID: process.env.GTM_ID || "G-DQ27XJPBPY",
            IMAGE_URL: process.env.IMAGE_URL || "https://kr.object.ncloudstorage.com/cosign/",
            API_URL: process.env.API_URL || "https://dev-content.cosign.cc",
            // API_URL: process.env.API_URL || "https://content.cosign.cc",
            // API_URL: process.env.API_URL || "http://localhost:51001",
            CONTENT_API_URL: process.env.API_URL || "https://dev-content.cosign.cc",
            // CONTENT_API_URL: process.env.API_URL || "https://content.cosign.cc",
            // CONTENT_API_URL: process.env.API_URL || "http://localhost:41000",
            AUTH_API_URL: process.env.AUTH_API_URL || "https://dev-authorization.cosign.cc",
            // AUTH_API_URL: process.env.AUTH_API_URL || "https://authorization.cosign.cc",
            // AUTH_API_URL: process.env.API_URL || "http://localhost:41002",
            PAY_API_URL: process.env.PAY_API_URL || "https://dev-purchase-api.cosign.cc",
            CHAT_API_URL: process.env.CHAT_API_URL || "https://dev-chat.cosign.cc",
            CHAT_SOCKET_URL: process.env.CHAT_SOCKET_URL || "https://dev-chat.cosign.cc/cg",
            DEPLOY_TYPE: process.env.DEPLOY_TYPE || "dev",
        }
    },
    builder: 'vite',
    vite: {
        build: {
            rollupOptions: {
                output: {
                    chunkFileNames: process.env.API_URL !== undefined ? '_nuxt/[name].[hash].js' : '_nuxt/[name].js',
                    entryFileNames: process.env.API_URL !== undefined ? '_nuxt/[name].[hash].js' : '_nuxt/[name].js',
                    assetFileNames: process.env.API_URL !== undefined ?'_nuxt/[name].[hash][extname]' : '_nuxt/[name][extname]'
                }
            }
        },
        // server: {
        //     headers: {
        //         'cache-control': `max-age=${ 60 * 60 * 24 * 7 } s-maxage=${ 60 * 60 * 24 * 7 }`,
        //     }
        // }
    },
    app: {
        head: {
            title: `코인의 모든 싸인 코싸인 - COSIGN`,
            charset: 'utf-8',
            htmlAttrs: {
                lang: 'ko'
            },
            viewport: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no',
            meta: [
                { 'http-equiv': "X-UA-Compatible", content: 'IE=edge' },
                { name: 'format-detection', content: 'telephone=no' },
                { name: 'google-site-verification', content: 'LI5CqCywKjw_VrnJgfHOk5RhP4tY_amxMSbdQlvGsVg' },
                { name: 'naver-site-verification', content: '5c9467e211d4b617091c76e44eafb663eca4d946' },
            ],
            script: [
                {
                    defer: 'true',
                    src: `https://www.googletagmanager.com/gtag/js?id=${process.env.GTM_ID !== undefined? process.env.GTM_ID: 'G-2LPELSEQBZ'}`
                },
                {
                    defer: 'true', 
                    src: '/charting_library/datafeeds/bundle.js',
                },
                { 
                    defer: 'true',
                    src: '//appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/ko_KR/appleid.auth.js'
                },
                {// 구글 애드센스
                    async: 'true',
                    src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8783218127052555',
                    crossorigin: 'anonymous',
                    type: 'text/javascript',
                },
                { // stomp sockjs 라이브러리 에러를 잡기 위해
                    children: 'var global = window;'
                },
                { // stomp sockjs 라이브러리 에러를 잡기 위해
                    children: `function gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","${process.env.GTM_ID !== undefined? process.env.GTM_ID: 'G-2LPELSEQBZ'}");`
                },
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
            ]
        },
        layoutTransition: false,
        pageTransition: false
    },
    modules: [
        '@pinia/nuxt',
        'dayjs-nuxt',
        '@nuxt/image',
        '@nuxtjs/device',
        '@nuxtjs/tailwindcss',
        'nuxt-swiper',
    ],
    dayjs: {
        plugins: [
            'utc',
            'timezone',
        ]
    },
    image: {
        provider: 'ipx',
        ipx: {
            maxAge: 60 * 60 * 24 * 7, // 7일
        },
        // providers: {
        //     myProvider: {
        //         name: 'myProvider',
        //         provider: '~/providers/my-provider.ts',
        //         options: {
        //             baseUrl: 'https://kr.object.ncloudstorage.com/cosign/coin-image/v1/'
        //         }
        //     }
        // }
        // cloudinary: {
        //     baseURL: 'https://kr.object.ncloudstorage.com/cosign/'
        // }
    },
    tailwindcss: {
        cssPath: '~/assets/tailwind.css',
        exposeConfig: true,
    },
    // io: {
    //     sockets: [
    //         {
    //             name: 'cosign-chat',
    //             url: 'https://dev-chat.cosign.cc/chat/room',
    //         }
    //     ]
    // },
    plugins: [
    ],
    css: [
        // '@/assets/reset.css',
    ],
    devServer: {
        port: 22001,
    },
    // nitro: {
    //     routeRules: {
    //         '/_ipx/**': {
    //             headers: {
    //                 'Cache-Control': `public, max-age=${60 * 60 * 24 * 7}`,
    //             }
    //         }
    //     }
    // }
})