<template>
  <div class="city-group">

    <van-index-bar :sticky="false" highlight-color="#ff9854" :index-list="indexList">
      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="(city, index) in groupData.hotCities" :key="index">
          <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
        </template>
      </div>

      <template v-for="(group, groupIndex) in groupData.cities" :key="groupIndex">
          <van-index-anchor :index="group.group" />
          <template v-for="(city, cityIndex) in group.cities" :key="cityIndex">
            <van-cell :title="city.cityName" @click="cityClick(city)"/>
          </template>
      </template>
    </van-index-bar>

    <!-- <template v-for="(group, groupIndex) in groupData.cities" :key="groupIndex">
      <h2 class="title">标题: {{ group.group }}</h2>
      <div class="list">
        <template v-for="(city, cityIndex) in group.cities" :key="cityIndex">
          <div class="city">{{ city.cityName }}</div>
        </template>
      </div>
    </template> -->
  </div>
</template>

<script setup>

  import { computed } from "vue";
  import { useRouter } from "vue-router";
  import useCityStore from "@/stores/modules/city";

  // 定义props
  const props = defineProps({
    groupData: {
      type: Object,
      default: () => ({})
    }
  })

  // 动态获取索引
  const indexList = computed(() => {
    const list = props.groupData.cities.map(item => item.group);
    list.unshift("#")
    return list
  })

  // 监听城市的点击
  const router = useRouter();
  const cityStore = useCityStore();
  const cityClick = (city) => {
    // 选中当前城市
    cityStore.currentCity = city
    
    // 返回上一级
    router.back();
  }

</script>

<style lang="scss" scoped>
.city-group {
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px 25px 10px 10px;
    .city {
      width: 70px;
      height: 28px;
      border-radius: 14px;
      background: #fff4ec;
      color: #000;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 5px 0;
    }
  }
}
</style>