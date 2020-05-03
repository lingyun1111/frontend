<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <i class="mdi mdi-account"></i>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <i class="mdi mdi-lock"></i>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <i class="mdi" :class="passwordType === 'password' ? 'mdi-eye' : ' mdi-eye-off'"></i>
        </span>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

<!--      <div class="tips">-->
<!--        <span style="margin-right:20px;">username: admin</span>-->
<!--        <span> password: any</span>-->
<!--      </div>-->

    </el-form>
  </div>
</template>

<script>
import validate from '@/utils/elementValidate/index.js'
import { reactive, ref, watch, getCurrentInstance } from '@vue/composition-api'
export default {
  setup () {
    const xtc = getCurrentInstance()
    const loginForm = reactive({
      username: 'admin',
      password: '111111'
    })
    const loginRules = reactive({
      username: [{ trigger: 'blur', validator: validate.add, type: 'userName', msg: '用户名' }],
      password: [{ trigger: 'blur', validator: validate.add, type: 'userPassword', msg: '用户密码' }]
    })
    const loading = ref(false)
    const passwordType = ref('password')
    let redirect = ref(undefined)

    watch(() => xtc.$route,
      (route) => {
        redirect = route.query && route.query.redirect
      })
    // 显示隐藏密码
    const showPwd = () => {
      passwordType.value = passwordType.value === 'password' ? '' : 'password'
    }
    // 进行登录，如果url redirect带有路径，则跳转到该路径
    const handleLogin = () => {
      xtc.$refs.loginForm.validate(async valid => {
        if (valid) {
          loading.value = true
          try {
            await xtc.$store.dispatch('user/login', loginForm)
            xtc.$router.push({ path: redirect || '/' })
          } catch (e) {

          }
          loading.value = false
        }
      })
    }
    return {
      loginForm,
      loginRules,
      loading,
      passwordType,
      redirect,
      showPwd,
      handleLogin
    }
  }
}
</script>

<style lang="scss">
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    font-size: 18px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
