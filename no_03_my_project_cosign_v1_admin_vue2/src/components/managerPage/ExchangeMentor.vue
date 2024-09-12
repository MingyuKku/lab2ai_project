<template>
  <div class="exchangeMentor_wrap">
    <div class="header">
      <h1>멘토 / 거래소</h1>
    </div>
    <div class="content">
      <div class="filter_wrap">
        <div class="exchangeRadio">
          <label v-for="data in radio" :key="data.value">
            <input @change="changRadio" type="radio" :value="data.value" name="exchangeRadio" :checked="data.value === 'all'">
            <span>{{ data.name }}</span>
          </label>
        </div>
        <div class="select_wrap">
          <select autofocus v-model="selectFilter" @change="changeSelect">
            <option :value="data.mentor.username" v-for="data in filter" :key="data.id">{{ data.title }}</option>
          </select>
          <i class="xi-angle-down"></i>
        </div>
      </div>
      <div class="exchange_table_wrap" v-if="signList.length > 0">
        <div class="shadow left" :class="{off: scrollLeftFlag}"></div>
        <div class="shadow right" :class="{off: scrollRightFlag}"></div>
        <div class="exchange_table" ref="exchange_table" @scroll="scrollTable">
          <div class="table_title">
            <ul>
              <li :class="`tit_${column.enTit}`" v-for="column,idx in columns" :key="idx">
                {{ column.title }}
              </li>
            </ul>
          </div>
          <div class="table_list">
            <div class="totalSignList_wrap">
              <div class="totalSignList" v-for="sign in signList" :key="sign.id">
                <!-- <router-link :to="`/manager/exchange/${sign.signDTO.id}`"> -->
                <router-link :to="{name: 'ExchangeMentorRead', params: {id: sign.signDTO.id, page: signParams.page} }">
                  <SignInfo class="totalSignList"
                    :sign="sign"
                    :columns="columns"
                  />
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="notResigtSignItem" v-else>
        <div>
          <p><i class="xi-info-o"></i>등록된 싸인이 존재하지 않습니다!</p>
        </div>
      </div>

      <div class="pagination_wrap">
        <Paginate :containerClass="'pagination_qna'" :pageClass="'page_num'"
          v-model="signParams.page"
          :pageCount="totalPages"
          :pageRange='5'
          :marginPages='1'
          :clickHandler="onClickPage"
          :prevText="`<i class='xi-angle-left'></i>`"
          :nextText="`<i class='xi-angle-right'></i>`"
          :hidePrevNext='true'
          :prev-class="'nav prev'"
          :next-class="'nav next'"
        ></Paginate>
      </div>
    </div>
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate';
import { 
  api_signList, 
  api_allMentorList,
} from '@/api/sign';
import SignInfo from '@/components/managerPage/SignInfo.vue'
export default {
  components: {
    Paginate,
    SignInfo
  },
  data() {
    return {
      totalPages: 0,
      signList: [],
      columns: [
        {enTit: 'subSeqId', title: '시퀀스ID'},
        {enTit: 'mentor', title: '멘토명'},
        {enTit: 'exchange', title: '거래소'},
        {enTit: 'coin', title: '코인'},
        {enTit: 'startPrice', title: '진입가'},
        {enTit: 'targetPrice', title: '목표가'},
        {enTit: 'cutPrice', title: '손절가'},
        {enTit: 'startTime', title: '시작시간'},
        {enTit: 'endTime', title: '종료시간'},
        {enTit: 'expiration', title: '유효기간'},
        {enTit: 'state', title: '상태'},
        {enTit: 'earning', title: '실수익률'},
      ],
      radio: [
        {name: '전체', value: 'all'},
        {name: '업비트', value: 'upbit'},
        {name: '바이낸스', value: 'binance'},
      ],
      selectFilter: null,
      filterIndex: 0,
      filter: [
        {
          id: 'all', 
          mentor: {username: 'default'},
          title: '전체멘토'
        }
      ],
      signParams: {
        exchange: 'all',
        mentor: 'all',
        page: 1,
        id: '',
      },
      scrollLeftFlag: true,
      scrollRightFlag: false,
    }
  },
  async mounted() {
    this.setPage(this.$route.params.page);  // 상세페이지에 접속 후 목록으로 돌아갈 때 page위치 기억하기 위해
    await this.setSignList(this.signParams);
    await this.setAllMentorList();
    this.$nextTick(() => {
      this.scrollTable();
    })
  },
  methods: {
    async setAllMentorList() {
      try {
        const res = await api_allMentorList();
        res.data.forEach(data => { this.filter.push(data) });

        this.selectFilter = this.filter[this.filterIndex].mentor.username; // mounted시에 첫 페이지 필터셋팅

        console.log('all mentor', res)
      } catch(err) { console.log(err) }
    },
    async setSignList(params) {
      try {
        const res = await api_signList(params);

        this.signList = res.data.content.map((data,idx)=> {
          return {
            ...data,
            no: (res.data.totalElements - res.data.number*res.data.size) - idx,
            startTimeText: data.signDTO.startTime !== null ? Date.parseUtcText(data.signDTO.startTime).format('yyyy-MM-dd HH:mm'):null,
            endTimeText: data.signDTO.endTime !== null ? Date.parseUtcText(data.signDTO.endTime).format('yyyy-MM-dd HH:mm'):null,
            endEarningTimeText: data.signDTO.endEarningTime !== null ? Date.parseUtcText(data.signDTO.endEarningTime).format('yyyy-MM-dd HH:mm'):null,
          }
        });
        this.totalPages = res.data.totalPages;
        console.log('sign list', res)

      } catch(err) { console.log(err) }
    },
    setPage(page) {
      if(page !== undefined) this.signParams.page = page;
    },
    changeSelect() {
      const findFilterIndex = this.filter.findIndex(data => data.mentor.username === this.selectFilter);
      this.filterIndex = findFilterIndex;
      console.log('콤보변경', this.filter[this.filterIndex].title);
      this.signParams.mentor = this.filter[this.filterIndex].id;
      this.signParams.page = 1;
      this.setSignList(this.signParams);
    },
    changRadio(e) {
      console.log('라디오첸지', e.target.value)
      this.signParams.exchange = e.target.value;
      this.signParams.page = 1;
      this.setSignList(this.signParams)
    },
    onClickPage(no) {
      this.signParams.page = no;
      this.setSignList(this.signParams);
    },
    scrollTable() {
      const exchange_table = this.$refs.exchange_table;
      if(exchange_table.scrollLeft > 0) this.scrollLeftFlag = false;
      else this.scrollLeftFlag = true;

      if(exchange_table.offsetWidth +  exchange_table.scrollLeft >= exchange_table.scrollWidth) this.scrollRightFlag = true;
      else this.scrollRightFlag = false;
    }
  }
}
</script>

<style lang="scss">
  @import './css/exchangeMentor.scss';
</style>