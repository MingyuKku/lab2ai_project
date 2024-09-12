<template>
  <div class="managerPage_wrap">
    <CsHeader/>
    <ImageModal v-if="prevModalFlag" 
      :prevImageSrc="prevImageSrc" 
      @closePrevModal="prevModalFlag = false"
    />
    <ManagerModal v-if="modalFlag"
      :modalContIdx="modalContIdx"
      :modalKey="modalKey"
      :data="data"
      @closeModal="controlModal"
    />
    <div class="center">
      <div class="side">
        <SideGnbMenu
          :gnbMenu="gnbMenu"
        />
      </div>
      <main class="manager_main">
        <!-- <ServiceHeader
        /> -->
        <router-view
          @openModal="controlModal"
          @onPrevImage="onPrevImage"
        ></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import CsHeader from '@/components/common/CsHeader.vue';
import SideGnbMenu from '@/components/managerPage/SideGnbMenu';
import ManagerModal from '@/components/managerPage/ManagerModal';
import ImageModal from '@/components/managerPage/ImageModal';

// import axios from 'axios'
export default {
  components: {
    CsHeader,
    SideGnbMenu,
    ManagerModal,
    ImageModal
    // ServiceHeader
  },
  data() {
    return {
      prevModalFlag: false,
      prevImageSrc: '',
      modalFlag: false,
      modalContIdx: null,
      modalKey: null, 
      data: null,
      gnbMenu: [
        {tit:'자주 묻는 질문', path: '/manager/faq', name: 'Faq'},
        {tit:'공지사항', path: '/manager/notice', name: 'Notice'},
        {tit:'1:1 문의', path: '/manager/qna', name: 'Qna'},
        {tit:'회원관리', path: '/manager/member', name: 'Member'},
        {tit:'상품관리', path: '/manager/product', name: 'Product'},
        {tit:'메인 컨텐츠', path: '/manager/main', name: 'PromotionContent'},
        {tit:'멘토 / 거래소', path: '/manager/exchange', name: 'ExchangeMentor'},
        {tit:'에디터 피드', path: '/manager/feed', name: 'Feed'},
        {tit:'수동 푸시 등록/관리', path: '/manager/push', name: 'Push'},
        {tit:'유료 이용자 현황', path: '/manager/paidUsers', name: 'PaidUsers'},
        {tit:'APP 버전 관리', path: '/manager/app_ver', name: 'appVersionHistory'},
      ],
    }
  },
  methods: {
    controlModal(val, idx, key, data) {
      this.modalContIdx = idx
      this.modalFlag = val
      this.modalKey = key

      if(data !== undefined) this.data = data;
      // console.log('여기서 잘못됨?', data)
    },
    onPrevImage(src) {
      this.prevModalFlag = true;
      this.prevImageSrc = src;
    },
  }
}
</script>

<style lang='scss'>
  @import './css/managerPage.scss'
</style>