<template>
  <!-- <div class="adminModal_wrap" @click="closeModal"> -->
  <div class="managerModal_wrap">
    <div class="innerBox">
      <div class="submit">
        <h1>{{ popupData[modalContIdx].tit }}</h1>
        <div class="desc">
          <p v-for="(desc,idx) in popupData[modalContIdx].desc" :key="idx">{{ desc }}</p>
        </div>
        <div class="buttons">
          <button type="button" class="button confirm" v-if="popupData[modalContIdx].button1 !== undefined"
            @click="clickConfirm"
            :style="{backgroundColor: popupData[modalContIdx].button1.backColor,
            color: popupData[modalContIdx].button1.color}"
          >{{ popupData[modalContIdx].button1.text }}</button>
          <button type="button" class="button cancle" v-if="popupData[modalContIdx].button2 !== undefined"
            @click="closeModal"
            :style="{backgroundColor: popupData[modalContIdx].button2.backColor,
            color: popupData[modalContIdx].button2.color}"
          >{{ popupData[modalContIdx].button2.text }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  api_postDeleteFaq_admin, 
  api_postDeleteQna_admin, 
  api_postDeleteNotice_admin, 
  api_memberUpdated_admin, 
  api_productAdd_admin, 
  api_productUpdate_admin,
} from '@/api/manager'
import { 
  api_deletePromotion,
  api_cosignNews_delete,
  api_deletePopup,
  api_feed_add,
  api_feedUpdate_admin,
  api_feedDelete_admin,
  api_addAlarm,
} from '@/api/contents'
import { 
  api_version_add, 
  api_versionUpdate_admin,
  api_versionDelete_admin,
} from '@/api/version';

