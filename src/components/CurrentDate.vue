<!-- CurrentDate.vue -->
<template>
  <div>{{ currentDate }}</div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";

const emit = defineEmits();
const currentDate = ref("");

// 获取当前日期
const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  currentDate.value = `${year}年${month < 10 ? "0" + month : month}月${
    day < 10 ? "0" + day : day
  }日`;

  // 通过事件传递当前日期
  emit("dateChanged", currentDate.value);
};

// 当组件加载时，自动获取当前日期
onMounted(() => {
  getCurrentDate();
});
</script>
