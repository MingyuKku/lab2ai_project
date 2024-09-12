<template>
  <div class="talk_wrap" :class="{active: mobileActiveTabIdx === 1}">
    <div class="talk_body">
      <div class="user_talk">
        <div action="" :class="{form: isForm, active: isActive}"
            >
          <!-- <p class="id">아이디</p> -->
          <textarea ref="textarea"
            type="text"
            v-model="inputComment"
            :placeholder="placeHolderText"
            :disabled="loginInfo===null"
            @focus="onFocusInput"
            @keyup="onKeyUp"    
          ></textarea>
          <div class="form_bottom clearFix">
            <button type="submit" @click="AddComment">
              <img :src="`${imgURL}mentorPage/send_icon.svg`" alt="채팅입력버튼">
            </button>
          </div>
        </div>
      </div>

      <div class="talk_view_wrap">
        <TalkItem v-for='comment in comments' :key='comment.id' :comment='comment' />
      </div>
    </div>
  </div>
</template>

<script>
import TalkItem from '@/components/mentorPage/side/TalkItem.vue';
import { mapGetters } from 'vuex';
import axios from 'axios';
import {API_URL} from '@/core/apiUrl';

  export default {
    components: {
      TalkItem
    },
    data(){
      return {
        imgURL: process.env.VUE_APP_IMG_URL,
        isForm: true,
        isActive: true,
        inputComment: '',
        comments: []
      }
    },
    computed: {
      ...mapGetters('signStore', ['mobileActiveTabIdx', 'pageId']),
      ...mapGetters('loginStore', ['loginInfo']),
      placeHolderText() {
        if(this.loginInfo !== null) {
          return "이 채널에서 댓글을 입력해 주세요";
        } else {
          return "로그인이 필요합니다.";
        }
      }
    },
    watch: {
      async pageId() {
        this.LoadComment();
      }
    },
    methods: {
      enterkeyPrevent() {
       window.addEventListener('keydown', function(e){
         if(e.keyCode == 13){
           e.preventDefault()
         }
       })
      },
      async LoadComment() {
        const res = await axios.get(`${API_URL}/api/mentor_page/comment/list/${this.pageId}/0/20`);

        this.comments = res.data;
      },
      onFocusInput() {
        if(this.loginInfo !== null) {
          this.isActive=true;
          this.enterkeyPrevent();
        }
      },
      async AddComment() {
        if(this.inputComment.length > 0) {
          await axios.post(`${API_URL}/api/mentor_page/comment/add`,
          {mentorPageId: this.pageId, content: this.inputComment}.getParam(),
          {withCredentials: true});

          this.inputComment = '';
          this.LoadComment();
        } else {
          alert("입력 값이 존재하지 않습니다.");
        }
      },
      onKeyUp(keyEvent) {
        if(keyEvent.key === 'Enter') {
          this.AddComment();
        }
      }      
    },
  }
</script>

<style lang='scss'>
  @import './css/talkList.scss';
</style>