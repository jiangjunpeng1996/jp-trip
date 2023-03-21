<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <van-tabbar-item v-for="(item, index) in tabbarData" :key="item.path" :class="{ active: currentIndex === index }" :to="item.path">
        <span>{{ item.text }}</span>
        <template #icon>
          <img v-if="currentIndex !== index" :src="getAssetURL(item.image)">
          <img v-else :src="getAssetURL(item.imageActive)">
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>

  import tabbarData from "@/assets/data/tabbar.js"
  import { getAssetURL } from "@/utils/load_assets.js"
  import { ref, watch } from "vue";
  import { useRoute } from "vue-router";

  // 监听路由改变时，找到对应的索引，设置currentIndex
  const route = useRoute()
  const currentIndex = ref(0);
  watch(route, (newRoute) => {
    const index = tabbarData.findIndex(item => item.path === newRoute.path)
    if(index === -1) return
    currentIndex.value = index
  })
  

</script>

<style lang="scss" scoped>
.tab-bar {
  img {
    height: 24px;
  }
}
</style>