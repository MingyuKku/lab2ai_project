import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'IndexHome',
    component: () => import('../views/IndexHome.vue')
  },
  {
    path: '/signup',
    name: 'SignupPage',
    component: () => import('@/components/common/signup/SignupPage.vue'),
  },
  {
    path: '/signup/info_terms',
    name: 'InfoTerms',
    component: ()=> import('@/components/common/signup/InfoTerms.vue')
  },
  {
    path: '/signup/info_customer',
    name: 'InfoCustomer',
    component: ()=> import('@/components/common/signup/InfoCustomer.vue')
  },
  {
    path: '/forgot_password',
    name: 'ForgotPassword',
    component: ()=> import('@/components/common/ForgotPassword.vue')
  },

  {
    path: '/my_page',
    name: 'MyPage',
    component: () => import('@/components/common/my_page/MyPage.vue'),
    children: [
      {
        path: '/',
        name: 'MyPage_personal',
        component: () => import('@/components/common/my_page/MyPagePersonal.vue'),
      },
      {
        path: '/my_page/password_change',
        name: 'MyPage_password',
        component: () => import('@/components/common/my_page/MyPagePassword.vue'),
      },
      {
        path: '/my_page/secession',
        name: 'MyPage_secession',
        component: () => import('@/components/common/my_page/MyPageSecession.vue'),
      },
    ]
  },

  {
    path: '/mentorPage',
    name: 'MentorPage',
    component: () => import('../views/MentorPage.vue')
  },
  {
    path: '/page/:page_id',
    name: 'MentorPageOtherPage',
    component: () => import('../views/MentorPage.vue')
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
  routes
})

export default router
