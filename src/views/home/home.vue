<template>
  <div class="home">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp">
    </div>
    <home-search-box />
    <home-categories />
    <home-content />
    <!-- <button @click="moreBtnClick">加载更多</button> -->
  </div>
</template>

<script setup>

  import { onMounted, onUnmounted, ref, watch } from 'vue';
  import HomeNavBar from './components/home-nav-bar.vue';
  import HomeSearchBox from './components/home-search-box.vue';
  import HomeCategories from './components/home-categories.vue';
  import homeContent from './components/home-content.vue';

  import useHomeStore from '@/stores/modules/home';
  import useScroll from '@/hooks/useScroll';

  const homeStore = useHomeStore();
  homeStore.fetchHotSuggestsData();
  homeStore.fetchCategoriesData();

  homeStore.fetchHouseListData();

  // const moreBtnClick = () => {
  //   homeStore.fetchHouseListData();
  // }

  // 监听window创建的滚动
  // const scrollListenerHandler = () => {
  //   const clientHeight = document.documentElement.clientHeight;
  //   const scrollTop = document.documentElement.scrollTop;
  //   const scrollHeight = document.documentElement.scrollHeight;
  //   if(clientHeight + scrollTop >= scrollHeight) {
  //     homeStore.fetchHouseListData();
  //   }
  // }
  
  // onMounted(() => {
  //   window.addEventListener("scroll", scrollListenerHandler)
  // })

  // onUnmounted(() => {
  //   window.removeEventListener("scroll", scrollListenerHandler)
  // })

  // useScroll(() => {
  //   homeStore.fetchHouseListData()
  // })

  const { isReachBottom } = useScroll()
  watch(isReachBottom, (newValue) => {
    if(newValue) {
      homeStore.fetchHouseListData().then(() => {
        isReachBottom.value = false
      })
    }
  })


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
  padding-bottom: 60px;
  .banner {
    img {
      width: 100%;
    }
  }
  
}
</style>
