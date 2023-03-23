<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive include="home">
        <component :is="Component"/>
      </keep-alive>
    </router-view>
    <tab-bar v-show="!route.meta.hideTabBar"/>
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
