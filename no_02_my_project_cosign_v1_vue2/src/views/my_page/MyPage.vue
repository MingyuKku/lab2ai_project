<template>
  <div class="myPage_setting_wrap">
    <LoginForm/>
    <CsHeader/>
    <div class="myPage_body">
      <div class="myPage_left">
        <div class="title">계정설정</div>
        <ul class="menus">
          <li v-for="(setting, idx) in settingList" :key="idx" :class="{active: listIdx === idx}">
            <a :href="`/my_page${setting.path}`">
              {{ setting.list }}
            </a>
          </li>
        </ul>
      </div>
      <div class="myPage_right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/common/LoginForm';
import CsHeader from '@/components/common/CsHeader';
import { mapGetters } from 'vuex';

export default {
  components: {LoginForm,CsHeader},
  data() {
    return {
      settingList: [
        {list: '개인 정보 수정', path: '/'},
        {list: '비밀번호 변경', path: '/password_change'},
        {list: '회원탈퇴', path: '/secession'},
      ],
      listIdx: 0,
    }
  },
  mounted() {
    this.routePage(this.$router.history.current.name);
    // if(this.loginInfo === null) location.href = '/';
  },
  watch: {
    // loginInfo(logInfo) {
    //   if(logInfo === null) {
    //     location.href = '/';
    //   }
    // }
  },
  computed: {
    ...mapGetters('loginStore', ['loginInfo'])
  },
  methods: {
    // ...mapActions('loginStore', ['loadUserInfo']),
    routePage(val) {
      switch(val) {
        case 'MyPage_personal': this.listIdx = 0; break;
        case 'MyPage_password': this.listIdx = 1; break;
        case 'MyPage_secession': this.listIdx = 2; break;
        default: this.listIdx = 0; break;
      }
    }
  }
}
</script>

<style lang='scss'>
  @import './css/myPage.scss';
</style>