<template>
  <div class="notice_wrap">
    <div class="title">
      <h1><i class="xi-bell-o"></i>공지사항</h1>
      <div class="more">
        <p><NuxtLink to="/help/notice">+ 전체보기</NuxtLink></p>
      </div>
    </div>
    <div class="lately_notice_list">
      <ul>
        <li v-for="(notice,idx) in NoticeList" :key="idx" @click="$router.push(`/help/notice/${notice.id}`)">
          <div class="inner" v-if="!notice.noList">
            <h2>{{notice.title}}</h2>
            <p>{{notice.createAtText}}</p> 
          </div>
          <div class="noList" v-else>
            <p>{{ notice.noList }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    NoticeList: Array,
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang='scss'>
  @import './css/notice.scss';
</style>