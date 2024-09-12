import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios';
import { API_URL } from '@/core/apiUrl'
import store from '@/store/index';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'IndexLogin',
    component: () => import('../views/IndexLogin.vue'),
    meta: {start: true}
  },

  //======================== 관리자 페이지 라우터 시작 ==============================
  {
    path: '/manager',
    name: 'ManagerPage',
    component: ()=> import('@/views/ManagerPage.vue'),
    children: [
      {
        path: '/',
        name: 'ManagerIndex',
        component: () => import('@/components/managerPage/Faq.vue'),
        beforeEnter: (to,from,next) => {
          next('/manager/faq')
        },
        meta: {index: 0, auth: true},
      },
      {
        path: '/manager/faq',
        name: 'Faq',
        component: () => import('@/components/managerPage/Faq.vue'),
        meta: {index: 0, auth: true},
      },
      {
        path: '/manager/faq/:pageId',
        name: 'FaqRead',
        component: () => import('@/components/managerPage/FaqRead.vue'),
        meta: {index: 0, auth: true},
      },
      {
        path: '/manager/faq/:pageId/faq_update',
        name: 'FaqUpdate',
        component: () => import('@/components/managerPage/FaqUpdate.vue'),
        meta: {index: 0, auth: true},
      },
      {
        path: '/manager/faq_regist',
        name: 'FaqRegist',
        component: () => import('@/components/managerPage/FaqRegist.vue'),
        meta: {index: 0, auth: true},
      },
      {
        path: '/manager/notice',
        name: 'Notice',
        component: () => import('@/components/managerPage/Notice.vue'),
        meta: {index: 1, auth: true},
      },
      {
        path: '/manager/notice/:pageId',
        name: 'NoticeRead',
        component: () => import('@/components/managerPage/NoticeRead.vue'),
        meta: {index: 1, auth: true},
      },
      {
        path: '/manager/notice/:pageId/notice_update',
        name: 'NoticeUpdate',
        component: () => import('@/components/managerPage/NoticeUpdate.vue'),
        meta: {index: 1, auth: true},
      },
      {
        path: '/manager/notice_regist',
        name: 'NoticeRegist',
        component: () => import('@/components/managerPage/NoticeRegist.vue'),
        meta: {index: 1, auth: true},
      },
      
      {
        path: '/manager/qna',
        name: 'Qna',
        component: () => import('@/components/managerPage/Qna.vue'),
        meta: {index: 2, auth: true},
      },
      {
        path: '/manager/qna/:pageId',
        name: 'QnaRead',
        component: () => import('@/components/managerPage/QnaRead.vue'),
        meta: {index: 2, auth: true},
      },
      {
        path: '/manager/member',
        name: 'Member',
        component: () => import('@/components/managerPage/Member.vue'),
        meta: {index: 3, auth: true},
      },
      
      {
        path: '/manager/member/:email',
        name: 'MemberRead',
        component: () => import('@/components/managerPage/MemberRead.vue'),
        meta: {index: 3, auth: true},
      },
      {
        path: '/manager/product',
        name: 'Product',
        component: () => import('@/components/managerPage/Product.vue'),
        meta: {index: 4, auth: true},
      },
      {
        path: '/manager/product_regist',
        name: 'ProductRegist',
        component: () => import('@/components/managerPage/ProductRegist.vue'),
        meta: {index: 4, auth: true},
      },
      {
        path: '/manager/product/:pageId',
        name: 'ProductRead',
        component: () => import('@/components/managerPage/ProductRead.vue'),
        meta: {index: 4, auth: true},
      },

      //프로모션 & 테마 컨텐츠
      {
        path: '/manager/promotion',
        name: 'PromotionContent',
        component: () => import('@/components/mainContent/PromotionContent.vue'),
        meta: {index: 5, auth: true},
      },
      {
        path: '/manager/popup',
        name: 'PopupContent',
        component: () => import('@/components/mainContent/PopupContent.vue'),
        meta: {index: 5, auth: true},
      },
      {
        path: '/manager/theme',
        name: 'ThemeContent',
        component: () => import('@/components/mainContent/ThemeContent.vue'),
        meta: {index: 5, auth: true},
        children: [
          {
            path: '/manager/theme/auth',
            name: 'ThemeContent-auth',
            component: () => import('@/components/mainContent/ThemeContentInstagramAuth.vue'),
            meta: {index: 5, auth: true},
          }
          
        ]
      },

      {
        path: '/manager/exchange',
        name: 'ExchangeMentor',
        component: () => import('@/components/managerPage/ExchangeMentor.vue'),
        meta: {index: 6, auth: true},
      },
      {
        path: '/manager/exchange/:id/',
        name: 'ExchangeMentorRead',
        component: () => import('@/components/managerPage/ExchangeMentorRead.vue'),
        meta: {index: 6, auth: true},
        props: true
      },
      // 에디터 피드 관련 라우터
      {
        path: '/manager/feed/',
        name: 'Feed',
        component: () => import('@/components/managerPage/FeedRead.vue'),
        meta: {index: 7, auth: true},
        props: true
      },
      {
        path: '/manager/feed/regist/',
        name: 'FeedRegist',
        component: () => import('@/components/managerPage/FeedRegist.vue'),
        meta: {index: 7, auth: true},
        props: true,
        children: [
          {
            path: ':adminId',
            name: 'FeedDetail',
            component: () => import('@/components/managerPage/FeedRegist.vue'),
            meta: {index: 7, auth: true},
          }
        ]
      },
      {
        path: '/manager/push/',
        name: 'Push',
        component: () => import('@/components/managerPage/PushRegist.vue'),
        meta: {index: 8, auth: true},
        props: true
      }, {
        path: '/manager/paidUsers/',
        name: 'PaidUsers',
        component: () => import('@/components/managerPage/PaidUsers.vue'),
        meta: {index: 9, auth: true},
        props: true
      },
      // app 버전 관리
      {
        path: '/manager/app_ver/',
        name: 'appVersionHistory',
        component: () => import('@/components/managerPage/AppVersionHistory.vue'),
        meta: {index: 10, auth: true},
        props: true
      }, {
        path: '/manager/app_ver/regist/',
        name: 'appVersionRegist',
        component: () => import('@/components/managerPage/AppVersionRegist.vue'),
        meta: {index: 10, auth: true},
        props: true,
        children: [
          {
            path: ':id',
            name: 'AppVersionUpdate',
            component: () => import('@/components/managerPage/AppVersionRegist.vue'),
            meta: {index: 10, auth: true},
          }
        ]
      },
    ],
  },
  //======================== 관리자 페이지 라우터 끝 ==============================
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
  },
})

router.beforeEach( async (to, from, next)=> {
  await axios.post(`${API_URL}/api/login_info`, {}, {withCredentials: true})
  .then(res=> {
    // console.log('비포이치 체크로그인', res.data)
    if(res.data !== '') {
      store.commit('loginStore/login', res.data);
      if(to.meta.start) {
        next('/manager'); return;
      }
    } else {
      store.commit('loginStore/login', null);
      if(to.meta.auth) {
        next('/'); return;
      }
    }
    next();
  })
  .catch(()=> {
    store.commit('loginStore/login', null);
    if(to.meta.auth) {
      next('/'); return;
    }
    next();
  })
}) 



export default router
