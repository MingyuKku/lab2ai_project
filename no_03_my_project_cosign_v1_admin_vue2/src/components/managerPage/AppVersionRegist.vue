<template>
  <div class="app-version-regist-wrap">
    <div class="header">
      <h1>APP 버전 등록</h1>
    </div>
    <div class="contents">
      <div class="table_wrap">
        <table>
          <tbody>
            <tr class="no-layout">
              <th></th>
              <td><i>*</i><span>항목은 필수 입력 사항입니다.</span></td>
            </tr>
            <tr v-for="row,idx in rows" :key="idx" :class="row.info ? `more-border-${row.info.text.length}` : ''">
              <th><span class="require" v-if="row.require">*</span>{{ row.title }}</th>
              <td>
                <div class="content" :class="row.type" v-if="row.type === 'radio'">
                  <div class="radio-wrap" v-for="item in row.radioData" :key="item.value ? item.value : item">
                    <input :id="item.value ? item.value : item" type="radio" :value="item.value ? item.value : item" v-model="row.bindData" />
                    <label :for="item.value ? item.value : item">
                      <div class="outer-circle"><span class="inner-circle"></span></div>
                      <span class="text">{{ item.value ? item.name : item }}</span>
                    </label>
                  </div>
                </div>

                <div class="content" :class="row.type" v-if="row.type === 'input'">
                  <input type="text" v-model="row.bindData" :placeholder="row.placeholder" />
                  <div class="info-list" v-if="row.info">
                    <span class="info" v-for="text,i in row.info.text" :key="i">{{ text }}</span>
                  </div>
                  <!-- <span class="error" v-if="row.error && row.error.flag">{{ row.error.text }}</span> -->
                </div>

                <div class="content" :class="row.type" v-if="row.type === 'textarea'">
                  <textarea style="width:100%; height: 150px;" v-model="row.bindData"></textarea>
                  <!-- <span class="error" v-if="row.error && row.error.flag">{{ row.error.text }}</span> -->
                </div>

                <div class="content" :class="row.type" v-if="row.type === 'datepicker'">
                  <DatePicker 
                    v-model="row.bindData" 
                    type="datetime"
                    valueType="date"
                    format="YYYY-MM-DD HH:mm"
                    placeholder="날짜를 선택해 주세요."
                  >
                  </DatePicker>
                </div>

              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="buttons">
        <button type="button" @click="$router.go(-1)">취소</button>
        <button type="button" @click="registVersion(updateId)">저장</button>
      </div>
      <button class="delete-btn" v-if="updateId" @click="deleteVersion(updateId)">버전 삭제</button>
    </div>
  </div>
</template>

<script>
import { api_versionDetail_admin } from '@/api/version';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ko';

export default {
  components: {
    DatePicker 
  },
  data() {
    return {
      updateId: null,
      updateFlag: true,
      rows: [
        {
          key: 'platformType',
          type: 'radio',
          title: '플랫폼',
          radioData: [
            {value: 'AOS', name: 'AOS'},
            {value: 'IOS', name: 'iOS'},
          ],
          bindData: '',
          require: true,
        }, {
          key: 'version',
          type: 'input',
          title: 'APP 버전',
          bindData: '',
          placeholder: 'ex) 1.1.1',
          require: true,
          info: {
            flag: true,
            text: [
              '* 형식: 띄어쓰기 없이 n.n.n (n은 임의의 자연수. 마침표(.)로 구분.)',
            ],
            regExp: /^\d{1,}[.]\d{1,}[.]\d{1,}$/
          },
        }, {
          key: 'updateStateType',
          type: 'radio',
          title: '업데이트 타입',
          radioData: [
            {value: 'NORMAL', name: '일반'},
            {value: 'OFFER_UPDATE', name: '권장'},
            {value: 'ESSENTIAL_UPDATE', name: '강제'},
          ],
          bindData: '',
          require: true,
        }, {
          key: 'memo',
          type: 'textarea',
          title: '업데이트 내용',
          bindData: '',
          require: false,
        }, {
          key: 'createdAt',
          type: 'datepicker',
          title: '릴리즈 일시',
          bindData: new Date(),
          require: true,
        }
      ],
    }
  },
  created() {
    this.updateId = this.$route.params.id
    if (this.updateId) this.getVersionDetail(this.updateId); // 라우트 파람이 있는 경우 -> 버전 수정모드
  },
  methods: {  
    transmitData(data) {
      return data ? Date.toUtcText(data).format('yyyy-MM-ddTHH:mm') : data;
    },
    async getVersionDetail(updateId) {  // 버전 수정모드로 접근시
      const { data } = await api_versionDetail_admin(updateId);
      const { versionControl } = data.data;

      this.rows = this.rows.map(rowItem => {
        if (rowItem.title === '릴리즈 일시') { // 릴리즈 날짜는 KST로 변환해야 하기에 분기처리
          return {
            ...rowItem,
            bindData: new Date(Date.parseUtcText(versionControl[rowItem.key]).format('yyyy-MM-ddTHH:mm'))
          }

        } else {
          return {
            ...rowItem,
            bindData: versionControl[rowItem.key]
          }
        }
      })
    },
    registVersion(updateId){
      if (!this.updateFlag) return this.updateFlag = true;
      this.updateFlag = false; 

      let formData = new FormData();
      
      for (let i = 0; i < this.rows.length; i++) {
        const rowItem = this.rows[i];
        
        if (rowItem.bindData) {  // 데이터가 존재할 때만 보낸다

          if (rowItem.title === 'APP 버전') {
            // APP 버전 형식 체크
            if (!rowItem.info.regExp.test(rowItem.bindData)) {
              this.updateFlag = true;
              return alert('APP 버전을 형식에 맞게 입력해 주세요.'); 
            }
          }

          if (rowItem.title === '릴리즈 일시') {  // 릴리즈 일시 시간은 utc로 변환해 보냄
            formData.append(rowItem.key, this.transmitData(rowItem.bindData));
          } else {
            formData.append(rowItem.key, rowItem.bindData);
          }
          
        } else {
          if (rowItem.require) {  // 필수사항을 입력하지 않았을 경우
            this.updateFlag = true; 
            return alert('필수 항목에 내용을 입력해 주세요.');
          }
        }
      }


      for (let key of formData.keys()) {
        console.log(key, formData.get(key))

      }

      this.updateFlag = true;

      if (updateId) {  // 업데이트인 경우
        formData.append('vcId', updateId); // id값을 넣어줌
        this.$emit('openModal', true, 12, 'version-update', formData);
      } else {   // 등록인 경우
        this.$emit('openModal', true, 12, 'version-regist', formData);
      }
    },
    async deleteVersion(updateId) {
      this.$emit('openModal', true, 13, 'version-delete', updateId);
    },
  }
}
</script>

<style lang='scss'>
  @import './css/appVersionRegist.scss';
</style>