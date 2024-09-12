import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import globalMixinFunc from './mixin/globalMixin'
import firebase from 'firebase/app'
import 'firebase/messaging'
import Meta from 'vue-meta';

Vue.config.productionTip = false
Vue.mixin(globalMixinFunc);
Vue.use(Meta, {
  attribute: 'data-vue-meta'
});

new Vue({
  created() {
    const firebaseConfig = {
      apiKey: "AIzaSyBH5xwK9hNhogezVh3shbEXnQr5-ECAOkU",
      authDomain: "cosign-911d2.firebaseapp.com",
      projectId: "cosign-911d2",
      storageBucket: "cosign-911d2.appspot.com",
      messagingSenderId: "306303946038",
      appId: "1:306303946038:web:425026fd20a6f5e222b797",
      measurementId: "G-HMT4ETF5BY"
    }

    firebase.initializeApp(firebaseConfig)

    const messaging = firebase.messaging()

    messaging.usePublicVapidKey('BGXibNB2At2UbRnMi9nI2QH1JPoWQFwd4q-hCAMfl6BFuXFdJknWF7o04J6TwiHPnGbwfWxJ_FM7CNJBtUq6x40')

    Notification.requestPermission()
      .then((permission) => {
        console.log('권한: ', permission)
      })

    messaging.getToken()
      .then(console.log)
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
