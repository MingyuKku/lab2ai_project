<template>
  <div class="container">
    <div class="signNowRealCandleChart_wrap" v-if="isChartData">
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
      <div class="chart_wrap" ref="chart_wrap" :class="{opacity: apiLoading}">
        <div class="Perpendicular" ref="Perpendicular" v-if="chartData.length > 0"></div>
        <p class="Perpendicular_text" ref="Perpendicular_text" v-if="chartData.length > 0">예측시작</p>
        <div class="waterMark" ref="waterMark"><img :src="`${$static.imgUrl}index/main/cosign_bi_gray.svg`" alt="워터마크BI"></div>
      </div>
      <CustomLoading :apiLoading="apiLoading"/>
    </div>

  </div>
</template>

<script>
import CustomLoading from '@/src/components/common/CustomLoading.vue';
export default {
  components: {
    CustomLoading, 
  },
  props: ['signNow', 'canBrowseSign', 'progressStatePriceUpdate'],
  data() {
    return {
      apiLoading: false,
      isChartData: true,
      chartAPIInterval: null,
      chartData: [],
      addData: [],
      startData: null,
      boardData: {
        open: null,
        high: null,
        low: null,
        close: null,
        surplus: false,
      },

      selectStinging: null,
      stinging: [1,5,15]
    }
  },
  mounted() {
    // startTimeText, endEarningTimeText가 mount호출 순서가 늦어서 데이터 안들어있는 경우
    // if(this.signNow.sign.startTimeText == undefined) {
    //   this.sign = Object.assign(this.signNow.sign, getSignOffTime(this.signNow.sign))
    //   console.log('요고?')
    // }
    // this.setChartData(this.signNow);
  },
  beforeDestroy() {
    clearInterval(this.chartAPIInterval)
  },
  watch: {
    'signNow.sign': {
      handler() {
        clearInterval(this.chartAPIInterval)
        this.initStinging();  // initStinging: 유효시간을 기반으로 1, 5, 15분 캔들 중 무엇을 할 것인지에 대한 함수
        this.setChartData(this.signNow);
      }
    },
  },
  methods: {
    initStinging() {
      this.selectStinging = this.getStinging(this.signNow.sign.validateMin);
    },  
    changeSelect() {
      clearInterval(this.chartAPIInterval);
      this.setChartData(this.signNow)
    },
    async setChartData(signNow) {  // 리얼캔들차트 api불러와서 데이터 셋팅하는 함수
      try {
        this.apiLoading = true;
        const param = {
          // api 파라미터 규격에 맞게 gteTime,lteTime을 utc시간으로 전달(T,Z는 제거)
          gteTime: signNow.sign.startTime.replace(/\T/g,' '),
          lteTime: Date.toUtcText(new Date()).format('yyyy-MM-dd HH:mm:ss'),
          market: signNow.sign.coin.market,
          stinging: this.selectStinging,
        }

        const res = await this.$axios.post(`/api/sign/candle`, param.getParam())
        // console.log('차트응답',res)

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
          // console.log('signOn캔들데이터', this.chartData)

          let lastChartData = this.chartData[this.chartData.length - 1]
          this.addData.push(lastChartData)

          // 프로그래스바의 수익률 계산을 위해 현재가격과 코인코드를 부모컴포넌트 함수로 전달
          this.progressStatePriceUpdate(lastChartData.close, signNow.sign.coin.market)

          // 예측시작선을 그려주기 위해 예측시작 시간에 근접한 데이터를 찾는 함수
          function findStartPoint(time, chartData) {  
            const startTimeValue = new Date(Date.getUtcText(time)).valueOf() / 1000;
            let compare = Number.MAX_SAFE_INTEGER;
            let index = 0;

            for(let i = 0; i < chartData.length; i++) {
              const cpTime = Math.abs(chartData[i].time - startTimeValue)
              if(compare > cpTime) {
                compare = cpTime;
                index = i
              }
            }

            if(startTimeValue < chartData[index].time) index = index - 1;
            chartData[index].index = index;

            return chartData[index];
          }
          this.startData = findStartPoint(signNow.sign.startTimeText, this.chartData);

          // console.log('시작데이터', this.startData)

          await this.drawChart(this.boardData, lastChartData, this.chartData, this.addData, signNow)
          this.isChartData = true;
          this.apiLoading = false;

        } else {
          this.apiLoading = false;
          this.isChartData = false;
        }

      } catch(err) {
        this.apiLoading = false;
        this.isChartData = false;
      }
    },
    getStinging(min) {
      let hour = min / 60;
      if(hour >= 12) return 15;
      else if(hour < 12 && hour >= 3) return 5;
      else return 1;
    },
    drawChart(board, lastChartData, chartData, addData, signNow) { // 실제 차트를 그리는 함수
      this.$nextTick(()=> {
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
              // style: 0,
              // width: 1,
              // color: '#999',
              // labelBackgroundColor: '#999',
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
              top: 0.15,
              bottom: 0.15,
            },
          },
          timeScale: {
            borderColor: '#eee',
            timeVisible: true,
            secondsVisible: false,
            lockVisibleTimeRangeOnResize: true,
          },
          lastValueVisible: false, 
          axisLabelVisible: false,
          priceLineVisible: false,
        });

        let mainSeries = chart.addCandlestickSeries({
          title: '현재가',
          upColor: '#D24F45',
          downColor: '#1261C4',
          borderDownColor: '#1261C4',
          borderUpColor: '#D24F45',
          wickDownColor: '#555',
          wickUpColor: '#555',
          priceLineVisible: true,
        });
        mainSeries.setData(chartData);

        // 무료싸인과 유료싸인 y축 min값 max값 계산하여 적용
        let chartDataClosePrice = chartData.map(data=> {
          return [data.high, data.low];
        })

        if(!this.$isOpenSign(signNow.sign.pay)) {  // 무료싸인
          if(signNow.sign.targetPrice !== undefined) {
            chartDataClosePrice.push([signNow.sign.targetPrice, signNow.sign.targetPrice])
          }
        } 

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

        const intervalAPI = () => async () => { // 10초마다 최신 캔들차트 api를 호출해 캔들차트를 업데이트하는 함수
          try {
            const param = {
              // api 파라미터 규격에 맞게 gteTime,lteTime을 utc시간으로 전달
              gteTime: Date.toUtcText(addData[addData.length - 1].originTime).format('yyyy-MM-dd HH:mm:ss'),
              lteTime: Date.toUtcText(new Date()).format('yyyy-MM-dd HH:mm:ss'),
              market: signNow.sign.coin.market,
              stinging: this.selectStinging,
            }
            const res = await this.$axios.post(`/api/sign/candle_new`, param.getParam())
            // console.log('업뎃',res.data.candles)
            if(res.data.res.code === 1000) {
              addData = res.data.candles.map(data=> {
                const time = Date.parseUtcText(Date.getUtcText(data.candleDateTimeUtc)).format('yyyy-MM-ddTHH:mm:ssZ');
                return {
                  time: (new Date(time).valueOf() / 1000),
                  // originTime: Date.parseUtcText(Date.getUtcText(data.candleDateTimeUtc)).format('yyyy-MM-dd HH:mm:ss'),
                  originTime: time,
                  open: data.openingPrice,
                  high: data.highPrice,
                  low: data.lowPrice,
                  close: data.tradePrice,
                }
              })

              // console.log('업뎃',addData[addData.length - 1].close)
              this.progressStatePriceUpdate(addData[addData.length - 1].close)

            }
            
          } catch(err) {console.log('캔들차트interval',err)}

          // 차트에 캔들 데이터 인입
          let currentCandle = {};
          for(let i = 0; i < addData.length; i++) {
            currentCandle = {
              open: addData[i].open,
              high: addData[i].high,
              low: addData[i].low,
              close: addData[i].close,
              time: addData[i].time,
            }
            // console.log('업데이트 포문', currentCandle.time)
            mainSeries.update(currentCandle)
          }

          currentCandle = {
            open: null,
            high: null,
            low: null,
            close: null,
            time: addData[addData.length-1].time,
          }
        }
        this.chartAPIInterval = setInterval(intervalAPI(), 10000)

        
        // 차트 보드 현황판에 출력할 데이터 셋팅
        board.open = lastChartData.open.toLocaleString()
        board.high = lastChartData.high.toLocaleString()
        board.low = lastChartData.low.toLocaleString()
        board.close = lastChartData.close.toLocaleString()
        board.surplus = (lastChartData.open <= lastChartData.close) ? true:false

        // 차트 마우스 호버 시 현황판 데이터를 갱신한다
        chart.subscribeCrosshairMove(params=> {
          if(params.time) {
            let lastSeriesPrice = params.seriesPrices.get(mainSeries);

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
            console.log('호가단위적용에러', err)
          }
        }
        decimalScaleY();


        // 오픈 싸인인 경우에만 목표가, 손절가, 진입가 수평선 draw
        if(this.$isOpenSign(signNow.sign.pay)) {
          const targetLine = mainSeries.createPriceLine({
            price: signNow.sign.targetPrice,
            axisLabelVisible: true,
            title: '목표가',
            color: '#F53B57',
            lineWidth: 2,
            lineStyle: 0,
          })

          const buyLine = mainSeries.createPriceLine({
            price: signNow.sign.startPrice,
            axisLabelVisible: true,
            title: '진입가',
            color: '#FB8A2E',
            lineWidth: 2,
            lineStyle: 0,
          })
          
          const cutLine = mainSeries.createPriceLine({
            price: signNow.sign.cutPrice,
            axisLabelVisible: true,
            title: '손절가',
            color: '#ccc',
            lineWidth: 2,
            lineStyle: 0,
          })
        }

        

        // 차트 내부에 예측기준선 태그와 텍스트를 생성하는 함수
        const createDivisionField = () => {
          // DOM 구조화
          const $canvasBody = $chart_wrap.querySelector('.tv-lightweight-charts>table>tr:first-child>td:nth-child(2)')
          $canvasBody.style.overflow = 'hidden';
          const $Perpendicular = this.$refs.Perpendicular;
          const $PerpendicularClone = $Perpendicular.cloneNode(true);
          $Perpendicular.remove();
          $canvasBody.append($PerpendicularClone);
          const $Perpendicular_text = this.$refs.Perpendicular_text;
          const $Perpendicular_textClone = $Perpendicular_text.cloneNode(true);
          $Perpendicular_text.remove();
          $canvasBody.append($Perpendicular_textClone);

          // 캔들차트 스크롤시 스크롤포지션위치를 읽어 예측기준선의 위치를 원하는 위치에 고정시킨다
          chart.timeScale().subscribeVisibleTimeRangeChange(()=> {
            let stickX = chart.timeScale().logicalToCoordinate(this.startData.index)
            $PerpendicularClone.style.transform = `translateX(${stickX}px)`;
            $Perpendicular_textClone.style.transform = `translateX(${stickX}px)`;
          })
        }
        createDivisionField()

        // 캔들이 60개 이상일 때는 range를 좁히기
        if(chartData.length > 60) {
          chart.timeScale().setVisibleRange({
            from: chartData[chartData.length - 61].time,
            to: Date.parseUtcText(new Date().format('yyyy-MM-ddTHH:mm:ssZ')).valueOf() / 1000,
          });

        } else {
          chart.timeScale().setVisibleRange({
            from: chartData[0].time,
            to: Date.parseUtcText(new Date().format('yyyy-MM-ddTHH:mm:ssZ')).valueOf() / 1000,
          });

          chart.timeScale().fitContent();
        }

        chart.applyOptions({
          timeScale: {
            rightOffset: 6, // 6개 캔들 폭만큼의 padding
          }
        })

      })//nextTick  
    },
  }
}
</script>

<style lang='scss'>
  @import './css/signNowRealCandleChart.scss';
</style>