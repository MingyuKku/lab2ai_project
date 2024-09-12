<template>
  <div class="dtwChart_off_container">
    <div class="sigOffContent_chartWrap" v-if="isChartData">
      <div class="chartBoard_area">
        <ChartDataBoard
          :chartHoverData="chartHoverData"
          :chartData="chartData"
        />
      </div>
      <div class="chart_wrap" ref="chart_wrap">
        <div class="Perpendicular" ref="Perpendicular"></div>
        <p class="Perpendicular_text" ref="Perpendicular_text">예측시작</p>
        <div class="waterMark" ref="waterMark"><img :src="`${$static.imgUrl}index/main/cosign_bi_gray.svg`" alt="워터마크BI"></div>
      </div>
    </div>
    <div class="isError" v-else-if="!isChartData && ($route.params.mentorId === 'dtw' || $route.params.mentorId === 'rabbit')">
      <CustomLoading :apiLoading="apiLoading"/>
      <div class="innerText loading" v-if="apiLoading">
        <p>차트 데이타를 불러오는 중입니다.</p>
        <p>잠시만 기다려 주세요</p>
      </div>
      <div class="innerText error" v-else>
        <p>차트 데이타를 일시적으로 불러오지 못 했습니다.</p>
        <p>잠시 후, 다시 시도해 주세요.</p>
      </div>
    </div>
  </div>
</template>

<script>
import CustomLoading from '@/src/components/common/CustomLoading.vue'
import ChartDataBoard from '@/src/components/mentorPage/main/ChartDataBoard.vue'
import { mapGetters } from 'vuex';

