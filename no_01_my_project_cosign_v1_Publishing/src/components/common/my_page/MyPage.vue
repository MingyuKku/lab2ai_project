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
          <!-- <li class="active"><a href="/my_page">개인 정보 수정</a></li>
          <li><a href="/my_page/password_change">비밀번호 변경</a></li>
          <li><a>회원탈퇴</a></li> -->
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
    switch(this.$router.history.current.name) {
      case 'MyPage_personal': this.listIdx = 0; break;
      case 'MyPage_password': this.listIdx = 1; break;
      case 'MyPage_secession': this.listIdx = 2; break;
      default: this.listIdx = 0; break;
    }
  },
}
</script>

<style lang='scss'>
  @import './css/myPage.scss';
</style>