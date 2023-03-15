<template>
  <div class="city top-page">
    <div class="top">
      <!-- 搜索框 -->
      <van-search v-model="searchValue" placeholder="城市/区域/位置" shape="round" show-action @cancel="cancelClick"/>

      <!-- tab切换 -->
      <van-tabs v-model:active="tabActive" color="#ff9854" line-height="2px">
        <van-tab :title="value.title" :name="key" v-for="(value, key) in allCities" :key="key"></van-tab>
      </van-tabs>
    </div>
    <div class="content">
      <!-- <city-group :group-data="currentGroup"/> -->
      <template v-for="(value, key) in allCities" :key="key">
        <!-- <h2 v-show="tabActive === key">{{ value.title }}</h2> -->
        <city-group v-show="tabActive === key" :group-data="value"/>
      </template>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import { getCityAll } from "@/services";
  import useCityStore from "@/stores/modules/city";
  import { storeToRefs } from "pinia";
  import CityGroup from "./components/city-group.vue";

  const router = useRouter();

  // 搜索框功能
  const searchValue = ref("");
  const cancelClick = () => {
    router.back();
  }

  // tab切换
  const tabActive = ref()


  /**
   * 这个位置发送网络请求有两个缺点：
   * 1. 如果网络请求太多，那么页面组件中就包含大量的对于网络请求和数据的处理逻辑
   * 2. 如果页面封装了很多的子组件，子组件需要这些数据，我们必须一步步将数据传递过去
   */
  // 网络请求：请求城市的数据
  // const allCities = ref({});
  // getCityAll().then(res => {
  //   allCities.value = res.data;
  // })

  // 从Store中获取数据
  const cityStore = useCityStore()
  cityStore.fetchAllCitiesData()
  const { allCities } = storeToRefs(cityStore)

  // 获取选中标签后的数据
  // 1. 获取正确的key：将tabs中绑定的tabActive正确绑定
  // 2. 根据key从allCities获取数据，默认直接获取的数据不是响应式的，所以必须包裹computed
  const currentGroup = computed(() => allCities.value[tabActive.value])

</script>

<style lang="scss" scoped>
.city {
  // top固定定位
  // .top {
  //   position: fixed;
  //   top: 0;
  //   right: 0;
  //   left: 0;
  // }
  // .content {
  //   margin-top: 98px;
  // }

  .top {
    position: relative;
    z-index: 9;
  }

  // 布局滚动
  .content {
    height: calc(100vh - 84px);
    overflow-y: auto;
  }
}
</style>