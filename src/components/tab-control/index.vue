<template>
  <div class="tab-control">
    <template v-for="(item, index) in titles" :key="item">
      <div class="tab-control-item"
           :class="{ active: index === tabIndex }"
           @click="itemClick(index)">
        <span>{{ item }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import useMainStore from '@/stores/modules/main';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

defineProps({
  titles: {
    type: Array,
    default: () => ([])
  }
})

const mainStore = useMainStore()
const { tabIndex } = storeToRefs(mainStore)
const emit = defineEmits(["tabItemClick"])
const itemClick = (index) => {
  tabIndex.value = index;
  emit("tabItemClick", index)
}
</script>

<style lang="scss" scoped>
  .tab-control {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item.active {
    color: var(--primary-color);
    font-weight: 700;
  }

  .tab-control-item.active span {
    border-bottom: 3px solid var(--primary-color);
    padding: 8px;
  }
</style>

