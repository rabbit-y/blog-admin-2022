<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { Lock, Message } from "@element-plus/icons-vue";
import { useStore } from "~/utils/store";

const router = useRouter();
const stote = useStore();
const form = reactive({
  email: "",
  pwd: "",
});

const onSubmit = async () => {
  const { code } = await API.other.doLogin.request(form);
  if (code === 0) {
    ElMessage.success("登陆成功");
    router.push("/");
    localStorage.setItem("login", "true");
  }
};
</script>
<template>
  <div class="login">
    <div class="login-form">
      <div class="login-logo">{{ stote.infoOther.stationName }}</div>
      <el-form :model="form" size="large">
        <el-form-item>
          <el-input
            v-model="form.email"
            :prefix-icon="Message"
            placeholder="邮箱"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.pwd"
            type="password"
            show-password
            :prefix-icon="Lock"
            placeholder="密码"
          />
        </el-form-item>
        <el-form-item>
          <div class="login-botton">
            <el-button type="primary" @click="onSubmit" round>登 录</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss">
.login {
  background-image: url(http://han96.com/api/img);
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  padding-top: 20vh;
  box-sizing: border-box;

  .login-form {
    width: 300px;
    padding: 40px;
    margin: 0 auto;
    backdrop-filter: blur(10px);
    box-shadow: var(--el-box-shadow-dark);

    .el-input__wrapper {
      border-radius: var(--el-border-radius-round);
    }

    .login-logo {
      font-size: 34px;
      color: $h-color;
      font-weight: bold;
      text-align: center;
      padding-bottom: 30px;
    }

    .login-botton {
      width: 100%;
      text-align: center;
      margin-top: 10px;

      button {
        width: 100%;
        font-weight: bold;
      }
    }
  }
}
</style>
