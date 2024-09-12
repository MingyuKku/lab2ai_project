<template>
  <div class="index_wrap">
    <LoginForm />
    <!-- <CsHeader class="cs_header"/> -->
    <section id="section1">
        <!-- <VisualSlide class="visualSlide"/> -->
        <VisualSlide class="visualSlide" 
          :getVisualContent="getVisualContent"
          :onClickVisual="onClickVisual"
        />
    </section>
    <section id="section2">
      <div class="center">
        <MentorList class="mentorList" :totalMentors="totalMentors" :subscribedMentors="subscribedMentors" />
      </div>
    </section>
    <section id="section3">
      <div class="bestEarningSign_area">
        <div class="center">
          <BestEarningSign class="bestEarningSign" :bestEarningSigns="bestEarningSigns" />
        </div>
      </div>
      <div class="center">
        <ShortValidationSign class="shortValidationSign" :shortSigns="shortSigns" />
        <MajorCoinSign class="majorCoinSign" :majorSigns="majorSigns"/>
      </div>
    </section>
    <section id="section4">
      <TodayMentor/>
    </section>
    <section id="section5">
      <div class="center">
        <!-- <RecommendMentor/> -->
        <RecommendMentor 
          :getHighEaringSign="getHighEaringSign" 
          :getConsecutiveSign="getConsecutiveSign"
          :getInstagramMedia="getInstagramMedia"
          :getCosignNews="getCosignNews"
        />
      </div>
    </section>
    <section id="section6" ref="section6">
      <div class="center">
        <TableList :latestSigns="latestSigns" :hitSigns="hitSigns"/>
      </div>
    </section>
    <!-- <footer>
      <ReferBottom/>
      <Footer/>
    </footer> -->
  </div>
</template>

