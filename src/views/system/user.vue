<template>
  <div>
    <TableSearch :query="query" :options="searchOpt" :search="handleSearch" />
    <div class="container">
      <TableCustom
        :columns="columns"
        :tableData="tableData"
        :viewFunc="handleView"
        :delFunc="handleDelete"
        :editFunc="handleEdit"
        :changepageFunc="changePage"
        :currentPage="page.index"
        :pageSize="page.size"
        :total="page.total"
      >
        <template #toolbarBtn>
          <el-button
            type="warning"
            :icon="CirclePlusFilled"
            @click="visible = true"
            >新增</el-button
          >
        </template>
      </TableCustom>
    </div>

    <el-dialog
      :title="isEdit ? '编辑' : '新增'"
      v-model="visible"
      width="700px"
      destroy-on-close
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <TableEdit
        :form-data="rowData"
        :options="options"
        :edit="isEdit"
        :update="updateData"
      />
    </el-dialog>
    <el-dialog
      title="查看详情"
      v-model="visible1"
      width="700px"
      destroy-on-close
    >
      <TableDetail :data="viewData"></TableDetail>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="system-user">
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { CirclePlusFilled } from "@element-plus/icons-vue";
import { User } from "@/types/user";
import { getUser, getRoleOpts, saveorupdateuser, deluser } from "@/api";
import TableCustom from "@/components/table-custom.vue";
import TableDetail from "@/components/table-detail.vue";
import TableSearch from "@/components/table-search.vue";
import { FormOption, FormOptionList } from "@/types/form-option";

// 查询相关
const query = reactive({
  name: "",
});

const searchOpt = ref<FormOptionList[]>([
  { type: "input", label: "用户名：", prop: "name" },
]);
const handleSearch = () => {
  changePage(1);
};

// 表格相关
let columns = ref([
  { type: "index", label: "序号", width: 55, align: "center" },
  { prop: "name", label: "用户名" },
  { prop: "account", label: "账号" },
  { prop: "phone", label: "手机号" },
  { prop: "role", label: "角色" },
  { prop: "operator", label: "操作", width: 250 },
]);
const page = reactive({
  index: 1,
  size: 10,
  total: 0,
});
const tableData = ref<User[]>([]);
const getData = async () => {
  const res = await getUser(query.name, page.index, page.size);
  tableData.value = res.data.list;
  page.total = res.data.total;

  console.log("page", page);

  //获取下拉框
  getOpts();
};
getData();
//获取下拉框
const getOpts = async () => {
  const res = await getRoleOpts();
  let opts = [];
  res.data.list.forEach((element) => {
    opts.push({ label: element.name, value: element.id });
  });
  //向复选框赋值
  options.value.list[5].opts = opts;
};

const changePage = (val) => {
  page.index = val;
  getData();
};

// 新增/编辑弹窗相关
let options = ref<FormOption>({
  labelWidth: "100px",
  span: 12,
  list: [
    {
      type: "input",
      label: "用户名",
      prop: "name",
      required: true,
      rules: [
        {
          min: 2,
          max: 10,
          message: "用户名长度在 2 到 10 个汉字之间",
          trigger: "change",
        },
      ],
    },
    {
      type: "input",
      label: "手机号",
      prop: "phone",
      required: true,
      rules: [
        {
          pattern: /^[1]([3-9])[0-9]{9}$/, // 正则表达式：以 1 开头，第二位是 3-9，后面是 9 位数字
          message: "请输入正确的手机号", // 错误提示信息
          trigger: "change",
        },
      ],
    },
    {
      type: "input",
      label: "账号",
      prop: "account",
      required: true,
      rules: [
        {
          min: 5,
          max: 15,
          message: "账号长度在 2 到 15 个汉字或字符之间",
          trigger: "change",
        },
      ],
    },
    {
      type: "password",
      label: "密码",
      prop: "password",
      required: true,
      rules: [
        {
          min: 5,
          max: 20,
          message: "密码长度在 5 到 20 个字符之间",
          trigger: "change",
        },
      ],
    },
    { type: "input", label: "邮箱", prop: "email", required: true },
    {
      type: "select",
      label: "角色",
      prop: "roleId",
      required: true,
      opts: [],
    },
  ],
});
const visible = ref(false);
const isEdit = ref(false);
const rowData = ref({});
const handleEdit = (row: User) => {
  rowData.value = { ...row };
  console.log("rowData.value", rowData.value);
  isEdit.value = true;
  visible.value = true;
};
const updateData = async (form) => {
  //修改或者保存
  const res = await saveorupdateuser(form);
  if (res.code == 200) {
    ElMessage.success(res.msg);
  } else {
    ElMessage.error(res.msg);
  }
  closeDialog();
  getData();
};

const closeDialog = () => {
  visible.value = false;
  isEdit.value = false;
};

// 查看详情弹窗相关
const visible1 = ref(false);
const viewData = ref({
  row: {},
  list: [],
});
const handleView = (row: User) => {
  viewData.value.row = { ...row };
  viewData.value.list = [
    {
      prop: "id",
      label: "用户ID",
    },
    {
      prop: "name",
      label: "用户名",
    },
    {
      prop: "account",
      label: "账号",
    },
    {
      prop: "password",
      label: "密码",
    },
    {
      prop: "email",
      label: "邮箱",
    },
    {
      prop: "phone",
      label: "电话",
    },
    {
      prop: "role",
      label: "角色",
    },
    {
      prop: "date",
      label: "注册日期",
    },
  ];
  visible1.value = true;
};

// 删除相关
const handleDelete = async (row: User) => {
  //ElMessage.success("row");
  const res = await deluser(row.id);
  if (res.code == 200) {
    ElMessage.success(res.msg);
  } else {
    ElMessage.error(res.msg);
  }
  getData();
};
</script>

<style scoped></style>
