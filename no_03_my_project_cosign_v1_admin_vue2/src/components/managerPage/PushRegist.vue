<template>
    <div class="feedRead_wrap">
      <div class="header">
        <h1>푸시 전송</h1>
      </div>
      <div class="content">
        <div class="table_wrap">
          <table>
            <tr v-for="table,idx in productTable" :key="idx">

              <div :class="table.type" v-if="table.type === 'input'">
                <td class="td_tit">{{ table.title }}</td>
                <td class="td_cont">
                  <input type="text" v-model="table.data">
                </td>
              </div>

              <div :class="table.type" v-else-if="table.type === 'textarea'">
                <td class="td_tit">{{ table.title }}</td>
                <td class="td_cont">
                    <textarea style="width:100%; height: 150px;" v-model="table.data"></textarea>
                </td>
              </div>
            </tr>
           
            </table>
        </div>
        <button type="button" class="list" @click="sendPush">전송</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    components: {
    },
    data() {
      return {
        keyword: '',
        productTable: [
          {key: 'title', title: '제목', alert: '제목을 입력 해 주세요', data: '', type: 'input'},
          {key: 'deepLink', title: '딥링크', alert: '딥링크를 입력 해 주세요', data: '', type: 'input'},
          {key: 'content', title: '내용', alert: '내용을 입력 해 주세요', data: '', type: 'textarea'},
        ],
      }
    },
    methods: {  
      sendPush(){
        let updateDataKey = this.productTable.map(item => item.key);
        let formData = new FormData();
  
        for(let data of this.productTable) {
          if(updateDataKey.includes(data.key)) {
            formData.append(data.key, data.data);
            // submit[data.key] = data.data;
  
            if(data.alert) {
              if(data.data == '') {
                alert(data.alert); return;
              }
            }
          }
        }

        for(let key of formData.keys()) {
            console.log('등록데이터', key, formData.get(key))
        }

        console.log("formData", formData);
        
        this.$emit('openModal', true, 10, 'alarm', formData)
      },
    }
  }
  </script>
  
  <style lang='scss'>
    @import './css/feedRegist.scss';
  </style>