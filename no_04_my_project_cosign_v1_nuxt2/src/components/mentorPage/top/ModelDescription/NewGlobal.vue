<template>
  <div class="model_wrap">
    <div class="inner_box">
    <div class="closeModal" @click="closeModal"><i class="xi-close-thin"></i></div>
      <div class="title">
        <h1>신규 모델</h1>
      </div>
      <section>
        <div class="outline">
          <h1>개요</h1>
          <p>가상화폐 가격은 코로나 이후 거시경제와 상관성을 갖기 시작했고, 테이퍼링이 본격적으로 시작된 올해부터 S&P, NASDAQ과 같은 주요 경제지표와의  커플링이 현상이 더욱 뚜렷해지고 있습니다. 이와 더불어  구글 트렌드 지수, 뉴스와 sns의 감성 결과 등 사회적 감성 요인에  강한 영향을 받는다는 접근의 연구들이 많이 이루어지고 있습니다.</p>
          <p>이러한 관점에서 OO AI 멘토는 경제지표와 자연어 처리(NLP) 기술 기반으로 추출한 뉴스 및 SNS감성 데이터를 결합하여 가격 예측에 활용하는 딥러닝 모델입니다.</p>
        </div>
        <div class="feature">
          <h1>특징</h1>
          <ul>
            <li>구분: 인공지능(딥러닝)</li>
            <li>예측 코인: 비트코인</li>
            <li>예측 길이: 3시간</li>
            <li>예측 빈도: 약 2회/1일</li>
          </ul>
        </div>
        <div class="desc">
          <h1>설명</h1>
          <p>가상화폐와 관련된 주요 이슈 발생 시 이슈의 호재인지 여부에 따라 가상화폐 가격의 추후 방향에 영향을 미치게 됩니다.  OO AI 멘토는 이 점에 착안해 자체  수집된 약 11만 개의 뉴스와 약 230만 개의 SNS 데이터를 가공하여  주요 이슈의 발생 유무, 이슈의 호재 악재 여부,  SNS 게시글의 긍정 부정 여부를 판단하고 주요 거시 경제지표와 결합해 가상화폐 가격을 예측합니다.</p>
          <div class="descImg_wrap column">
            <div class="desc_img1">
              <div class="img"><img :src="`${$static.imgUrl}mentorPage/modelDescription/new_global_desc1.png`" alt="설명이미지"></div>
              <span>그림 1. 예측 프로세스 흐름도</span>
            </div>
            <!-- <div class="desc_img2">
              <div class="img"><img :src="`${$static.imgUrl}mentorPage/modelDescription/global_desc2.png`" alt="설명이미지"></div>
              <span>그림 2. 경제지표 feature 예시</span>
            </div> -->
          </div>
          <h1>전처리 과정</h1>
          <p><strong>뉴스 이슈 집중도 점수</strong> 산출 방식은 다음과 같습니다.</p>
          <p>먼저, 수집한 뉴스 데이터에 대해 대/소문자 변경, 특수문자 삭제, 불용어 제거, 저빈도 단어 제거, 토큰화(Tokenization) 등의 텍스트 전처리를 수행합니다.</p>
          <p>전처리가 완료된 뉴스 데이터는 TF-IDF(Term Frequency - Inverse Document Frequency) 개념을 적용하여
          벡터로 변환하고, 각 뉴스별 TF-IDF 점수를 기준으로 상위 10개의 키워드를 선정합니다.</p>
          <p>끝으로 집계 시간 내 뉴스의 키워드 언급 빈도를 카운트하고, 그 결과값이 가장 높은 상위 2개 단어의 카운트 수를 합하여 뉴스 이슈 집중도 점수를 도출합니다.</p>

          <p style="marginTop: 30px"><strong>감성 지수</strong> 도출 방식은 다음과 같습니다.</p>
          <p>먼저, 자연어 처리 모델 BERT에  금융 도메인이 결합된 FinBERT 모델을 활용해 수집된 뉴스, SNS 데이터를 문장 단위로 임베딩합니다.</p>
          <p>임베딩이 완료된 데이터를 Finbert 알고리즘을 사용하여 데이터가 긍정/중립/부정일 확률을 각각 도출하고 hard 방식을 사용해 가장 확률이 높은 감성 분류 결과를 해당 텍스트의 감성으로 채택합니다.</p>
          <p>끝으로 집계 시간 동안 긍정/중립/부정 각각에 해당하는 데이터 수를 합하여 감성 지수를 도출합니다.</p>

          <h1 style="marginTop: 30px">회귀 모델 및 가격 예측</h1>
          <p>이렇게 가공된 이슈 집중도 점수,  감성 지수 점수, 경제지표 데이터는 하나의 데이터로 병합됩니다. 병합된 데이터를 딥러닝 모델인 LSTM(Long Short-Term)의 인풋 데이터로 활용해 최종 예측 가격을 얻게 됩니다.</p>
          <p>LSTM 모델의 하이퍼 파라미터(Hyper-parameter) 최적화를 위해 조건을 바꾸어가며 총 3만여 회의 백테스트를 수행하였으며, 누적 수익률을 최대화하는 최적 조건으로 학습한 모델을 사용합니다.</p>
        </div>
        <!-- <div class="source">
          <h1>출처</h1>
          <p>
            그림 1. Guillaume Chevalier, CC BY-SA 4.0 
            &#60;<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">https://creativecommons.org/licenses/by-sa/4.0,</a>&#62;
            via Wikimedia Commons
          </p>
        </div> -->
      </section>
    </div>
  </div>
</template>

<script>
import model from '@/src/mixin/model'
export default {
  name: 'Dtw',
  mixins: [model],
  // props: {
  //   active: Boolean,
  // },
  data() {
    return {
    };
  },

  mounted() {
    // console.log('모달창?', this.active)
  },

  methods: {
  },
};
</script>

<style lang="scss">
  @import './css/commonModelDesc.scss';
</style>