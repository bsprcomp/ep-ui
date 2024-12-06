<!--
  完整示例
     is-show-menu需要配合name使用，设置唯一table名称，用于lolocalStorage缓存key（下拉菜单可拖拽排序）
 -->
<template>
  <div class="wrapper vp-raw">
    <EPTable
      :heightlightClick="true"
      v-model:page="page"
      :data="data"
      :columns="columns"
      @getData="getData"
      is-show-pagination
      is-show-menu
      v-model:check="checkList"
      name="TestTable"
    >
      <!-- 表额外插槽，单独一行，自行处理样式 -->
      <template #extra>
        <EPForm
          ref="epForm"
          label-suffix=":"
          :formItems="formItems"
          label-width="60px"
          inline
          v-model:expand="expand"
          v-model="formParams"
          :operatorList="operatorList"
          @formChange="formChange"
          @getRef="el => (formRef = el)"
        />
      </template>
      <!-- 预留btn插槽,置于列表左侧，如渲染新增、批量删除等按钮  antiClick 开启防抖loading-->
      <template #button>
        <EPButton value="新 增" type="primary" antiClick @click="add()" />
        <el-popconfirm title="是否确定批量删除？" @confirm="batchDelete">
          <template #reference>
            <EPButton :disabled="!checkList.length" value="批量删除" />
          </template>
        </el-popconfirm>
      </template>
      <!-- 预留input插槽 ，可以放置搜索框等 -->
      <template #input>
        <!-- antiClick 开启点击loading -->
        <EPInput placeholder="请输入姓名" />
      </template>
    </EPTable>
    <EPDialog
      :title="dialogTitle"
      @handle-cancel="dialogVisible = false"
      @handle-submit="handleSubmit"
      v-model:params="dialogParams"
      :formProps="formProps"
      v-model="dialogVisible"
      max-height="400px"
    ></EPDialog>
  </div>
</template>

<script setup lang="tsx">
import { computed, onMounted, reactive, ref } from "vue"
import { ElMessage } from "element-plus"
import { tools } from "../../../packages/index"
//import { tools } from "@bscomp/ep-ui" 在实际项目中使用
// 是否显示弹框
const dialogVisible = ref(false)
//复选框选中
const checkList = ref([])
// 模拟弹框下拉选项接口返回，并在dialogFormitems中使用
const options = ref<any>([])
// 是否编辑
const isEdit = ref(false)
// 弹框标题
const dialogTitle = computed(() => (isEdit.value ? "编辑" : "新增"))
// 弹框表单参数
const dialogParams = ref({})
// 自定义验证
const validatePass = (rule: any, value: any, callback: any) => {
  if (value && /[\`\~\!\@\#\$\%\^\&\*\(\)\_\+\-\=\{\}\|\[\]\:\;\'\<\>\?\,\.]+/.test(value)) {
    callback(new Error("不允许输入特殊字符"))
  } else {
    callback()
  }
}
const dialogFormitems = computed(() => [
  {
    prop: "name",
    label: "用户名",
    comp: "el-input", //comp使用全局注册的组件
    required: true, // 开启为空校验
    rules: {
      validator: validatePass,
      trigger: "blur"
    } //继承rules属性继承element Form Attributes
  },
  {
    prop: "gender",
    label: "性别",
    comp: "EPRadio",
    required: true,
    options: [
      { label: "男", value: "1" },
      { label: "女", value: "2" }
    ],
    defaultValue: "1"
  },
  {
    prop: "param_2",
    label: "下拉选项",
    comp: "EPSelect",
    required: true,
    options: options.value
  }
])
// 弹框表单配置
const formProps = computed(() => {
  return {
    formItems: dialogFormitems.value
  }
})
const expand = ref(false)
// EPForm 组件中el-form实例
const formRef = ref()
// EPForm实例
const epForm = ref()
// 表单重置
const resetFields = () => {
  epForm.value.resetFields()
}

// form items
const formItems = computed(() => [
  {
    prop: "username", //el-form-item属性
    label: "用户名", //el-form-item label值
    comp: "EPInput", // 组件类型
    defaultValue: ""
  },
  {
    prop: "date",
    label: "日期",
    comp: "EPDatePicker",
    defaultValue: "2024-11-16",
    hidden: !expand.value,
    shortcutsName: ["今天", "昨天", "一周前"]
  }
])
// 获取初始化值（getParams 会返回一个对象 {[prop]:defaultValue||''}
const formParams = ref(tools.getParams(formItems.value))
console.log(formParams.value)

// form 表单按钮
const operatorList = [
  {
    label: "查 看",
    bind: { type: "primary" },
    fun: () => {
      console.log("getData")
    }
  },
  { label: "重 置", bind: { type: "default" }, fun: resetFields }
]

const formChange = () => {
  console.log("表单变化")
}
const handleSubmit = async () => {
  // const res =await xxxx() // 提交到后台请求
  ElMessage.success("验证通过并提交")
  dialogVisible.value = false
}
const page = reactive({ size: 10, page: 1, total: 0 })
const data = ref<any[]>([])
// 模拟数据
const DATA = Array.from({ length: 100 }).map((_, index) => ({
  id: index,
  name: "@bscomp_" + index,
  gender: index % 2 == 0 ? 1 : 2,
  age: 1 + index,
  address: "南京"
}))
const columns = ref<any[]>([
  { type: "selection", width: "55" },
  {
    prop: "name",
    label: "用户名"
  },
  {
    prop: "gender",
    label: "性别",
    formatter: row => (row.gender == 1 ? "男" : "女") // 可以使用formatter格式化输入
  },
  { prop: "age", label: "年龄" },
  { prop: "address", label: "地址" },
  {
    prop: "operation",
    label: "操作",
    width: 120,
    operation: [
      // 继承EPButton 所有属性 默认link为true
      {
        label: "编辑",
        func: (row, scope) => {
          isEdit.value = true
          add(row)
        }
      },
      {
        label: "删除",
        antiClick: true, // 开启防抖
        func: (row, scope) => {
          deleteRow(row, scope)
        },
        isShowConfirm: true
      }
    ]
  }
])
const batchDelete = () => {
  checkList.value = []
}
const add = (row?: any) => {
  dialogVisible.value = true
  if (row) {
    isEdit.value = true
    Object.assign(dialogParams.value, row)
  } else {
    isEdit.value = false
    dialogParams.value = tools.getParams(dialogFormitems.value)
  }

  console.log(dialogParams.value, "新增")
}
const edit = row => {
  console.log(row)
}
const deleteRow = (row, scope) => {
  console.log(row, scope)
}
// page变化回调
const getData = () => {
  data.value = DATA.slice((page.page - 1) * page.size, page.page * page.size)
  page.total = 20
}
onMounted(() => {
  getData()
  setTimeout(() => {
    options.value = [
      {
        label: "测试1",
        value: "1"
      },
      {
        label: "测试2",
        value: "2"
      }
    ]
  })
})
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 400px;
  padding: 16px;
  box-sizing: border-box;
  position: relative;
  ::v-deep(.el-table__header) {
    --el-table-header-bg-color: #f2f6fc;
  }
}
</style>
