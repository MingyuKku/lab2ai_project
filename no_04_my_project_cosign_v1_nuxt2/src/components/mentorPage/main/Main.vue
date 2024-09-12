<template>
  <div class="mentorPage_main_wrap">
    <SignNow class="sign_now" 
      :signOnProps="signOnProps" 
      :mentorId="mentorId" 
      :changeLink="changeLink" 
      :signPropsChange="signPropsChange"
    />
    <SignHistory class="sign_list" 
      :signOffProps="signOffProps" 
      :mentorId="mentorId" 
    />
  </div>
</template>

<script>
  import SignNow from '@/src/components/mentorPage/main/SignNow.vue'
  import SignHistory from '@/src/components/mentorPage/main/SignHistory.vue'
  export default {
    components: {
      SignNow, SignHistory
    },
    props: ['signOnProps', 'signOffProps', 'mentorId', 'changeLink', 'signPropsChange'],
    data(){
      return {
      }
    },
    methods: {
      
    }
  }

</script>

<style lang='scss'>
  @import '@/src/components/mentorPage/main/css/main.scss';
</style>