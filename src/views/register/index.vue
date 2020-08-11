<template>
  <div class="register-container login-container">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="login-form" label-position="left">

      <div class="title-container">
        <h3 class="title">注 册——{{identityName}}</h3>
      </div>

      <el-form-item prop="school" v-if="identity!=='visitor'">
        <el-select v-model="registerForm.school" placeholder="请选择学校">
          <el-option label="汇文中学" value="huiwen"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="identity==='teacher'" prop="teacherId">
        <el-input ref="teacherId" v-model="registerForm.studentName" placeholder="工号" name="teacherId" type="text" tabindex="2" />
      </el-form-item>
      <el-form-item v-if="identity==='student'" prop="studentName">
        <el-input ref="studentName" v-model="registerForm.studentName" placeholder="姓名" name="studentName" type="text" tabindex="3" />
      </el-form-item>
      <el-form-item v-if="identity==='student'" prop="classCode">
        <el-input ref="classCode" v-model="registerForm.classCode" placeholder="班级邀请码" name="classCode" type="text" tabindex="4" />
      </el-form-item>
      <el-form-item v-if="identity==='parent'" prop="parentCode">
        <el-input ref="parentCode" v-model="registerForm.parentCode" placeholder="家长邀请码" name="parentCode" type="text" tabindex="5" />
      </el-form-item>

      <el-form-item prop="telphone">
        <el-input ref="telphone" v-model="registerForm.telphone" placeholder="手机号" name="telphone" type="tel" tabindex="1" />
      </el-form-item>
      <el-form-item prop="identifyingcode">
        <el-col :span="20">
          <el-input ref="identifyingcode" v-model="registerForm.identifyingcode" placeholder="验证码" type="tel" tabindex="6" />
          <el-button type="primary" class="sendcodeBtn">发送验证码</el-button>
        </el-col>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleRegister">提交</el-button>
      <el-form-item el-form-item prop="checkedRead" class="checkedRead">
        <el-checkbox v-model="registerForm.checkedRead"></el-checkbox>
        <span style="margin-right:20px;margin-bottom:30px;color:#fff"> 我已阅读并同意<a style="text-decoration:underline" @click="centerDialogVisible = true">《用户协议》</a></span>
      </el-form-item>
    </el-form>
    <el-dialog
      class="abow_dialog"
      title="用户协议"
      :visible.sync="centerDialogVisible"
      center>
      <div>
        <p>重要提示：</p>
        <p>请您仔细阅读以下条款，并确认您已完全理解本协议之规定，尤其是免除及限制责任的条款、知识产权条款、法律适用及争议解决条款。</p>
        <p>若您对本声明或本协议任何条款有异议，请停止注册或使用简书网（jianshu.com，包括手机、电脑等移动设备客户端，下同）所提供的全部服务。</p>
        <p>一、协议的接受、变更与补充</p>
        <p>1、勾选本协议前选项框并点击“注册”，将视为您签署了本协议，表明您自愿接受本协议全部条款的约束，本协议将构成您与上海佰集科技有限公司及其经营的“简书”平台（以下统称“简书”，包括相关关联方）之间具有约束力的法律文件。无论您是进入简书浏览网页，还是在简书上发布任何内容，或者是直接或通过各类方式（如站外API引用等）间接使用简书网服务和数据的行为，都将被视作已无条件接受本声明所涉全部内容。</p>
        <p>2、简书有权利对本协议进行修改，协议修改后，简书将通过在相关页面公告或发送通知等方式公布修改的内容，修改后的协议一经公布即有效的代替原协议。如果您不同意本协议的修改，请立即停止访问或使用本网站或取消已经获得的服务；如果您选择继续访问或使用本网站，则视为您已接受本协议的修改。</p>
        <p>3、签署的本协议所列明的条款，并不能完全涵盖您与简书之间所有的权利和义务。因此，简书不定期公布的其他声明、规则等均视为本协议之补充协议，为本协议不可分割的组成部分，与本协议具有同等法律效力。</p>
        <p>4、如本协议与简书平台其它协议条款不一致，以其它协议条款内容为准。</p>
        <p>二、帐号密码与注册、登录</p>
        <p>1、帐号的取得</p>
        <p>(1)您确认，在您开始注册简书前，已经具备中华人民共和国法律规定的与您行为相适应的民事行为能力。若您不具备前述与您行为相适应的民事行为能力，则您及您的监护人应依照法律规定承担因此而导致的一切后果。</p>
        <p>(2)您注册成功后，即成为简书注册用户，用户须对在简书的注册信息的真实性、合法性、有效性承担全部责任。您可自行创建、修改昵称，但用户名和昵称的命名及使用应遵守相关法律法规并符合网络道德，不得冒充他人或恶意注册使人误认；不得利用他人的名义发布任何信息；不得恶意使用注册帐号导致其他用户误认；用户名和昵称中不能含有任何侮辱、诽谤、淫秽或暴力等侵害他人合法权益或违反公序良俗的词语。如您违反前述规定，简书有权随时限制或拒绝您使用该账号，甚至注销该账号。</p>
      </div>
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="readSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'

