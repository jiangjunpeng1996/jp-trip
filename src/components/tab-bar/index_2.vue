<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854">
      <van-tabbar-item v-for="(item, index) in tabbarData" :key="item.path" :class="{ active: currentIndex === index }" :to="item.path" icon="home-o">
        <span>{{ item.text }}</span>
        <!-- <template #icon>
          <img v-if="currentIndex !== index" :src="getAssetURL(item.image)">
          <img v-else :src="getAssetURL(item.imageActive)">
        </template> -->
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>

  import tabbarData from "@/assets/data/tabbar.js"
  import { getAssetURL } from "@/utils/load_assets.js"
  import { ref } from "vue";
  
  const currentIndex = ref(0);

</script>

<style lang="scss" scoped>
.tab-bar {
  // 局部定义一个变量：只针对 tab-bar 子元素才生效
  // --van-tabbar-item-icon-size: 30px !important;

  // 找到类，对类中的CSS属性重写
  // :deep()找到子组件的类，让子组件的类也可以生效
  :deep(.van-tabbar-item__icon) {
    font-size: 30px;
  }

  img {
    height: 24px;
  }
}
</style>