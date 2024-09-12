<template>
  <div class="earning_wrap">
    <div class="earning_inner" ref="earning_inner">
      <div class="earning_head">
        <div class="earning_tit">
          <p>최근 수익률</p>
        </div>
        <h3 :style="chartData.mentorCurrentEarning <= 0 ? {color: '#0051C7'} : {color: '#F53B57'}">
          {{ chartData.mentorCurrentEarning }}%
        </h3>
      </div>
      <div class="earning_body">
        <div class="tooltip" ref="tooltip">
          <div class="tooltip_earning">
            <h2>현재 멘토</h2>
            <p></p>
            <h2>전체 멘토 평균</h2>
            <p></p>
          </div>
          <span class="time"></span>
        </div>
      </div>
      <div class="earning_bottom clearFix">
        <p><i></i>현재 멘토</p>
        <p><i></i>전체 멘토 평균</p>
      </div>
    </div>
    <div class="notChartData" ref="notChartData">
      <p>차트 데이터가 존재하지 않습니다!</p>
    </div>
  </div>
</template>

<script>
import { createChart } from 'lightweight-charts';
import { mapActions, mapGetters, mapState } from 'vuex';
  export default {
    data(){
      return {
      }
    },
    mounted() {
    },
    computed: {
      ...mapState('signStore', ['chartData']),
      ...mapGetters('signStore', ['pageId','mentorCurrentEarning']),
    },
    watch: {
      pageId(newVal) {
        if(newVal !== null) {
          this.LoadProfile(newVal);
        }
      },
      mentorCurrentEarning(newVal) {
        if(newVal !== null) {
          this.drawChart();
        } else {
          this.$refs.earning_inner.style.display = 'none';
          this.$refs.notChartData.style.display = 'block';
        }
      }
    },
    methods: {
      ...mapActions('signStore', ['LoadProfile']),

      drawChart() {
        const $earning_body = this.$el.querySelector('.earning_body');
        let width = $earning_body.offsetWidth;
        let height = width*0.43;

        const chart = createChart($earning_body, {
          width: width, height: height,

          localization: {
            dateFormat: 'yyyy-MM-dd',
            priceFormatter: price=> `${price.toFixed(2)}%`,
          },

          
          // leftPriceScale: {
          //   scaleMargins: {
          //     top: 0.1,
          //     bottom: 0.3,
          //   },
          //   visible: true,
          //   borderVisible: false,
          //   alignLabels: false,
          // },

          // rightPriceScale: {
          //   visible: false,
          // },

          timeScale: {
            borderVisible: false,
            rightOffset: -0.1,
          },
          
          grid: {
            horzLines: {
              color: '#f3f3f3',
            },
            vertLines: {
              visible: false,
            },
          },
          
          layout: {
            textColor: '#777',
            fontSize: 13,
            fontFamily: 'Noto Sans KR',
          },

          crosshair: {
            // mode: 0,
            horzLine: {
              visible: false, //가로선
              labelVisible: false,  //가로선라벨
              style: 0,
              width: 1,
              color: 'rgba(254, 85, 5, 1)',
              labelBackgroundColor: 'rgba(254, 85, 5, 1)',
            },
            vertLine: {
              visible: true,
              labelVisible: false,
              style: 0,
              width: 1,
              color: 'rgba(0, 0, 0, 0.1)',
              labelBackgroundColor: 'rgba(254, 85, 5, 1)',
            }
          },
          options: {
            responsive: true,
          },

          handleScroll: {
            mouseWheel: false,
            pressedMouseMove: true,
            horzTouchDrag: true,
            vertTouchDrag: false,
          },
          handleScale: {
            axisPressedMouseMove: true,
            mouseWheel: false,
            pinch: true,
          },
          kineticScroll: true,

        });

        chart.resize(width, height);

        chart.applyOptions({
          priceScale: {
            position: 'right',
            mode: 0,  //1~4까지의 모드가 있다
            autoScale: true,  //데이터를 차트 크기에 맞춤
            alignLabels: true,  //true인 경우 가격 데이터가 있는 레이블이 겹치지 않습니다.
            borderVisible: false,
            borderColor: '#eee',
            drawTicks: false, //가격레이블의 눈금 없애기
          },
          priceLineSource: 1,
          priceLineWidth: 2,
          priceLineStyle: 3,

          // scaleMargins: {
          //   top: 0.15, //0:0% ~ 1: 100%
          //   bottom: 0.5,  //0:0% ~ 1: 100%
          // },
        })

        const lineSerise = chart.addAreaSeries({
          topColor: 'rgba(33, 160, 253, 0.2)',	
          bottomColor: 'rgba(33, 160, 253, 0.0)',
          lineColor: 'rgba(33, 160, 253, 0.7)',
          lineWidth: 1,
          lineStyle: 0,

          crosshairMarkerVisible: true, //꼭지점을 찍어준다
          crosshairMarkerRadius: 5, //꼭지점 크기
          crosshairMarkerBorderColor: 'rgba(255, 255, 255, 1)',
          crosshairMarkerBackgroundColor: 'rgba(33, 160, 253, 0.5)',
          lastPriceAnimation: 0,  //0비활성화, 1항상활성화, 2한번만

          priceScaleId: 'right',
          priceLineVisible: false,
          priceLineWidth: 2,
          priceLineColor: '#ff0081',
          priceLineStyle: 2,//0 ~ 4의 선택
          lastValueVisible: false, //마지막 가격라벨 표시
          axisLabelVisible: false,
        });
        
        const lineSerise2 = chart.addAreaSeries({
          topColor: 'rgba(254, 85, 5, 0.2)',	
          bottomColor: 'rgba(254, 85, 5, 0.0)',
          lineColor: 'rgba(254, 85, 5, 0.7)',
          lineWidth: 3,

          crosshairMarkerVisible: true, //꼭지점을 찍어준다
          crosshairMarkerRadius: 5, //꼭지점 크기
          crosshairMarkerBorderColor: 'rgba(255, 255, 255, 1)',
          crosshairMarkerBackgroundColor: 'rgba(254, 85, 5, 0.5)',
          lastPriceAnimation: 1,  //0비활성화, 1항상활성화, 2한번만

          priceScaleId: 'right',
          priceLineVisible: false,
          priceLineWidth: 2,
          priceLineColor: 'rgba(254, 85, 5, 0.7)',
          priceLineStyle: 2,//0 ~ 4의 선택
          lastValueVisible: true, //마지막 가격라벨 표시
          axisLabelVisible: true,
        });

        lineSerise.priceScale().applyOptions({
          scaleMargins: {
            top: 0.3, //0:0% ~ 1: 100%
            bottom: 0.3,  //0:0% ~ 1: 100%
          },
        });
        lineSerise2.priceScale().applyOptions({
          scaleMargins: {
            top: 0.3, //0:0% ~ 1: 100%
            bottom: 0.3,  //0:0% ~ 1: 100%
          },
        });
      
        lineSerise.setData(this.chartData.averageMentorEarning)
        lineSerise2.setData(this.chartData.currentMentorEarning)


        // 툴팁
        const $toolTip = this.$refs.tooltip.cloneNode(true);
        this.$refs.tooltip.remove();
        $earning_body.append($toolTip);
        $toolTip.style.height = `${height}px`;

        let cmEar = $toolTip.children[0].children[1]
        let amEar = $toolTip.children[0].children[3]
        let time = $toolTip.children[1]

        let lastAverageDataIdx = this.chartData.averageMentorEarning.length-1;
        let lastCurrentDataIdx = this.chartData.currentMentorEarning.length-1;

        cmEar.textContent = this.chartData.currentMentorEarning[lastCurrentDataIdx].value !== undefined ?
        this.chartData.currentMentorEarning[lastCurrentDataIdx].value.toFixed(2) + '%' :
        this.chartData.currentMentorEarning[lastCurrentDataIdx].value;

        amEar.textContent = this.chartData.averageMentorEarning[lastAverageDataIdx].value !== undefined ?
        this.chartData.averageMentorEarning[lastAverageDataIdx].value.toFixed(2) + '%' :
        this.chartData.averageMentorEarning[lastAverageDataIdx].value;

        let firstDate = this.chartData.averageMentorEarning[lastAverageDataIdx].time;
        time.textContent = `${firstDate.year}.${firstDate.month}.${firstDate.day}`;

        $toolTip.style.left = `-${$toolTip.offsetWidth/2}px`;
        $toolTip.style.transform = `translateX(${width-122}px)`;

        chart.subscribeCrosshairMove(param=> {
          if(!param.point) {
            $toolTip.classList.add('close');
            $toolTip.classList.remove('show');
            return;
          }
          $toolTip.classList.add('show');
          $toolTip.classList.remove('close');
          let moveX = param.point.x
          if(moveX <= $toolTip.offsetWidth/2) {
            moveX = $toolTip.offsetWidth/2;
            $toolTip.style.left = `-${$toolTip.offsetWidth/2}px`;
          } else if(moveX >= width-122) {
            moveX = width-122;
            $toolTip.style.left = `-${$toolTip.offsetWidth/2}px`;
          } 
          $toolTip.style.transform = `translateX(${moveX}px)`;
          cmEar.textContent = param.seriesPrices.get(lineSerise2)?.toFixed(2);
          let serise2Pri = param.seriesPrices.get(lineSerise2);
          let serisePri = param.seriesPrices.get(lineSerise);
          let date = `${param.time.year}.${param.time.month}.${param.time.day}`;
          cmEar.textContent = serise2Pri !== undefined ? serise2Pri.toFixed(2) + '%' : serise2Pri;
          amEar.textContent = serisePri !== undefined ? serisePri.toFixed(2) + '%' : serisePri;
          time.textContent = date;
        });

        chart.timeScale().fitContent();
      }
    }
  }
</script>

<style lang='scss'>
  @import './css/earningChart.scss';
</style>