export default {
  name: 'Register',
  data() {
    const validateStudentName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'))
      }
      setTimeout(() => {
        let reg = /^[\u4e00-\u9fa5]{1,6}(·[\u4e00-\u9fa5]{1,6}){0,2}$/
        if (reg.test(value)) {
          callback(new Error('请输入正确姓名格式'))
        } else {
          callback()
        }
      })
    }
    const validateTelphone = (rule, value, callback) => {
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
    const validateCheckedRead = (rule, value, callback) => {
      if (value === false) {
        callback(new Error('请您阅读《用户协议》'))
      } else {
        callback()
      }
    }
    return {
      identity: '',
      registerForm: {
        school: '',
        username: '',
        identifyingcode: '',
        studentName: '',
        classCode: '',
        parentCode: '',
        teacherId: '',
        checkedRead: false
      },
      registerRules: {
        school: [{ required: true, trigger: 'change', message: '请选择学校' }],
        teacherId: [{ required: true, trigger: 'blur', message: '请输入工号' }],
        studentName: [{ required: true, trigger: 'blur', validator: validateStudentName }],
        classCode: [{ required: true, trigger: 'blur', message: '请输入班级邀请码' }],
        parentCode: [{ required: true, trigger: 'blur', message: '请输入家长邀请码' }],
        telphone: [{ required: true, trigger: 'blur', validator: validateTelphone }],
        identifyingcode: [{ required: true, trigger: 'blur', validator: validateIdentifyingcode }],
        checkedRead: [{ required: true, trigger: 'change', validator: validateCheckedRead }]
      },
      loading: false,
      redirect: undefined,
      centerDialogVisible: false
    }
  },
  computed: {
    identityName: {
      // getter
      get: function() {
        let name = ''
        switch (this.identity)
        {
          case 'student':
            name = '学生'
            break
          case 'teacher':
            name = '老师'
            break
          case 'parent':
            name = '家长'
            break
          default:
            name = '游客'
        }
        return name
      },
      // setter
      set: function(newValue) {}
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
  created() {
    this.getIdentity()
  },
  methods: {
    getIdentity() {
      this.identity = this.$route.params.id
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.registerForm).then(() => {
            console.log(valid)
            // this.$router.push({ path: this.redirect || '/' })
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
    readSure() {
      this.centerDialogVisible = false
      this.registerForm.checkedRead = true
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
    &.checkedRead{
      border:none;
      background:none;
      margin-bottom: 30px;
    }
  }
}
.register-container{
  .el-select{
    width:100%;
    .el-input{
      width:100%;
    }
  }
}

.abow_dialog {
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
  .el-dialog {
    margin: 0 auto !important;
    height: 90%;
    overflow: hidden;
    .el-dialog__body {
      position: absolute;
      left: 30px;
      top: 54px;
      bottom: 80px;
      right: 30px;
      padding: 0;
      z-index: 1;
      overflow: hidden;
      overflow-y: auto;
      padding: 0 20px;
    }
  }
}
.el-dialog__footer{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
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
  right: 5px;
  top: 3px;
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
