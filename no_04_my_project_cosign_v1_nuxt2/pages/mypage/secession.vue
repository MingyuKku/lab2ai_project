<template>
  <div class="myPageSecession_wrap">
    <div class="title">회원 탈퇴</div>
    <div class="myPageSecession_body">
      <div class="info_title">
        <h2>탈퇴 안내</h2>
        <p>회원 탈퇴 및 계정 삭제 전에 안내 사항을 확인해 주세요.</p>
      </div>
      <ul class="info_confirm">
        <li><i class="xi-check"></i><p>사용하고 계신 계정 ( {{ userEmail }} )은 탈퇴할 경우 재사용 및 복구가 불가능합니다.<br>
        탈퇴한 이메일은 본인과 타인 모두 재사용 및 복구가 불가하오니 신중하게 선택하시기 바랍니다.</p></li>
        <li><i class="xi-check"></i>탈퇴 후 회원정보 및 서비스 이용기록은 모두 삭제되며, 삭제된 데이터는 복구되지 않습니다.</li>
        <li><i class="xi-check"></i>탈퇴 후에도 게시판형 서비스에 등록된 게시글은 그대로 남아 있습니다.</li>
      </ul>
      <div class="info_agree">
        <input type="checkbox" id="checkAgree" v-model="infoAgree">
        <label for="checkAgree">
          <div class="checkBox"><i class="xi-check"></i></div>
          <p>위 안내사항을 모두 숙지하였고 이에 동의합니다.</p>
        </label>
      </div>
      <div class="confirm_userInfo">
        <div class="user_email">
          <h2>이메일</h2>
          <input type="text" disabled v-model="userEmail">
        </div>
        <div class="user_password">
          <h2>비밀번호 확인</h2>
          <input type="password" placeholder="비밀번호를 입력해 주세요." v-model="userPassword">
        </div>
      </div>
      <button type="button" :disabled="!infoAgree || !userPassword" @click="submitSecession">회원탈퇴</button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'mypage',
  data() {
    return {
      userEmail: '',
      userPassword: '',
      infoAgree: false,
    }
  },
  mounted() {
    this.getUserInfo()
  },
  computed: {
  },
  methods: {
    async getUserInfo() {
      this.$intApi.post(`/api/user/sign-out/load`, {}, {withCredentials:true})
      .then(res=> {
        this.userEmail = res.data.data.email
      })
      .catch(err=> {
        alert(`${err} 관리자에게 문의해 주세요!`)
      })
    },
    submitSecession() {
      this.$swal.fire({
        icon: 'info',
        html: 
          '회원탈퇴를 하시면 회원님의 모든 데이터가 삭제됩니다.<br>' +
          '그래도 회원을 탈퇴하시겠습니까?',
        iconColor: '#00D8D6',
        confirmButtonText: '아니요',
        showCancelButton: true,
        cancelButtonText: '예',
        buttonsStyling: false,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
      })
      .then(result=> {
        if(result.value || result.dismiss === 'overlay') {  //아니요 클릭(회원탈퇴취소)
          return;
        } else if(result.dismiss === 'cancel') { //예 클릭(회원탈퇴진행)
          const userData = {
            'pwd': this.userPassword,
            'username': this.userEmail
          }
          this.$intApi.post(`/api/user/sign-out`, userData.getParam(), {withCredentials: true})
          .then(res=> {
            if(this.$res_inspect(res, 'inspect')) {
              this.$swal.fire({
                icon: 'success',
                title: '회원탈퇴가 <span>완료되었습니다.</span>',
                text: '그동안 COSIGN을 이용해 주셔서 감사합니다.',
                iconColor: '#F53B57',
                confirmButtonText: '확인',
                buttonsStyling: false,
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                },
              })
              .then(res=> {
                if(res.value || res.dismiss === 'overlay') {
                  // this.$router.go(0);
                  this.logout();
                }
              })

            } else {
              alert(this.$res_inspect(res, 'message'))
            }
          })
          .catch(err=> {
            alert(err, '회원탈퇴를 실패했습니다!')
          })
        }
      })
    },
    async logout() {
      const res = await this.$userIntApi.post(`/api/user/logout`, {}, {withCredentials: true});
      if(this.$res_inspect(res, 'inspect')) {
          this.login(null);
      } else {
          alert(this.$res_inspect(res, 'message'));
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/src/css/mypage/myPageSecession.scss";
</style>