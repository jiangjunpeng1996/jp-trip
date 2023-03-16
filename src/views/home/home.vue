<template>
  <div class="home">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp">
    </div>
    <home-search-box />
  </div>
</template>

<script setup>

  import { ref } from 'vue';
  import HomeNavBar from './components/home-nav-bar.vue';
  import HomeSearchBox from './components/home-search-box.vue';

  import useHomeStore from '@/stores/modules/home';

  const homeStore = useHomeStore();
  homeStore.fetchHotSuggestsData();
  
  // import hyRequest from "@/services/request/index"
  // 发送网络请求
  // 1. 热门建议
  // const hotSuggests = ref([]);
  // hyRequest.get({
  //   url: "/home/hotSuggests"
  // }).then(res => {
  //   hotSuggests.value = res.data;
  // })

  // const categories = ref([]);
  // hyRequest.get({
  //   url: "/home/categories"
  // }).then(res => {
  //   categories.value = res.data;
  // })


</script>

<style lang="scss" scoped>
.home {
  .banner {
    img {
      width: 100%;
    }
  }
  
}
</style>
