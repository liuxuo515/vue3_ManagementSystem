<template>
  <div>
    <el-tree
      class="mgb10"
      ref="tree"
      :data="data"
      node-key="id"
      default-expand-all
      show-checkbox
      :default-checked-keys="checkedKeys"
    />
    <el-button type="primary" @click="onSubmit">保存权限</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElTree, ElMessage } from "element-plus";
import { menuData } from "@/components/menu";
import { saveorupdatepermiss } from "@/api";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  permissOptions: {
    type: Object,
    required: true,
  },
  closeProps: {
    type: Function,
    required: true,
  },
});

const menuObj = ref({});

const getTreeData = (data) => {
  return data.map((item) => {
    const obj: any = {
      id: item.id,
      label: item.title,
    };
    if (item.children) {
      menuObj.value[item.id] = item.children.map((sub) => sub.id);
      obj.children = getTreeData(item.children);
    }
    return obj;
  });
};
const data = getTreeData(menuData);
const checkData = (data: string[]) => {
  return data.filter((item) => {
    return (
      !menuObj.value[item] ||
      data.toString().includes(menuObj.value[item].toString())
    );
  });
};
// 获取当前权限
const checkedKeys = ref<string[]>(checkData(props.permissOptions.permiss));

// 保存权限
const tree = ref<InstanceType<typeof ElTree>>();
const onSubmit = async () => {
  // 获取选中的权限
  const keys = [
    ...tree.value!.getCheckedKeys(false),
    ...tree.value!.getHalfCheckedKeys(),
  ] as number[];
  const data = {
    id: props.permissOptions.id,
    permiss: keys,
  };
  const res = await saveorupdatepermiss(data);
  if (res.code == 200) {
    ElMessage({
      message: res.msg,
      type: "success",
    });
  } else {
    ElMessage({
      message: res.msg,
      type: "error",
    });
  }
  //更换缓存
  // localStorage.setItem("rolePerData", JSON.stringify(rolePerData));
  localStorage.setItem("rolePerData", JSON.stringify(keys));
  //重新加载当前页面
  router.go(0);
  //关闭当前页面
  props.closeProps();
};
</script>

<style scoped></style>
