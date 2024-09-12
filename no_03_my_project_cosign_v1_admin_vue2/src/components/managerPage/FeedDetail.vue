<template>
  <div class="feed-detail-wrap">
    <div class="header">
      <h1>피드 수정</h1>
    </div>
    <div class="contents">
      <div class="table_wrap">
        <table>
          <tbody>
            <tr class="no-layout">
              <th></th>
              <td><span>* 항목은 필수 입력 사항입니다.</span></td>
            </tr>
            <tr v-for="row,idx in rows" :key="idx" :class="{'image': row.title === '이미지'}">
              <th><span class="require" v-if="row.require">*</span>{{ row.title }}</th>
              <td>
                <div class="content" :class="row.type" v-if="row.type === 'input'">
                  <input type="text" v-model="row.bindData" :placeholder="row.placeholder">
                  <span class="error" v-if="row.error && row.error.flag">{{ row.error.text }}</span>
                </div>

                <div class="content" :class="row.type" v-if="row.type === 'textarea'">
                  <textarea style="width:100%; height: 150px;" v-model="row.bindData"></textarea>
                  <span class="error" v-if="row.error && row.error.flag">{{ row.error.text }}</span>
                </div>

                <div class="content" :class="row.type" v-if="row.type === 'image'">
                  <div class="image-input">
                    <label for="input-image">찾아보기</label>
                    <input id="input-image" type="file" ref="refImage" accept="image/jpg, image/jpeg, image/png"
                    @change="(e) => uploadFile(idx, e)">
                    <div class="input-image-list">
                      <i class="xi-close-circle-o" @click="deleteFile(idx)" v-if="row.bindData"></i><span>{{ row.bindData.name }}</span>
                    </div>
                  </div>
                  <div class="info-list">
                    <span class="info" v-for="text,i in row.info.text" :key="i">{{ text }}</span>
                  </div>
                </div>

                <div class="content" :class="row.type" v-if="row.type === 'link'">
                  <input type="text" v-model="row.bindData">
                  <input type="checkbox" id="url_target" v-model="row.newWindow">
                  <label for="url_target">
                    <span>새 창</span>
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="buttons">
        <button type="button" @click="$router.push('/manager/feed')">취소</button>
        <button type="button" @click="saveFeed">저장</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updateFlag: true,
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
        }, {
          key: 'content',
          type: 'textarea',
          title: '내용',
          bindData: '',
          require: true,
          error: {
            flag: false,
            text: '* 내용을 입력해 주세요.'
          },
        }, {
          key: 'image',
          type: 'image',
          title: '이미지',
          bindData: '',
          require: false,
          info: {
            flag: true,
            text: [
              '* 이미지 파일은 1개만 등록 가능합니다.',
              '* 파일명은 영문 소문자, 숫자만 사용 가능합니다.'
            ]
          }
        }, {
          key: 'link',
          type: 'link',
          newWindow: false,
          title: '링크',
          bindData: '',
          require: false,
        }
      ],
    }
  },
  mounted() {
  },
  methods: {  
    uploadFile(rowIdx, event) {
      let fileInput = this.$refs.refImage[0];

      let checkFileType = ['image/png','image/jpg','image/jpeg']
      if (!checkFileType.includes(fileInput.files[0].type)) return;
      
      this.rows[rowIdx].bindData = fileInput.files[0];

      event.target.value = '';
    },  
    deleteFile(rowIdx) {        
      this.rows[rowIdx].bindData = '';
    },
    saveFeed(){
      if (!this.updateFlag) return this.updateFlag = true;
      this.updateFlag = false; 

      let formData = new FormData();

      for (let i = 0; i < this.rows.length; i++) {
        const rowItem = this.rows[i];

        if (rowItem.require && !rowItem.bindData) return rowItem.error.flag = true; // 필수사항을 입력하지 않았을 경우

        if (rowItem.bindData) { // 데이터가 존재하는 키만 추가
          formData.append(rowItem.key, rowItem.bindData);
        }
        if (rowItem.title === '링크') formData.append('newWindow', rowItem.newWindow) // 링크일 경우 새창도 추가
      }

      this.$emit('openModal', true, 9, 'feed', formData);
      this.updateFlag = true; 
    },
  }
}
</script>

<style lang="scss">
@import './css/feedDetail.scss';
</style>