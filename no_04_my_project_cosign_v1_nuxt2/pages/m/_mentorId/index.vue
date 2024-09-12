<template>
  <div></div>
</template>

<script>
export default {
  middleware( {redirect, route} ) {
    redirect(`/${route.params.mentorId}`);
  }
}
</script>

<style>

</style>