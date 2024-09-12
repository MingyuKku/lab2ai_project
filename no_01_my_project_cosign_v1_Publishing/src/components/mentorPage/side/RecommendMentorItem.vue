<template>
  <div class="channel_list">
    <a :href="`/page/${channel.id}`">
      <div class="channel_info">
        <div class="ranking">{{ channel.no }}</div>
        <div class="channel_img">
          <img :src="channel.img" alt="채널이미지">
        </div>
        <div class="channel_name">
          <h3>{{channel.title}}</h3>
        </div>
      </div>
      <div class="earning">
        <p>{{channel.earningRate}}%</p>
      </div> 
    </a>
  </div>
</template>

<script>
export default {
  props: ['channel'],
  data(){
    return {
    }
  },
  methods: {
    moveChannel() {
      const path = `/page/${this.channel.id}`;

      if(this.$route.path !== path) {
        this.$router.push(path);
      }
    }
  }
}
</script>

<style scoped lang='scss'>
  @import './css/recommendMentorItem.scss';
 </style>