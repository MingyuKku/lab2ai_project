<template>
  <div class="sign_now_news_wrap">
    <header>
      <span><img :src="`${imgURL}mentorPage/news_icon.svg`" alt="뉴스아이콘"></span>
      <h2>연관 뉴스&콘텐츠</h2>
    </header>
    <ul class="news_body">
      <li v-for="(link, idx) in newsLinks" :key="idx">
        <a :href="link.url" target="_blank">
          <span></span>
          <p v-if="link.title !== null">{{link.title}}</p>   
          <p v-else>{{link.url}}</p>
          <i class="xi-external-link"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: ['newsLinks'],
  data() {
    return {
    }
  },
  computed: {
  }
}
</script>

<style lang='scss'>
  @import './css/signNowNews.scss';
</style>