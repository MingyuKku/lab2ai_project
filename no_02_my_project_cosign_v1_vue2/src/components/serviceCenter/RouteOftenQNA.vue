<template>
  <div class="routeOftenQNA_wrap">
    <div class="category">
      <div class="list" v-for="(category,idx) in defaultCategory" :key="idx">
        <div class="iconImg">{{category.icon}}</div>
        <h1>{{category.tit}}</h1>
      </div>
    </div>
    <div class="question_list">
      <div class="filter clearFix">
        <select>
          <option value="check">조회순</option>
        </select>
      </div>
      <div class="list" v-for="(list,idx) in question_list" :key="idx">
        <div class="clickContent">
          <div class="content">
            <h2>[{{list.category}}]</h2>
            <h3>{{list.tit}}</h3>
          </div>
          <p class="accordion_btn"><i class="xi-angle-down"></i></p>
        </div>
        <div class="accordionContent" v-html="list.cont"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultCategory: [
        {icon: '아이콘', tit: '서비스 이용'},
        {icon: '아이콘', tit: '계정'},
        {icon: '아이콘', tit: '결제'},
        {icon: '아이콘', tit: '제휴'},
      ],
      question_list: [
        {category: '계정', tit: '회원가입은 어떻게 하나요?', cont: '<p>안녕하세요. 코싸인 고객센터입니다.</p><p>고객님께서 문의주신 내용 확인시 회원가입은 https://www.cosign.cc/signup에서 진행 부탁드립니다.</p>'},
        {category: '계정', tit: '회원가입은 어떻게 하나요?', cont: '<p>안녕하세요. 코싸인 고객센터입니다.</p><p>고객님께서 문의주신 내용 확인시 회원가입은 https://www.cosign.cc/signup에서 진행 부탁드립니다.</p>'},
        {category: '계정', tit: '회원가입은 어떻게 하나요?', cont: '<p>안녕하세요. 코싸인 고객센터입니다.</p><p>고객님께서 문의주신 내용 확인시 회원가입은 https://www.cosign.cc/signup에서 진행 부탁드립니다.</p>'},
        {category: '계정', tit: '회원가입은 어떻게 하나요?', cont: '<p>안녕하세요. 코싸인 고객센터입니다.</p><p>고객님께서 문의주신 내용 확인시 회원가입은 https://www.cosign.cc/signup에서 진행 부탁드립니다.</p>'},
        {category: '계정', tit: '회원가입은 어떻게 하나요?', cont: '<p>안녕하세요. 코싸인 고객센터입니다.</p><p>고객님께서 문의주신 내용 확인시 회원가입은 https://www.cosign.cc/signup에서 진행 부탁드립니다.</p>'},
        {category: '계정', tit: '회원가입은 어떻게 하나요?', cont: '<p>안녕하세요. 코싸인 고객센터입니다.</p><p>고객님께서 문의주신 내용 확인시 회원가입은 https://www.cosign.cc/signup에서 진행 부탁드립니다.</p>'},
        {category: '계정', tit: '회원가입은 어떻게 하나요?', cont: '<p>안녕하세요. 코싸인 고객센터입니다.</p><p>고객님께서 문의주신 내용 확인시 회원가입은 https://www.cosign.cc/signup에서 진행 부탁드립니다.</p>'},
        {category: '계정', tit: '회원가입은 어떻게 하나요?', cont: '<p>안녕하세요. 코싸인 고객센터입니다.</p><p>고객님께서 문의주신 내용 확인시 회원가입은 https://www.cosign.cc/signup에서 진행 부탁드립니다.</p>'},
        {category: '계정', tit: '회원가입은 어떻게 하나요?', cont: '<p>안녕하세요. 코싸인 고객센터입니다.</p><p>고객님께서 문의주신 내용 확인시 회원가입은 https://www.cosign.cc/signup에서 진행 부탁드립니다.</p>'},
        {category: '계정', tit: '회원가입은 어떻게 하나요?', cont: '<p>안녕하세요. 코싸인 고객센터입니다.</p><p>고객님께서 문의주신 내용 확인시 회원가입은 https://www.cosign.cc/signup에서 진행 부탁드립니다.</p>'},
      ],
    }
  }
}
</script>

<style lang='scss'>
  @import './css/routeOftenQNA.scss';
</style>