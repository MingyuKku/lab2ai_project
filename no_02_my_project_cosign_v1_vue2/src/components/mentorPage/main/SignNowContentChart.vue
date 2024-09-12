<template>
  <div class="signNowContent_chartWrap" ref="signNowContent_chartWrap" v-if="isChartData">
    <div class="chart_title" @click="showChartBoard">
      <!-- <p>차트보드를 보려면 클릭해주세요 <i class="xi-angle-down"></i></p> -->
    </div>
    <div class="chartBoard_area">
      <ChartDataBoard
        :chartHoverData="chartHoverData"
        :chartData="chartData"
        :active="boardFlag"
      />
    </div>
    <div class="chart_wrap" ref="chart_wrap">
      <div class="playBtn graphBtn show" ref="playBtn">
        <i class="xi-play"></i>
        <p>AI 예측보기</p>
      </div>
      <div class="resetBtn graphBtn" ref="resetBtn">
        <i class="xi-enter"></i>
        <p>되돌리기</p>
      </div>
      <div class="Perpendicular" ref="Perpendicular"></div>
      <p class="Perpendicular_text" ref="Perpendicular_text">예측시작선</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/core/apiUrl';
import { createChart } from 'lightweight-charts';
import ChartDataBoard from '@/components/mentorPage/main/ChartDataBoard.vue'
import { mapGetters, mapMutations } from 'vuex';

