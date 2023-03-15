<template>
  <div class="city top-page">
    <van-search v-model="searchValue" placeholder="城市/区域/位置" shape="round" show-action @cancel="cancelClick"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const searchValue = ref("");
const cancelClick = () => {
  router.back();
}

</script>

<style lang="scss" scoped>
.city {
  
}
</style>