<script>
import LoginForm from '@/src/components/common/LoginForm';
// import CsHeader from '@/src/components/common/CsHeader';
import VisualSlide from '@/src/components/index/top/VisualSlide';
import MentorList from '@/src/components/index/main/MentorList';
import BestEarningSign from '@/src/components/index/main/BestEarningSign';
import ShortValidationSign from '@/src/components/index/main/ShortValidationSign';
import MajorCoinSign from '@/src/components/index/main/MajorCoinSign';
import TodayMentor from '@/src/components/index/main/TodayMentor';
import RecommendMentor from '@/src/components/index/main/RecommendMentor';
import TableList from '@/src/components/index/main/TableList';
import Footer from '@/src/components/common/Footer';
import ReferBottom from '@/src/components/common/ReferBottom';
export default {
  name: 'IndexPage',
  components: {
    LoginForm, VisualSlide, MentorList,
    BestEarningSign, ShortValidationSign, MajorCoinSign,
    TodayMentor, RecommendMentor,
    TableList,
    Footer, ReferBottom,
  },
  head() {
      return {
          title: `코인의 모든 싸인 코싸인 - COSIGN`,
          meta: [
            { hid: 'description', name: 'description', content: `비트코인, 이더리움, 도지코인 등, AI로 예측하는 근거 있는 코인 시세 예측 플랫폼 코싸인(COSIGN)` },
            { hid: 'keywords', name: 'keywords', content: `가상화폐,암호화폐,비트코인,이더리움,도지코인,알트코인,코인전망,코인시세,비트코인시세,비트코인예측,투자정보,코싸인,코사인,cosign,cosigncc,가상자산,비트코인전망,이더리움전망` },
            
            { name: 'og:type', content: `website` },
            { name: 'og:title', content: `코인의 모든 싸인 코싸인 - COSIGN` },
            { name: 'og:description', content: `비트코인, 이더리움, 도지코인 등, AI로 예측하는 근거 있는 코인 시세 예측 플랫폼 코싸인(COSIGN)` },
            { name: 'og:image', content: `https://www.cosign.cc/favicon.png` },
            { name: 'og:url', content: `https://www.cosign.cc/` },
          ],
          link: [
              { rel: 'alternate', media: 'only screen and (max-width: 640px)', href: `https://m.cosign.cc/`}
          ]
      }
  },
  async asyncData({$axios,$intApi}) {
    let totalMentors = [];
    let subscribedMentors = [];
    let bestEarningSigns = { curTime: null, highestProfitSignRes: null };
    let shortSigns = [];
    let majorSigns = [];
    let latestSigns = [];
    let hitSigns = [];

    try {
      const res = await $axios.get(`/api/mentor_page/success_rate/main`);
      totalMentors = res.data ? res.data.totalMentorLists:[];

    } catch(err) {console.log(err)}
      
    try {
      const res = await $intApi.post(`/api/main/subscribing_mentor`, {}, {withCredentials: true});
      subscribedMentors = res.data.data.subscribingMentors.length ? res.data.data.subscribingMentors:[];
    } catch(err) {console.log(err)}

    try {
      const res = await $axios.get(`/api/main/highest_profit`);
      bestEarningSigns = res.data.highestProfitSignRes ? res.data:{ curTime: null, highestProfitSignRes: null }
    } catch(err) {console.log(err)}

    try {
      const res = await $axios.get(`/api/main/shortHit_sign`);
      shortSigns = res.data.length ? res.data:[];
    } catch(err) {console.log(err)}
      
    try {
      const res = await $axios.get(`/api/main/major_coin_sign`);
      majorSigns = res.data.length ? res.data:[];
    } catch(err) {console.log(err)} 
      
    try {
      const res = await $axios.get(`/api/main/latest_forecast_sign`)
      latestSigns = res.data.length ? res.data:[];
    } catch(err) {console.log(err)}
      
    try {
      const res = await $axios.get(`/api/main/recent_earnings_hit_sign`)
      hitSigns = res.data.length ? res.data:[];
    } catch(err) {console.log(err)}
    

    // console.log($axios.defaults.baseURL, subscribedMentors)
    let getVisualContent = [];
    let getHighEaringSign = [];
    let getConsecutiveSign = [];
    let getCosignNews = [];
    let getInstagramMedia = [];
    
    try {
      const res_getVisualContent = await $axios.post(`/api/main/promotion_list`, {}, {withCredentials: true});
      getVisualContent = res_getVisualContent.data.length ? res_getVisualContent.data:[];

      const res_getHighEaringSign = await $axios.post(`/api/main/list_highest_profit`, {}, {withCredentials: true});
      getHighEaringSign = res_getHighEaringSign.data.length ? res_getHighEaringSign.data:[];

      const res_getConsecutiveSign = await $axios.post(`/api/main/list_consecutive_hits`, {}, {withCredentials: true});
      getConsecutiveSign = res_getConsecutiveSign.data.length ? res_getConsecutiveSign.data:[];

      const res_getCosignNews = await $axios.post(`/api/main/news`, {}, {withCredentials: true});
      getCosignNews = res_getCosignNews.data.length ? res_getCosignNews.data:[];

    } catch(err) { console.log(err) }


    try {
      const res_getInstagramMedia = await $axios.post(`/api/main/getMedia`, {}, {withCredentials: true})
      getInstagramMedia = res_getInstagramMedia.data[0]?.data.length ? res_getInstagramMedia.data[0].data:[];
      
    } catch(err) { console.log(err) }
    
    return {
      totalMentors, 
      subscribedMentors,
      bestEarningSigns,
      shortSigns, 
      majorSigns, 
      latestSigns,
      hitSigns,
      getVisualContent,
      getHighEaringSign,
      getConsecutiveSign,
      getInstagramMedia,
      getCosignNews
    }
  },
  methods: {
    onClickVisual(target) {
      if(target === 'javascript:void(0);') {
        const section6 = this.$refs.section6;
        scrollTo({
          left: 0,
          top: section6.offsetTop - 65, //해더 높이만큼 아래로 내림
          behavior: 'smooth'
        })
        // section6.scrollIntoView({
        //     behavior: 'smooth',
        //     block: 'start'
        // })
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/src/css/indexHome.scss";
</style>