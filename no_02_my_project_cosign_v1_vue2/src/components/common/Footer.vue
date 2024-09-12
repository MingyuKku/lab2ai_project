<template>
  <div class="foot_wrap">
    <div class="info">
      <div class="info_left">
        <div class="foot_logoImg"><a href="https://lab2ai.com/" target="_blank">
          <img :src="`${imgURL}index/main/foot_lab2ai_bi.png`" alt="랩투아이">
        </a></div>
        <div class="left_text">
          <ul class="customer">
            <li><a href="/guidePage">서비스소개</a></li>
            <li><a href="/signup/info_terms">이용약관</a></li>
            <li class="middle"><a href="/signup/info_customer">개인정보처리방침</a></li>
            <li class="middle"><a href="https://docs.google.com/forms/d/e/1FAIpQLSdrNAUa_KRhyIZ67SUPJOJ7X2oFhxfu7nErUuKr48e-lPREmw/viewform" target="_blank">이용문의</a></li>
            <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSdpDxnBRhfH6QoAcQc86Jqwqa7f0xXXsTQULQxGjoKyu7J6GA/viewform" target="_blank">멘토제휴문의</a></li>
          </ul>
          <p>Copyright © Lab2AI Corp. All rights reserved.</p>
        </div>
      </div>
      <div class="info_right">
        <ul>
          <li>
            <div class="bi"><img :src="`${imgURL}index/main/foot_bi_1.svg`" alt="BI아이콘"></div>
            <p>대-스타 해결사 플랫폼 선정</p>
          </li>
          <li>
            <div class="bi"><img :src="`${imgURL}index/main/foot_bi_2.svg`" alt="BI아이콘"></div>
            <p>데이터산업 육성 지원 사업 선정</p>
          </li>
          <li>
            <div class="bi"><img :src="`${imgURL}index/main/foot_bi_3.svg`" alt="BI아이콘"></div>
            <p>SGI서울보증 보험가입</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgURL: process.env.VUE_APP_IMG_URL
    }
  }
}
</script>

<style lang='scss'>
  @import './css/footer.scss';
</style>