export default {
  components: {ChartDataBoard},
  props: ['show', 'signNow'],
  data() {
    return {
      isSafari: false,
      boardFlag: false,
      isChartData: true,
      chartData: {
        chartUIInfo: {
          buyPrice: null,
          buyTime: null,
          cutPrice: null,
          cutTime: null,
          predictTime: null,
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
      },
    }
  },
  mounted() {
    this.setChartData(this.signNow.sign.id);
  },
  computed: {
    ...mapGetters('loginStore', ['loginInfo']),
  },
  watch: {
    'signNow.sign': {
      handler(val) {
        this.setChartData(val.id);
      }
    }
  },
  methods: {
    ...mapMutations('popupStore', ['showLoginAlert']),
    async setChartData(id) {
      const data = {
        signId: id,
      };
      await axios.post(`${API_URL}/api/sign/graph`, JSON.stringify(data), 
      {headers: {"Content-Type": `application/json`,}})
      .then(res=> {
        if(res.data) {
          this.isChartData = true;
          const predictData = res.data.predict.predict;
          this.chartData.patternData = res.data.predict.patterns;

          this.chartData.mainData = predictData.graphs.map((data,idx)=> {
            return {
              time: (new Date(data.time.replace(/\s/g,'T')).valueOf() / 1000) + 32400, //valueOf()값을 차트 라이브러리에서 시간으로 변환하면서 -9시간 된 값으로 표출됨
              value: data.price * 1,
              index: idx,
              realTime: data.time,
            }
          })
          let buyData = predictData.graphs.find(d=> d.time === predictData.buyTime)
          let targetData = predictData.graphs.find(d=> d.time === predictData.targetTime)
          this.chartData.chartUIInfo.buyPrice = buyData.price
          this.chartData.chartUIInfo.buyTime = buyData.time
          this.chartData.chartUIInfo.cutPrice = predictData.cutPrice
          this.chartData.chartUIInfo.cutTime = predictData.cutTime
          this.chartData.chartUIInfo.predictTime = predictData.predictTime
          this.chartData.chartUIInfo.targetPrice = targetData.price
          this.chartData.chartUIInfo.targetTime = targetData.time

          this.chartData.chartUIInfo.startDate = this.chartData.mainData.find(d=> d.realTime === predictData.predictTime)
          this.chartData.pastData = this.chartData.mainData.slice(0,this.chartData.chartUIInfo.startDate.index+1)
          for(let i = 0; i < this.chartData.patternData.length; i++) {
            this.chartData.patternData[i] = this.chartData.patternData[i].graphs.map((data,idx)=> {
              return {
                time: this.chartData.mainData[idx].time,
                realTime: data.time,
                value: res.data.predict.scale_patterns[i].graphs[idx].price * 1,
                realValue: data.price * 1,
              }
            })
          }

          this.drawChart()
        } else {
          this.isChartData = false;
        }
      })
      .catch(err=> {
        this.isChartData = false;
        console.log('차트에러',err)
      })
    },
    drawChart() {
      this.$nextTick(()=> {
        if(this.$el.querySelector('.tv-lightweight-charts') !== null) {
          this.$el.querySelector('.tv-lightweight-charts').remove()
        }
        const $chart_wrap = this.$refs.chart_wrap;
        let width = $chart_wrap.offsetWidth;
        let height = width / 2;

        const chart = createChart($chart_wrap, {
          width: width,
          height: height,
          localization: {
            dateFormat: 'yyyy-MM-dd',
          },
          layout: {
            textColor: '#777',
            fontSize: 14,
            fontFamily: 'Noto Sans KR',
            backgroundColor: "#F9F9FB"
          },
          grid: {
            horzLines: {
              visible: false,
              color: '#f3f3f3',
            },
            vertLines: {
              visible: false,
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
              top: 0.2,
              bottom: 0.1,
            },
          },
          timeScale: {
            rightOffset: -(this.chartData.mainData.length - this.chartData.chartUIInfo.startDate.index),  //데이터 한 틱의 값이다!!
            borderColor: '#ddd',
            timeVisible: true,
            secondsVisible: false,
            lockVisibleTimeRangeOnResize: true,//true인 경우 차트 크기 조정 중에 표시되는 시간 영역 변경을 방지합니다.
          },
          lastValueVisible: false, //마지막 가격라벨 표시
          axisLabelVisible: false,
          priceLineVisible: false,
        });

        chart.applyOptions({
          priceScale: {
            position: 'right',
            mode: 0,  //1~4까지의 모드가 있다
            autoScale: true,  //데이터를 차트 크기에 맞춤
            alignLabels: true,  //true인 경우 가격 데이터가 있는 레이블이 겹치지 않습니다.
            borderVisible: true,
            borderColor: '#ddd',
            drawTicks: false, //가격레이블의 눈금 없애기
          },
          handleScroll: false,
          handleScale: {
            mouseWheel: false,
          },
        })

        const mainDataSeries = chart.addLineSeries({
          color: 'rgba(245, 59, 87, 1)',
          lineWidth: 3,
          // crosshairMarkerRadius: 10, //꼭지점 크기
          lastPriceAnimation: 0,
          lastValueVisible: false, //마지막 가격라벨 표시
          axisLabelVisible: false,
          priceLineVisible: false,
        })

        // y축 가격스케일의 자릿수 정하기
        let price = this.chartData.chartUIInfo.buyPrice;
        let divideComma = price.split('.');
        if(divideComma[1]?.length !== undefined) {
          mainDataSeries.applyOptions({
            priceFormat: {
              type: 'price',
              precision: divideComma[1].length,
              minMove: parseFloat(`0.${'0'.repeat(divideComma[1].length-1)}1`),
            }
          })
        } else {
          mainDataSeries.applyOptions({
            priceFormat: {
              type: 'price',
              precision: 0,
              minMove: 1,
            }
          })
        }
        
        mainDataSeries.setData(this.chartData.mainData);

        const pastDataSeries = chart.addLineSeries({
          color: 'rgba(0, 216, 214, 1.0)',
          lineWidth: 3.5,
          lastValueVisible: false, //마지막 가격라벨 표시
          axisLabelVisible: false,
          priceLineVisible: false,
        })
        pastDataSeries.setData(this.chartData.pastData);
        
        const patternsData = [];
        for(let i = 0; i < this.chartData.patternData.length; i++) {
          const series = chart.addLineSeries({
            color: this.chartData.chartLineColors[i],
            lineWidth: 1,
            lastValueVisible: false, //마지막 가격라벨 표시
            axisLabelVisible: false,
            priceLineVisible: false,
          });
          series.setData(this.chartData.patternData[i]);
          patternsData.push(series);
        }
        

        //플레이&리셋 버튼
        const $playBtn = this.$refs.playBtn;
        const $playBtnClone = $playBtn.cloneNode(true);
        $playBtn.remove();
        const $resetBtn = this.$refs.resetBtn;
        const $resetBtnClone = $resetBtn.cloneNode(true);
        $resetBtn.remove();
        const $canvasBody = $chart_wrap.querySelector('.tv-lightweight-charts>table>tr:first-child>td:nth-child(2)')
        $canvasBody.style.overflow = 'hidden';
        $canvasBody.append($playBtnClone);
        $canvasBody.append($resetBtnClone);

        //예측기준선&텍스트
        const $Perpendicular = this.$refs.Perpendicular;
        const $PerpendicularClone = $Perpendicular.cloneNode(true);
        $Perpendicular.remove();
        $canvasBody.append($PerpendicularClone);
        const $Perpendicular_text = this.$refs.Perpendicular_text;
        const $Perpendicular_textClone = $Perpendicular_text.cloneNode(true);
        $Perpendicular_text.remove();
        $canvasBody.append($Perpendicular_textClone);


        //스크롤포지션위치읽는함수
        let pos0 = [];
        chart.timeScale().subscribeVisibleTimeRangeChange(()=> {
          //예측 수직선 고정
          let stickX = chart.timeScale().logicalToCoordinate(this.chartData.chartUIInfo.startDate.index)
          $PerpendicularClone.style.transform = `translateX(${stickX}px)`;
          $Perpendicular_textClone.style.transform = `translateX(${stickX}px)`;

          let pos = chart.timeScale().scrollPosition();
          if(pos >= -1 && pos <= 0) pos0.push(pos); //차트 오른쪽 끝이 0
          if(pos0.length >= 2) {
            $resetBtnClone.classList.add('show');
            chart.applyOptions({
              handleScroll: true,
              handleScale: {
                mouseWheel: true,
              },
            })
          }
        })

        $playBtnClone.addEventListener('click', ()=> {
          $playBtnClone.classList.remove('show')
          $chart_wrap.style.opacity = 0;
          setTimeout(()=> {
            chart.applyOptions({
              timeScale: {
                rightOffset: 0,
              },
            })
            $chart_wrap.style.opacity = 1;
            chart.timeScale().scrollToPosition(0, true);  //오른쪽의 약간의 간격을 주기 위해
          }, 250)
        });
        $resetBtnClone.addEventListener('click', ()=> {
          pos0 = [];  //초기화
          $resetBtnClone.classList.remove('show');
          $playBtnClone.classList.add('show');
          chart.applyOptions({
            timeScale: {
              rightOffset: -(this.chartData.mainData.length - this.chartData.chartUIInfo.startDate.index),
            },
            handleScroll: false,
            handleScale: {
              mouseWheel: false,
            },
          })
        });

        chart.subscribeCrosshairMove(params=> {
          this.chartHoverData.data = params;
          this.chartHoverData.mainData = params.seriesPrices.get(mainDataSeries);

          //호버인덱스
          let hoverData = this.chartData.mainData.find(d=> d.time === params.time);
          this.chartHoverData.index = hoverData?.index;
        })

        
        //매수, 매도가 마커 설정
        let buyPrice = this.chartData.chartUIInfo.buyPrice
        if(buyPrice.split('.')[1] !== undefined && buyPrice.split('.')[1] !== '0') {
          buyPrice = Number(buyPrice).toFixed(buyPrice.split('.')[1].length);
        } else {
          buyPrice = Number(buyPrice).toFixed(0);
        }
        let targetPrice = this.chartData.chartUIInfo.targetPrice
        if(targetPrice.split('.')[1] !== undefined && targetPrice.split('.')[1] !== '0') {
          targetPrice = Number(targetPrice).toFixed(targetPrice.split('.')[1].length);
        } else {
          targetPrice = Number(targetPrice).toFixed(0);
        }

        mainDataSeries.setMarkers([ 
          {
            time: (new Date(this.chartData.chartUIInfo.buyTime.replace(/\s/g,'T')).valueOf() / 1000) + 32400,
            position: 'belowBar',
            color: '#0073E6',
            shape: 'arrowUp',
            size: 1.2,  
            text: `진입가 ${(buyPrice*1) >= 1 ? (buyPrice*1)?.toLocaleString() : (buyPrice*1)}`,
          },
          {
            time: (new Date(this.chartData.chartUIInfo.targetTime.replace(/\s/g,'T')).valueOf() / 1000) + 32400,
            position: 'aboveBar', //aboveBar | belowBar | inBar
            color: '#F53B57',
            shape: 'arrowDown', //circle | square | arrowUp | arrowDown
            size: 1.2,
            text: `목표가 ${(targetPrice*1) >= 1 ? (targetPrice*1)?.toLocaleString() : (targetPrice*1)}                  `,
          },
        ]);

        chart.timeScale().fitContent();
      })//nextTick  
    },
    showChartBoard() {
      this.boardFlag = this.boardFlag ? false:true;
    }
  }
}
</script>

<style lang='scss'>
  @import './css/signNowContentChart.scss';
</style>