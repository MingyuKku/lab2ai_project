<template>
  <div class="member_wrap">
    <div class="header">
      <h1>회원 관리</h1>
      <div class="search_keyword clearFix">
        <div class="select_wrap">
          <select autofocus v-model="selectCategory" @change="changeSelect">
            <option :value="data.name" :disabled="data.name === '검색분류'" v-for="data in category" :key="data.name">{{ data.name }}</option>
          </select>
          <i class="xi-angle-down"></i>
        </div>
        <input type="text" placeholder="검색 키워드 분류를 선택하시고 검색해 주세요." v-model="keyword" @keyup.enter="searchKeyword">
        <span class="search_icon" @click="searchKeyword"><i class="xi-search"></i></span>
      </div>
    </div>
    <div class="content" v-if="memberList.length > 0">
      <div class="member_table">
        <div class="table_title">
          <div class="div">번호</div>
          <div class="email">이메일</div>
          <div class="nick">닉네임</div>
          <div class="date">가입일</div>
          <div class="name">이름</div>
          <div class="phone">핸드폰번호</div>
        </div>
        <div class="table_list">
          <ul>
            <li v-for="(list,idx) in memberList" :key="idx"
              @click="$router.push({name: 'MemberRead', params: {email: list.email, page: page} })">
              <div class="list_isMember">{{list.no}}</div>
              <div class="list_email">{{list.email}}</div>
              <div class="list_nick">{{list.nickName}}</div>
              <div class="list_date">{{ list.createdAtText }}</div>
              <div class="list_name">{{list.name}}</div>
              <div class="list_phone">{{list.cellphoneNo}}</div>
            </li>
          </ul>
        </div>  
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
        <h2>회원이 존재하지 않습니다</h2>
      </div>
    </div>
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate';
import { 
  api_memberManangement_list_admin, 
  api_memberEmailSearch_admin, 
  api_memberNickNameSearch_admin, 
  api_memberNameSearch_admin, 
  api_memberPhoneSearch_admin
} from '@/api/manager'
export default {
  components: {
    Paginate,
  },
  data() {
    return {
      totalPages: 0,
      page: 1,
      keyword: '',
      memberList: [],
      selectCategory: null,
      categoryIdx: 0,
      category: [
        {
          name: '검색분류', 
          api: api_memberManangement_list_admin
        },
        {
          name: '이메일', 
          api: api_memberEmailSearch_admin
        },
        {
          name: '닉네임', 
          api: api_memberNickNameSearch_admin
        },
        {
          name: '이름', 
          api: api_memberNameSearch_admin
        },
        {
          name: '핸드폰', 
          api: api_memberPhoneSearch_admin
        },
      ]
    }
  },
  mounted() {
    this.selectCategory = this.category[this.categoryIdx].name; // mounted시에 기본값으로 분류 셋팅
    this.setPage(this.$route.params.page) // member상세페이지에 접속 후 member목록으로 돌아갈 때 page위치 기억하기 위해
    this.setMemberList({category: this.category[this.categoryIdx], keyword: this.keyword}, this.page);
  },
  methods: {
    setPage(page) {
      if(page !== undefined) this.page = page;
    },
    async setMemberList(objParam, page) {
      try {
        if(objParam.category !== null) {

          let res = null;
          if(objParam.keyword !== '') res = await objParam.category.api(objParam.keyword, page - 1);
          else res = await objParam.category.api(page - 1);

          console.log('member list', objParam.category.name, objParam.keyword, res)

          if(res.status === 200) {
            this.memberList = res.data.content.map((d,idx)=> ({
              ...d,
              no: (res.data.totalElements - res.data.number*res.data.size) - idx,
              createdAtText: Date.parseUtcText(d.createdAt).format('yyyy-MM-dd HH:mm'),
            }))
            this.totalPages = res.data.totalPages;
          }
        }
        

      } catch(err) { console.log(err) }
    },
    changeSelect() {
      const findcategoryIndex = this.category.findIndex(data => data.name === this.selectCategory);
      this.categoryIdx = findcategoryIndex;
    },
    onClickPage(no) {
      this.page = no;
      this.setMemberList({category: this.category[this.categoryIdx], keyword: this.keyword}, this.page);
    },
    searchKeyword() {
      this.page = 1;
      this.setMemberList({category: this.category[this.categoryIdx], keyword: this.keyword}, this.page)
    }
  }
}
</script>

<style lang='scss'>
  @import './css/member.scss';
</style>