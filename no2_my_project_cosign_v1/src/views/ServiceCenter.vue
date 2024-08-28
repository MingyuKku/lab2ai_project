<template>
  <div class="serviceCenter_wrap">
    <CsHeader/>
    <LoginForm />
    <div class="center">
      <div class="side">
        <ServiceSide
          :sideMenu="servicePage"
        />
      </div>
      <main class="service_main">
        <ServiceHeader
        />
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import CsHeader from '@/components/common/CsHeader.vue';
import LoginForm from '@/components/common/LoginForm.vue';
import ServiceSide from '@/components/serviceCenter/ServiceSide';
import ServiceHeader from '@/components/serviceCenter/ServiceHeader';
// import ServiceIndex from '@/components/serviceCenter/ServiceIndex';
export default {
  components: {CsHeader,LoginForm,ServiceSide,ServiceHeader},
  data() {
    return {
      servicePage: [
        {tit:'자주 묻는 질문', path: '/qna'},
        {tit:'공지사항', path: '/notice'},
        {tit:'1:1 문의', path: '/site_inquiry'},
        {tit:'문의 내역', path: '/myQuestion'},
      ],
    }
  }
}
</script>

<style lang='scss'>
  @import './css/serviceCenter.scss';
</style>