<template>
  <transition name="fade2">
    <div class="modelDescription_wrap" v-if="isDescModal" @click="closeModal">
      <DTW v-if="$route.params.page_id === 'dtw'"/>
      <Rabbit v-if="$route.params.page_id === 'rabbit'"/>
      <BullNews v-if="$route.params.page_id === 'news'"/>
      <TweetsKeywords v-if="$route.params.page_id === 'sns'" />
      <UpDown v-if="$route.params.page_id === 'updown'" />
      <Homerun v-if="$route.params.page_id === 'homerun'" />
      <Bottom v-if="$route.params.page_id === 'bottom'" />
      <Rocket v-if="$route.params.page_id === 'rocket'" />
      <Global v-if="$route.params.page_id === 'global'" />
      <HoonBot v-if="$route.params.page_id === 'hoonbot'" />
      <HoonBotLight v-if="$route.params.page_id === 'hoonbotlight'" />
    </div>
  </transition>
</template>

<script>
import DTW from '@/components/mentorPage/top/ModelDescription/DTW'
import Rabbit from '@/components/mentorPage/top/ModelDescription/Rabbit'
import BullNews from '@/components/mentorPage/top/ModelDescription/BullNews'
import TweetsKeywords from '@/components/mentorPage/top/ModelDescription/TweetsKeywords'
import UpDown from '@/components/mentorPage/top/ModelDescription/UpDown'
import Homerun from '@/components/mentorPage/top/ModelDescription/Homerun'
import Bottom from '@/components/mentorPage/top/ModelDescription/Bottom'
import Rocket from '@/components/mentorPage/top/ModelDescription/Rocket'
import Global from '@/components/mentorPage/top/ModelDescription/Global'
import HoonBot from '@/components/mentorPage/top/ModelDescription/HoonBot'
import HoonBotLight from '@/components/mentorPage/top/ModelDescription/HoonBotLight'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {DTW,BullNews,TweetsKeywords,UpDown,Homerun,Bottom,Rocket,Global,HoonBot,HoonBotLight,Rabbit},
  data() {
    return {
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters('signStore', ['isDescModal']),
  },
  methods: {
    ...mapActions('signStore', ['toggleDescModal']),
    closeModal(e) {
      if(e.target.className === 'modelDescription_wrap') {
        this.toggleDescModal(false);
      }
    }
  }
}
</script>

<style lang='scss'>
  @import './css/modelDescription.scss';
</style>