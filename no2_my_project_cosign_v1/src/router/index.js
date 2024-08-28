import Vue from 'vue'
import VueRouter from 'vue-router'
// import loginStore from '@/store/loginStore';
import IndexHome from '@/views/IndexHome.vue';
import MentorPage from '@/views/MentorPage.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/ApiTest.vue')
  },
  {
    path: '/',
    name: 'IndexHome',
    component: IndexHome
  },
  {
    path: '/signup',
    name: 'SignupPage',
    component: () => import('@/views/signup/SignupPage.vue'),
  },
  {
    path: '/signup/info_terms',
    name: 'InfoTerms',
    component: ()=> import('@/views/signup/InfoTerms.vue')
  },
  {
    path: '/signup/info_customer',
    name: 'InfoCustomer',
    component: ()=> import('@/views/signup/InfoCustomer.vue')
  },
  {
    path: '/forgot_password',
    name: 'ForgotPassword',
    component: ()=> import('@/views/signup/ForgotPassword.vue')
  },
  {
    path: '/temporary_password',
    name: 'TemporaryPassword',
    component: ()=> import('@/views/signup/TemporaryPwPage.vue')
  },
  {
    path: '/guidePage',
    name: 'GuidePage',
    component: ()=> import('@/views/GuidePage.vue'),
  },

  {
    path: '/service',
    name: 'Service',
    component: ()=> import('@/views/ServiceCenter.vue'),
    children: [
      {
        path: '/service',
        name: 'RouteServiceIndex',
        component: () => import('@/components/serviceCenter/RouteServiceIndex.vue'),
      },
      {
        path: '/service/qna',
        name: 'RouteOftenQNA',
        component: () => import('@/components/serviceCenter/RouteOftenQNA.vue'),
      },
      {
        path: '/service/notice',
        name: 'RouteNotice',
        component: () => import('@/components/serviceCenter/RouteNotice.vue'),
      },
      {
        path: '/service/site_inquiry',
        name: 'RouteSiteInquiry',
        component: () => import('@/components/serviceCenter/RouteSiteInquiry.vue'),
      },
      {
        path: '/service/myQuestion',
        name: 'RouteMyQuestion',
        component: () => import('@/components/serviceCenter/RouteMyQuestion.vue'),
      },
    ]
  },

  {
    path: '/my_page',
    name: 'MyPage',
    component: () => import('@/views/my_page/MyPage.vue'),
    children: [
      {
        path: '/my_page',
        name: 'MyPage_personal',
        component: () => import('@/views/my_page/MyPagePersonal.vue'),
      },
      {
        path: '/my_page/password_change',
        name: 'MyPage_password',
        component: () => import('@/views/my_page/MyPagePassword.vue'),
      },
      {
        path: '/my_page/secession',
        name: 'MyPage_secession',
        component: () => import('@/views/my_page/MyPageSecession.vue'),
      },
    ]
  },
  {
    path: '/m/:page_id',
    name: 'MentorPagePage',
    component: MentorPage
  },
  {
    path: '/m/:page_id/:sign_seq_id',
    name: 'MentorPageOtherPage',
    component: MentorPage
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/TestPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to,from,savedPosition) {
    if(savedPosition) {
      return savedPosition;
    } else {
      return {x:0, y:0}
    }
  }
})

export default router
