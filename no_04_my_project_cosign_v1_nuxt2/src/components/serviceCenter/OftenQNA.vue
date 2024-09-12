<template>
  <div class="oftenQNA_wrap">
    <div class="title clearFix">
      <div class="more">
        <p @click="$router.push('/help/faq')">+ 전체보기</p>
      </div>
    </div>
    <div class="questions">
      <div class="question" v-for="(faq,idx) in faqList" :key="idx"
      @click="onClickFaq(faq)">
        <h2>[{{faq.category}}]</h2>
        <p>{{faq.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    faqList: Array,
  },
  data() {
    return {
    }
  },
  methods: {
    onClickFaq(faq) {
      this.$router.push({name: 'help-faq', params: {category: faq.category, faqId: faq.id}})
    }
  }
  
}
</script>

<style lang='scss'>
  @import './css/oftenQNA.scss';
</style>