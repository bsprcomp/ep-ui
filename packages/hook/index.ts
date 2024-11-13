import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"

/**
 *
 * @param childnode  //子元素
 * @param parentNode // 父元素
 * @param extra // 额外高度
 * @returns
 */
export function useRemainingHeight(parentNodeRef?: any, extra: number = 0, childnodeRef?: any) {
  const height = ref(0)
  const calculateHeight = () => {
    height.value = parentNodeRef.value.offsetHeight - (childnodeRef?.value?.offsetHeight ?? 0)
  }
  onMounted(() => {
    nextTick(() => {
      calculateHeight()
    })
    window.addEventListener("resize", calculateHeight)
  })
  onBeforeUnmount(() => {
    window.removeEventListener("resize", calculateHeight)
  })

  return { height }
}
