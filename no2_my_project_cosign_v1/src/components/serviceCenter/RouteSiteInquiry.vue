<template>
  <div class="routeSiteInquiry_wrap">
    <div class="form">
      <div class="email">
        <h2>이메일</h2>
        <input type="text" name="" id="" placeholder="이메일 자동입력">
      </div>
      <div class="inquiry_cont">
        <h2>문의 내용</h2>
        <textarea name="" id="" rows="16"></textarea>
        <span class="error"><i class="xi-error-o"></i>내용을 입력해 주세요.</span>
      </div>

      <div class="attachfile_area">
        <div class="title">
          <h2>첨부 파일</h2>
          <span class="addFile">파일 추가</span>
        </div>
        <div class="attachfile" v-for="(file,idx) in attachfileList" :key="idx">
          <label for="uploadFile">파일 선택</label>
          <input type="file" id="uploadFile">
          <p class="fileName">{{file.fileName}}</p>
          <p class="fileVolume">{{file.volume}}</p>
          <span class="deleteFile xi-close"></span>
        </div>
        <span class="error"><i class="xi-error-o"></i>최대 5장/10MB 이내로 등록할 수 있습니다.</span>
      </div>

      <div class="note">
        <div class="text">
          <p><i class="xi-error-o"></i>1:1 문의 작성 유의사항</p>
        </div>
        <ul>
          <li>정확한 답변을 위하여 문의 내용을 상세하게 작성해주시기 바랍니다.</li>
          <li>접수된 내용은 순차적으로 답변드리고 있으며, 추가 확인이 필요한 경우 답변이 지연될 수 있습니다.</li>
          <li>등록하신 문의에 대한 답변은 <strong>이메일, 고객센터 > 문의내역</strong>에서 확인 가능합니다.</li>
        </ul>
      </div>
      <button type="button">제출</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attachfileList: [
        {fileName: 'qwewqeqwe.jpg', volume: '0.05MB'},
      ]
    }
  }
}
</script>

<style lang='scss'>
  @import './css/routeSiteInquiry.scss';
</style>