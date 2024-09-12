<template>
  <div class="container">
    <div class="signOffRealCandleChart_wrap" v-if="isChartData">
      <div class="top_board" v-if="chartData.length > 0">
        <div class="stinging">
          <select v-model="selectStinging" @change="changeSelect">
            <option :value="sting" v-for="sting in stinging" :key="sting">
              {{ sting }}분
            </option>
          </select>
          <i class="xi-angle-down"></i>
        </div>
         <div class="clipBoard">
          <ul :class="{surplus: boardData.surplus, deficit: !boardData.surplus}">
            <li>시<span>{{ boardData.open }}</span></li>
            <li>고<span>{{ boardData.high }}</span></li>
            <li>저<span>{{ boardData.low }}</span></li>
            <li>종<span>{{ boardData.close }}</span></li>
          </ul>
        </div>
      </div>
      
     
      <div class="chart_wrap" ref="chart_wrap">
        <div v-for="ppdc in Perpendicular" :key="ppdc.class" ref="Perpendicular" :class="ppdc.class"></div>
        <p v-for="ppdc in Perpendicular" :key="ppdc.textClass" ref="Perpendicular_text" :class="ppdc.textClass">{{ppdc.text}}</p>
        <div class="waterMark" ref="waterMark"><img :src="`${$static.imgUrl}index/main/cosign_bi_gray.svg`" alt="워터마크BI"></div>
      </div>
    </div>
    <div class="error" v-else>
      <!-- <div class="line_wrap targetPriceLine">
        <span class="line"></span>
        <span class="name">목표가</span>
        <span class="price">{{ sign.targetPriceText }}</span>
      </div>
      <div class="line_wrap buyPriceLine">
        <span class="line"></span>
        <span class="name">진입가</span>
        <span class="price">{{ sign.startPriceText }}</span>
      </div>
      <div class="line_wrap cutPriceLine">
        <span class="line"></span>
        <span class="name">손절가</span>
        <span class="price">{{ sign.cutPriceText }}</span>
      </div> -->
      <div class="errorText">
        <div class="innerText loading" v-if="apiLoading">
          <p>캔들 데이타를 불러오는 중입니다.</p>
          <p>잠시만 기다려 주세요</p>
          <CustomLoading :apiLoading="apiLoading"/>
        </div>
        <div class="innerText error" v-else>
          <p>캔들 데이타를 일시적으로 불러오지 못 했습니다.</p>
          <p>잠시 후, 다시 시도해 주세요.</p>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import CustomLoading from '@/src/components/common/CustomLoading.vue'
