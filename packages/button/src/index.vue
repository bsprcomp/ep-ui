<template>
  <!-- 按钮提示 -->
  <el-tooltip v-if="tip" :content="tip" v-bind="{ placement: 'top', ...tipProps }">
    <el-button :loading="loading" v-bind="$attrs" class="ep-button-tip" @click="handleClick">
      <slot> {{ value }}</slot>
    </el-button>
  </el-tooltip>
  <!-- 无提示 -->
  <el-button :loading="loading" v-else v-bind="$attrs" @click="handleClick">
    <slot> {{ value }}</slot>
  </el-button>
</template>

<script setup lang="ts" name="EPButton">
const loading = ref(false)
const timer = ref()
import { onUnmounted, ref } from "vue"
const props = defineProps({
  time: {
    type: Number,
    default: 500
  },
  tip: {
    type: String,
    default: ""
  },
  tipProps: {
    type: Object,
    default: () => ({})
  },
  // 是否需要防抖
  isDebounce: {
    type: Boolean,
    default: false
  },
  // 是否防止多次点击
  antiClick: {
    type: Boolean,
    default: false
  },
  value: {
    type: String
  }
})
// 抛出事件
const emits = defineEmits(["click"])
const record = ref(0)
const handleClick = () => {
  // 防止多次点击
  if (props.antiClick) {
    if (!loading.value) {
      loading.value = true
      timer.value = setTimeout(() => {
        loading.value = false
      }, props.time)
    }
  } else if (props.isDebounce) {
    const newTime = new Date()
    if (newTime.getTime() - record.value > props.time) {
      emits("click")
    }
    record.value = newTime.getTime()
  } else {
    emits("click")
  }
}
onUnmounted(() => {
  clearTimeout(timer.value)
})
</script>
<style lang="scss" scoped>
.ep-button-tip {
  padding: 0;
  height: auto;
}
</style>
