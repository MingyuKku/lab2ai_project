<template>
<div class="mantorPage_wrap">
    <AlertPopup />
    <LoginForm />
    <SignHistoryPopup 
        :signOffPopupProps="signOffPopupProps" 
        :mentorId="mentorId" 
        :subSeqId="subSeqId" 
        :signPropsChange="signPropsChange"
    />
    <section id="section1">
        <div class="section_wrap">
            <Profile class="profile" :profile="profile" :mentorId="mentorId" :isSubscribed="isSubscribed" />
            <EarningChart class="earningChart" :chartData="chartData" />
        </div>
    </section>

    <section id="section2">
        <div class="section_wrap">
            <Main class="main" 
                :signOnProps="signOnProps" 
                :signOffProps="signOffProps" 
                :mentorId="mentorId" 
                :changeLink="changeLink" 
                :signPropsChange="signPropsChange"
            />
            <Side class="side" :mentorId="mentorId" />
        </div>
    </section>
    <div class="scrollTopUp" @click="moveToTop" :class="{show: isShowTopButton}">
      <i class="xi-angle-up"></i>
      <p>Top</p>
    </div>
    <ModelDescription :mentorId="mentorId" />
</div>
</template>

<script>
import LoginForm from '@/src/components/common/LoginForm';
// import CsHeader from '@/src/components/common/CsHeader.vue'
import Profile from '@/src/components/mentorPage/top/Profile.vue'
import EarningChart from '@/src/components/mentorPage/top/EarningChart.vue'
import SignHistoryPopup from '@/src/components/mentorPage/main/SignHistoryPopup.vue'
import Main from '@/src/components/mentorPage/main/Main.vue'
import Side from '@/src/components/mentorPage/side/Side.vue'
import getProfile from '@/src/core/profile.js';
import getSignOn, { DEFAULT_SIGN_ON, getValidateMinText } from '@/src/core/signOn.js';
import getSignOffPopup, { newActiveIndex } from '~/src/core/signOffPopup.js';
import AlertPopup from '~/src/components/common/AlertPopup.vue';
import ModelDescription from '@/src/components/mentorPage/top/ModelDescription/ModelDescription.vue';
import { josa } from 'josa';
import { mapActions } from 'vuex';
export default {
  components: {Profile, EarningChart, LoginForm, Main, Side, SignHistoryPopup, AlertPopup, ModelDescription },
  head() {
    const signOnCoin = this.signOnProps?.sign;
    const signOffCoin = this.signOffPopupProps;

    let coin = null;

    if(signOffCoin) {
        if(signOffCoin.coin) coin = signOffCoin.coin;   // 히스토리 클릭으로 싸인오프 팝업 띄웠을 때
        else coin = this.signOffPopupActive.coin    // 싸인오프 라우터로 접근했을 때
    }
    else if(signOnCoin !== undefined) { // 싸인온이 존재할 때
        coin = signOnCoin.coin
    }
    
    const mentor = this.profile;
    
    let title = `${mentor.title}의 코인 시세 AI 예측 - 코싸인(COSIGN)`;
    let description = mentor.description;
    let keyword = `${mentor.title},${this.mentorId},가상화폐,암호화폐,비트코인,이더리움,도지코인,알트코인,코인전망,코인시세,비트코인시세,비트코인예측,투자정보,코싸인,코사인,cosign,cosigncc,가상자산,비트코인전망,이더리움전망`

    if(coin) {
        let coinCode = coin.market;
        const searchStr = /krw/gi;
        if(searchStr.test(coinCode)) coinCode = coinCode.substr(4);

        title = `${mentor.title}의 ${coin.koreanName}(${coinCode}) 시세 AI 예측 - 코싸인(COSIGN)`;
        description = `코싸인(COSIGN) ${josa(`${mentor.title}#{이}`)} ${coin.koreanName}(${coinCode}) 시세를 AI로 예측한 결과를 공개합니다. ${coin.koreanName}의 진입가(매수가격), 목표가(매도가격), 손절가를 제공하고 있습니다.`;
        keyword = `${coin.koreanName},${coinCode},${mentor.title},${coin.koreanName}시세예측,${coinCode}시세예측,${coin.koreanName}매수가,${coin.koreanName}매입가,${coin.koreanName}매도가,${coinCode}매수가,${coinCode}매도가,${coin.koreanName}AI예측,${coinCode} AI예측`
    }

    return {
        title: title,
        meta: [
            { hid: 'description', name: 'description', content: description },
            { hid: 'keywords', name: 'keywords', content: keyword },
            { hid: 'og-title', property: 'og:title', content: title },
            { hid: 'og-description', property: 'og:description', content: description },
            { hid: 'og-image', property: 'og:image', content: `https://kr.object.ncloudstorage.com/cosign/mentor-image/main/${this.mentorId}.png` },
            { property: 'http-equiv', content: null}
        ],
        link: [
            { rel: 'alternate', media: 'only screen and (max-width: 640px)', href: `https://m.cosign.cc${this.mentorPageUrl}` }
        ]
    }
  },
  async asyncData({$axios,$intApi, route, error}) {
    const mentorId = route.params.mentorId;
    const subSeqId = route.params.subSeqId;

    let profile_origin = '';
    try {
        profile_origin = (await $axios.get(`/api/mentor_page/get/${mentorId}`)).data;

    } catch(err) { console.log(err) }

    if(profile_origin !== "") {
        const {profile, chartData} = getProfile({profile_origin});

        let signOnProps = {
            ...DEFAULT_SIGN_ON
        };

        let signOffPopupProps;
        let signOffPopupActive;
        let isSignOnLoaded = false;
        let mentorPageUrl = `/${mentorId}`;
        let routeSign;

        if(subSeqId !== undefined) {
            if(!isNaN(Number(subSeqId)) && Number(subSeqId) < 2147483647) { // type이 long인가

                let routeRes = '';
                
                try {
                    routeRes = (await $axios.post(`/api/sign/get/route/${mentorId}/${subSeqId}`, {}, {withCredentials: true})).data;
                } catch(err) { console.log(err) }
                
                if(routeRes.signNotFound) {
                    error({ statusCode: 404, message: 'Sign not found' })
                } else if(routeRes.signNowRes !== null) {
                    const signBlurDto = routeRes.signNowRes.signBlurDto;
                    const signNowDto = routeRes.signNowRes.signNowDto;
                    const sign = signBlurDto !== null? signBlurDto: signNowDto;

                    signOnProps = getSignOn({
                        buttons: routeRes.signNowRes.signButtons, 
                        sign, 
                        activeSignSeqId: parseInt(subSeqId)
                    });

                    mentorPageUrl = `/${mentorId}/${subSeqId}`;
                    routeSign = sign;

                    isSignOnLoaded = true;
                } else if(routeRes.signHistoryRes !== null) {
                    mentorPageUrl = `/${mentorId}/${subSeqId}`;
                    signOffPopupProps = getSignOffPopup(routeRes.signHistoryRes)
                    signOffPopupActive = signOffPopupProps[newActiveIndex(routeRes.signHistoryRes, subSeqId, undefined)];
                    routeSign = signOffPopupProps[newActiveIndex(routeRes.signHistoryRes, subSeqId, undefined)];
                }
            } else {
                error({ statusCode: 404, message: 'Sign not found' })
            }
        }

        if(isSignOnLoaded === false) {

            let signOnRes = '';
            try {
                signOnRes = (await $axios.post(`/api/sign/get/sign_now/current/${mentorId}`, {}, {withCredentials: true})).data;

                const buttons = signOnRes.signButtons;
                const signBlurDto = signOnRes.signBlurDto;
                const signNowDto = signOnRes.signNowDto;
                const sign = signBlurDto !== null? signBlurDto: signNowDto;

                if(sign !== undefined) {
                    signOnProps = getSignOn({
                      buttons, 
                      sign,
                      activeSignSeqId: sign.subSeqId
                    });

                    mentorPageUrl = `/${mentorId}/${sign.subSeqId}`;
                    routeSign = sign;
                }


            } catch(err) { console.log(err) }
        }

        let signOffRes = '';
        let signOffProps = '';
        let isSubscribed = false;

        try {
            signOffRes = (await $axios.get(`/api/sign/get/sign_history/page/${mentorId}`)).data;

            if(signOffRes) {
                signOffProps = {
                    isLastPage: signOffRes.isLastPage,
                    signs: signOffRes.signs.map(sign => {
                        return {
                            ...sign,
                            sign_state: {
                                buy_success: ['sell_success', 'sell_fail', 'cut'].includes(sign.evaluateState),
                                target_success: ['sell_success'].includes(sign.evaluateState),
                                earning_success: sign.earningRate > 0
                            }
                        }
                    })
                }
            }

            isSubscribed = (await $intApi.post(`/api/is_subscribed/${mentorId}`, {}, {withCredentials: true}))
                            .data.data.subscribed.status === "is_subscribed";

        } catch(err) { console.log(err) }

        return {
            profile, 
            chartData, 
            signOnProps, 
            signOffPopupProps, 
            signOffPopupActive,
            signOffProps, 
            mentorId, 
            subSeqId,
            mentorPageUrl,
            routeSign,
            isSubscribed
        }
    } else {
        error({ statusCode: 404, message: 'Mentor not found' })
    }
  },
  data() {
      return {
          isShowTopButton: false,
      }
  },
  computed: {
  },
  mounted() {
    if(this.$route.query.popup) this.toggleDescModal(true);
    // history.pushState(null, null, this.mentorPageUrl);
    window.addEventListener('scroll', this.scrollMoveTopBtn) // TOP 버튼
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollMoveTopBtn) // TOP 버튼
  },
  methods: {
    ...mapActions('signStore', ['toggleDescModal']),
      signPropsChange( {signOn, signOff} ) {
        if(signOn !== null) {
            this.signOnProps = signOn
            this.signOffPopupProps = null
        } else if(signOff !== null) {
            this.signOnProps = null
            this.signOffPopupProps = signOff
        }
      },
      moveToTop() {
          const {body} = document;
          body.scrollIntoView({
             behavior: 'smooth',
          })
      },
      scrollMoveTopBtn() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;
        if(scrollTop > window.innerHeight) {
            this.isShowTopButton = true;
        } else {
            this.isShowTopButton = false;
        }
      },
      changeLink(url) {
          this.mentorPageUrl = url;
      },
  }
}
</script>

<style lang="scss">
  @import '@/src/css/mentorPage.scss';
</style>