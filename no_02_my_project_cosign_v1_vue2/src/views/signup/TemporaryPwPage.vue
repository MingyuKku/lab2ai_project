<template>
  <div class="temporaryPwPage_wrap"
    style="display: flex; align-items: center; justify-content: center; min-height: 100vh"
  >
    <div class="contentsBox"
      style="padding: 46px; background: #fff; border-radius: 20px"
    >
      <div class="title" style="padding-bottom: 46px;">
        <div class="logo" style="width: 110px;">
          <img 
            style="display: block; width: 100%;"
            src="https://kr.object.ncloudstorage.com/cosign/project-images/cosign-view/index/main/cosign_bi.svg" alt="로고">
        </div>
      </div>
      <div class="advise" style="color: #1E272E;">
        <h1 style="font-size: 14px; font-weight: 400;">안녕하세요, <span style="font-weight: 500;">{{ nickName }}</span>님</h1>
        <p style="margin: 40px 0; font-size: 14px; font-weight: 400;">
          COSIGN 임시 비밀번호입니다.<br>개인 정보 보호를 위해 지금 바로 로그인하셔서 비밀번호를 변경하여 사용할 것을 권해드립니다.
        </p>
      </div>
      <div class="temporaryPw" style="width: 330px; margin: 0 auto;">
        <input 
          style="font-family: 'Noto Sans KR', sans-serif; display: block; width: 100%; padding: 16px; -webkit-appearance: none;
          appearance: none; outline: none; border: none; border-radius: 10px; background: #f1f1f1; text-align: center;
          font-size: 17px; font-weight: 500; color: #F53B57;"
          type="text" id="tpw" v-model="temporaryPw"
        >
      </div>
      <div class="info" style="margin: 40px 0;">
        <p style="font-size: 14px; font-weight: 400; color: #1E272E;">
          COSIGN 로그인 후 ‘계정 설정’ > ‘비밀번호 변경’ 에서 비밀번호를 변경하실 수 있습니다.
        </p>
      </div>
      <button class="goLoginPage"
        style="font-family: 'Noto Sans KR', sans-serif; width: 100%; height: 57px; text-align: center; line-height: 56px; -webkit-appearance: none; appearance: none;
        border: none; outline: none; border-radius: 10px; background: #F53B57; font-weight: 500; font-size: 17px;
        cursor: pointer;"
        @click="showLoginPopup(true)"
      >
        <router-link :to="{path: '/'}" exact
          style="display: block; color: #fff;"
        >
          로그인하기
        </router-link>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      imgURL: process.env.VUE_APP_IMG_URL,
      nickName: '임시닉네임',
      temporaryPw: '임시비밀번호',
    }
  },
  methods: {
    ...mapActions('signStore', ['showLoginPopup']),
  }
}
</script>

<style lang='scss'>
  @import './css/temporaryPwPage.scss';
</style>