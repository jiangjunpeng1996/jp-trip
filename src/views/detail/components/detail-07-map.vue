<template>
  <div class="map">
    <detail-section title="位置周边" more-text="查看更多周边信息">
      <div class="baidu" ref="mapRef"></div>
    </detail-section>
  </div>
</template>

<script setup>
import DetailSection from '@/components/detail-section/index.vue'
import { onMounted, ref } from 'vue';

const props = defineProps({
  position: {
    type: Object,
    default: () => ({})
  }
})

const mapRef = ref()

onMounted(() => {
  // 创建地图实例
  const map = new BMapGL.Map(mapRef.value)
  // 创建点坐标
  const point = new BMapGL.Point(props.position.longitude, props.position.latitude);
  // 初始化地图，设置中心点坐标和地图级别
  map.centerAndZoom(point, 15);
  const marker = new BMapGL.Marker(point);
  map.addOverlay(marker)
})
</script>

<style lang="scss" scoped>
.map {
  .baidu {
    height: 250px;
  }
}
</style>