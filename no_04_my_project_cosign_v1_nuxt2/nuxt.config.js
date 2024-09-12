export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: `코인의 모든 싸인 코싸인 - COSIGN`,
    htmlAttrs: {
      lang: 'ko'
    },
    script: [
      {async: true, src: `https://s3.tradingview.com/tv.js`},
      {src: `https://www.googletagmanager.com/gtag/js?id=${process.env.GTM_ID !== undefined? process.env.GTM_ID: 'G-2LPELSEQBZ'}`},
      {src: `//wcs.naver.net/wcslog.js`},
      {src: `https://t1.daumcdn.net/kas/static/ba.min.js`, async: true},
      {async: true, crossorigin: 'anonymous', src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8783218127052555`},
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'google-site-verification', content: 'CoD6qHEfV10xXw_rzREQKuiNSxG5ktvnocR2Qw0JAu8' },
      { name: 'naver-site-verification', content: '5c9467e211d4b617091c76e44eafb663eca4d946' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Montserrat:wght@500;600;700;800&family=Paytone+One&display=swap'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/src/css/reset.scss',
    // 'swiper/dist/css/swiper.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '@/plugins/api.js'},
    {src: '@/plugins/public.js'},
    {src: '@/plugins/vue-awesome-swiper.js', mode: 'client'},
    {src: '@/plugins/param-util.js'},
    {src: '@/plugins/image-url.js'},
    {src: '@/plugins/date-util.js'},
    {src: '@/plugins/light-weight-chart.js', mode: 'client'},
    {src: '@/plugins/firebase.js', mode: 'client'},
    {src: '@/plugins/vuejs-paginate.js', ssr: false, mode: 'client'},
    {src: '@/plugins/tui-editor.js', ssr: false, mode: 'client'},
    {src: '@/plugins/google-analytics.js', mode: 'client'},
    {src: '@/plugins/naver-analytics.js', mode: 'client'},
    {src: '@/plugins/redirect.js', mode: 'server'},
    {src: '@/plugins/vue-google-adsense.js', mode: 'client'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    'nuxt-gsap-module',
    '@nuxtjs/device'
  ],
  styleResources: {
		scss: ['@/src/css/global.scss'],
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'nuxt-sweetalert2',
    'cookie-universal-nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_URL !== undefined? process.env.API_URL: "http://localhost:20002",
  },
  gsap: {
    extraPlugins: {
      scrollTo: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    filenames: {
      chunk: () => process.env.API_URL !== undefined? '[name].js?hash=[contenthash:7]': '[name].js?hash=[hash]'
    }
  },
  server: {
    port: 20001
  },
  loading: false,
  publicRuntimeConfig: {
    GTM_ID: process.env.GTM_ID !== undefined? process.env.GTM_ID: 'G-2LPELSEQBZ'
  },

  telemetry: false,

  env: process.env
}
