<template>
  <div class="paid-users-wrap">
    <div class="header">
      <h1>유료 이용자 현황</h1>
    </div>
    <div class="content" v-if="columns.length > 0">
      <div class="users_table_wrap">
        <div class="users_table">
          <div class="table_list">
            <table>
              <tbody>
                <tr>
                  <td :colspan="columns.length">
                    <ul>
                      <li>
                        <span>총 유료 사용자: {{ totalUsers.totalPurchaseOrderUser }}명</span>
                        <span>*총 회원수 {{ totalUsers.totalUserCount }}명</span>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td :colspan="columns.length">
                    <ul>
                      <li>
                        <span>AOS: {{ totalUsers.aosTotalPurchaseOrderUser }}명 (정기: {{ totalUsers.aosRegularOrderUser }}명 / 단건: {{ totalUsers.aosSingleOrderUser }}명)</span>
                        <span>*iOS: {{ totalUsers.iosTotalPurchaseOrderUser }}명 (정기: {{ totalUsers.iosRegularOrderUser }}명 / 단건: {{ totalUsers.iosSingleOrderUser }}명)</span>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td :colspan="columns.length">
                    <ul>
                      <li>
                        <span>정기결제: {{ totalUsers.totalRegularOrderUser }}명 (AOS: {{ totalUsers.aosRegularOrderUser }}명 / iOS: {{ totalUsers.iosRegularOrderUser }}명)</span>
                        <span>*단건결제: {{ totalUsers.totalSingleOrderUser }}명 (AOS: {{ totalUsers.aosSingleOrderUser }}명 / iOS: {{ totalUsers.iosSingleOrderUser }}명)</span>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr class="tr-head">
                  <th v-for="column,idx in columns" :key="`${idx}key`">{{ column }}</th>
                </tr>
                <tr class="list" v-for="user,idx in userList" :key="idx">
                  <td><router-link :to="`/manager/member/${user.email}`">
                    {{ user.nickName }}
                  </router-link></td>
                  <td>
                    {{ user.gender }}
                  </td>
                  <td>
                    {{ user.birthday }}
                  </td>
                  <td>
                    {{ user.platform }}
                  </td>
                  <td>
                    {{ user.productOrderState }}
                  </td>
                  <td>
                    {{ user.ticketStartDateTime }}
                  </td>
                  <td>
                    {{ user.ticketEndDateTime }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>  
        </div>
      </div>
      <div class="csv-file-wrap clearFix">
        <div class="text-wrap" @click="downloadCsvFile">
          <div class="icon"><i class="xi-download"></i></div>
          <p>엑셀 파일 다운로드</p>
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
  </div>
</template>

<script>
import { 
  api_totalPaidUser_admin, 
  api_paidUserList_admin,
  api_downloadUserList_admin
} from '@/api/manager';
import Paginate from 'vuejs-paginate';

export default {
  components: {
    Paginate,
  },
  data() {
    return {
      columns: [
        '닉네임',
        '성별',
        '생년',
        '플랫폼',
        '상품',
        '결제일',
        '만료 예정일',
      ],
      totalUsers: {},
      userList: [],
      totalPages: 0,
      page: 1,
    }
  },
  created () {
    this.getTotalUser();
    this.getUserList(this.page)
  },
  methods: {
    async getTotalUser() {
      try {
        const { data } = await api_totalPaidUser_admin();

        if (data.status !== 200) return; // 응답값이 옳바르지 않은 경우

        const { totalPurchaseOrderUserInfo } = data.data;

        this.totalUsers = totalPurchaseOrderUserInfo;

      } catch(err) { console.log(err) }
    },
    async getUserList(page) {
      const { data } = await api_paidUserList_admin(page - 1);
      const { purchaseTicketUserList } = data.data;
      
      this.totalPages = purchaseTicketUserList.totalPages;
      this.userList = purchaseTicketUserList.content.map(v => {
        return {
          ...v,
          gender: v.gender ? v.gender === 'M' ? '남' : '여' : v.gender,
          birthday: v.birthday ? v.birthday.slice(0,4) : v.birthday,
          platform: v.aosReceiptProductId ? 'AOS' : 'iOS',
          productOrderState: v.productOrderState === 'REGULAR' ? '정기결제' : '단건',
          ticketStartDateTime: Date.parseUtcText(v.ticketStartDateTime).format('yyyy.MM.dd HH:mm'),
          ticketEndDateTime: Date.parseUtcText(v.ticketEndDateTime).format('yyyy.MM.dd')
        }
      });
    },
    onClickPage(no) {
      this.page = no;
      this.getUserList(this.page);
    },
    async downloadCsvFile() {
      const { data } = await api_downloadUserList_admin();
      const BOM = new Blob(["\ufeff" + data], {type: "text/csv;charset=utf-8;"}) // \ufeff 를 넣은 이유 -> 한글깨짐 방지
      const url = window.URL.createObjectURL(BOM);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute('download', `유료 이용자 현황.csv`);
      link.click();
    }
  }
}
</script>

<style lang="scss">
@import '@/components/managerPage/css/paidUsers.scss';
</style>