<template>
  <div class="app-version-history-wrap">
    <div class="header">
      <h1>APP 버전 관리</h1>
    </div>
    <div class="content" v-if="columns.length > 0">
      <div class="top-area">
        <div class="filter-wrap">
          <div class="radio-wrap" v-for="item in radioboxItems" :key="item.value">
            <input :id="item.value" type="radio" :value="item.value" v-model="selectedItme" @change="changeFilter" />
            <label :for="item.value">
              <div class="outer-circle"><span class="inner-circle"></span></div>
              <span class="text">{{ item.name }}</span>
            </label>
          </div>
        </div>
        <router-link to="/manager/app_ver/regist">새 버전 등록</router-link>
      </div>
      <div class="table_list">
        <table>
          <thead>
            <tr>
              <th v-for="column,idx in columns" :key="idx"><span>{{ column }}</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="history,idx in versionHistory" :key="idx">
              <td><router-link :to="`app_ver/regist/${history.vcId}`"><span>{{ history.platform }}</span></router-link></td>
              <td><router-link :to="`app_ver/regist/${history.vcId}`"><span>{{ history.version }}</span></router-link></td>
              <td><router-link :to="`app_ver/regist/${history.vcId}`"><span>{{ history.updateStateTypeKor }}</span></router-link></td>
              <td class="aline-start"><router-link :to="`app_ver/regist/${history.vcId}`"><span>{{ history.memo }}</span></router-link></td>
              <td><router-link :to="`app_ver/regist/${history.vcId}`"><span>{{ history.createdAtKst }}</span></router-link></td>
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
  api_versionHistory_admin,
} from '@/api/version';

export default {
  components: {
    Paginate,
  },
  data() {
    return {
      radioboxItems: [
        {value: 'NON', name: '전체'},
        {value: 'AOS', name: 'AOS'},
        {value: 'IOS', name: 'iOS'},
      ],
      selectedItme: 'NON', 
      columns: [
        '플랫폼',
        '버전',
        '업데이트 타입',
        '업데이트 내용',
        '릴리즈 일시',
      ],
      versionHistory: [],
      totalPages: 0,
      page: 1,
    }
  },
  created() {
    this.getHistory(this.page);
  },
  methods: {
    async getHistory(page) {
      try {
        const { data } = await api_versionHistory_admin({platformType: this.selectedItme, page: page - 1, size: 20});
        const { versionControlList } = data.data;
        this.versionHistory = versionControlList.content.map(cont => {
          return {
            ...cont,
            platform: cont.platformType === 'IOS' ? 'iOS' : 'AOS',
            createdAtKst: Date.parseUtcText(cont.createdAt).format('yyyy-MM-dd HH:mm')
          }
        });
        this.totalPages = versionControlList.totalPages;
      } catch (err) { console.log(err, page) }
    },
    onClickPage(no) {
      this.page = no;
      this.getVersionHistory(this.page);
    },
    changeFilter() {
      this.page = 1;
      this.getHistory(this.page);
    }
  }
}


</script>

<style lang="scss">
@import '@/components/managerPage/css/appVersionHistory.scss';
</style>