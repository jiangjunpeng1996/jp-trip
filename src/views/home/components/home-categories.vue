<template>
  <div class="categories">
    <template v-for="(item, index) in categories" :key="item.id">
      <div class="item">
        <img :src="item.pictureUrl">
        <div class="title">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<script setup>
  
  import useHomeStore from '@/stores/modules/home';
  import { storeToRefs } from 'pinia';

  const homeStore = useHomeStore();
  const { categories } = storeToRefs(homeStore);

</script>

<style lang="scss" scoped>
.categories {
  display: flex;
  overflow-x: auto;
  height: 80px;
  padding: 0 10px;
  &::-webkit-scrollbar {
    display: none;
  }
  .item {
    width: 70px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 32px;
      height: 32px;
    }
    .title {
      font-size: 12px;
      margin-top: 8px;
      text-align: center;
    }
  }
}
</style>