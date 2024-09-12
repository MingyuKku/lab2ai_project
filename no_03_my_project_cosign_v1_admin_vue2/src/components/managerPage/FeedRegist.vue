<template>
  <div class="feed-regist-wrap">
    <div class="header">
      <h1>피드 등록</h1>
    </div>
    <div class="contents">
      <div class="table_wrap">
        <table>
          <tbody>
            <tr class="no-layout">
              <th></th>
              <td><span>* 항목은 필수 입력 사항입니다.(내용, 이미지 둘 중 하나는 필수 입력)</span></td>
            </tr>
            <tr v-for="row,idx in rows" :key="idx" :class="row.info ? `more-border-${row.info.text.length}` : ''">
              <th><span class="require" v-if="row.require">*</span>{{ row.title }}</th>
              <td>
                <div class="content" :class="row.type" v-if="row.type === 'input'">
                  <input type="text" v-model="row.bindData" :placeholder="row.placeholder" 
                  @input="row.bindData && row.error ? row.error.flag = false : true"
                  />
                  <div class="info-list" v-if="row.info">
                    <span class="info" v-for="text,i in row.info.text" :key="i">{{ text }}</span>
                    <span class="error" v-if="row.error && row.error.flag">{{ row.error.text }}</span>
                  </div>
                  <span class="error" v-else-if="row.error && row.error.flag">{{ row.error.text }}</span>
                </div>

                <div class="content" :class="row.type" v-if="row.type === 'textarea'">
                  <textarea style="width:100%; height: 150px;" v-model="row.bindData"
                  @input="row.bindData && row.error ? row.error.flag = false : true"></textarea>
                  <span class="error" v-if="row.error && row.error.flag">{{ row.error.text }}</span>
                </div>

                <div class="content" :class="row.type" v-if="row.type === 'image'">
                  <div class="image-input">
                    <label for="input-image">찾아보기</label>
                    <input id="input-image" type="file" ref="refImage" accept="image/jpg, image/jpeg, image/png, image/gif"
                    @change="(e) => uploadFile(idx, e)">
                    <div class="input-image-list">
                      <i class="xi-close-circle-o" @click="deleteFile(idx)" v-if="row.bindData"></i><span>{{ row.imgName }}</span>
                    </div>
                    <button class="prev-btn" :class="{'disabled': !row.prevImgSrc}" @click="row.prevImgSrc ? onPrevImage(idx):null">미리보기</button>
                  </div>
                  <div class="info-list">
                    <span class="info" v-for="text,i in row.info.text" :key="i">{{ text }}</span>
                  </div>
                </div>

                <div class="content" :class="row.type" v-if="row.type === 'link'">
                  <input type="text" v-model="row.bindData">
                  <input type="checkbox" id="url_target" v-model="row.newWindow">
                  <label for="url_target">
                    <span>새 창으로 열기</span>
                  </label>
                </div>

                <div class="content" :class="row.type" v-if="row.type === 'radio'">
                  <div class="radio-wrap" v-for="item in row.radioData" :key="item.value ? item.value : item">
                    <input type="radio" 
                      :id="item.value ? item.value : item"
                      :value="item.value ? item.value : item" 
                      v-model="row.bindData" 
                    />
                    <label :for="item.value ? item.value : item">
                      <div class="outer-circle"><span class="inner-circle"></span></div>
                      <span class="text">{{ item.value ? item.name : item }}</span>
                    </label>
                  </div>
                  <DatePicker ref="datePicker" v-if="row.bindData === 'WAITING_RESERVATION'"
                    v-model="row.date" 
                    type="datetime"
                    valueType="date"
                    format="YYYY-MM-DD HH:mm"
                    placeholder="날짜를 선택해 주세요."
                    :disabledDate="row.disabledDateRange"
                    :disabledTime="row.disabledTimeRange"
                    :minute-options="row.custom.minuteOpt"
                  >
                  </DatePicker>
                  <div class="reservation-time" v-if="adminId && row.registType === 'RESERVATION'">
                    <span class="text">예약 등록 일시</span>
                    <div class="date-wrap"><span>{{ row.date }}</span></div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="buttons">
        <button type="button" @click="$router.push('/manager/feed')">취소</button>
        <button type="button" @click="saveFeed(adminId)">저장</button>
      </div>
      <button class="delete-btn" v-if="adminId" @click="deleteFeed(adminId)">피드 삭제</button>
    </div>
  </div>
