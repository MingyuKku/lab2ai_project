<template>
  <div class="introduceMentor_wrap">
    <div class="header">
      <ul>
        <li class="introduceMentorMenu"
          :class="{active: tabMenuIdx == idx}"
          v-for="(tapMenu, idx) in introduceMentorMenus" :key="idx"
          @click="tabMenuIdx = idx"
        >
          <BtnEffect 
            duration='0.7'
            color='#FB9BA9'
          >
            <div class="inner">
              <div class="MenuIcon">
                <i class="xi-user"></i>
              </div>
              <h1>{{ tapMenu.title }}</h1>
            </div>
          </BtnEffect>
        </li>
      </ul>
    </div>  <!--header-->
    <div class="introduceMentorList">
      <IntroduceMentorBestEarning
        :mentorData="introduceMentorMenus[0].contents"
        :active="tabMenuIdx === 0"
      />
      <IntroduceMentorTotalList
        :mentorData="introduceMentorMenus[1].contents"
        :active="tabMenuIdx === 1"
      />
      <!-- <p>여기다가 시간을 넣으면 어떨까</p> -->
    </div>  <!--introduceMentorList-->
  </div>
</template>

<script>
import IntroduceMentorBestEarning from '@/components/index/main/introduceMentor/IntroduceMentorBestEarning';
import IntroduceMentorTotalList from '@/components/index/main/introduceMentor/IntroduceMentorTotalList';
import BtnEffect from '@/components/common/BtnEffect';
import axios from 'axios';
import { API_URL } from '@/core/apiUrl';
export default {
  components: {
    BtnEffect,IntroduceMentorBestEarning,IntroduceMentorTotalList,
  },
  data() {
    return {
      tabMenuIdx: 0,
      introduceMentorMenus: [
        {
          title: '멘토별 최고 수익 예측',
          contents: [
            {name: 'homerun', path: '/m/homerun/1107', img: `${process.env.VUE_APP_IMG_URL}index/main/introduceMentor/recommendMentor_1.png?version=${new Date().format('yyyyMMdd')}`},
            {name: 'dtw', path: '/m/dtw/6290', img: `${process.env.VUE_APP_IMG_URL}index/main/introduceMentor/recommendMentor_2.png?version=${new Date().format('yyyyMMdd')}`},
            {name: 'bitpapa', path: '/m/bitpapa/18', img: `${process.env.VUE_APP_IMG_URL}index/main/introduceMentor/recommendMentor_3.png?version=${new Date().format('yyyyMMdd')}`},
            {name: 'rabbit', path: '/m/rabbit/5552', img: `${process.env.VUE_APP_IMG_URL}index/main/introduceMentor/recommendMentor_4.png?version=${new Date().format('yyyyMMdd')}`},
          ],
        },
        {
          title: '코싸인 전체 멘토',
          contents: null,
        },
      ],
    }
  },
  mounted() {
    this.setTotalMentor();
  },
  methods: {
    async setTotalMentor() {
      await axios.get(`${API_URL}/api/mentor_page/success_rate/main`)
      .then(res=> {
        this.introduceMentorMenus[1].contents = res.data;
      })
    }
  }
}
</script>

<style lang='scss'>
  @import './css/introduceMentor.scss';
</style>