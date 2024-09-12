<template>
  <div class="product_wrap">
    <div class="header">
      <h1>상품관리</h1>
      <div class="search_keyword clearFix">
        <input type="text" placeholder="키워드로 상품을 검색해 보세요." v-model="keyword" @keyup.enter="searchKeyword">
        <span class="search_icon" @click="searchKeyword"><i class="xi-search"></i></span>
      </div>   
    </div>
    <div class="content" v-if="titleList.length > 0">
      <div class="product_table_wrap">
        <div class="shadow left" :class="{off: scrollLeftFlag}"></div>
        <div class="shadow right" :class="{off: scrollRightFlag}"></div>
        <div class="product_table" @scroll="scrollTable">
          <div class="table_title">
            <div :class="list.class" v-for="list in titleList" :key="list.class">{{ list.title }}</div>
          </div>
          <div class="table_list">
            <ul>
              <li v-for="(list,idx) in productList" :key="idx"
              @click="$router.push({name: 'ProductRead', params: {pageId: list.id, page: page} })">
                <div class="list_inner">
                  <div class="id">{{list.id}}</div>
                  <div class="productName">{{list.productName}}</div>
                  <div class="mentorPageId">{{list.mentorPageId}}</div>
                  <div class="validateDate">{{list.validateDate}}</div>
                  <div class="payCk">{{list.payCk}}</div>
                  <div class="price">{{list.price }}원</div>
                  <div class="deleteCk">{{list.deleteCk}}</div>
                  <div class="createdAt">{{ list.createdAtText }}</div>
                </div>
              </li>
            </ul>
          </div>  
        </div>
      </div>
      <div class="registNotice clearFix">
        <button type="button" @click="$router.push('/manager/product_regist')">상품 등록</button>
      </div>

      <div class="pagination_wrap">
        <Paginate :containerClass="'pagination_qna'" :pageClass="'page_num'"
          v-model="page"
          :pageCount="totalPages"
          :pageRange='5'
          :marginPages='1'
          :clickHandler="onClickPage"
          :prevText="`<i class='xi-angle-left'></i>`"
          :nextText="`<i class='xi-angle-right'></i>`"
          :hidePrevNext='true'
          :prev-class="'nav prev'"
          :next-class="'nav next'"
        ></Paginate>
      </div>
    </div>
    <div class="nonContent" v-else>
      <div class="replace">
        <h2>상품 리스트가 존재하지 않습니다.</h2>
      </div>
    </div>
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate';
import { 
  api_productList_admin, 
  api_productSearch_admin 
} from '@/api/manager'
export default {
  components: {
    Paginate,
  },
  data() {
    return {
      keyword: '',
      totalPages: 0,
      page: 1,
      productList: [],
      titleList: [
        {class: 'id', title: '상품ID'},
        {class: 'productName', title: '상품명'},
        {class: 'mentorPageId', title: '멘토명'},
        {class: 'validateDate', title: '기간'},
        {class: 'payCk', title: '유료'},
        {class: 'price', title: '가격'},
        {class: 'deleteCk', title: '사용'},
        {class: 'createdAt', title: '생성일'},
      ],
      scrollLeftFlag: true,
      scrollRightFlag: false,
    }
  },
  mounted() {
    this.setPage(this.$route.params.page) // product상세페이지에 접속 후 product목록으로 돌아갈 때 page위치 기억하기 위해
    this.setProductList(this.page);
  },
  methods: {
    setPage(page) {
      if(page !== undefined) this.page = page;
    },
    async setProductList(page) {
      try {
        const res = await api_productList_admin(page - 1);
        this.productList = res.data.content.map(d => {
          return {
            ...d,
            createdAtText: Date.parseUtcText(d.createdAt).format('yyyy-MM-dd HH:mm'),
          }
        })
        console.log('product list', this.productList)
        this.totalPages = res.data.totalPages;

      } catch(err) { console.log(err) }
    },
    onClickPage(no) {
      this.page = no;
      this.setProductList(this.page);
    },
    async searchKeyword() {
      try {
        this.page = 1;
        const res = await api_productSearch_admin(this.keyword, this.page - 1);
        if(res.data != ""){
          this.productList = res.data.content.map(d => {
            return {
              ...d,
              createdAtText: Date.parseUtcText(d.createdAt).format('yyyy-MM-dd HH:mm'),
            }
          })
          this.totalPages = res.data.totalPages;

        } else alert("존재하지 않는 멘토입니다.");

      } catch(err) { console.log(err) }
    },
    scrollTable(e) {
      if(e.target.scrollLeft > 0) this.scrollLeftFlag = false;
      else this.scrollLeftFlag = true;

      if(e.target.offsetWidth +  e.target.scrollLeft >= e.target.scrollWidth) this.scrollRightFlag = true;
      else this.scrollRightFlag = false;
    }
  }
}
</script>

<style lang='scss'>
  @import './css/product.scss'
</style>