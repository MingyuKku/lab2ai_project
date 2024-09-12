<template>
  <div v-if="loading" class="spin_wrap">
  <!-- <div class="spin_wrap" > -->
    <div class="sk-swing">
      <div class="sk-swing-dot"></div>
      <div class="sk-swing-dot"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomLoading',
  props: ['apiLoading'],
  data() {
    return {
      loading: false,
      timer: null,
    }
  },
  watch: {
    apiLoading(val) {
      if(!val) {
        this.finish();
      } else {
        this.start();
      }
    }
  },
  created() {
    this.start();
  },
  // mounted() {
  //   this.start()
  // },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    start() {
      this.loading = true;
      if(!this.apiLoading) {
        this.finish();
      }
    },
    finish() {
      this.timer = setTimeout(()=> {
        this.loading = false;
        this.$emit('load')
      }, 500)
      
    }
  },
}
</script>

<style lang='scss'>
  @import './css/customLoading.scss';
</style>