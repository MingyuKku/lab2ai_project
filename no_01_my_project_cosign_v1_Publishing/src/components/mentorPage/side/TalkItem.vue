<template>
  <div class="talk_list_wrap">
    <div class="user_info">
      <h2>{{comment.writerName}}</h2>
      <p>{{writeTime}}</p>
    </div>
    <p>{{comment.content}}</p>
  </div>
</template>

<script>
export default {
  props: ['comment'],
  computed: {
    writeTime() {
      return new Date(this.comment.inputTime).diffNow();
    }
  }
}
</script>

<style scoped lang='scss'>
  .talk_list_wrap {
    width: 100%;
    padding: 13px;
    background: #EFF1F8;
    border-radius: 10px;
    margin-top: 12px;
    .user_info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 10px;
      h2 {
        font-size: 13px;
        font-weight: 600;
        font-weight: 500;//노토산스
        color: #333;
      }
      p {
        font-size: 12px;
        font-weight: 400;
        font-weight: 300;//노토산스
        color: #737373;
      }
    }
    p {
      font-size: 13px;
      color: #555;
      line-height: 1.4;
      text-align: justify;
    }
  }

</style>