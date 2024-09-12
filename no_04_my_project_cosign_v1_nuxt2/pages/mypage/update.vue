<template>
  <div class="myPageUpdate_wrap">
    <div class="title">개인 정보 수정</div>
    <div class="myPagePersonal_body">
      <div class="nickname_area">
        <h2>닉네임</h2>
        <input type="text" id="nickname" v-model="nickname">
        <span class="validation" v-if="error.none"><i class="xi-error-o"></i>닉네임을 입력해 주세요</span>
        <span class="validation" v-if="error.rule"><i class="xi-error-o"></i>한글/영문/숫자 포함 2~10자를 입력해 주세요</span>
      </div>
      <div class="email_area">
        <h2>이메일</h2>
        <input type="email" id="email" v-model="email" disabled>
        <!-- <span class="validation"><i class="xi-info-o"></i>한글/영문/숫자 포함 2~10자</span> -->
      </div>
      <div class="event_info_agreement">
        <input type="checkbox" id="eventAgree" v-model="eventCk">
        <label for="eventAgree">
          <p>이벤트 정보 수신 동의</p>
          <div class="checkBox"><i class="xi-check"></i></div>
        </label>
      </div>
      <!-- <button type="button" :disabled="validateNicknameChange" @click="sendChangeAPI">변경하기</button> -->
      <button type="button" @click="sendChangeAPI">변경하기</button>
      <div class="secession_area clearFix">
        <p><NuxtLink to="/mypage/secession">회원탈퇴</NuxtLink></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { mypage } from '@/src/mixin/mypage.js';
export default {
  layout: 'mypage',
  mixins: [mypage],
  data() {
    return {
      nickname: '',
      email: '',
      eventCk: false,
      error: {
        none: false,
        rule: false,
      } 
    }
  },
  async mounted() {
    await this.loadUserInfo()
    this.setUserInfo(this.userInfo)
  },
  computed: {
    ...mapGetters('loginStore', ['userInfo']),
  },
  methods: {
    ...mapActions('loginStore', ['loadUserInfo']),
    setUserInfo(infoVal) {
      this.nickname = infoVal.nickname;
      this.email = infoVal.email;
      this.eventCk = infoVal.eventCk;
    },
    initError() {
      this.error.none = false;
      this.error.rule = false;
    },
    validateNicknameChange() {
      this.initError();
      if(!this.nickname) {
        this.error.none = true;
        return true;
      } else if(!this.nickNameValid) {
        this.error.rule = true;
        return true;
      } else {
        return false;
      }
    },
    async sendChangeAPI() {
      if(!this.validateNicknameChange()) {
        try {
          let changData = {
            'eventCk': this.eventCk,
            'nickName': this.nickname
          };
          const res = await this.$intApi.post(`/api/user/modify/change`, changData.getParam(), {withCredentials: true})
          if(this.$res_inspect(res, 'inspect')) {
            alert('회원 정보가 변경되었습니다');
            location.reload()
          } else {
            alert(this.$res_inspect(res, 'message')); return;
          }
        } catch(err) {
          alert(err, '관리자에게 문의해 주세요.')
        }
      }
      
    }
  }
}
</script>

<style lang='scss'>
  @import "@/src/css/mypage/myPageUpdate.scss";
</style>