import { getSignOffTime } from '~/src/core/signOffPopup.js';
export default {
  components: {CustomLoading},
  props: ['sign'],
  data() {
    return {
      apiLoading: true,
      isChartData: false,
      chartData: [],
      startData: null,
      endData: null,
      selectStinging: null,
      stinging: [1,5,15],
      boardData: {
        open: null,
        high: null,
        low: null,
        close: null,
        surplus: false,
      },
      Perpendicular: [
        {class: 'Perpendicular Perpendicular_start', text: '예측시작', textClass: 'Perpendicular_text Perpendicular_text_start'},
        {class: 'Perpendicular Perpendicular_end', text: '예측종료', textClass: 'Perpendicular_text Perpendicular_text_end'},
      ]
    }
  },
  mounted() {
    // startTimeText, endEarningTimeText가 mount호출 순서가 늦어서 데이터 안들어있는 경우
    if(this.sign.startTimeText == undefined) this.sign = Object.assign(this.sign, getSignOffTime(this.sign))
    try {
      this.initStinging(this.sign);  // initStinging: 유효시간을 기반으로 1, 5, 15분 캔들 중 무엇을 할 것인지에 대한 함수
      this.setChartData(this.sign);
    } catch(err) {
      console.log(err.data);
    }
  },
  methods: {
    initStinging(sign) {
      this.selectStinging = this.getStinging(sign.startTime, sign.endEarningTime);
    },  
    changeSelect() {
      this.setChartData(this.sign)
    },
    async setChartData(sign) {  // 리얼캔들차트 api불러와서 데이터 셋팅하는 함수
      try {
        const param = {
          // api규격에 맞게 시간을 utc시간으로 보낸다(T,Z는 제외한)
          gteTime: sign.startTime.replace(/\T/g,' '),
          lteTime: sign.endEarningTime.replace(/\T/g,' '),
          market: sign.coin,
          stinging: this.selectStinging,
        }
        const res = await this.$axios.post(`/api/sign/candle_off`, param.getParam())
        // console.log('오프차트응답',res)
        if(res.data.res.code === 1000) {
          this.chartData = res.data.candles.map(data=> {
            // getUtcText => 시간에다가 T와 Z를 넣어주는 Date프로토타입 함수 
            const time = Date.parseUtcText(Date.getUtcText(data.candleDateTimeUtc)).format('yyyy-MM-ddTHH:mm:ssZ');
            return {
              time: (new Date(time).valueOf() / 1000),
              originTime: time,
              open: data.openingPrice,
              high: data.highPrice,
              low: data.lowPrice,
              close: data.tradePrice,
            }
          })
          // console.log('signOff캔들데이터', this.chartData)

          // 예측시작선을 그려주기 위해 예측시작 시간에 근접한 데이터를 찾는 함수
          function findPointData(time, chartData) {  
            const pointTimeValue = new Date(Date.getUtcText(time)).valueOf() / 1000;
            
            let compare = Number.MAX_SAFE_INTEGER; 
            let index = 0;

            for(let i = 0; i < chartData.length; i++) {
              const cpTime = Math.abs(chartData[i].time - pointTimeValue)
              if(compare > cpTime) {
                compare = cpTime;
                index = i
              }
            }

            if(pointTimeValue < chartData[index].time) index = index - 1;
            chartData[index].index = index;

            return chartData[index];
          }
          this.startData = findPointData(sign.startTimeText, this.chartData)
          this.endData = findPointData(sign.endEarningTimeText, this.chartData)
          

          // 시작시간과 종료시간 사이의 틱 갯수가 3개 이하일 때 row클래스를 적용시킨다
          const diffMin = (this.endData.time - this.startData.time) / 60;
          const betweenTickCount = diffMin / this.selectStinging;
          if(betweenTickCount <= 3) {
            for(let key of this.Perpendicular) {
              key.textClass = key.textClass.concat(' row')
            }
          }


          let lastChartData = this.chartData[this.chartData.length - 1]
          this.isChartData = true;

          await this.drawChart(this.boardData, lastChartData, this.chartData, sign)
          
          this.apiLoading = false;
        } else {
          this.apiLoading = false;
          this.isChartData = false;
        }

      } catch(err) { 
        console.log(err); 
        this.apiLoading = false;
        this.isChartData = false; 
      }
    },
    getStinging(start,endEarn) {
      const startTime = new Date(start).getTime();
      const endEarnTime = new Date(endEarn).getTime();
      const earingMin = (endEarnTime - startTime) / 1000 / 60;

      const hour = earingMin / 60;
      if(hour >= 12) return 15;
      else if(hour < 12 && hour >= 3) return 5;
      else return 1;
    },
    drawChart(board, lastChartData, chartData, sign) { // 실제 차트를 그리는 함수
      this.$nextTick(() => {
        try {
          if(this.$el.querySelector('.tv-lightweight-charts') !== null) {
            this.$el.querySelector('.tv-lightweight-charts').remove()
          }

          const $chart_wrap = this.$refs.chart_wrap;
          let width = $chart_wrap.offsetWidth;
          let height = $chart_wrap.offsetHeight;

          const chart = this.$createChart($chart_wrap, {
            width: width,
            height: height,
            localization: {
              dateFormat: 'yyyy-MM-dd',
            },
            layout: {
              textColor: '#333',
              fontSize: 12,
              fontFamily: 'Spoqa Han Sans Neo',
              backgroundColor: "#fff"
            },
            grid: {
              horzLines: {
                visible: true,
                color: '#f3f3f3',
                style: 0,
              },
              vertLines: {
                visible: true,
                color: '#f3f3f3',
                style: 0,
              },
            },
            crosshair: {
              mode: 0,
              horzLine: {
                style: 0,
                width: 1,
                color: '#999',
                labelBackgroundColor: '#999',
                visible: false,
                labelVisible: false
              },
              vertLine: {
                style: 0,
                width: 1,
                color: '#999',
                labelBackgroundColor: '#999',
              }
            },
            rightPriceScale: {
              scaleMargins: {
                top: 0.12,
                bottom: 0.12,
              },
            },
            timeScale: {
              borderColor: '#eee',
              timeVisible: true,
              secondsVisible: false,
              lockVisibleTimeRangeOnResize: true,
            },
          });

          let mainSeries = chart.addCandlestickSeries({
            upColor: '#D24F45',
            downColor: '#1261C4',
            borderDownColor: '#1261C4',
            borderUpColor: '#D24F45',
            wickDownColor: '#555',
            wickUpColor: '#555',
            priceLineVisible: false,
            lastValueVisible: false, 
            axisLabelVisible: false,
          });
          mainSeries.setData(chartData);


          // y축 가격 스케일의 초기 시야 범위를 정하는 로직
          let chartDataClosePrice = chartData.map(data=> {
            return [data.high, data.low]
          })
          chartDataClosePrice.push([this.sign.targetPrice, this.sign.targetPrice])
          let maxPrice = Math.max(...chartDataClosePrice.flat())
          let minPrice = Math.min(...chartDataClosePrice.flat())

          mainSeries.applyOptions({
            autoscaleInfoProvider: () => ({ 
              priceRange: {
                maxValue: maxPrice,
                minValue: minPrice,
              },
            }),
          })
          
          chart.applyOptions({
            priceScale: {
              // position: 'right',
              mode: 0,  
              autoScale: true,  
              alignLabels: true, 
              borderVisible: true,
              borderColor: '#eee',
              drawTicks: false,
            },
          })

          // 차트 보드 현황판에 출력할 데이터 셋팅
          board.open = lastChartData.open.toLocaleString()
          board.high = lastChartData.high.toLocaleString()
          board.low = lastChartData.low.toLocaleString()
          board.close = lastChartData.close.toLocaleString()
          board.surplus = (lastChartData.open <= lastChartData.close) ? true:false

          // 차트 마우스 호버 시 현황판 데이터를 갱신한다
          chart.subscribeCrosshairMove(params=> {
            if(params.time) {
              let lastSeriesPrice = params.seriesPrices.get(mainSeries)
              board.open = lastSeriesPrice?.open.toLocaleString()
              board.high = lastSeriesPrice?.high.toLocaleString()
              board.low = lastSeriesPrice?.low.toLocaleString()
              board.close = lastSeriesPrice?.close.toLocaleString()
              board.surplus = (lastSeriesPrice?.open <= lastSeriesPrice?.close) ? true:false
            }
          })


          const decimalScaleY = () => { // y축 스케일링: 호가단위
            try {
              let primeLen = 0;

              const lastData = chartData[chartData.length - 1].close;

              if(lastData >= 100) primeLen = 0;
              else if(lastData < 100 && lastData >= 10) primeLen = 1;
              else if(lastData < 10 && lastData >= 1) primeLen = 2;
              else if(lastData < 1 && lastData >= 0.1) primeLen = 3;
              else primeLen = 4;

              mainSeries.applyOptions({
                priceFormat: {
                  type: 'price',
                  precision: primeLen,
                  minMove: (primeLen === 0) ? 1:parseFloat(`0.${'0'.repeat(primeLen-1)}1`),
                }
              })

            } catch(err) {
              console.log('off캔들 호가단위적용에러', err)
            }
          }
          decimalScaleY();



          
          // 가격 라인 영역
          const targetLine = mainSeries.createPriceLine({
            price: this.sign.targetPrice,
            axisLabelVisible: true,
            title: '목표가',
            color: '#F53B57',
            lineWidth: 2,
            lineStyle: 0,
          })

          const buyLine = mainSeries.createPriceLine({
            price: this.sign.startPrice,
            axisLabelVisible: true,
            title: '진입가',
            color: '#FB8A2E',
            lineWidth: 2,
            lineStyle: 0,
          })
          
          const cutLine = mainSeries.createPriceLine({
            price: this.sign.cutPrice,
            axisLabelVisible: true,
            title: '손절가',
            color: '#ccc',
            lineWidth: 2,
            lineStyle: 0,
          })

          // 차트 내부에 예측기준선 태그와 텍스트를 생성하는 함수
          const createDivisionField = () => {
            const $canvasBody = $chart_wrap.querySelector('.tv-lightweight-charts>table>tr:first-child>td:nth-child(2)')
            $canvasBody.style.overflow = 'hidden';

            let cloneTag_div = [];
            let cloneTag_Text = [];
            const $Perpendicular = Array.from(this.$refs.Perpendicular);
            for(let tag of $Perpendicular) {
              const cloneTag = tag.cloneNode(true);
              cloneTag_div.push(cloneTag)
              tag.remove()
              $canvasBody.append(cloneTag);
            }

            const $Perpendicular_text = Array.from(this.$refs.Perpendicular_text);
            for(let tag of $Perpendicular_text) {
              const cloneTag = tag.cloneNode(true);
              cloneTag_Text.push(cloneTag)
              tag.remove()
              $canvasBody.append(cloneTag);
            }

            // 캔들차트 스크롤시 스크롤포지션위치를 읽어 예측기준선의 위치를 원하는 위치에 고정시킨다
            chart.timeScale().subscribeVisibleTimeRangeChange(()=> {
              let startX = chart.timeScale().logicalToCoordinate(this.startData.index)
              let endX = chart.timeScale().logicalToCoordinate(this.endData.index)
              cloneTag_div[0].style.transform = `translate3d(${startX}px,0,0)`;
              cloneTag_Text[0].style.transform = `translate3d(${startX}px,0,0)`;
              cloneTag_div[1].style.transform = `translate3d(${endX}px,0,0)`;
              cloneTag_Text[1].style.transform = `translate3d(${endX}px,0,0)`;
            })
          }
          createDivisionField()

          chart.applyOptions({
            timeScale: {
              rightOffset: 6,
            }
          })
          chart.timeScale().fitContent();
        } catch(err) {
          console.log(err.data);
        }
      })//nextTick 

    },
  }
}
</script>

<style lang='scss'>
  @import './css/signOffRealCandleChart.scss';
</style>