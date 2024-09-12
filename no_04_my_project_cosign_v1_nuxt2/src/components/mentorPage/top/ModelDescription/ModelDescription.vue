<template>
  <transition name="fade2">
    <div class="modelDescription_wrap" v-if="isDescModal" @click="closeModal">
      <DTW v-if="mentorId === 'dtw'"/>
      <Rabbit v-if="mentorId === 'rabbit'"/>
      <BullNews v-if="mentorId === 'news'"/>
      <TweetsKeywords v-if="mentorId === 'sns'" />
      <UpDown v-if="mentorId === 'updown'" />
      <Homerun v-if="mentorId === 'homerun'" />
      <Bottom v-if="mentorId === 'bottom'" />
      <Rocket v-if="mentorId === 'rocket'" />
      <Global v-if="mentorId === 'global'" />
      <!-- <HoonBot v-if="mentorId === 'hoonbot'" />
      <HoonBotLight v-if="mentorId === 'hoonbotlight'" /> -->
      <NewGlobal v-if="mentorId === 'document'" />
    </div>
  </transition>
</template>

<script>
import DTW from '@/src/components/mentorPage/top/ModelDescription/DTW'
import Rabbit from '@/src/components/mentorPage/top/ModelDescription/Rabbit'
import BullNews from '@/src/components/mentorPage/top/ModelDescription/BullNews'
import TweetsKeywords from '@/src/components/mentorPage/top/ModelDescription/TweetsKeywords'
import UpDown from '@/src/components/mentorPage/top/ModelDescription/UpDown'
import Homerun from '@/src/components/mentorPage/top/ModelDescription/Homerun'
import Bottom from '@/src/components/mentorPage/top/ModelDescription/Bottom'
import Rocket from '@/src/components/mentorPage/top/ModelDescription/Rocket'
import Global from '@/src/components/mentorPage/top/ModelDescription/Global'
// import HoonBot from '@/src/components/mentorPage/top/ModelDescription/HoonBot'
// import HoonBotLight from '@/src/components/mentorPage/top/ModelDescription/HoonBotLight'
import NewGlobal from '@/src/components/mentorPage/top/ModelDescription/NewGlobal'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    DTW,
    BullNews,
    TweetsKeywords,
    UpDown,
    Homerun,
    Bottom,
    Rocket,
    Global,
    // HoonBot,
    // HoonBotLight,
    Rabbit,
    NewGlobal
  },
  data() {
    return {
    }
  },
  props: ['mentorId'],
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