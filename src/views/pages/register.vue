<template>
  <div class="login-bg">
    <div class="login-container">
      <div class="login-header">
        <img class="logo mr10" src="../../assets/img/logo.svg" alt="" />
        <div class="login-title">盈科涉外时报后台管理系统</div>
      </div>
      <el-form :model="param" :rules="rules" ref="register" size="large">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="账号">
            <template #prepend>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="param.password">
            <template #prepend>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="passwordsure">
          <el-input
            type="password"
            placeholder="确认密码"
            v-model="param.passwordsure"
          >
            <template #prepend>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <div
          v-if="
            param.password &&
            param.passwordsure &&
            param.password !== param.passwordsure
          "
          class="error"
        >
          密码不一致，请重新输入。
        </div>

        <el-button
          class="login-btn"
          type="primary"
          size="large"
          @click="submitForm(register)"
          >注册</el-button
        >
        <p class="login-text">
          已有账号，<el-link type="primary" @click="$router.push('/login')"
            >立即登录</el-link
          >
        </p>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { Register } from "@/types/user";
import { saveorupdateuser } from "@/api";

const router = useRouter();
const param = reactive<Register>({
  username: "",
  password: "",
  passwordsure: "",
});

const rules: FormRules = {
  username: [
    {
      required: true,
      message: "请输入账号",
      trigger: "blur",
    },
    {
      min: 5,
      max: 15,
      message: "账号长度在 5 到 15 个字符之间",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 5,
      max: 20,
      message: "密码长度在 5 到 20 个字符之间",
      trigger: "blur",
    },
  ],
  passwordsure: [
    { required: true, message: "请输入确认密码", trigger: "blur" },
    {
      min: 5,
      max: 20,
      message: "确认密码长度在 5 到 20 个字符之间",
      trigger: "blur",
    },
  ],
};
const register = ref<FormInstance>();
const submitForm = (formEl: FormInstance | undefined) => {
  //验证密码确认密码
  if (
    param.password &&
    param.passwordsure &&
    param.password !== param.passwordsure
  ) {
  } else {
    if (!formEl) return;
    formEl.validate(async (valid: boolean) => {
      if (valid) {
        let data = { ...param };
        data.name = data.username;
        data.account = data.username;
        data.RoleId = 2; //普通用户
        //修改或者保存
        const res = await saveorupdateuser(data);
        if (res.code == 200) {
          ElMessage.success("注册成功，请登录！");
        } else {
          ElMessage.success("注册失败，请联系管理员！");
        }
        router.push("/login");
      } else {
        return false;
      }
    });
  }
};
</script>

<style scoped>
.login-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: url(../../assets/img/login-bg.jpg) center/cover no-repeat;
}

.login-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.logo {
  width: 35px;
}

.login-title {
  font-size: 22px;
  color: #333;
  font-weight: bold;
}

.login-container {
  width: 450px;
  border-radius: 5px;
  background: #fff;
  padding: 40px 50px 50px;
  box-sizing: border-box;
}

.login-btn {
  display: block;
  width: 100%;
}

.login-text {
  display: flex;
  align-items: center;
  margin-top: 20px;
  font-size: 14px;
  color: #787878;
}
</style>
