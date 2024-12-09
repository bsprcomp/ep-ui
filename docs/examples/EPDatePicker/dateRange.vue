<template>
  <div class="wrapper">
    <el-radio-group v-model="size" aria-label="size control" size="small">
      <el-radio-button value="large">large</el-radio-button>
      <el-radio-button value="default">default</el-radio-button>
      <el-radio-button value="small">small</el-radio-button>
    </el-radio-group>

    <div class="content">
      <div>
        <p>valueFormat修改输出格式</p>
        <EPDatePicker
          placeholder="YYYY-MM-DD"
          valueFormat="YYYY-MM-DD"
          type="daterange"
          v-model="date"
          :size="size"
          @change="change($event, 'daterange', date)"
        />
      </div>
      <div>
        <p>defaultTime格式化</p>
        <EPDatePicker
          :defaultTime="defaultTime"
          type="daterange"
          v-model="date1"
          :size="size"
          @change="change($event, 'daterange', date)"
        />
      </div>
      <div>
        <p>内置封装快捷操作 shortcutsName</p>
        <EPDatePicker
          :defaultTime="defaultTime"
          :shortcutsName="shortcutsName"
          type="daterange"
          v-model="date1"
          :size="size"
          @change="change($event, 'daterange', date)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
const size = ref("default")
const date = ref([])
const date1 = ref([])
const shortcutsName = [
  "本日",
  "本月",
  "本年",
  "近一日",
  "近一周",
  "近一月",
  "近三月",
  "近半年",
  "近一年"
]
const defaultTime = ref<[Date, Date]>([
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59)
])
const typeTxt = {
  daterange: "日期",
  datetimerange: "周"
}

const change = (event, type, value) => {
  console.log(`change选择${typeTxt[type]}返回值是：`, event)
  console.log(`v-model绑定的值是：`, value)
}
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  .content {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  height: 400px;
}
</style>
