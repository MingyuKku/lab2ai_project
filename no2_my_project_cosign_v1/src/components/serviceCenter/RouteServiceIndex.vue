<template>
  <div class="routeServiceIndex_wrap">
    <OftenQNA/>
    <Notice/>
    <OneOnOneQ/>
  </div>
</template>

<script>
import OftenQNA from '@/components/serviceCenter/OftenQNA';
import Notice from '@/components/serviceCenter/Notice';
import OneOnOneQ from '@/components/serviceCenter/OneOnOneQ';
export default {
  components: {
    OftenQNA,
    Notice,
    OneOnOneQ
  }
}
</script>

<style lang='scss'>
  @import './css/routeServiceIndex.scss';
</style>