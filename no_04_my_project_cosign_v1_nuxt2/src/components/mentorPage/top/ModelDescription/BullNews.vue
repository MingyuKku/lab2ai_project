<template>
  <div class="model_wrap">
    <div class="inner_box">
    <div class="closeModal" @click="closeModal"><i class="xi-close-thin"></i></div>
      <div class="title">
        <h1>Bull News AI</h1>
      </div>
      <section>
        <div class="outline">
          <h1>개요</h1>
          <p>가상화폐 가격의 변동 요인은 수요·공급 요인, 실물경제 요인, 심리적 요인 등이 복잡하게 얽혀 있습니다. 그 중, 최근 일련의 급격한 가격 변동은 미국 연준의 금리 인상, 러시아의 우크라이나 침공 등 대부분 정책과 국제 정세 변화에 따른 결과였습니다.</p>
          <p>Bull News AI 멘토는 이와 같은 정성적 사건들이 가격에 미치는 영향을 모델링하기 위해, 가상화폐 관련 뉴스를 수집, 분석하여 가격을 예측하는 인공지능 모델입니다. 모델은 30여 개의 신뢰할 수 있는 뉴스 데이터 소스로부터 수집한 90,000여 개의 뉴스, 35,000,000여 개 단어로 학습되었습니다. 예측을 위해 일평균 200개의 뉴스를 실시간으로 수집, 가공하며, 모델은 새로운 데이터에 대해 지속적으로 업데이트 됩니다.</p>
        </div>
        <div class="feature">
          <h1>특징</h1>
          <ul>
            <li>구분: 인공지능(머신러닝)</li>
            <li>예측 코인: 비트코인</li>
            <li>예측 길이: 24시간</li>
            <li>예측 빈도: 약 1회/1일</li>
          </ul>
        </div>
        <div class="desc">
          <h1>설명</h1>
          <p>가상화폐 가격에 영향을 주는 주요 이슈는 해당 시점에 집중적으로 보도되는 특징이 있습니다. Bull News AI 멘토는 이 점에 착안해 최근 뉴스의 각 토픽이 전체 기간 대비 얼마나 집중적으로 보도되었는지 계산합니다. 전체 프로세스는 전처리 → 토픽 추출 → 집중도 계산 → 가격 예측 단계로 구성됩니다.</p>
          <div class="descImg_wrap column">
            <div class="desc_img1">
              <div class="img"><img :src="`${$static.imgUrl}mentorPage/modelDescription/bullNews_desc1.png`" alt="설명이미지"></div>
              <span>그림 1. 예측 프로세스 흐름도</span>
            </div>
          </div>
          <p>먼저, 수집한 뉴스 데이터에 대해 대/소문자 변경, 특수문자 삭제, 불용어 제거, 저빈도 단어 제거, 토큰화(Tokenization) 등의 텍스트 전처리를 수행합니다.</p>
          <p>전처리가 완료된 뉴스 데이터는 토픽 추출 단계에서 LDA(Latent Dirichlet Allocation) 모델을 사용하여 기술(Technology), 정책(Policy), 시장(Market) 등의 토픽으로 분류됩니다.</p>
          <p>그 후, 각 토픽에 대해 TF-IDF(Term Frequency - Inverse Document Frequency) 개념을 적용하여 전체 기간 대비 각 토픽의 최근 집중도를 계산합니다. </p>
          <p>끝으로, 가공이 완료된 데이터를 회귀 모델(Regression Model)에 입력해 최종 예측 가격을 얻게 되며, 예측에 사용되는 토픽 모델과 회귀 모델은 모두 백테스트를 통해 수익률을 최대화하는 최적 하이퍼 파라미터(Hyper-parameter)로 학습한 모델을 사용합니다.</p>
          <div class="descImg_wrap column">
            <div class="desc_img1">
              <div class="img"><img :src="`${$static.imgUrl}mentorPage/modelDescription/bullNews_desc2.png`" alt="설명이미지"></div>
              <span>그림 2. 토픽 모델링 결과. NFT, Metaverse 등 기술(Tech) 토픽.</span>
            </div>
            <div class="desc_img2">
              <div class="img"><img :src="`${$static.imgUrl}mentorPage/modelDescription/bullNews_desc3.png`" alt="설명이미지"></div>
              <span>그림 3. 토픽 모델링 결과. 러시아의 우크라이나 침공과 관련된 토픽.</span>
            </div>
          </div>
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