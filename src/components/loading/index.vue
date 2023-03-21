<template>
  <div class="loading" v-if="isLoading" @click="loadingClick">
    <div class="bg">
      <img src="@/assets/img/home/full-screen-loading.gif">
    </div>
  </div>
</template>

<script setup>
  import useMainStore from '@/stores/modules/main';
  import { storeToRefs } from 'pinia';

  const mainStore = useMainStore()
  const { isLoading } = storeToRefs(mainStore)

  const loadingClick = () => {
    isLoading.value = false;
  }

</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  z-index: 999;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, .2);
  .bg {
    width: 104px;
    height: 104px;
    background: url(@/assets/img/home/loading-bg.png) 0 0 / 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 70px;
      height: 70px;
      margin-bottom: 10px;
    }
  }
}
</style>