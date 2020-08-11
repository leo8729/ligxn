<template>
  <div class="login-container">
    <div v-if="!identity" class="identity-container">
      <div class="title-container">
        <h3 class="title">选择身份</h3>
      </div>
      <el-main>
        <el-row :gutter="20">
          <el-col v-for="(item, index) in identityList" :key="index" :span="6"><div class="identity" @click="choseIdentity(item.identity)">{{item.identityName}}</div></el-col>
        </el-row>
      </el-main>
    </div>

    <el-form v-else ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">登 录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="手机号"
          name="username"
          type="tel"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="identifyingcode">
        <el-col :span="20">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input ref="identifyingcode" v-model="loginForm.identifyingcode" placeholder="验证码" type="tel" tabindex="2" />
          <el-button type="primary" class="sendcodeBtn">发送验证码</el-button>
        </el-col>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">提交</el-button>

      <div class="tips">
        <a style="margin-right:20px; text-decoration:underline" @click="goRegister">没有账号？马上注册</a>
      </div>

    </el-form>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value) && value.length !== 11) {
          callback(new Error('请输入正确手机格式'))
        } else {
          callback()
        }
      })
    }
    const validateIdentifyingcode = (rule, value, callback) => {
      if (value.length !== 4) {
        callback(new Error('验证码有四位数'))
      } else {
        callback()
      }
    }
    return {
      identity: '',
      identityList: [
        { identityName: '学生', identity: 'student' },
        { identityName: '老师', identity: 'teacher' },
        { identityName: '家长', identity: 'parent' },
        { identityName: '游客', identity: 'visitor' }
      ],
      loginForm: {
        username: '13426046740',
        identifyingcode: '5848',
        spassword: 'abc123'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        identifyingcode: [{ required: true, trigger: 'blur', validator: validateIdentifyingcode }]
      },
      loading: false,
      redirect: undefined
    }
  },
  // watch: {
  //   $route: {
  //     handler: function(route) {
  //       this.redirect = route.query && route.query.redirect
  //     },
  //     immediate: true
  //   }
  // },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/stuLogin', this.loginForm).then(() => {
            this.$router.push('/')
            // this.$router.push({ path: this.redirect || '/' })
            console.log('aaa')
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    choseIdentity(str) {
      this.identity = str
      console.log(str)
    },
    goRegister() {
      console.log('goRegister')
      this.$router.push('/register/' + this.identity)
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

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

.sendcodeBtn{
  position: absolute;
  right: 8px;
  top: 6px;
}

.identity-container{
  position: relative;
  width: 880px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
}
.identity{
  border-radius:50%;
  width:150px;
  line-height:150px;
  text-align: center;
  color: rgba(255,255,255,.7);
  border:1px solid #fff;
  font-size:30px;
  background-color:rgba(255,255,255,.2);
  cursor: pointer;
}
</style>
