<template>
  <div class="productRegist_wrap">
    <div class="header">
      <h1>상품 등록</h1>
    </div>
    <div class="content">
      <div class="inner">
        <div :class="list.key" v-for="list in productRegistList" :key="list.key">

          <div class="list_inner" v-if="list.type === 'input'">
            <h2>{{ list.title }}</h2>
            <input type="text" :placeholder="list.placeholder" v-model="list.data">
            <span v-if="error[list.key]"><i class="xi-error-o"></i>{{ list.placeholder }}</span>
          </div>
          
          <div class="list_inner" v-if="list.type === 'search'">
            <h2>{{ list.title }}</h2>
            <div class="data_area">
              <input type="text" v-model="list.data" disabled>
              <div class="search_wrap">
                <input type="text" :placeholder="list.placeholder" v-model="keyword">
                <button type="button" @click="searchMentor">검색</button>
              </div>
            </div>
            <span v-if="error[list.key]"><i class="xi-error-o"></i>{{ list.placeholder }}</span>
          </div>

          <div class="list_inner" v-if="list.type === 'radio'">
            <h2>{{ list.title }}</h2>
            <div class="radio_wrap" v-if="list.key === 'payCk'">
              <label>
                <input class="radio" @change="changRadioPay" type="radio" value="Y" name="payRadio" :checked="list.data">
                <span>유료</span>
              </label><br/>
              <label>
                <input class="radio" @change="changRadioPay" type="radio" value="N" name="payRadio" :checked="!list.data">
                <span>무료</span>
              </label>
            </div>

            <div class="radio_wrap" v-else-if="list.key === 'deleteCk'">
              <label>
                <input class="radio" @change="changRadioDele" type="radio" value="Y" name="useableRadio" :checked="list.data">
                <span>사용</span>
              </label><br/>
              <label>
                <input class="radio" @change="changRadioDele" type="radio" value="N" name="useableRadio" :checked="!list.data">
                <span>미사용</span>
              </label>
            </div>
          </div>

        </div>
      </div>   
      <button type="button" @click="updateMember">등록</button>
    </div>
    
  </div>
</template>

<script>
import { api_productSearchMentor_admin } from '@/api/manager'

export default {
  components: {

  },
  data() {
    return {
      keyword: '',
      productRegistList: [
        {key: 'product', title: '상품명', placeholder: '상품명을 입력해 주세요', alert: '상품명을 입력 해 주세요', data: '', type: 'input'},
        {key: 'mentor', title: '멘토명', placeholder: '멘토 uuid를 검색해 주세요', data: '', type: 'search'},
        {key: 'uuid', title: '멘토UUID', alert: '멘토ID를 입력 해 주세요', data: '', type: ''},
        {key: 'validateDate', title: '기간', placeholder: '기간을 입력해 주세요', alert: '기간을 입력 해 주세요', data: '', type: 'input'},
        {key: 'payCk', title: '유료여부', data: false, type: 'radio'},
        {key: 'price', title: '가격', placeholder: '가격을 입력해 주세요', alert: '가격을 입력 해 주세요', data: '', type: 'input'},
        {key: 'deleteCk', title: '사용여부', data: false, type: 'radio'},
      ],
      error: {
        product: false,
        mentor: false,
        validateDate: false,
        price: false,
      },

    }
  },
  mounted() {
  },
  computed: {
  },
  methods: {
    async searchMentor() {
      console.log(this.keyword)
      await api_productSearchMentor_admin(this.keyword)
      .then(res=> {
        console.log('search res',res)
        if(res.data.length <= 0) alert("멘토ID를 확인해 주세요.")          
        else {
          const findMentorNameData = this.productRegistList.find(data => data.key === 'mentor');
          const findMentorUuidData = this.productRegistList.find(data => data.key === 'uuid');

          findMentorNameData.data = res.data[0].title;
          findMentorUuidData.data = res.data[0].uuid;
        }
      }).catch(err=> { console.log(err) })
    },    

    changRadioPay(e) {
      const findPayCkData = this.productRegistList.find(data => data.key === 'payCk');
      if(e.target.value === 'Y') findPayCkData.data = true;
      else if(e.target.value === 'N') findPayCkData.data = false;
    },
    changRadioDele(e) {
      const findDeleteCkData = this.productRegistList.find(data => data.key === 'deleteCk');
      if(e.target.value === 'Y') findDeleteCkData.data = true;
      else if(e.target.value === 'N') findDeleteCkData.data = false;
    },
    initError() {
      this.error = {
        product: false,
        mentor: false,
        validateDate: false,
        price: false,
      }
    },
    updateMember(){
      let updateDataKey = ['product','price','validateDate','uuid','payCk','deleteCk']
      let submit = {};

      for(let data of this.productRegistList) {
        if(updateDataKey.includes(data.key)) {
          submit[data.key] = data.data;

          if(data.alert) {
            if(data.data == '') {
              this.initError();
              this.error[data.key] = true;
              alert(data.alert); return;
            }
          }
        }
      }

      this.$emit('openModal', true, 7, 'product', submit)
    }    
  }
}
</script>

<style lang='scss'>
  @import './css/productRegist.scss';
</style>