import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import globalMixinFunc from './mixin/globalMixin'

Vue.config.productionTip = false;
Vue.mixin(globalMixinFunc);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