export default {
  props: ['modalContIdx','modalKey','data'],
  data() {
    return {
      registFlag: false,
      eventCk: null,
      popupData: [
        {  // index = 0
          tit: '[삭제]',
          desc: [
            '삭제 후 복구가 불가능합니다.', '삭제하시겠습니까?'
          ], 
          button1: {text: '확인', color: '#fff', backColor: '#F53B57'},
          button2: {text: '취소', color: '#777', backColor: '#e3e3e3'}
        },
        {  // index = 1
          tit: '[삭제]',
          desc: ['삭제되었습니다.'],
          button2: {text: '확인', color: '#fff', backColor: '#F53B57'}
        },
        {  // index = 2
          tit: '[완료]',
          desc: ['등록이 완료되었습니다.'],
          button2: {text: '확인', color: '#fff', backColor: '#F53B57'}
        },
        {  // index = 3
          tit: '[안내]',
          desc: [
            '첨부파일 용량이 초과되어 업로드 하실 수 없습니다.','파일의 전체 용량을 확인해 주세요.'
          ],
          button2: {text: '확인', color: '#fff', backColor: '#F53B57'}
        },
        {  // index = 4
          tit: '[안내]',
          desc: [
            '첨부파일 개수가 초과되어 업로드 하실 수 없습니다.','파일의 전체 개수를 확인해 주세요.'
          ], 
          button2: {text: '확인', color: '#fff', backColor: '#F53B57'}
        },
        {  // index = 5
          tit: '[수정]',
          desc: ['해당 회원의 정보를 정말 수정하시겠습니까?'],
          button1: {text: '확인', color: '#fff', backColor: '#F53B57'},
          button2: {text: '취소', color: '#777', backColor: '#e3e3e3'}
        },
        {  // index = 6
          tit: '[수정]',
          desc: ['수정되었습니다.'],
          button2: {text: '확인', color: '#fff', backColor: '#F53B57'}
        },

        {  // index = 7
          tit: '[안내]',
          desc: ['해당 제품을 등록하시겠습니까?'],
          button1: {text: '확인', color: '#fff', backColor: '#F53B57'},
          button2: {text: '취소', color: '#777', backColor: '#e3e3e3'}
        },
        {  // index = 8
          tit: '[수정]',
          desc: ['해당 제품의 정보를 정말 수정하시겠습니까?'],
          button1: {text: '확인', color: '#fff', backColor: '#F53B57'},
          button2: {text: '취소', color: '#777', backColor: '#e3e3e3'}
        },
        {  // index = 9
          tit: '[피드 등록]',
          desc: ['해당 피드를 등록하시겠습니까?'],
          button1: {text: '등록', color: '#fff', backColor: '#F53B57'},
          button2: {text: '취소', color: '#777', backColor: '#e3e3e3'}
        },     
        {  // index = 10
          tit: '[푸시 전송]',
          desc: ['해당 푸시를 전송하시겠습니까?'],
          button1: {text: '전송', color: '#fff', backColor: '#F53B57'},
          button2: {text: '취소', color: '#777', backColor: '#e3e3e3'}
        }, 
        {  // index = 11
          tit: '피드를 정말로 삭제하시겠습니까?',
          desc: [
            '삭제한 피드는 복구할 수 없습니다.',
          ], 
          button1: {text: '삭제하기', color: '#fff', backColor: '#F53B57'},
          button2: {text: '취소', color: '#777', backColor: '#e3e3e3'}
        }, {   // index = 12
          tit: '[버전 등록]',
          desc: ['버전을 등록하시겠습니까?'],
          button1: {text: '등록', color: '#fff', backColor: '#F53B57'},
          button2: {text: '취소', color: '#777', backColor: '#e3e3e3'}
        }, {  // index = 13
          tit: '',
          desc: [
            '등록된 버전을 정말로 삭제하시겠습니까?',
          ], 
          button1: {text: '삭제하기', color: '#fff', backColor: '#F53B57'},
          button2: {text: '취소', color: '#777', backColor: '#e3e3e3'}
        },
      ]
    }
  },
  computed: {
  },
  methods: {
    closeModal(e) {
      const closeTarget = ['button cancle', 'managerModal_wrap']
      console.log('취소', this.modalContIdx, this.modalKey)
      if(closeTarget.includes(e.target.className)) {
        this.$emit('closeModal', false, null)

        if(
          this.modalContIdx === 0 ||
          this.modalContIdx === 3 ||
          this.modalContIdx === 4 ||
          this.modalContIdx === 7 ||
          this.modalContIdx === 8
        ) return;
        
        if(this.modalKey === 'faq') {
          this.$router.push('/manager/faq')
        } else if(this.modalKey === 'notice') {
          this.$router.push('/manager/notice')
        } else if(this.modalKey === 'qna') {
          this.$router.push('/manager/qna')
        } else if(this.modalKey === 'member') {
          if(this.modalContIdx === 6) this.$router.go(0);
        } else if(this.modalKey === 'product') {
          if(this.modalContIdx === 6) this.$router.go(0);
          this.$router.push('/manager/product')
        } else if(
          this.modalKey === 'promotion' ||
          this.modalKey === 'theme' ||
          this.modalKey === 'popup' ||
          this.modalKey === 'alarm'
        ) {
          this.$router.go(0);
        } else if (
          this.modalKey === 'feed-add' ||
          this.modalKey === 'feed-update'
        ) {
          if (this.modalContIdx === 2) return this.$router.push('/manager/feed')
          this.$emit('closeModal', false, null);
        } else if (
          this.modalKey === 'version-regist' ||
          this.modalKey === 'version-update'
        ) {
          if (this.modalContIdx === 2) return this.$router.push('/manager/app_ver')
          this.$emit('closeModal', false, null);
        }
      }
    },
    async clickConfirm() {
      console.log("clickConfirm", this.modalKey, this.modalContIdx);
      if(this.modalKey === 'faq') {
        try {
          await api_postDeleteFaq_admin(this.$route.params.pageId)
          this.$parent._data.modalContIdx = 1;
        } catch(err) { console.log('faq삭제', err) }

      } else if(this.modalKey === 'qna') {
        try {
          await api_postDeleteQna_admin(this.$route.params.pageId)
          this.$parent._data.modalContIdx = 1;
        } catch(err) { console.log('qna삭제', err) }

      } else if(this.modalKey === 'notice') {
        try {
          await api_postDeleteNotice_admin(this.$route.params.pageId)
          this.$parent._data.modalContIdx = 1;
        } catch(err) { console.log('notice삭제', err) }

      } else if(this.modalKey === 'member') {

        if(this.data.eventCk === 'Y') this.eventCk = true
        else this.eventCk = false;

        const updateData = {
          uuid: this.data.uuid,
          email: this.data.email,
          nickName: this.data.nickName,
          eventCk: this.eventCk
        }

        try {
          await api_memberUpdated_admin(updateData)
          this.$parent._data.modalContIdx = 6;
        } catch(err) { console.log('회원정보수정',err) }
        
      } else if(this.modalKey === 'product') {

        if(this.modalContIdx === 6) this.$router.go(0);

        if(this.modalContIdx === 7) {
          console.log('넘어온데이터', this.data)
          const updateData = {
            productName: this.data.product,
            price: this.data.price,
            validateDate: this.data.validateDate,
            payCk: this.data.payCk,
            deleteCk: this.data.deleteCk,
            mentorPageId: this.data.uuid
          }

          try {
            const res = await api_productAdd_admin(updateData)
            if(res.data == true){
                this.$parent._data.modalContIdx = 2;
            } else {
              alert("상품 등록 실패입니다.")
            }

          } catch(err) { console.log('상품등록',err) }

        } else if(this.modalContIdx === 8) {
          const updateData = {
            id: this.data.id,
            productName: this.data.productName,
            price: this.data.price,
            validateDate: this.data.validateDate,
            payCk: this.data.payCk,
            deleteCk: this.data.deleteCk,
            mentorPageId: this.data.mentorPageId
          }

          try {
            const res = await api_productUpdate_admin(updateData)
            if(res.data == true){
                this.$parent._data.modalContIdx = 6;
            } else {
              alert("상품 수정 실패입니다.")
            }

          } catch(err) { console.log('상품수정',err) }
        }
        

      } else if(this.modalKey === 'promotion') {
        try {
          const res = await api_deletePromotion(this.data)
          console.log('삭제응답',res)
          if(res.data.code === 1000) {
            this.$parent._data.modalContIdx = 1;
          }

        } catch(err) { console.log('컨텐츠삭제',err) }

      } else if(this.modalKey === 'theme') {
        try {
          const res = await api_cosignNews_delete(this.data)
          console.log('삭제응답',res)
          if(res.data.code === 1000) {
            this.$parent._data.modalContIdx = 1;
          }

        } catch(err) { console.log('컨텐츠삭제',err) }

      } else if(this.modalKey === 'popup') {
        try {
          const res = await api_deletePopup(this.data)
          console.log('삭제응답',res)
          if(res.data.status === 200) {
            this.$parent._data.modalContIdx = 1;
          }

        } catch(err) { console.log('컨텐츠삭제',err) }
      } else if (this.modalKey === 'feed-add') {
        if (this.registFlag) return this.registFlag = false;

        this.registFlag = true;
        
        try {
          const res = await api_feed_add(this.data)
          // console.log('피드 등록응답',res)
          if(res.data.status === 200) {
            this.$parent._data.modalContIdx = 2;
          }

        } catch(err) { 
          this.$emit('closeModal', false, null);
          alert('오류로 인해 요청하신 작업을 완료할 수 없습니다. 리스트 페이지로 돌아갑니다');
           this.registFlag = false;
           return this.$router.push('/manager/feed');
        }

      } else if (this.modalKey === 'feed-update') {
        if (this.registFlag) return this.registFlag = false;

        this.registFlag = true;
        
        try {
          const res = await api_feedUpdate_admin(this.data)
          // console.log('피드 업뎃응답',res)
          if(res.data.status === 200) {
            this.$parent._data.modalContIdx = 2;
          }

        } catch(err) { 
          this.$emit('closeModal', false, null);
          alert('오류로 인해 요청하신 작업을 완료할 수 없습니다. 리스트 페이지로 돌아갑니다');
          this.registFlag = false;
          return this.$router.push('/manager/feed');
        }
        
      } else if (this.modalKey === 'feed-delete') {
        if (this.registFlag) return this.registFlag = false;

        this.registFlag = true;
        
        try {
          const res = await api_feedDelete_admin(this.data)
          console.log('피드 삭제',res)
          if(res.data.status === 200) {
            this.$emit('closeModal', false, null);
            this.$router.push('/manager/feed');
          }

        } catch(err) { 
          console.log(err)
          this.registFlag = false;
        }
        
      } else if (this.modalKey === 'alarm') {
        if (this.registFlag) return this.registFlag = false;

        this.registFlag = true;

        try {
          const res = await api_addAlarm(this.data)
          console.log('등록응답',res)
          if(res.data.status === 200) {
            this.$parent._data.modalContIdx = 2;
          }
          
        } catch(err) { 
          console.log('컨텐츠삭제',err)
          this.registFlag = false;
        }
      } else if (this.modalKey === 'version-regist') {
        if (this.registFlag) return this.registFlag = false;

        this.registFlag = true;
        
        try {
          const res = await api_version_add(this.data)
          console.log('버전 등록응답',res)
          if(res.data.status === 200) {
            this.$parent._data.modalContIdx = 2;
          }

        } catch(err) { 
          console.log(err)
          this.registFlag = false;
        }
      } else if (this.modalKey === 'version-update') {
        if (this.registFlag) return this.registFlag = false;

        this.registFlag = true;
        
        try {
          const res = await api_versionUpdate_admin(this.data)
          console.log('버전 업뎃응답',res)
          if(res.data.status === 200) {
            this.$parent._data.modalContIdx = 2;
          }

        } catch(err) { 
          console.log(err)
          this.registFlag = false;
        }
      } else if (this.modalKey === 'version-delete') {
        if (this.registFlag) return this.registFlag = false;

        this.registFlag = true;
        
        try {
          const res = await api_versionDelete_admin(this.data)
          console.log('피드 삭제',res)
          if(res.data.status === 200) {
            this.$emit('closeModal', false, null);
            this.$router.push('/manager/app_ver');
          }

        } catch(err) { 
          console.log(err)
          this.registFlag = false;
        }
        
      }
    }
  }
}
</script>

<style lang='scss'>
  @import './css/ManagerModal.scss';
</style>