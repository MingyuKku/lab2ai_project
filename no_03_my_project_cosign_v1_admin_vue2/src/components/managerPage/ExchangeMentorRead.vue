<template>
  <div class="exchangeMentorRead_wrap">
    <div class="header">
      <h1>상세 정보</h1>
    </div>
    <div class="content">
      <div class="table_wrap">
        <table>
          <tr v-for="table,idx in detailTable" :key="idx" :class="{line: table.ui}">
            <div :class="table.enTit" v-if="table.ui">
              <td class="td_tit">{{ table.title }}</td>

              <td class="td_cont" v-if="table.type === 'exchange'">
                <p>{{ KoExchange(table.data) }}</p>
              </td>

              <td class="td_cont" v-else-if="table.type === 'price'">
                <p>{{ LocaleString(table.data) }}</p>
              </td>

              <td class="td_cont" v-else-if="table.type === 'time'">
                <p v-if="table.data === null">{{ paseUtcText(endTime) }}</p>
                <p v-else>{{ paseUtcText(table.data) }}</p>
              </td>

              <td class="td_cont" v-else-if="table.type === 'validate'">
                <p>{{ validateMinTime(table.data) }}</p>
              </td>

              <td class="td_cont" v-else-if="table.type === 'state'">
                <p>{{ signStateText(table.data, paseUtcText(endTime) ||  paseUtcText(endEarningTime) ) }}</p>
              </td>

              <td class="td_cont" v-else-if="table.type === 'earing'">
                <p v-if="table.data !== null">{{ table.data.toFixed(5) }}%</p>
              </td>

              <td class="td_cont" v-else>
                <p>{{ table.data }}</p>
              </td>

            </div>

          </tr>
          
        </table>
      </div>
      <!-- <div class="buttons clearFix">
        <button type="button" @click="updateMember">
          <span v-if="!updateFlag">수정하기</span>
          <span v-else>수정완료</span>
        </button>
      </div> -->
      <button type="button" @click="$router.push({name: 'ExchangeMentor', params: {page: $route.params.page} })">목록</button>
    </div>
  </div>
</template>

<script>
import { 
  api_signList, 
} from '@/api/sign'
export default {
  data() {
    return {
      detailTable: [
        {key: 'subSeqId', title: '시퀀스ID', data: '', type: 'text', ui: true},
        {key: 'title', title: '멘토명', data: '', type: 'text', ui: true},
        {key: 'exchange', title: '거래소', data: '', type: 'exchange', ui: true},
        {key: 'koreanName', title: '코인', data: '', type: 'text', ui: true},
        {key: 'startPrice', title: '진입가', data: '', type: 'price', ui: true},
        {key: 'targetPrice', title: '목표가', data: '', type: 'price', ui: true},
        {key: 'cutPrice', title: '손절가', data: '', type: 'price', ui: true},
        {key: 'startTime', title: '시작시간', data: '', type: 'time', ui: true},
        {key: 'endTime', title: '종료시간', data: '', type: 'time', ui: false},
        {key: 'endEarningTime', title: '종료시간', data: '', type: 'time', ui: true},
        {key: 'validateMin', title: '유효기간', data: '', type: 'validate', ui: true},
        {key: 'evaluateState', title: '상태', data: '', type: 'state', ui: true},
        {key: 'earningRate', title: '실수익률', data: '', type: 'earing', ui: true},
      ],
      endTime: null,
      endEarningTime: null,
    }
  },
  created() {
    this.readSign(this.$route.params)
  },
  mounted() {
    // this.memberDetailData();
  },
  computed: {
    paseUtcText() {
      return (time) => time !== null ? Date.parseUtcText(time).format('yyyy-MM-dd HH:mm:ss'):'';
    },
    KoExchange() {
      return (exc) => {
        switch(exc) {
          case 'upbit': return '업비트';
          case 'binance': return '바이낸스';
        }
      }
    },
    LocaleString() {
      return (price) => {
        if(price > 0) return price.toLocaleString();
        else return price;
      }
    },
    signStateText() {
      return (evaluateState, endDate) => String.signStateText(evaluateState, new Date(endDate));
    },
    validateMinTime() {
      return (min) => Number.validTime(min);
    }
  },
  methods: {
    async readSign(params) {
      try {
        let param = {
          exchange: '',
          mentor: '',
          page: 1,
          id: params.id,
        }
        
        const res = await api_signList(param);

        console.log('read detail', res.data.content[0])

        const content = res.data.content[0];
        const speadData = Object.assign(content.coin, content.mentorPageReturnDTO, content.signDTO)
        console.log('펼친데이터', speadData)

        this.detailTable = this.detailTable.map(data => {
          let inData = speadData[data.key];

          if(data.key === 'endTime') {
            this.endTime = inData;
          } else if(data.key === 'endEarningTime') {
            this.endEarningTime = inData;
          }

          return {
            ...data,
            data: inData
          }
        })

        // const signDto = res.data.content[0].signDTO;
        // const coin = res.data.content[0].coin;
        // const mentorDto = res.data.content[0].mentorPageReturnDTO;

        // this.detailTable = this.detailTable.map(data => {

        //   let inData = signDto[data.enTit]
        //   if(data.enTit === 'coin') inData = coin.koreanName;
        //   else if(data.enTit === 'mentor') inData = mentorDto.title;

        //   return {
        //     ...data,
        //     data: inData
        //   }
        // })

        // let endEarnTimeIdx = this.detailTable.findIndex(data => data.enTit === 'endEarningTime')
        // let endTimeIdx = this.detailTable.findIndex(data => data.enTit === 'endTime')

        // if(this.detailTable[endEarnTimeIdx].data === null) {
        //   this.detailTable[endEarnTimeIdx].data = this.detailTable[endTimeIdx].data
        // }

        console.log('셋팅', this.detailTable)

      } catch(err) { console.log(err) }
    },
     

    // changRadio(e) {
    //   this.eventCk = e.target.value;
    // },

    // async memberDetailData() {
    //   try {
    //     let res = await api_memberManangementRead_list_admin(this.$route.params.email);
    //     this.memberTable = this.memberTable.map(t => {
    //       if(t.key === 'eventCk') {
    //         if(res.data[t.key]) this.eventCk = 'Y';
    //         else this.eventCk = 'N';
    //       }
    //       return {
    //         ...t,
    //         data: res.data[t.key]
    //       }
    //     })

    //     console.log('member read',res, this.memberTable)

    //   } catch(err) { console.log(err) }
    // },
  }
}
</script>

<style lang='scss'>
  @import './css/exchangeMentorRead.scss';
</style>