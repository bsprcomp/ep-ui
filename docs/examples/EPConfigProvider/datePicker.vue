<template>
  <EPConfigProvider :datePicker="datePickerConfig">
    <div class="wrapper">
      <EPDatePicker valueFormat="YYYY-MM-DD" type="daterange" />
    </div>
  </EPConfigProvider>
</template>

<script setup lang="ts">
const datePickerConfig = {
  startPlaceholder: "开始日期",
  endPlaceholder: "结束日期",
  placeholder: "请选择",
  rangeSeparator: "至"
}
</script>
