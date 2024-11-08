<template>
  <div class="wrapper">
    <el-radio-group v-model="size" aria-label="size control" size="small">
      <el-radio-button value="large">large</el-radio-button>
      <el-radio-button value="default">default</el-radio-button>
      <el-radio-button value="small">small</el-radio-button>
    </el-radio-group>
    <el-alert
      type="info"
      description="单日期，快捷操作（shortcutsName）内置 '今天', '昨天', '一周前'，完全自定义使用shortcuts"
    />
    <div class="content">
      <EPDatePicker
        placeholder="选择日期"
        v-model="date"
        :size="size"
        @change="change($event, 'date', date)"
      />
      <EPDatePicker
        placeholder="选择周"
        v-model="date1"
        :size="size"
        type="week"
        @change="change($event, 'week', date1)"
      />

      <EPDatePicker
        placeholder="选择月"
        v-model="date2"
        :size="size"
        type="month"
        @change="change($event, 'month', date2)"
      />

      <EPDatePicker
        placeholder="选择年"
        v-model="date3"
        :size="size"
        type="year"
        @change="change($event, 'year', date3)"
      />
      <EPDatePicker
        placeholder="选择日期&时间"
        v-model="date5"
        type="datetime"
        @change="change($event, 'datetime', date5)"
      />

      <EPDatePicker
        :shortcutsName="['今天', '昨天', '一周前']"
        placeholder="shortcutsName快捷方式"
        v-model="date4"
        :size="size"
        isPickerOptions
      />
      <EPDatePicker
        :shortcuts="[
          {
            text: '明日',
            value: () => {
              const tomorrow = new Date()
              return tomorrow.setDate(new Date().getDate() + 1)
            }
          }
        ]"
        placeholder="shortcuts快捷方式"
        v-model="date6"
        :size="size"
        isPickerOptions
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
const size = ref("default")
const date = ref()
const date1 = ref()
const date2 = ref()
const date3 = ref()
const date4 = ref()
const date5 = ref()
const date6 = ref()

const typeTxt = {
  date: "日期",
  week: "周",
  month: "月",
  year: "年",
  daterange: "日期范围",
  monthrange: "月份范围",
  datetime: "日期&时间",
  datetimerange: "日期和时间点范围"
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
}
</style>
