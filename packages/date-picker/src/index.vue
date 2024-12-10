<template>
  <div>
    <el-date-picker
      v-model="selectedDate"
      :shortcuts="shortcuts"
      @change="handleChange"
      ref="datePicker"
      v-bind="{ type, valueFormat: defaultValueFormat, format: defaultFormat, ...$attrs }"
    >
      <template v-for="(_, name) in slots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </el-date-picker>
  </div>
</template>
<script setup lang="ts" name="EPDatePicker">
import { computed, onMounted, ref, useSlots } from "vue"
const slots = useSlots()
const selectedDate = defineModel<any>()
const datePicker = ref()
const emit = defineEmits(["getRef", "change"])

type Props = {
  formatNullValue?: any
  shortcutsName?:
    | (
        | "今天"
        | "昨天"
        | "一周前"
        | "本日"
        | "本月"
        | "本年"
        | "近一日"
        | "近一周"
        | "近一月"
        | "近三月"
        | "近半年"
        | "近一年"
      )[]
    | string[]

  type?:
    | "year"
    | "years"
    | "month"
    | "months"
    | "date"
    | "dates"
    | "datetime"
    | "week"
    | "datetimerange"
    | "daterange"
    | "monthrange"
    | "yearrange"
}
const props = withDefaults(defineProps<Props>(), {
  type: "date",
  format: "YYYY-MM-DD",
  valueFormat: "YYYY-MM-DD",
  formatNullValue: "",
  shortcutsName: () => []
})

const defaultFormat = ref()
const defaultValueFormat = ref()

const format = () => {
  switch (props.type) {
    case "date":
      defaultValueFormat.value = defaultFormat.value = "YYYY-MM-DD"
      break
    case "daterange":
      defaultValueFormat.value = defaultFormat.value = "YYYY-MM-DD"
      break
    case "datetime":
      defaultValueFormat.value = defaultFormat.value = "YYYY-MM-DD HH:mm:ss"
      break
    case "datetimerange":
      defaultValueFormat.value = defaultFormat.value = "YYYY-MM-DD HH:mm:ss"
      break
    default:
      break
  }
}

const subtractDays = (date: Date, days: number) => {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() - days)
  return newDate
}
// 时分秒
const getHMS = (h: number, m: number, s: number, date: Date = new Date()) => {
  date.setHours(h)
  date.setMinutes(m)
  date.setSeconds(s)
  return date
}

const shortcuts = computed(() => {
  const arr = [
    //type: date
    { text: "今天", value: new Date() },
    { text: "昨天", value: () => subtractDays(new Date(), 1) },
    { text: "一周前", value: () => subtractDays(new Date(), 7) },
    // //type: daterange datetimerange
    {
      text: "本日",
      value: () => {
        return [getHMS(0, 0, 0), getHMS(23, 59, 59)] // 选择今天
      }
    },
    {
      text: "本周",
      value: () => {
        const startOfWeek = new Date()
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
        return [getHMS(0, 0, 0, startOfWeek), getHMS(23, 59, 59)] // 选择本周范围
      }
    },
    {
      text: "本月",
      value: () => {
        const startOfMonth = new Date()
        startOfMonth.setDate(1)
        return [getHMS(0, 0, 0, startOfMonth), getHMS(23, 59, 59)] // 选择本月范围
      }
    },
    {
      text: "本年",
      value: () => {
        const startOfYear = new Date(new Date().getFullYear(), 0, 1)
        return [getHMS(0, 0, 0, startOfYear), getHMS(23, 59, 59)] // 选择本年范围
      }
    },
    {
      text: "近一日",
      value: () => {
        const lastDay = new Date()
        lastDay.setDate(lastDay.getDate() - 1)
        return [lastDay, new Date()]
      }
    },
    {
      text: "近一周",
      value: () => {
        const startOfLastWeek = new Date()
        startOfLastWeek.setDate(startOfLastWeek.getDate() - 7)
        return [startOfLastWeek, new Date()] // 选择过去一周
      }
    },
    {
      text: "近一月",
      value: () => {
        const startOfLastMonth = new Date()
        startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1)
        return [startOfLastMonth, new Date()] // 选择过去一个月
      }
    },
    {
      text: "近三月",
      value: () => {
        const startOfThreeMonth = new Date()
        startOfThreeMonth.setMonth(startOfThreeMonth.getMonth() - 3)
        return [startOfThreeMonth, new Date()] // 选择当前季度
      }
    },
    {
      text: "近半年",
      value: () => {
        const startOfLastHalfYear = new Date()
        startOfLastHalfYear.setMonth(startOfLastHalfYear.getMonth() - 6)
        return [startOfLastHalfYear, new Date()] // 选择过去六个月
      }
    },
    {
      text: "近一年",
      value: () => {
        const startOfLastYear = new Date()
        startOfLastYear.setFullYear(startOfLastYear.getFullYear() - 1)
        return [startOfLastYear, new Date()] // 选择过去一年
      }
    }
  ]
  const nameMap = arr.reduce((acc, curr) => {
    acc[curr.text] = curr
    return acc
  }, {})
  return props.shortcutsName.map(name => nameMap[name])
})
// 当前选中
const handleChange = (val: any) => {
  if (!val) {
    selectedDate.value = props.formatNullValue
  }
  emit("change", val ?? props.formatNullValue)
}
onMounted(() => {
  emit("getRef", datePicker.value)
  format()
})
</script>

<style scoped>
/* 添加你的样式 */
</style>
