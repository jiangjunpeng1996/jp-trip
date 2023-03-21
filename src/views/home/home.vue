<template>
  <div class="home">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp">
    </div>
    <home-search-box />
    <home-categories />

    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar />
    </div>

    <home-content />
  </div>
</template>

<script setup>

  import { onMounted, onUnmounted, ref, watch, computed } from 'vue';
  import HomeNavBar from './components/home-nav-bar.vue';
  import HomeSearchBox from './components/home-search-box.vue';
  import HomeCategories from './components/home-categories.vue';
  import homeContent from './components/home-content.vue';
  import SearchBar from '@/components/search-bar/index.vue';

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

  const { isReachBottom, scrollTop } = useScroll()
  watch(isReachBottom, (newValue) => {
    if(newValue) {
      homeStore.fetchHouseListData().then(() => {
        isReachBottom.value = false
      })
    }
  })

  // 是否显示搜索框
  // const isShowSearchBar = ref(false);
  // watch(scrollTop, (newTop) => {
  //   isShowSearchBar.value = newTop > 100
  // })
  // 定义的可响应式的数据，依赖另外一个可响应式的数据，那么可以使用计算属性（computed）
  const isShowSearchBar = computed(() => {
    return scrollTop.value >= 360
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
  .search-bar {
    position: fixed;
    z-index: 9;
    top: 0;
    right: 0;
    left: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background: #fff;
  }
}
</style>
