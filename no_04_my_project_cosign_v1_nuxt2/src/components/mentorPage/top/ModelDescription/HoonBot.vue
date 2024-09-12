<template>
  <div class="model_wrap">
    <div class="inner_box">
    <div class="closeModal" @click="closeModal"><i class="xi-close-thin"></i></div>
      <div class="title">
        <h1>AI 훈봇</h1>
      </div>
      <section>
        <!-- <div class="outline">
          <h1>개요</h1>
        </div> -->
        <div class="feature">
          <h1>특징</h1>
          <ul>
            <li>구분: 인공지능</li>
            <li>예측 코인: 메이저 알트 코인(이더리움, 이더리움 클래식, 리플, 스텔라루멘, 도지코인, 비트코인 캐시 등)</li>
            <li>예측 길이: 12시간</li>
          </ul>
        </div>
        <div class="desc">
          <h1>설명</h1>
          <p>비트코인의 가격이 결국 알트코인의 가격을 좌지우지하고, 보통 국내 거래소 가격이 해외거래소에 비해 높기 때문에 시세 차이까지 계산하여 알트코인의 가격이 상승할 것이라고 AI 예측하고, 차트로 알 수 있는 정보를 취합하여 조건이 만족할 경우 메이저 알트코인 매매를 진행합니다. AI훈봇은 보수적이고 최대한 안전한 매매를 추구합니다.</p>
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