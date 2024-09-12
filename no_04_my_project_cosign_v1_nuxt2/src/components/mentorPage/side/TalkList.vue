<template>
  <div class="talk_wrap">
    <div class="talk_body">
      <div class="user_talk">
        <div action="" :class="{form: isForm, active: isActive}">
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
              <img :src="`${$static.imgUrl}mentorPage/send_icon.svg`" alt="채팅입력버튼">
            </button>
          </div>
        </div>
      </div>

      <div class="talk_view_wrap" ref="talk_list">
        <TalkItem v-for='comment in comments' :key='comment.id' :comment='comment' :LoadComment="LoadComment" :mentorId="mentorId" />
      </div>
    </div>
  </div>
</template>

<script>
import TalkItem from '@/src/components/mentorPage/side/TalkItem.vue';
import { mapGetters, mapActions } from 'vuex';

  export default {
    components: {
      TalkItem
    },
    props: ['mentorId'],
    data(){
      return {
        imgURL: process.env.VUE_APP_IMG_URL,
        isForm: true,
        isActive: true,
        inputComment: '',
        comments: [],
        is_loading: false,
        is_end: false
      }
    },
    computed: {
      ...mapGetters('signStore', ['mobileActiveTabIdx']),
      ...mapGetters('loginStore', ['loginInfo']),
      placeHolderText() {
        if(this.loginInfo !== null) {
          return "이 채널에서 댓글을 입력해 주세요";
        } else {
          return "로그인이 필요합니다.";
        }
      }
    },
    mounted() {
      const $talk_list = this.$refs.talk_list;

      $talk_list.addEventListener('scroll', this.onScroll);
      this.LoadComment();
    },
    methods: {
      ...mapActions('popupStore', ['showLoginAlert']),
      onScroll() {
        if(this.is_end === false && this.is_loading === false) {
          const $talk_list = this.$refs.talk_list;
          
          if($talk_list.scrollHeight - $talk_list.scrollTop <= $talk_list.offsetHeight+2) {
            this.LoadMoreComment();
          }
        }
      },
      enterkeyPrevent() {
       window.addEventListener('keydown', function(e){
         if(e.keyCode == 13){
           e.preventDefault()
         }
       })
      },    
      async LoadComment() {
        this.is_loading = true;
        const res = await this.$axios.post(`/api/mentor_page/comment/list/${this.mentorId}`, {}, {withCredentials: true});
        
        if(this.comments.length === 0) {
          this.comments = res.data;
        } else {
          this.updateComments(res.data);
        }

        this.is_loading = false;

        setTimeout(() => {
          this.LoadComment();
        }, 5000);
      },
      updateComments(newComments) {
        for(let idx = 0; idx < newComments.length; idx++) {
          if(this.comments[0].id === newComments[idx].id) {
            this.comments = newComments.slice(0, idx).concat(this.comments);
            break;
          }
        }
      },
      async LoadMoreComment() {
        if(this.comments.length >= 30) {
          this.is_loading = true;
          const lastId = this.comments[this.comments.length - 1].id;

          const res = await this.$axios.post(`/api/mentor_page/comment/list/page/${this.mentorId}/${lastId}`, {}, {withCredentials: true});

          this.comments = this.comments.concat(res.data);

          if(res.data.length < 20) {
            this.is_end = true;
          }

          this.is_loading = false;
        }
      },
      onFocusInput() {
        if(this.loginInfo !== null) {
          this.isActive=true;
          this.enterkeyPrevent();
        }
      },
      async AddComment() {
        if(this.loginInfo !== null) {
          if(this.inputComment.length > 0) {
            await this.$axios.post(`/api/mentor_page/comment/add`,
            {mentorId: this.mentorId, content: this.inputComment}.getParam(),
            {withCredentials: true});

            this.inputComment = '';
            this.LoadComment();
          } else {
            alert("입력 값이 존재하지 않습니다.");
          }
        } else {
          this.showLoginAlert();
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