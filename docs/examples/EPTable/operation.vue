<template>
  <div class="wrapper vp-raw">
    <EPTable :data="data" :columns="columns">
      <template #btn>
        <EPButton type="primary" value="新 增" @click="add" />
      </template>
    </EPTable>
    <el-dialog v-model="dialogVisible" :title="title" width="500" align-center>
      <el-form
        ref="formRef"
        :rules="rules"
        :model="form"
        label-width="auto"
        style="max-width: 600px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input style="width: 200px" v-model="form.name" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input style="width: 200px" v-model="form.age" prop="age" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit"> 确 认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue"
const dialogVisible = ref(false)
const isEdit = ref(false)
const data = ref<any>([])
const formRef = ref()
const form = reactive({
  name: "",
  age: "",
  id: ""
})
const rules = {
  name: [
    {
      required: true,
      message: "请输入姓名"
    }
  ],
  age: [
    {
      required: true,
      message: "请输入年龄"
    }
  ]
}
const title = computed(() => (isEdit.value ? "编辑" : "新增"))
const columns = [
  { prop: "name", label: "姓名", minWidth: "100" },
  { prop: "age", label: "年龄", minWidth: "180" },
  {
    prop: "operation",
    label: "操作",
    width: 120,
    fixed: "right",
    operation: [
      {
        label: "编辑",
        fun: row => {
          edit(row)
        }
      },
      {
        label: "删除",
        fun: (row, index, data) => {
          deleteRow(row, index, data)
        }
      }
    ]
  }
]
const add = () => {
  dialogVisible.value = true
  Object.assign(form, { name: "", age: "" })
  isEdit.value = false
}
const edit = row => {
  dialogVisible.value = true
  Object.assign(form, row)
  isEdit.value = true
}
const deleteRow = (row, index, data) => {
  console.log(row, index, data)
}
const submit = async () => {
  await formRef.value.validate()
  dialogVisible.value = false
}
onMounted(() => {
  data.value = Array.from({ length: 2 }).map((_, index) => ({
    id: index,
    name: "@bscomp",
    age: 18 + index
  }))
})
</script>
<style scoped>
.wrapper {
  height: 300px;
}
</style>
