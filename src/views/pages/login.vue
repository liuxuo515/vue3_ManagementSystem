<template>
  <div class="login-bg">
    <div class="login-container">
      <div class="logo-box">
        <img class="logo" src="../../assets/img/logo.png" alt="logo" />
        <p class="welcome-text">Hi,欢迎登录<br />盈科涉外时报后台</p>
      </div>
      <div class="login-box">
        <div class="login-header">
          <div class="login-title">账号登录</div>
        </div>
        <el-form :model="param" :rules="rules" ref="login">
          <el-form-item prop="username">
            <div class="input-box">
              <User class="user-icon" />
              <i class="line-icon"></i>
              <el-input v-model="param.username" placeholder="请输入用户名">
              </el-input>
            </div>
          </el-form-item>
          <el-form-item prop="password">
            <div class="input-box">
              <Lock class="lock-icon" />
              <i class="line-icon"></i>
              <el-input
                type="password"
                placeholder="请输入密码"
                v-model="param.password"
                @keyup.enter="submitForm(login)"
              >
              </el-input>
            </div>
          </el-form-item>
          <div class="pwd-tips">
            <el-checkbox
              class="pwd-checkbox"
              v-model="checked"
              label="记住密码"
            />
            <!-- <el-link type="primary" @click="$router.push('/reset-pwd')"
            >忘记密码</el-link
          > -->
          </div>
          <el-button
            class="login-btn"
            type="primary"
            size="large"
            @click="submitForm(login)"
            >立即登录</el-button
          >
          <!-- <p class="login-text">
            没有账号？<el-link type="primary" @click="$router.push('/register')">立即注册</el-link>
          </p> -->
        </el-form>
      </div>
    </div>
    <p class="source">来源:本后台由盈科律师事务所总部数智化中心提供技术支持</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useTabsStore } from "@/store/tabs";
import { usePermissStore } from "@/store/permiss";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { loginMethod, getRole } from "@/api";

interface LoginInfo {
  username: string;
  password: string;
}

const lgStr = localStorage.getItem("login-param");
const defParam = lgStr ? JSON.parse(lgStr) : null;
const checked = ref(lgStr ? true : false);

const router = useRouter();
const param = reactive<LoginInfo>({
  username: defParam ? defParam.username : "",
  password: defParam ? defParam.password : "",
});

const rules: FormRules = {
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};
const login = ref<FormInstance>();
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      const res = (await loginMethod(param)) as any;
      if (res.code == 200) {
        ElMessage.success(res.msg);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("vuems_name", res.data.username);
        localStorage.setItem("token", res.data.token);
        // const keys =
        //   permiss.defaultList[param.username == "admin" ? "admin" : "user"];
        //获取当前权限
        const rolePerData = await getMenu(res.data.username);
        //保存缓存
        localStorage.setItem("rolePerData", JSON.stringify(rolePerData));

        const permiss = usePermissStore() as any;
        permiss.defaultList = rolePerData;
        const keys = permiss.defaultList;
        permiss.handleSet(keys);
        router.push("/");
        if (checked.value) {
          localStorage.setItem("login-param", JSON.stringify(param));
        } else {
          localStorage.removeItem("login-param");
        }
      } else {
        ElMessage.error(res.msg);
        return false;
      }
    }
  });
};

//获取当前权限
const getMenu = async (username) => {
  //获取用户权限
  let rolePerData = [];
  //获取角色 权限
  const res = await getRole("", username, 1, 1);
  if (res.code == 200) {
    if (res.data.list !== null && res.data.list !== undefined) {
      rolePerData = res.data.list[0].permiss;
    }
  }
  return rolePerData;
};

const tabs = useTabsStore();
tabs.clearTabs();
</script>

<style scoped>
.login-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: url(../../assets/img/login-bg.png) center/cover no-repeat;
}

.login-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 52px;
}

.logo {
  width: 371px;
}

.login-title {
  font-weight: bold;
  font-size: 30px;
  color: #9e4200;
}

.login-container {
  display: flex;
  width: 1200px;
  height: 530px;
  border-radius: 30px;
  border: 1px solid rgba(255, 238, 220, 0.4);
  background: rgba(240, 197, 158, 0.16);
  box-sizing: border-box;
}

.pwd-tips {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin: 0 0 20px 0;
  color: #787878;
}

::v-deep .pwd-checkbox {
  height: auto;
}

::v-deep .el-checkbox__inner {
  width: 16px;
  height: 16px;
  border: 2px solid #ca8c2d;
  border-radius: 3px;
  background: none;
}

::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
  border: 2px solid #ca8c2d;
  background: #ca8c2d;
}

::v-deep .el-checkbox__inner:after {
  color: #ca8c2d;
}

::v-deep .el-checkbox__label {
  font-size: 16px;
  color: #333333;
}

::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #333333;
}

.login-btn {
  display: block;
  width: 100%;
  height: 60px;
  background: #9e4200;
  border-radius: 30px;
  border: none;
  font-size: 20px;
}

.login-tips {
  font-size: 12px;
  color: #999;
}

.login-text {
  display: flex;
  align-items: center;
  margin-top: 20px;
  font-size: 14px;
  color: #787878;
}

.login-box {
  box-sizing: border-box;
  width: 518px;
  height: 100%;
  background: linear-gradient(35deg, #fbf5e5, #f6cca7);
  border-radius: 30px;
  border: 2px solid rgba(255, 243, 212, 0.9);
  padding: 70px 85px 0;
}

.logo-box {
  flex: 1;
  box-sizing: border-box;
  padding: 46px 55px 0;
}

.welcome-text {
  margin: 80px 0 0 100px;
  font-weight: bold;
  font-size: 54px;
  color: #ffffff;
  line-height: 75px;
}

.input-box {
  position: relative;
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
}

.user-icon {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  width: 20px;
  color: rgba(158, 66, 0, 1);
  z-index: 9;
}

.line-icon {
  position: absolute;
  top: 50%;
  left: 55px;
  transform: translateY(-50%);
  width: 1px;
  height: 24px;
  background: #999999;
}

.lock-icon {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  width: 20px;
  color: rgba(158, 66, 0, 1);
}

::v-deep .el-input__inner {
  height: 60px;
}

::v-deep .el-input__wrapper {
  padding: 0 10px 0 70px;
  border-radius: 10px;
  box-shadow: none;
  background: none;
}

.source {
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  font-size: 16px;
  color: #f8a355;
  opacity: 0.87;
}
</style>
