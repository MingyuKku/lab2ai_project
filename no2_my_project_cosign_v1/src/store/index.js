import Vue from 'vue'
import Vuex from 'vuex'

import signStore from '@/store/signStore.js';
import loginStore from '@/store/loginStore.js';
import signHistoryPopupStore from '@/store/mentorPage/signHistoryPopupStore.js';
import mentorRouteStore from '@/store/mentorPage/routeStore.js';
import popupStore from '@/store/popupStore.js';
import signHistoryStore from '@/store/mentorPage/signHistoryStore.js';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    signStore,
    loginStore,
    signHistoryPopupStore,
    mentorRouteStore,
    popupStore,
    signHistoryStore,
  }
})
