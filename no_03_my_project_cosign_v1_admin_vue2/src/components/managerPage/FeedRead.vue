<template>
  <div class="feed-read-wrap">
    <div class="header">
      <h1>에디터 피드 관리</h1>
    </div>
    <div class="content" v-if="columns.length > 0">
      <div class="btn-wrap clearFix">
        <router-link to="/manager/feed/regist">피드 등록</router-link>
      </div>
      <div class="table_list">
        <table>
          <thead>
            <tr>
              <th v-for="column,idx in columns" :key="idx" :class="{'title': column === '피드 제목'}"><span>{{ column }}</span></th>
            </tr>
          </thead>
          <tbody>
            <tr class="reservation" v-for="feed in reserveFeedList" :key="feed.no">
              <td><router-link :to="`feed/regist/${feed.feedAdminId}`"><span>-</span></router-link></td>
              <td class="title"><router-link :to="`feed/regist/${feed.feedAdminId}`">
                <span>{{ feed.title }}</span>
                <i class="xi-image-o" v-if="feed.image"></i>
                <i class="xi-alarm-clock-o"></i>
              </router-link></td>
              <td><router-link :to="`feed/regist/${feed.feedAdminId}`"><span>{{ feed.coin || '-' }}</span></router-link></td>
              <td><router-link :to="`feed/regist/${feed.feedAdminId}`"><span>{{ feed.registrationTime }}</span></router-link></td>
            </tr>

            <tr v-for="feed in feedList" :key="feed.no">
              <td><router-link :to="`feed/regist/${feed.feedAdminId}`"><span>{{ feed.no }}</span></router-link></td>
              <td class="title"><router-link :to="`feed/regist/${feed.feedAdminId}`">
                <span>{{ feed.title }}</span>
                <i class="xi-image-o" v-if="feed.image"></i>
              </router-link></td>
              <td><router-link :to="`feed/regist/${feed.feedAdminId}`"><span>{{ feed.coin || '-' }}</span></router-link></td>
              <td><router-link :to="`feed/regist/${feed.feedAdminId}`"><span>{{ feed.createdAt }}</span></router-link></td>
            </tr>
          </tbody>
        </table>
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
import Paginate from 'vuejs-paginate';
import {
  api_feedList_admin,
} from '@/api/contents';

export default {
  components: {
    Paginate,
  },
  data() {
    return {
      columns: [
        '번호',
        '피드 제목',
        '대상 코인',
        '등록 일시',
      ],
      feedList: [],
      reserveFeedList: [],
      totalPages: 0,
      page: 1,
    }
  },
  created() {
    this.getFeedList(this.page);
  },
  methods: {
    async getFeedList(page) {
      try {
        const { data } = await api_feedList_admin(page - 1);
        
        const { feedAdminList } = data.data;

        this.reserveFeedList = feedAdminList.content.filter(cont => cont.registrationType === 'WAITING_RESERVATION').map(cont => {
          return { // 예약 피드
            ...cont,
            registrationTime: Date.parseUtcText(cont.registrationTime).format('yyyy-MM-dd HH:mm')
          }
        });

        this.feedList = feedAdminList.content.filter(cont => 
          cont.registrationType === 'IMMEDIATELY' || 
          cont.registrationType === 'RESERVATION'
        ).map((cont,idx) => {
          return { // 즉시등록 피드
            ...cont,
            no: (feedAdminList.totalElements - feedAdminList.number * feedAdminList.size) - idx, // 아이템 넘버 매기기 역순으로
            createdAt: Date.parseUtcText(cont.createdAt).format('yyyy-MM-dd HH:mm')
          }
        });

        this.totalPages = feedAdminList.totalPages;
      } catch (err) { console.log(err) }
    },
    onClickPage(no) {
      this.page = no;
      this.getFeedList(this.page);
    },
  }
}


</script>

<style lang="scss">
@import '@/components/managerPage/css/feedRead.scss';
</style>