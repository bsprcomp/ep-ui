<template>
  <div class="wrapper">
    <p>
      <EPInput max="10" placeholder="请输入" v-model="input1" width="49%" />
      <EPInput placeholder="禁止输入" disabled v-model="input2" width="49%" />
    </p>
    <p>
      <EPInput placeholder="一键清空" clearable v-model="input3" width="49%" />
      <EPInput placeholder="前图标" v-model="input4" :prefix-icon="Search" width="49%" />
    </p>
    <p>
      <EPInput placeholder="后图标" v-model="input5" :suffix-icon="Search" width="49%" />
      <EPInput placeholder="密码框" v-model="input6" type="password" width="49%" />
    </p>
    <p>
      <EPInput placeholder="文本域" type="text" v-model="input7" inputType="default" />
      <EPInput show-word-limit maxlength="20" type="textarea" v-model="input8" />
    </p>
    <p>
      <EPInput placeholder="prepend" v-model="input7">
        <template #prepend> Http:// </template>
      </EPInput>
      <EPInput placeholder="append" v-model="input7">
        <template #append> .com </template>
      </EPInput>
    </p>
  </div>
</template>
<script setup lang="ts" name="BaseInput">
import { Search } from "@element-plus/icons-vue"
import { ref } from "vue"
const input1 = ref("")
const input2 = ref("")
const input3 = ref("")
const input4 = ref("")
const input5 = ref("")
const input6 = ref("")
const input7 = ref("")
const input8 = ref("显示剩余字数")
</script>
<style lang="scss" scoped>
.wrapper {
  p {
    display: flex;
    gap: 2%;
  }
}
</style>
