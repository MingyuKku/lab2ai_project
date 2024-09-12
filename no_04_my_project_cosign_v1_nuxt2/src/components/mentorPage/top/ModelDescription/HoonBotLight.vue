<template>
  <div class="model_wrap">
    <div class="inner_box">
    <div class="closeModal" @click="closeModal"><i class="xi-close-thin"></i></div>
      <div class="title">
        <h1>AI 훈봇 라이트</h1>
      </div>
      <section>
        <!-- <div class="outline">
          <h1>개요</h1>
        </div> -->
        <div class="feature">
          <h1>특징</h1>
          <ul>
            <li>구분: 인공지능</li>
            <li>예측 코인: 알트코인</li>
            <li>예측 길이: 12시간</li>
          </ul>
        </div>
        <div class="desc">
          <h1>설명</h1>
          <p>AI훈봇과 라이트의 차이점은, '거래 빈도'입니다. AI 훈봇 같은 경우는, 여러 조건을 만족해야 매매를 진행하기 때문에 거래 빈도가 다소 적습니다. 다만, AI 훈봇 라이트 모델은 여러 조건을 간소화 하고 AI에 의존 하며 매매를 진행하므로, 거래 빈도가 다소 높은 편 입니다.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import model from '@/src/mixin/model'
export default {
  mixins: [model],
}
</script>

<style lang="scss">
  @import './css/commonModelDesc.scss'
</style>