<template>
  <div class="memberRead_wrap">
    <div class="header">
      <h1>상세 정보</h1>
    </div>
    <div class="content">
      <div class="table_wrap">
        <table>
          <tr v-for="table,idx in memberTable" :key="idx">
            <div :class="table.type" v-if="table.type === 'read'">
              <td class="td_tit">{{ table.title }}</td>
              <td class="td_cont">
                <p v-if="!table.isTime">{{ table.data }}</p>
                <p v-else>{{ paseUtcText(table.data) }}</p>

                <p v-if="table.key === 'gender'">
                  <span>{{ gender(table.data) }}</span>
                </p>
                <p v-else-if="table.key === 'foreignerCK'">
                  <span>{{ foreigner(table.data) }}</span>
                </p>
                <p v-else-if="table.key === 'telecom_type'">
                  <span>{{ mobileCarrier(table.data) }}</span>
                </p>
              </td>
            </div>
            
            <div :class="table.type" v-else-if="table.type === 'input'">
              <td class="td_tit">{{ table.title }}</td>
              <td class="td_cont">
                <input type="text" v-model="table.data" :disabled="!updateFlag">
              </td>
            </div>

            <div :class="table.type" v-else-if="table.type === 'radio'">
              <td class="td_tit">{{ table.title }}</td>
              <td class="td_cont">
                <label>
                  <input @change="changRadio" type="radio" 
                  value="Y" name="eventRadio" :checked="table.data" :disabled="!updateFlag">
                  <span>수신동의</span>
                </label>
                <label>
                  <input @change="changRadio" type="radio" 
                  value="N" name="eventRadio" :checked="!table.data" :disabled="!updateFlag">
                  <span>수신거절</span>
                </label>
              </td>
            </div>

            <div :class="table.type" v-else-if="table.type === 'read-button'">
              <td class="td_tit">{{ table.title }}</td>
              <td class="td_cont">
                <p v-if="!table.isTime">{{ table.data }}</p>
                <p v-else>{{ paseUtcText(table.data) }}</p>

                <button v-if="table.key === 'passwordChangeTimestamp'" @click="resetPassword">임시 비밀번호 초기화</button>
                <button v-else-if="table.key === 'certTimestamp'" @click="resetCellphone">휴대폰 인증 초기화</button>
              </td>
            </div>
          </tr>
        </table>
      </div>
      <div class="buttons clearFix">
        <button type="button" @click="updateMember">
          <span v-if="!updateFlag">수정하기</span>
          <span v-else>수정완료</span>
        </button>
      </div>
      <button type="button" @click="$router.push({name: 'Member', params: {page: $route.params.page} })">목록</button>
    </div>
  </div>
</template>

<script>
import { 
  api_memberManangementRead_list_admin, 
  api_memberResetPassword_admin, 
  api_memberResetCellphone_admin 
} from '@/api/manager'
export default {
  components: {
  },
  data() {
    return {
      resetPasswordFlag: true,
      resetCellphoneFlag: true,
      updateFlag: false,
      memberTable: [
        {key: 'uuid', title: 'UUID', type: 'read',},
        {key: 'email', title: '이메일', type: 'input'},
        {key: 'nickName', title: '닉네임', type: 'input'},
        {key: 'eventCk', title: '정보수신', type: 'radio'},
        {key: 'createdAt', title: '회원가입일', type: 'read', isTime: true},
        {key: 'infoChangeTimestamp', title: '회원정보 수정일', type: 'read', isTime: true},
        {key: 'passwordChangeTimestamp', title: '비밀번호 변경일', type: 'read-button', isTime: true},
        {key: 'recentLoginTimestamp', title: '최근 로그인시간', type: 'read', isTime: true},
        {key: 'updatedAt', title: '회원탈퇴일', type: 'read', isTime: true},
        {key: 'recentLoginIp', title: '최근로그인IP', type: 'read'},
        {key: 'name', title: '이름', type: 'read'},
        {key: 'birthday', title: '생년월일', type: 'read'},
        {key: 'gender', title: '성별', type: 'read'},
        {key: 'foreignerCK', title: '내국인', type: 'read'},
        {key: 'di', title: 'DI', type: 'read'},
        {key: 'ci', title: 'CI', type: 'read'},
        {key: 'telecom_type', title: '통신사', type: 'read'},
        {key: 'cellphoneNo', title: '핸드폰번호', type: 'read'},
        {key: 'certTimestamp', title: '휴대폰인증일', type: 'read-button', isTime: true},
      ],
      eventCk: false,
    }
  },
  mounted() {
    this.memberDetailData();
  },
  computed: {
    paseUtcText() {
      return (time) => time !== null ? Date.parseUtcText(time).format('yyyy-MM-dd HH:mm:ss'):'';
    },
    gender() {
      return (data) => {
        switch(data) {
          case true: return '남자';
          case false: return '여자';
        }
      }
    },
    foreigner() {
      return (data) => {
        switch(data) {
          case true: return '외국인';
          case false: return '내국인';
        }
      }
    },
    mobileCarrier() {
      return (data) => {
        switch(data) {
          case '01': return 'SKT';
          case '02': return 'KT';
          case '03': return 'LG U+';
          case '04': return '알뜰폰 SKT';
          case '05': return '알뜰폰 KT';
          case '06': return '알뜰폰 LG U+';
        }
      } 
    }
  },
  methods: {
    changRadio(e) {
      this.eventCk = e.target.value;
    },
    async memberDetailData() {
      try {
        let res = await api_memberManangementRead_list_admin(this.$route.params.email);
        this.memberTable = this.memberTable.map(t => {
          if(t.key === 'eventCk') {
            if(res.data[t.key]) this.eventCk = 'Y';
            else this.eventCk = 'N';
          }
          return {
            ...t,
            data: res.data[t.key]
          }
        })

        console.log('member read',res, this.memberTable)

      } catch(err) { console.log(err) }
    },
    async resetPassword() {
      if(this.resetPasswordFlag) {
        this.resetPasswordFlag = false
        console.log("pw reset");

        await api_memberResetPassword_admin(this.$route.params.email)
        .then(res=> {
          if(res.data == true) alert('패스워드 초기화 되었습니다.');
          this.$router.go();
        })
        .catch(err=> { console.log(err)} )
      }
    },
    async resetCellphone() {
      if(this.resetCellphoneFlag) {
        this.resetCellphoneFlag = false
        console.log("cert reset");

        await api_memberResetCellphone_admin(this.$route.params.email)
        .then(res=> {
          if(res.data == true) alert('핸드폰 인증 초기화 되었습니다.');
          this.$router.go();
        })
        .catch(err=> { console.log(err)} )
      }
    },
    updateMember(){
      if(!this.updateFlag) {
        this.updateFlag = true; 
        window.scrollTo(0,0);
        return;
      }

      let updateContentKey = ['uuid', 'email', 'nickName', 'eventCk']
      let submit = {};

      for(let data of this.memberTable) {
        if(updateContentKey.indexOf(data.key) > -1) {
          if(data.key === 'eventCk') continue;
          submit[data.key] = data.data
        }
      }
      submit.eventCk = this.eventCk;
      this.$emit('openModal', true, 5, 'member', submit)
    }
  }
}
</script>

<style lang='scss'>
  @import './css/memberRead.scss';
</style>