</template>

<script>
import { api_feedDetail_admin, api_feedStateCheck_admin } from '@/api/contents';
import { api_getCoinList_admin } from '@/api/login';

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ko';
export default {
  components: {
    DatePicker 
  },
  data() {
    return {
      adminId: null,
      updateFlag: true,
      coinList: [],
      rows: [
        {
          key: 'title',
          type: 'input',
          title: '제목',
          bindData: '',
          require: true,
          error: {
            flag: false,
            text: '* 내용을 입력해 주세요.'
          },
        }, {
          key: 'coin',
          type: 'input',
          title: '대상 코인',
          bindData: '',
          placeholder: 'ex) KRW-BTC',
          require: false,
          info: {
            flag: true,
            text: [
              '* 형식 : 띄어쓰기 없이 KRW-코인명 영문 약어｜하이픈(-) 사용',
            ],
            regExp: /^(krw-|KRW-)[a-zA-Z]{1,}$/
          },
          error: {
            flag: false,
            text: '* 입력된 대상 코인이 형식에 맞지 않습니다.'
          },
        }, {
          key: 'content',
          type: 'textarea',
          title: '내용',
          bindData: '',
          require: false,
        }, {
          key: 'image',
          type: 'image',
          title: '이미지',
          bindData: '',
          imgName: '', // 화면에 이미지 url 표출하기 위한
          prevImgSrc: '', // 이미지 미리보기 구현을 위한
          require: false,
          info: {
            flag: true,
            text: [
              '* 이미지 파일은 1개만 등록 가능합니다.',
              '* 파일명은 영문자, 숫자만 사용 가능합니다.'
            ],
            regExp: /^[a-zA-Z0-9]*$/
          }
        }, {
          key: 'link',
          type: 'link',
          newWindow: false,
          title: '링크',
          bindData: '',
          require: false,
        }, {
          key: 'registrationType',
          type: 'radio',
          title: '등록 방식',
          radioData: [
            {value: 'IMMEDIATELY', name: '즉시 등록'},
            {value: 'WAITING_RESERVATION', name: '예약 등록'},
          ],
          bindData: 'IMMEDIATELY',
          registType: null, // 업데이트 시 빽엔드에서 받은 타입을 보존하기 위해
          require: true,
          date: new Date(),
          disabledDateRange(date) {
            const today = new Date();
            const day = today.getDate();
            return date <= new Date(new Date().setDate(day - 1)) // 현재보다 과거 날짜는 선택할 수 없도록
          },
          disabledTimeRange(date) {
            return date < new Date() // 현재보다 과거 날짜는 선택할 수 없도록
          },
          custom: {
            minuteOpt: [
              0, 10, 20, 30, 40, 50
            ]
          },
          error: {
            flag: false,
            text: '현재보다 이전 시간에는 예약 피드를 등록할 수 없습니다.'
          },
        },
      ],
    }
  },
  created() {
    this.getCoinList();
    this.adminId = this.$route.params.adminId;
    if (this.adminId) this.getFeedDetail(this.adminId); // 라우트 파람이 있는 경우 -> 피드 수정모드
  },
  mounted() {
  },
  methods: {  
    async checkType(id, type) {
      const { data } = await api_feedStateCheck_admin(id);
      const { feedAdminType } = data.data;

      // return true = 통과 / return false = 업뎃 안함
      if (!feedAdminType) return false; // 삭제된 피드인 경우
      if (feedAdminType === 'WAITING_RESERVATION') return true; // 아직 대기중인 피드인 경우
      else {
        if (type === 'IMMEDIATELY') return true; // 즉시 등록하려는 경우
      }

      return false;
    },
    async getCoinList() {
      const { data } = await api_getCoinList_admin();
      const { coinCodeList } = data.data;
      this.coinList = coinCodeList.map(coin => coin.market);
    },
    async getFeedDetail(adminId) {  // 피드 수정모드로 접근시

      const { data } = await api_feedDetail_admin(adminId);
      const { feedAdmin } = data.data;

      this.rows = this.rows.map(rowItem => {
        if (rowItem.title === '이미지') {  // 이미지인 경우 화면 표출을 위해 분기 처리
          return {
            ...rowItem,
            bindData: feedAdmin[rowItem.key],
            imgName: feedAdmin.image,
            prevImgSrc: feedAdmin.image
          }
        } else if (rowItem.title === '링크') {  // 링크인 경우 새창 데이터를 넣어주기 위해 분기 처리
          return {
            ...rowItem,
            bindData: feedAdmin[rowItem.key],
            newWindow: feedAdmin.newWindow
          }
        } else if (rowItem.title === '등록 방식') {  // 등록 방식인 경우 등록 시간을 KST로 변환해야 하기에 분기 처리
          return {
            ...rowItem,
            radioData: feedAdmin.registrationType !== 'WAITING_RESERVATION' // 등록된 피드는 예약 등록을 할 수 없도록
            ? [{value: 'IMMEDIATELY', name: '즉시 등록'}]
            : rowItem.radioData,
            bindData: feedAdmin.registrationType !== 'WAITING_RESERVATION' ? // 등록된 피드인 경우 라디오 버튼이 '즉시 등록'으로만 노출되도록 데이터를 변경
            'IMMEDIATELY' 
            : feedAdmin[rowItem.key],
            registType: feedAdmin.registrationType,
            date: feedAdmin.registrationType !== 'WAITING_RESERVATION'
            ? new Date(Date.parseUtcText(feedAdmin.createdAt)).format('yyyy-MM-dd HH:mm')
            : new Date(Date.parseUtcText(feedAdmin.registrationTime))
          }
        } else {
          return {
            ...rowItem,
            bindData: feedAdmin[rowItem.key]
          }
        }
      })
    },
    uploadFile(rowIdx, event) {
      let fileInput = this.$refs.refImage[0];
      const thisItem = this.rows[rowIdx];

      let checkFileType = ['image/png','image/jpg','image/jpeg', 'image/gif'];
      if (!checkFileType.includes(fileInput.files[0].type)) return event.target.value = ''; // 이미지 형식 체크

      const pureName = fileInput.files[0].name.slice(0,fileInput.files[0].name.lastIndexOf('.')); // 파일명 끝에 .jpg제거
      if (!thisItem.info.regExp.test(pureName)) { // 파일명 형식 체크
        alert('파일명이 형식에 맞지 않아 이미지를 업로드할 수 없습니다.'); return event.target.value = '';
      }
      
      thisItem.bindData = fileInput.files[0];
      thisItem.imgName = fileInput.files[0].name; // 이미지 네임만 따로 넣는 공간 (화면에 출력하기 위해)

      // 이미지 프리뷰 스크립트
      const reader = new FileReader();
      reader.onload = (e) => {
        thisItem.prevImgSrc = e.target.result;
      }
      reader.readAsDataURL(thisItem.bindData);

      event.target.value = '';
    },  
    onPrevImage(rowIdx) {
      this.$emit('onPrevImage',this.rows[rowIdx].prevImgSrc);
    },
    deleteFile(rowIdx) {        
      this.rows[rowIdx].bindData = '';
      this.rows[rowIdx].imgName = '';
      this.rows[rowIdx].prevImgSrc = '';
    },
    async saveFeed(adminId){
      if (!this.updateFlag) return this.updateFlag = true;
      this.updateFlag = false; 

      let nonContentOrImageCount = 0; // 내용이나 이미지 데이터가 없는 경우 올려주는 카운트

      let formData = new FormData();

      for (let i = 0; i < this.rows.length; i++) {
        const rowItem = this.rows[i];

        typeof rowItem.bindData === 'string' 
        ? rowItem.bindData = rowItem.bindData.replace(/^\s+|\s+$/gm,''):null; // 문자열 앞뒤 공백 제거

        if (rowItem.require && !rowItem.bindData) { // 필수사항을 입력하지 않았을 경우
          rowItem.error.flag = true;
          this.updateFlag = true; 
          return;
        }

        if (rowItem.title === '대상 코인' && rowItem.bindData) {
          // 대상 코인 형식 체크
          if (!rowItem.info.regExp.test(rowItem.bindData)) {
            rowItem.error.flag = true;
            this.updateFlag = true;
            return; 
          }
          // 대상 코인이 실제 존재하는 코인인지 체크
          const upper = rowItem.bindData.toUpperCase();
          if (!this.coinList.includes(upper)) {
            rowItem.error.flag = true;
            this.updateFlag = true;
            return;
          }
        }

        if (rowItem.title === '링크') formData.append('newWindow', rowItem.newWindow) // 새창 데이터도 추가해 준다
        
        if (rowItem.bindData) { // 데이터가 존재할 때만 보낸다
          if (rowItem.title === '이미지' && typeof(rowItem.bindData) === 'string') continue; // 이미지가 수정되지 않은 경우 패스(이미지가 교체된 경우 타입은 object가 됨)

          if (rowItem.title === '등록 방식') {
            let date = rowItem.date;
            if (rowItem.bindData === 'IMMEDIATELY') date = new Date();
            else {
              if (date.valueOf() <= new Date().valueOf()) {
                alert(rowItem.error.text);
                return this.updateFlag = true;
              }
            }
            formData.append('registrationTime', Date.toUtcText(date).format('yyyy-MM-ddTHH:mm')); // 등록 시간은 utc로 변환해 보냄

            if (adminId) {
              try {
                // 업뎃하기 전에 서버에 상태체크
                const res = await this.checkType(adminId, rowItem.bindData);
                if (!res) {
                  alert('오류로 인해 요청하신 작업을 완료할 수 없습니다. 리스트 페이지로 돌아갑니다');
                  return this.$router.push('/manager/feed');
                }
              } catch (err) {
                alert('오류로 인해 요청하신 작업을 완료할 수 없습니다. 리스트 페이지로 돌아갑니다');
                return this.$router.push('/manager/feed');
              }
      
              if (rowItem.registType !== 'WAITING_RESERVATION') rowItem.bindData = rowItem.registType; // 업데이트할 경우 빽엔드에서 받은 type을 그대로 보내준다
            }
          }
          
          formData.append(rowItem.key, rowItem.bindData);

        } else { // 데이터가 없는 경우
          if (rowItem.title === '내용') nonContentOrImageCount++;
          if (rowItem.title === '이미지') {
            nonContentOrImageCount++;
            if (adminId) formData.append(rowItem.key, rowItem.bindData); // 업데이트 시 이미지는 데이터가 없어도 보낸다(이미지 일부러 삭제한 경우를 위해)
          }
        }
      }

      if (nonContentOrImageCount === 2) return alert('내용 입력 또는 이미지 업로드가 필요합니다'); // 내용이나 이미지 모두 없는 경우

      if (adminId) { // 피드 업데이트
        formData.append('feedAdminId', adminId);
        this.$emit('openModal', true, 9, 'feed-update', formData);
      } else { // 피드 등록
        this.$emit('openModal', true, 9, 'feed-add', formData); 
      }

      this.updateFlag = true; 
    },
    async deleteFeed(adminId) {
      this.$emit('openModal', true, 11, 'feed-delete', adminId);
    },
  }
}
</script>

<style lang='scss'>
  @import './css/feedRegist.scss';
</style>