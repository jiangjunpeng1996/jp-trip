<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control
      v-if="showTabControl"
      class="tabs"
      :titles="names"
      @tabItemClick="tabClick"
      ref="tabControlRef"
    />

    <van-nav-bar 
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
      <detail-infos name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule"/>
      <detail-facility name="设施" :ref="getSectionRef" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"/>
      <detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule" />
      <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"/>
      <detail-notice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
      <detail-map :position="mainPart.dynamicModule.positionModule"/>
      <detail-intro :price-intro="mainPart.introductionModule"/>
    </div>

    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png">
      <div class="text">泓源旅途, 永无止境!</div>
    </div>

  </div>
</template>

<script setup>

  import TabControl from '@/components/tab-control/index.vue';

  import DetailSwipe from './components/detail-swipe.vue';
  import DetailInfos from './components/detail-02-infos.vue';
  import DetailFacility from './components/detail-03-facility.vue';
  import DetailLandlord from './components/detail-04-landlord.vue';
  import DetailComment from './components/detail-05-comment.vue';
  import DetailNotice from './components/detail-06-notice.vue';
  import DetailMap from './components/detail-07-map.vue';
  import DetailIntro from './components/detail-08-intro.vue';

  import { useRoute, useRouter } from 'vue-router';
  import { getDetailInfos } from "@/services"
  import { computed, ref, watch } from 'vue';
  import useScroll from '@/hooks/useScroll';
  import useMainStore from '@/stores/modules/main';
import { storeToRefs } from 'pinia';

  const route = useRoute()
  const router = useRouter()
  const houseId = route.params.id

  // 发送网络请求获取数据
  const detailInfos = ref({})
  const mainPart = computed(() => detailInfos.value.mainPart)
  getDetailInfos(houseId).then(res => {
    detailInfos.value = res.data
  })

  // 监听返回按钮的点击
  const onClickLeft = () => {
    router.back()
  }

  // tabControl相关逻辑
  const detailRef = ref()
  const { scrollTop } = useScroll(detailRef)
  const showTabControl = computed(() => {
    return scrollTop.value >= 300
  })

  // const landlordRef = ref()
  // const sectionEls = []
  // const getSectionRef = (value) => {
  //   sectionEls.push(value.$el)
  // }
  // const tabClick = (index) => {
  //   let distance = sectionEls[index].offsetTop
  //   if(index !== 0) {
  //     distance = distance - 44
  //   }
  //   detailRef.value.scrollTo({
  //     top: distance,
  //     behavior: "smooth"
  //   })
  // }

  const sectionEls = ref({})
  const names = computed(() => {
    return Object.keys(sectionEls.value)
  })
  const getSectionRef = (value) => {
    if(value) {
      const name = value.$el.getAttribute("name")
      sectionEls.value[name] = value.$el
    }
  }
  let isClick = false
  let currentDistance = -1
  const tabClick = (index) => {
    const key = Object.keys(sectionEls.value)[index]
    const el = sectionEls.value[key]
    let distance = el.offsetTop
    if(index !== 0) {
      distance = distance - 44
    }
    isClick = true
    currentDistance = distance
    detailRef.value.scrollTo({
      top: distance,
      behavior: "smooth"
    })
  }

  // 页面滚动时匹配对应的tabControl对应的index
  const mainStore = useMainStore()
  const { tabIndex } = storeToRefs(mainStore)
  const tabControlRef = ref()
  watch(scrollTop, (newValue) => {
    if(newValue === currentDistance) {
      isClick = false
    }
    if(isClick) return
    // 获取所有的区域的offsetTop
    const els = Object.values(sectionEls.value)
    const values = els.map(el => el.offsetTop)
    // 根据newValue去匹配想要的索引
    let index = values.length - 1
    for(let i = 0; i < values.length; i++) {
      if(values[i] >= newValue + 44) {
        index = i - 1
        break;
      }
    }
    tabIndex.value = index;
  })
  
</script>

<style lang="scss" scoped>
.detail {
  .tabs {
    position: fixed;
    z-index: 99;
    top: 0;
    right: 0;
    left: 0;
  }
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;

    img {
      width: 123px;
    }

    .text {
      margin-top: 12px;
      font-size: 12px;
      color: #7688a7;
    }
  }
}

</style>