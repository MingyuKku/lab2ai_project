<template>
  <div class="recommendMentor_wrap">
    <div class="title">
      <div class="title_list_wrap">
        <div class="title_list" ref="title_list" v-for="(mentorListTit, idx) in mentorListData" :key="idx"
          :class="{active: activeListIndex === idx}" @click="activeListIndex = idx">
          {{ mentorListTit.listName }}
        </div>
        <span class="activeStick" ref="activeStick"></span>
      </div>
    </div>
    <div class="mentorList" :class="{show: activeListIndex === idx}" v-for="(data, idx) in mentorListData" :key="idx">
      <div class="swiper_wrap" v-if="activeListIndex === idx && idx > 0">
        <div class="swiper" ref="swiper" v-if="data.list.length > 0"
        v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide" ref="swiper-slide" v-for="(mentor,idx2) in data.list" :key="idx2">
              <div class="inner">
                <a :href="mentor.path" :target="mentor.target">
                  <div class="mentorImg" :class="{opacity: idx === 1}"><img :src="mentor.pcImage" alt="멘토이미지" @error="onImageError"></div>
                  <div class="textContent" v-if="mentor.title">
                    <div class="title">
                      <h1>{{ mentor.title }}</h1>
                      <h1>{{ mentor.subTitle }}</h1>
                    </div>
                    <div class="sideInfo">
                      <span class="agency">{{ mentor.newsAgency }}</span>
                      <span class="date">{{ mentor.newsDate }}</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="swiper_wrap instagram" v-if="activeListIndex === idx && idx === 0">
        <div class="swiper" ref="swiper" v-swiper:mySwiper="swiperOption2" v-if="data.list.length > 0">
          <div class="swiper-wrapper">
            <div class="swiper-slide" ref="swiper-slide" v-for="(mentor,idx2) in data.list" :key="idx2">
              <div class="inner">
                <a :href="mentor.path" :target="mentor.target">
                  <div class="mentorImg"><img :src="mentor.pcImage" alt="투데이멘토 이미지"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  props: ['getHighEaringSign','getConsecutiveSign','getInstagramMedia', 'getCosignNews'],
  data() {
    const version = '0.2.28';
    return {
      activeListIndex: 0,
      mentorListData: [
        {listName: '카드 뉴스', list: [
          {pcImage: `${this.$static.imgUrl}index/main/introduceMentor/cardNews_1.png?ver=${version}`, path: 'https://www.instagram.com/p/Cf-u7ejuYzq/', target: '_blank'},
          {pcImage: `${this.$static.imgUrl}index/main/introduceMentor/cardNews_2.png?ver=${version}`, path: 'https://www.instagram.com/p/Cf7m1SKvsjb/', target: '_blank'},
          {pcImage: `${this.$static.imgUrl}index/main/introduceMentor/cardNews_3.png?ver=${version}`, path: 'https://www.instagram.com/p/Cf5RNs7v9-8/', target: '_blank'},
          {pcImage: `${this.$static.imgUrl}index/main/introduceMentor/cardNews_4.png?ver=${version}`, path: 'https://www.instagram.com/p/Cf3TWq4uT_M/', target: '_blank'},
        ]},
        {listName: '코싸인 소식', list: [
          {pcImage: `${this.$static.imgUrl}index/main/introduceMentor/news_1.png?ver=${version}`, path: 'https://n.news.naver.com/mnews/article/009/0004993407?sid=101', target: '_blank', title: '카카오페이·두나무에 이어...', subTitle: '랩투아이, 한국핀테크산업협회 가입', newsAgency: '매일경제', newsDate: '2022.07.19'},
          {pcImage: `${this.$static.imgUrl}index/main/introduceMentor/news_2.png?ver=${version}`, path: 'http://it.chosun.com/m/svc/article.html?contid=2022071901228#', target: '_blank', title: '오종환 랩투아이 대표', subTitle: '“카더라 말고 데이터 분석으로  코인 투자 가치 판단해야”', newsAgency: 'IT 조선', newsDate: '2022.07.19'},
          {pcImage: `${this.$static.imgUrl}index/main/introduceMentor/news_3.png?ver=${version}`, path: 'http://it.chosun.com/site/data/html_dir/2022/07/19/2022071901222.html', target: '_blank', title: '랩투아이, 핀테크산업협회 가입...', subTitle: 'AI 사업 확장', newsAgency: 'IT 조선', newsDate: '2022.07.19'},
        ]},
        {listName: '지난주 최고 수익 예측', list: [
          {pcImage: `${this.$static.imgUrl}index/main/introduceMentor/bestEarningMentor_1.png?ver=${version}`, path: '/homerun/4543', target: '_self'},
          {pcImage: `${this.$static.imgUrl}index/main/introduceMentor/bestEarningMentor_2.png?ver=${version}`, path: '/homerun/4448', target: '_self'},
          {pcImage: `${this.$static.imgUrl}index/main/introduceMentor/bestEarningMentor_3.png?ver=${version}`, path: '/homerun/4424', target: '_self'},
        ]},
        {listName: '연속 적중 TOP 멘토', list: [
          {pcImage: `${this.$static.imgUrl}index/main/introduceMentor/continuHit_1.png?ver=${version}`, path: 'bottom', target: '_self'},
          {pcImage: `${this.$static.imgUrl}index/main/introduceMentor/continuHit_2.png?ver=${version}`, path: 'dtw', target: '_self'},
          {pcImage: `${this.$static.imgUrl}index/main/introduceMentor/continuHit_3.png?ver=${version}`, path: 'hoonbotlight', target: '_self'},
        ]},
      ],
      swiperOption: {
        speed: 800,
        allowTouchMove: false,
        spaceBetween: 20,
        slidesPerView: 3,
        slidesPerGroup : 3,
        on: {
        }
      },
      swiperOption2: {
        speed: 800,
        allowTouchMove: false,
        spaceBetween: 20,
        slidesPerView: 'auto',
      },
    }
  },
  created() {
    if(this.getHighEaringSign.length > 0 && this.getConsecutiveSign.length > 0 && this.getCosignNews.length > 0) this.setThemeData();
    if(this.getInstagramMedia.length > 0) this.setInstagram()
  },
  mounted() {
    // this.setBestEarningMentor();
    console.log('최고수익 어드민',this.getHighEaringSign)
    console.log('연속적중 어드민',this.getConsecutiveSign)
    console.log('인스타그램 어드민',this.getInstagramMedia)
    console.log('코싸인소식 어드민',this.getCosignNews)
    this.moveStick();
  },
  watch: {
    activeListIndex() {
      this.moveStick();
    }
  },
  computed: {
  },
  methods: {
    moveStick() {
      this.$nextTick(()=> {
        let activeStick = this.$refs.activeStick;
        let title_list = this.$refs.title_list[this.activeListIndex];

        activeStick.style.width = `${title_list.offsetWidth}px`;
        activeStick.style.transform = `translate3d(${title_list.offsetLeft}px, 0, 0)`;
      })
    },
    setThemeData() {
      this.mentorListData[1].list = this.getCosignNews.slice(0,3).map(data=> ({
        ...data,
        path: data.newsLink,
        pcImage: `${data.newsImage}?ver=${this.version}`,
        target: (data.newWindow) ? '_blank' : '_self'
      }))

      this.mentorListData[2].list = this.getHighEaringSign.map(data=> ({
        path: data.link,
        pcImage: `${data.pcImage}?ver=${this.version}`,
        target: (data.newWindow) ? '_blank' : '_self'
      }))

      this.mentorListData[3].list = this.getConsecutiveSign.map(data=> ({
        path: data.link,
        pcImage: `${data.pcImage}?ver=${this.version}`,
        target: (data.newWindow) ? '_blank' : '_self'
      }))
    },
    setInstagram() {
      this.mentorListData[0].list = this.getInstagramMedia.slice(0,4).map(data=> ({
        path: data.permalink,
        pcImage: data.media_url,
        target: '_blank'
      }))
    },
    onImageError(e) {
      e.target.src = `${process.env.VUE_APP_IMG_URL_Mentor}default.png`;
    },
  }
}
</script>

<style lang='scss'>
  @import './css/recommendMentor.scss';
</style>