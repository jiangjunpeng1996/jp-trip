<template>
  <div class="search-box">
    <div class="location">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png">
      </div>
    </div>
  </div>
</template>

<script setup>
  import useCityStore from "@/stores/modules/city";
  import { storeToRefs } from "pinia";
  import { useRouter } from "vue-router";

  const router = useRouter()

  // 位置/城市
  const cityClick = () => {
    router.push("/city");
  }

  const positionClick = () => { 
    navigator.geolocation.getCurrentPosition(res => {
      console.log("获取位置成功：", res);
    }, err => {
      console.log("获取位置失败：", err);
    })
  }

  // 当前城市
  const cityStore = useCityStore();
  const { currentCity } = storeToRefs(cityStore);
</script>

<style lang="scss" scoped>
.search-box {
  .location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;
    .city {
      flex: 1;
      color: #333;
      font-size: 15px;
    }
    .position {
      width: 74px;
      display: flex;
      align-items: center;
      .text {
        position: relative;
        top: 2px;
        font-size: 12px;
        color: #666;
      }
      img {
        width: 18px;
        height: 18px;
        margin-left: 5px;
      }
    }
  }
}
</style>