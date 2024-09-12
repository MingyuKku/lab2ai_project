<template>
  <div class="mentorPage_main_wrap">
    <SignNow class="sign_now"/>
    <MobileTabMenu class="mobileTabMenu"/>
    <SignHistory class="sign_list"/>
  </div>
</template>

<script>
  import SignNow from '@/components/mentorPage/main/SignNow.vue'
  import SignHistory from '@/components/mentorPage/main/SignHistory.vue'
  import MobileTabMenu from '@/components/mentorPage/side/MobileTabMenu.vue'
  export default {
    components: {
      SignNow, SignHistory, MobileTabMenu
    },
    data(){
      return {
      }
    },
    methods: {
      
    }
  }

</script>

<style lang='scss'>
  @import '@/components/mentorPage/main/css/main.scss';
</style>