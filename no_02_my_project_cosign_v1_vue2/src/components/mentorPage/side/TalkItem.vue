<template>
  <div class="talk_list_wrap">
    <div class="user_info">
      <div class="user">
        <h2>{{comment.writerName}}</h2>
        <span class="recovery" v-if="loginInfo !== null && loginInfo.adminCk && comment.deleteCk" @click="onClickRecovery"><i class="xi-redo"></i></span>
        <span class="delete" v-if="loginInfo !== null && loginInfo.adminCk && !comment.deleteCk" @click="onClickDelete"><i class="xi-trash"></i></span>
      </div>
      <p>{{writeTime}}</p>
    </div>
    <p>{{comment.content}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import {API_URL} from '@/core/apiUrl';

export default {
  props: ['comment', 'LoadComment'],
  computed: {
    ...mapGetters('loginStore', ['loginInfo']),
    ...mapGetters('mentorRouteStore', ['mentorId']),
    writeTime() {
      return new Date(this.comment.inputTime).diffNow();
    }
  },
  methods: {
    async onClickDelete() {
      if(confirm('삭제하시겠습니까?')) {
        await axios.post(`${API_URL}/api/mentor_page/comment/remove/${this.mentorId}/${this.comment.id}`, {}, {withCredentials: true});
        this.comment.deleteCk = true;
      }
    },
    async onClickRecovery() {
      if(confirm('복구하시겠습니까?')) {
        await axios.post(`${API_URL}/api/mentor_page/comment/revert/${this.mentorId}/${this.comment.id}`, {}, {withCredentials: true});
        this.comment.deleteCk = false;
      }
    }
  }
}
</script>

<style scoped lang='scss'>
  @import './css/talkItem.scss';  
</style>