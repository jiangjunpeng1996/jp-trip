import { onMounted, onUnmounted, ref } from 'vue';
import { throttle } from 'underscore'

// 方法一：
// export default function useScroll(reachBottomCB) {
//   // 监听window创建的滚动
//   const scrollListenerHandler = () => {
//     const clientHeight = document.documentElement.clientHeight;
//     const scrollTop = document.documentElement.scrollTop;
//     const scrollHeight = document.documentElement.scrollHeight;
//     if(clientHeight + scrollTop >= scrollHeight) {
//       // 滚动到底部了
//       if(reachBottomCB) reachBottomCB()
//     }
//   }
  
//   onMounted(() => {
//     window.addEventListener("scroll", scrollListenerHandler)
//   })
  
//   onUnmounted(() => {
//     window.removeEventListener("scroll", scrollListenerHandler)
//   })
// }

// 使用
// useScroll(() => {
//   // 回调函数
// })


// 方法二：

export default function useScroll() {
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)
  // 监听window创建的滚动

  const scrollListenerHandler = throttle(() => {
    clientHeight.value = document.documentElement.clientHeight;
    scrollTop.value = document.documentElement.scrollTop;
    scrollHeight.value = document.documentElement.scrollHeight;
    if(clientHeight.value + scrollTop.value >= scrollHeight.value) {
      // 滚动到底部了
      isReachBottom.value = true;
    }
  }, 100)
  
  onMounted(() => {
    window.addEventListener("scroll", scrollListenerHandler)
  })
  
  onUnmounted(() => {
    window.removeEventListener("scroll", scrollListenerHandler)
  })

  return {
    isReachBottom,
    clientHeight,
    scrollTop,
    scrollHeight
  }
}