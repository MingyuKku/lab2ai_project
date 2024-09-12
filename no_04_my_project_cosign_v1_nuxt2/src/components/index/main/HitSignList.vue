<template>
  <!-- <transition name="opacity"> -->
    <!-- <div class="hitSignList_wrap" v-show="tabMenuIndex === 1"> -->
    <div class="hitSignList_wrap">
      <div class="hitSignList_inner" v-if="this.items.length>0">
        <div class="title">
          <ul>
            <li class="coin">
              <span @click="sortingItems('market')">코인이름
                <i class="xi-caret-down" :class="{on: sortFlag['market'] === true, off: sortFlag['market'] === false}"></i>
              </span>
            </li>
            <li class="earning">
              <span @click="sortingItems('earningRateText')">수익률
                <i class="xi-caret-down" :class="{on: sortFlag['earningRateText'] === true, off: sortFlag['earningRateText'] === false}"></i>
              </span>
            </li>
            <li class="validate">
              <span @click="sortingItems('validateMin')">유효기간
                <i class="xi-caret-down" :class="{on: sortFlag['validateMin'] === true, off: sortFlag['validateMin'] === false}"></i>
              </span>
            </li>
            <li class="mentor">
              <span @click="sortingItems('mentorTitle')">멘토이름
                <i class="xi-caret-down" :class="{on: sortFlag['mentorTitle'] === true, off: sortFlag['mentorTitle'] === false}"></i>
              </span>
            </li>
            <li class="time">
              <span @click="sortingItems('endTimeValue')">종료일
                <i class="xi-caret-down" :class="{on: sortFlag['endTimeValue'] === true, off: sortFlag['endTimeValue'] === false}"></i>
              </span>
            </li>
          </ul>
        </div>
        <div class="predictSign_wrap">
          <!-- <div class="hoverEffect" :style="{transform: `translate(-50%, ${hoverTranslateY}px)`}"></div>
          @changeHoverTop="changeHoverTop" -->
          <HitSign
            v-for="(item,idx) in items" :key="idx"
            :item="item"
            :earningWidth="earningWidth"
          />
        </div>
      </div>
      <div v-else class="noItems">
        <p><i class="xi-error-o"></i>최근 등록된 싸인이 없습니다</p>
      </div>
    </div>
  <!-- </transition> -->
</template>

<script>
import HitSign from '@/src/components/index/main/HitSign'

export default {
  props: ['items'],
  components: {HitSign},
  data() {
    return {
      earningWidth: 'auto',
      sortFlag: {
        market: null,
        earningRateText: null,
        validateMin: null,
        mentorTitle: null,
        endTimeValue: true,
      },
      sortBowl: [],
    }
  },
  mounted() {
    // this.initSort();
    this.initEarningWidth()
  },
  methods: {
    // initSort() {
    //   this.items.sort((a,b) => b.endTimeValue - a.endTimeValue)
    // },
    initEarningWidth() {
      let maxLen = Number.MIN_SAFE_INTEGER;
      this.items.forEach((r)=> {
        maxLen = Math.max(maxLen, String(r.earningRateText).split('.')[0].length)
      })
      if(maxLen >= 3) this.earningWidth = '92px';
      else if(maxLen === 2) this.earningWidth = '80px';
      else this.earningWidth = '67px';
    },
    initSortFlag(filter) {
      const sortFlagKeys = Object.keys(this.sortFlag)
      for(let i = 0; i < sortFlagKeys.length; i++) {
        if(sortFlagKeys[i] === filter) continue;
        this.sortFlag[sortFlagKeys[i]] = null;
      }
    },
    sortFlagToggle(filter) {
      this.initSortFlag(filter)
      if(this.sortFlag[filter]) {
        this.sortFlag[filter] = false;
      } else {
        this.sortFlag[filter] = true;
      }
    },
    sortingItems(filter) {
      this.sortFlagToggle(filter);

      if(filter === 'market' || filter === 'mentorTitle') {
        this.nameStringSorting(filter);
        return;
      }

      this.items.sort((a,b) => {
        if(this.sortFlag[filter]) return b[filter] - a[filter];
        else return a[filter] - b[filter];  
      })
    },
    nameStringSorting(filter) {
      if(this.sortFlag[filter]) {
        this.items.sort((a,b)=> {
          if(a[filter] > b[filter]) return -1;
          else if(a[filter] < b[filter]) return 1;
          else return 0;
        })
      } else {
        this.items.sort((a,b)=> {
          if(a[filter] > b[filter]) return 1;
          else if(a[filter] < b[filter]) return -1;
          else return 0;
        })
      }
    }
  }
}
</script>

<style lang='scss'>
  @import './css/hitSignList.scss';
</style>