export default {
  components: {
    ChartDataBoard,
    CustomLoading
  },
  props: ['show', 'signItem'],
  data() {
    return {
      // boardFlag: false,
      apiLoading: false,
      isChartData: false,
      chartData: {
        chartUIInfo: {
          buyPrice: null,
          buyTime: null,
          targetPrice: null,
          targetTime: null,
          startDate: null,
        },
        mainData: [],
        pastData: [],
        patternData: [],
        chartLineColors: [
          'rgba(130, 24, 255, 0.3)',
          'rgba(51, 255, 0, 0.3)',
          'rgba(0, 102, 255, 0.3)',
          'rgba(255, 199, 0, 0.3)',
          'rgba(255, 0, 255, 0.3)',
          'rgba(0, 255, 190, 0.3)',   
          'rgba(254, 111, 94, 0.3)',
          'rgba(0, 56, 255, 0.3)',
          'rgba(5, 255, 0, 0.3)',
          'rgba(255, 0, 0, 0.3)',
        ]
      },
      chartHoverData: {
        data: [],
        index: null,
        mainData: null,
        patternData: null
      }
    }
  },
  mounted() {
    try {
      this.setChartData(this.signItem.sign, 'all');

    } catch(err) {
      console.log(err.data);
    }
  },
  computed: {
    ...mapGetters('loginStore', ['loginInfo']),
  },
  // watch: {
  //   'signItem.sign': {
  //     handler(val) {
  //       this.setChartData(val.id);
  //     }
  //   }
  // },
  methods: {
    async setChartData(sign, type) {  // dtw차트 api 호출해 데이터를 셋팅하는 함수
      try {
        this.apiLoading = true;
        const data = {
          signId: sign.id,
          graphType: type,
        }
        const res = await this.$axios.post(`/api/sign/graph`, data)
        const res_graph = res.data.data.graph.graph
        if(res_graph) {
          this.isChartData = true;
          const predictData = res_graph.predict;
          this.chartData.patternData = res_graph.patterns;

          this.chartData.mainData = predictData.graphs.map((data,idx)=> {
            const time = Date.parseUtcText(Date.getUtcText(data.time)).format('yyyy-MM-ddTHH:mm:ssZ');
            return {
              time: new Date(time).valueOf() / 1000,
              value: data.price * 1,
              index: idx,
              realTime: data.time,
            }
          })

          // 진입가, 목표가 마커찍어주기 위한 데이터
          this.chartData.chartUIInfo.buyPrice = res_graph.predict.buyPrice
          this.chartData.chartUIInfo.buyTime = res_graph.predict.buyTime
          this.chartData.chartUIInfo.targetPrice = res_graph.predict.targetPrice
          this.chartData.chartUIInfo.targetTime = res_graph.predict.targetTime

          this.chartData.chartUIInfo.startDate = this.chartData.mainData.find(d=> d.realTime === predictData.predictTime)

          // this.chartData.pastData = this.chartData.mainData.slice(0,this.chartData.chartUIInfo.startDate.index+1)  //필요없는작업???

          // 패턴데이터에도 동일하게 api데이터 셋팅
          for(let i = 0; i < this.chartData.patternData.length; i++) {
            this.chartData.patternData[i] = this.chartData.patternData[i].graphs.map((data,idx)=> {
              return {
                time: this.chartData.mainData[idx].time, // 패턴데이터의 각기 다른 시간을 메인데이터의 시간으로 동일하게 맞춰준다
                realTime: data.time, // 패턴데이터의 원래 시간을 보관한다
                value: res_graph.scale_patterns[i].graphs[idx].price * 1, // 스케일이 적용된 가격을 넣는다
                realValue: data.price * 1,
              }
            })
          }

          this.drawChart(this.chartData, sign)
          
        } else {
          this.apiLoading = false;
          this.isChartData = false;
        }

      } catch(err) {
        this.apiLoading = false;
        this.isChartData = false;
        console.log('dtw error222',err)
      }
      
    },
    drawChart(chartData, sign) {
      this.$nextTick(()=> {
        try {
          if(this.$el.querySelector('.tv-lightweight-charts') !== null) {
            this.$el.querySelector('.tv-lightweight-charts').remove()
          }
          const $chart_wrap = this.$refs.chart_wrap;
          let width = $chart_wrap.offsetWidth;
          let height = width / 2;

          const chart = this.$createChart($chart_wrap, {
            width: width,
            height: height,
            localization: {
              dateFormat: 'yyyy-MM-dd',
            },
            layout: {
              textColor: '#333',
              fontSize: 12,
              fontFamily: 'Noto Sans KR',
              // backgroundColor: "#f3f3f3"
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
              // mode: 0,
              horzLine: {
                style: 0,
                width: 1,
                color: '#999',
                labelBackgroundColor: '#999',
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
                top: 0.1,
                bottom: 0.1,
              },
            },
            timeScale: {
              rightOffset: 0, 
              borderColor: '#ddd',
              timeVisible: true,
              secondsVisible: false,
              lockVisibleTimeRangeOnResize: true,
            },
            lastValueVisible: false, 
            axisLabelVisible: false,
            priceLineVisible: false,
          });

          chart.applyOptions({
            priceScale: {
              position: 'right',
              mode: 0,  
              autoScale: true, 
              alignLabels: true,  
              borderVisible: true,
              borderColor: '#ddd',
              drawTicks: false,
            },
            handleScroll: true,
            handleScale: true,
          })

          let mainDataSeries = chart.addLineSeries({
            color: 'rgba(245, 59, 87, 1)',
            lineWidth: 3,
            lastPriceAnimation: 0,
            lastValueVisible: false,
            axisLabelVisible: false,
            priceLineVisible: false,
          });


          const decimalScaleY = () => { // y축 가격의 소수점 자릿수를 업비트 호가단위에 맞춰 정해준다
            try {
              let primeLen = 0;

              const lastData = chartData.mainData[chartData.mainData.length - 1].value;

              if(lastData >= 100) primeLen = 0;
              else if(lastData < 100 && lastData >= 10) primeLen = 1;
              else if(lastData < 10 && lastData >= 1) primeLen = 2;
              else if(lastData < 1 && lastData >= 0.1) primeLen = 3;
              else primeLen = 4;

              mainDataSeries.applyOptions({
                priceFormat: {
                  type: 'price',
                  precision: primeLen,
                  minMove: (primeLen === 0) ? 1:parseFloat(`0.${'0'.repeat(primeLen-1)}1`),
                }
              })

            } catch(err) {
              console.log('off dtw차트 호가적용 에러', err)
            }
          }
          decimalScaleY();


          // 차트에 메인데이터 인입
          mainDataSeries.setData(chartData.mainData);

          // 메인데이터(과거데이터) 옵션 => 일단 사용하지 않는 것으로
          // const pastDataSeries = chart.addLineSeries({
          //   color: 'rgba(0, 216, 214, 1)',
          //   lineWidth: 3,
          //   lastValueVisible: false, //마지막 가격라벨 표시
          //   axisLabelVisible: false,
          //   priceLineVisible: false,
          // })

          // 차트에 메인데이터(과거데이터) 인입 => 일단 사용하지 않는 것으로
          // pastDataSeries.setData(this.chartData.pastData);


          
          // 패턴 차트 옵션 및 데이터 인입
          const patternsData = [];
          for(let i = 0; i < chartData.patternData.length; i++) {
            const series = chart.addLineSeries({
              color: chartData.chartLineColors[i],
              lineWidth: 1,
              lastValueVisible: false,
              axisLabelVisible: false,
              priceLineVisible: false,
            });
            series.setData(chartData.patternData[i]);
            patternsData.push(series);
          }


          
          // 예측시작선(수직선) & 텍스트를 넣기 위한 캔버스 추출
          const $canvasBody = $chart_wrap.querySelector('.tv-lightweight-charts>table>tr:first-child>td:nth-child(2)')
          $canvasBody.style.overflow = 'hidden';
          
          // 애초에 Perpendicular 태그는 canvas에 넣기 위한 용
          // canvas에 넣고 난 후에 기존 태그는 삭제  
          const $Perpendicular = this.$refs.Perpendicular;
          const $PerpendicularClone = $Perpendicular.cloneNode(true);
          $Perpendicular.remove();
          $canvasBody.append($PerpendicularClone);
          const $Perpendicular_text = this.$refs.Perpendicular_text;
          const $Perpendicular_textClone = $Perpendicular_text.cloneNode(true);
          $Perpendicular_text.remove();
          $canvasBody.append($Perpendicular_textClone);


          // 차트 스크롤시에 예측시작선 & 텍스트를 위치 고정
          chart.timeScale().subscribeVisibleTimeRangeChange(()=> {
            let stickX = chart.timeScale().logicalToCoordinate(chartData.chartUIInfo.startDate.index)
            $PerpendicularClone.style.transform = `translateX(${stickX}px)`;
            $Perpendicular_textClone.style.transform = `translateX(${stickX}px)`;
          })

          // 차트에 마우스 호버시 차트보드 현황판에 넘겨줄 데이터 갱신
          chart.subscribeCrosshairMove(params=> {
            this.chartHoverData.data = params;
            this.chartHoverData.mainData = params.seriesPrices.get(mainDataSeries);
            
            let hoverData = chartData.mainData.find(d=> d.time === params.time);
            this.chartHoverData.index = hoverData?.index;
          })

          //매수, 매도가 마커 설정  ==> 버튼 클릭시 사용할 예정
          showMarkPrice(mainDataSeries, this.chartData.chartUIInfo)

          function showMarkPrice(mainDataSeries,chartUIInfo) {
            if(chartUIInfo.buyPrice.split('.')[1] !== undefined && chartUIInfo.buyPrice.split('.')[1] !== '0') {
              chartUIInfo.buyPrice = Number(chartUIInfo.buyPrice).toFixed(chartUIInfo.buyPrice.split('.')[1].length);
            } else {
              chartUIInfo.buyPrice = Number(chartUIInfo.buyPrice).toFixed(0);
            }

            // let targetPrice = this.chartData.chartUIInfo.targetPrice
            if(chartUIInfo.targetPrice.split('.')[1] !== undefined && chartUIInfo.targetPrice.split('.')[1] !== '0') {
              chartUIInfo.targetPrice = Number(chartUIInfo.targetPrice).toFixed(chartUIInfo.targetPrice.split('.')[1].length);
            } else {
              chartUIInfo.targetPrice = Number(chartUIInfo.targetPrice).toFixed(0);
            }

            const buyTime = Date.parseUtcText(Date.getUtcText(chartUIInfo.buyTime)).format('yyyy-MM-ddTHH:mm:ssZ')
            const targetTime = Date.parseUtcText(Date.getUtcText(chartUIInfo.targetTime)).format('yyyy-MM-ddTHH:mm:ssZ')
            mainDataSeries.setMarkers([ 
              {
                time: new Date(buyTime).valueOf() / 1000,
                position: 'belowBar',
                color: '#0073E6',
                shape: 'arrowUp',
                size: 1.2,  
                text: `진입가 ${(chartUIInfo.buyPrice*1) >= 1 ? (chartUIInfo.buyPrice*1)?.toLocaleString() : (chartUIInfo.buyPrice*1)}`,
              },
              {
                time: new Date(targetTime).valueOf() / 1000,
                position: 'aboveBar', 
                color: '#F53B57',
                shape: 'arrowDown', 
                size: 1.2,
                text: `목표가 ${(chartUIInfo.targetPrice*1) >= 1 ? (chartUIInfo.targetPrice*1)?.toLocaleString() : (chartUIInfo.targetPrice*1)}                      `,
              },
            ]);
          }
          
          chart.timeScale().fitContent();

          this.apiLoading = false;

        } catch(err) {
          console.log(err.data);
        }
      })  
    },
  }
}
</script>

<style lang='scss'>
  @import './css/signOffContentChart.scss';
</style>