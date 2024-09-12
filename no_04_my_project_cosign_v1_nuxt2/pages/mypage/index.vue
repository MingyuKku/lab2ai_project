<template>
  <div class="myPageSubscribePayment_wrap">
    <div class="title">구독 결제 내역</div>
    <div class="myPageSubscribePayment_body">
      <div class="subscribeMentorList">
        <h2>구독중인 멘토</h2>
        <ul>
          <li v-for="(mentor,idx) in subscribeMentorList" :key="idx">
            <NuxtLink :to="`/${mentor.mentorId}`" v-if="mentor.mentorId">
              <div class="dDay_wrapp" v-if="mentor.payType !== 'free'">
                <!-- <span class="dDay" v-if="mentor.dDayText !== 'D-day'">D - {{ mentor.dDayText }}</span>
                <span class="dDay" v-else>오늘마감</span> -->
                <span class="dDay">D - {{ mentor.dDayText }}</span>
              </div>
              <div class="mentorImg"><img :src="mentor.profileImage" alt="멘토이미지"></div>
              <h2>{{ mentor.mentorName }}</h2>
              <h3>
                <p>구독기간</p>
                <span v-if="mentor.payType !== 'free'">{{ mentor.expiryDatetimeText }}까지</span>
                <span class="free" v-else>Free</span>
              </h3>  
            </NuxtLink>
            <div class="nonMentorList" v-if="mentor.nonMentorIcon">
              <div class="icon"><i :class="mentor.nonMentorIcon"></i></div>
              <h2>{{ mentor.tit }}</h2>
              <h3>{{ mentor.desc }}</h3>
            </div>
          </li>
        </ul>
      </div>

      <div class="applySubscribeList">
        <h2>구독 신청 내역</h2>
        <div class="isItList" v-if="subscribingMentorList.length > 0">
          <div class="title">
            <div class="applyDate">신청일</div>
            <div class="mentorName">멘토명</div>
            <div class="fee">구독료</div>
            <div class="state">상태</div>
            <div class="term">구독기간</div>
          </div>
          <ul>
            <li v-for="(mentor,idx) in subscribingMentorList" :key="idx">
              <div class="applyDate">{{ mentor.createdAtText }}</div>
              <div class="mentorName">{{ mentor.title }}</div>
              <div class="fee">
                <p v-if="mentor.price !== 0">{{ mentor.price }}원</p>
                <p class="free" v-else>Free</p>
              </div>
              <div class="state">{{ mentor.statusText }}</div>
              <div class="term">
                <p v-if="mentor.price !== 0">{{ mentor.termApplication }} ~ {{ mentor.termExpiry }}</p>
                <p v-else>Free</p>
              </div>
            </li>
          </ul>

          <div class="pagination_wrap">
            <client-only>
              <VuePaginate :containerClass="'pagination_qna'" :pageClass="'page_num'"
                v-model="page"
                :pageCount="totalPages"
                :pageRange='5'
                :marginPages='1'
                :clickHandler="onClickPage"
                :prevText="`<i class='xi-angle-left'></i>`"
                :nextText="`<i class='xi-angle-right'></i>`"
                :hidePrevNext='true'
                :prev-class="'nav prev'"
                :next-class="'nav next'"
              ></VuePaginate>
            </client-only>
          </div>
        </div>
        <div class="nonList" v-else>
          <p>구독 신청 내역이 없습니다!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'mypage',
  data() {
    return {
      page: 1,
      totalPages: 0,
      subscribeMentorList: [{nonMentorIcon: 'xi-info-o', tit: '구독중인 멘토가 없습니다!', desc: '멘토를 구독해 주세요'}],
      subscribingMentorList: [],
    }
  },
  async fetch() {
    await this.checkExpire()
    // await this.setSubscribeList();
    // await this.setSubscribingList();
  },
  methods: {
    async checkExpire() {
      // const resExpire = await this.$axios.post(`/api/pay/subscribing/check_expire`, {}, {withCredentials: true});
      // const resDeposit = await this.$axios.post(`/api/pay/subscribing/deposit_check`, {}, {withCredentials: true});
      // if(resExpire.status === 200 || resDeposit.status === 200) {
        await this.setSubscribeList();
        await this.setSubscribingList();
      // }
    },
    async setSubscribeList() {
      const res = await this.$axios.post(`/api/pay/subscribing/lists`, {}, {withCredentials: true});
      if(res.data.length <= 0) return;

      function getRemainTime(time) {
        const now = new Date();
        const expire = Date.parseUtcText(time);

        const diff = expire - now;
        const diffDay = Math.floor(diff / (1000*60*60*24))
        if(diffDay >= 1) {
          return diffDay;
        } else if(diffDay < 1 && diffDay >= 0) {
          // const nowText = now.format('yyyy-MM-dd')
          // const expireText = expire.format('yyyy-MM-dd')
          // if(nowText === expireText) {
          //   return 'D-day';
          // }
          return 1;
        } else {
          return 'expire';
        }
      }

      this.subscribeMentorList = res.data.map(d=> ({
        ...d,
        expiryDatetimeText: Date.parseUtcText(d.expiryDatetime).format('yyyy-MM-dd'),
        dDayText: getRemainTime(d.expiryDatetime)
      }));
    },
    async setSubscribingList() {
      const params = {'page': this.page - 1}
      const res = await this.$axios.post(`/api/pay/subscribe/lists`, params.getParam(), {withCredentials: true})
      function getStatus(state) {
        switch(state) {
          case 'deposit_wait' : return '입금확인중';
          case 'deposit_expire' : return '입금기간만료';
          case 'complete' : return '구독중';
          case 'subscribe_expire' : return '구독만료';
          case 'refund' : return '환불';
          default : return ''; 
        }
      }

      this.totalPages = res.data.totalPages;
      this.subscribingMentorList = res.data.content.map(d=> ({
        ...d,
        createdAtText: Date.parseUtcText(d.createdAt).format('yyyy-MM-dd HH:mm'),
        termApplication: Date.parseUtcText(d.activeDatetime).format('yyyy-MM-dd'),
        termExpiry: Date.parseUtcText(d.expiryDatetime).format('yyyy-MM-dd'),
        statusText: getStatus(d.status),
      }))
    },

    onClickPage(no) {
      this.hideHeader(false);
      this.page = no;
      this.setSubscribingList();
    },
  }
}
</script>

<style lang='scss'>
  @import "@/src/css/mypage/myPageSubscribePayment.scss";
</style>