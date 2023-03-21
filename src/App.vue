<template>
  <div class="app">
    <router-view></router-view>
    <tab-bar v-if="!route.meta.hideTabBar"/>
    <loading />
  </div>
</template>

<script setup>

  import TabBar from "@/components/tab-bar/index.vue"
  import Loading from "@/components/loading/index.vue"
  import { useRoute } from "vue-router"

  const route = useRoute()

</script>

<style scoped>
</style>
