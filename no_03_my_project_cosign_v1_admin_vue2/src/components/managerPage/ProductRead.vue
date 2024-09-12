<template>
  <div class="productRead_wrap">
    <div class="header">
      <h1>1:1 문의</h1>
    </div>
    <div class="content">
      <div class="table_wrap">
        <table>
          <tr v-for="table,idx in productTable" :key="idx">
            <div :class="table.type" v-if="table.type === 'read'">
              <td class="td_tit">{{ table.title }}</td>
              <td class="td_cont">
                <p v-if="!table.isTime">{{ table.data }}</p>
                <p v-else>{{ paseUtcText(table.data) }}</p>
              </td>
            </div>

            <div :class="table.type" v-else-if="table.type === 'input'">
              <td class="td_tit">{{ table.title }}</td>
              <td class="td_cont">
                <input type="text" v-model="table.data" :disabled="!updateFlag">
              </td>
            </div>

            <div :class="table.type" v-else-if="table.type === 'read-search'">
              <td class="td_tit">{{ table.title }}</td>
              <td class="td_cont">
                <p>{{ table.data }}</p>
                <div class="search">
                  <input :class="{disabled: !updateFlag}" type="text" :disabled="!updateFlag" placeholder="멘토 UUID를 입력해 주세요." v-model="keyword">
                  <button :class="{disabled: !updateFlag}" type="button" @click="searchMentor">검색</button>
                </div>
              </td>
            </div>

            <div :class="table.type" v-else-if="table.type === 'radio'">
              <td class="td_tit">{{ table.title }}</td>
              <td class="td_cont" v-if="table.key === 'payCk'">
                <label>
                  <input @change="changRadioPay" type="radio" 
                  value="Y" name="payRadio" :checked="table.data" :disabled="!updateFlag">
                  <span>유료</span>
                </label>
                <label>
                  <input @change="changRadioPay" type="radio" 
                  value="N" name="payRadio" :checked="!table.data" :disabled="!updateFlag">
                  <span>무료</span>
                </label>
              </td>

              <td class="td_cont" v-else-if="table.key === 'deleteCk'">
                <label>
                  <input @change="changRadioDele" type="radio" 
                  value="Y" name="useableRadio" :checked="table.data" :disabled="!updateFlag">
                  <span>사용</span>
                </label>
                <label>
                  <input @change="changRadioDele" type="radio" 
                  value="N" name="useableRadio" :checked="!table.data" :disabled="!updateFlag">
                  <span>미사용</span>
                </label>
              </td>
            </div>
          </tr>


         
          </table>
      </div>
      <div class="buttons clearFix">
        <button type="button" @click="updateProduct">
          <span v-if="!updateFlag">수정하기</span>
          <span v-else>수정완료</span>
        </button>
      </div>
      <button type="button" class="list" @click="$router.push({name: 'Product', params: {page: $route.params.page} })">목록</button>
    </div>
  </div>
</template>

<script>

import { api_productDetail_admin, api_productSearchMentor_admin } from '@/api/manager'
export default {
  components: {
  },
  data() {
    return {
      updateFlag: false,
      keyword: '',
      productTable: [
        {key: 'id', title: '상품ID', data: '', type: 'read',},
        {key: 'productName', title: '상품명', alert: '상품명을 입력 해 주세요', data: '', type: 'input'},
        {key: 'mentorName', title: '멘토명', alert: '멘토ID를 입력 해 주세요', data: '', type: 'read-search'},
        {key: 'validateDate', title: '기간', alert: '기간을 입력 해 주세요', data: '', type: 'input'},
        {key: 'mentorPageId', title: '멘토ID', data: '', type: ''},
        {key: 'payCk', title: '유료여부', data: '', type: 'radio'},
        {key: 'price', title: '가격', data: '', alert: '가격을 입력 해 주세요', type: 'input'},
        {key: 'deleteCk', title: '사용', data: '', type: 'radio'},
        {key: 'createdAt', title: '생성일', data: '', type: 'read', isTime: true},
        {key: 'updatedAt', title: '수정일', data: '', type: 'read', isTime: true},
      ],
    }
  },
  mounted() {
    this.productDetailData(this.$route.params.pageId);
  },
  computed: {
    paseUtcText() {
      return (time) => time !== null ? Date.parseUtcText(time).format('yyyy-MM-dd HH:mm:ss'):'';
    },
  },
  methods: {
    async productDetailData(pageId) {
      await api_productDetail_admin(pageId)
      .then(res=> {
        this.productTable = this.productTable.map(t => {
          return {
            ...t,
            data: res.data[t.key]
          }
        })
        console.log('product read', res)
      })
      .catch(err=> { console.log(err) })
    },

    changRadioPay(e) {
      const findPayCkData = this.productTable.find(data => data.key === 'payCk');
      if(e.target.value === 'Y') findPayCkData.data = true;
      else if(e.target.value === 'N') findPayCkData.data = false;
    },
    changRadioDele(e) {
      const findDeleteCkData = this.productTable.find(data => data.key === 'deleteCk');
      if(e.target.value === 'Y') findDeleteCkData.data = true;
      else if(e.target.value === 'N') findDeleteCkData.data = false;
    },

    async searchMentor() {
      await api_productSearchMentor_admin(this.keyword)
      .then(res=> {
        console.log('search result',res)
        if(res.data.length <= 0) alert("멘토ID를 확인해 주세요.")          
        else {
          const findProductNameData = this.productTable.find(data => data.key === 'productName');
          const findMentorNameData = this.productTable.find(data => data.key === 'mentorName');
          const findMentorPageIdData = this.productTable.find(data => data.key === 'mentorPageId');

          findProductNameData.data = res.data[0].title;
          findMentorNameData.data = this.keyword;
          findMentorPageIdData.data = res.data[0].uuid;
        }
      })
      .catch(err=> { console.log(err) })
    },

    updateProduct(){
      if(!this.updateFlag) {
        this.updateFlag = true; 
        window.scrollTo(0,0);
        return;
      }

      let updateDataKey = ['id','productName','mentorPageId','price','validateDate','payCk','deleteCk']
      let submit = {};

      for(let data of this.productTable) {
        if(updateDataKey.includes(data.key)) {
          submit[data.key] = data.data;

          if(data.alert) {
            if(data.data == '') {
              alert(data.alert); return;
            }
          }
        }
      }
      this.$emit('openModal', true, 8, 'product', submit)
    },
  }
}
</script>

<style lang='scss'>
  @import './css/productRead.scss';
</style>