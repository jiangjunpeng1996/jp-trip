<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="item in swipeData">
        <van-swipe-item class="item">
          <img :src="item.url">
        </van-swipe-item>
      </template>
      <template #indicator="{ active, total }">
        <div class="indicator">
          <template v-for="(value, key, index) in swipeGroup" :key="key">
            <span class="item" :class="{ active: swipeData[active]?.enumPictureCategory == key }">
              <span class="text">{{ getName(value[0].title) }}</span>
              <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">
                {{ getCategoryIndex(swipeData[active]) }} / {{ value.length }}
              </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
const props = defineProps({
  swipeData: {
    type: Array,
    default: () => ([])
  }
})

// 对数据进行转换
// const swipeGroup = {}
// for(const item of props.swipeData) {
//   swipeGroup[item.enumPictureCategory] = []
// }
// for(const item of props.swipeData) {
//   const valueArray = swipeGroup[item.enumPictureCategory]
//   valueArray.push(item)
// }
const swipeGroup = {}
for(const item of props.swipeData) {
  let valueArray = swipeGroup[item.enumPictureCategory]
  if(!valueArray) {
    valueArray = []
    swipeGroup[item.enumPictureCategory] = valueArray
  }
  valueArray.push(item)
}

// 定义转换数据的方法
const nameReg = /【(.*?)】/i
const getName = (name) => {
  // return name.replace("：", "").replace("【", "").replace("】","")
  const results =  nameReg.exec(name)
  return results[1]
}

const getCategoryIndex = (item) => {
  const valueArray = swipeGroup[item.enumPictureCategory]
  return valueArray.findIndex(data => data === item) + 1
}

</script>

<style lang="scss" scoped>
.swipe {
  .swipe-list {
    .item {
      img {
        width: 100%;
      }
    }
    .indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      color: #fff;
      background: rgba($color: #000000, $alpha: .8);
      display: flex;
      .item {
        margin: 0 3px;
        &.active {
          background: #fff;
          color: #333;
          padding: 0 3px;
          border-radius: 3px;
        }
      }
    }
  }
}
</style>