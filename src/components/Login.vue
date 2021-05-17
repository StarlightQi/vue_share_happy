<template>
<div>

<!--  主内容区域-->
  <el-container>
    <el-header>
      <div class="logo">
        <h1><img src="../assets/logo.png" alt="ShareHappy"><a href="/">分享快乐</a></h1>
      </div>
      <div class="zc"><a href="Login">立即注册</a></div>
    </el-header>
    <el-main>
      <div class="login">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="账号登录" name="first">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
              <el-form-item label="账号" prop="author">
                <el-input type="text" v-model="ruleForm.author" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="扫描登录" name="second"><div id="login_container"></div></el-tab-pane>
        </el-tabs>
      </div>
    </el-main>
  </el-container>
</div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    // eslint-disable-next-line no-unused-vars
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        author: ''
      },
      activeName: 'first',
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        author: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async login (key, value) {
      const { data: res } = await this.$http.post('/authorAdmin/userLogin', 'mail=' + this.ruleForm.author + '&password=' + this.ruleForm.pass)
      // eslint-disable-next-line eqeqeq
      if (!res.success) this.$message.error(res.message)
      else {
        this.$message.success(res.message)
        // eslint-disable-next-line eqeqeq
        if (res.data.userpermission != 3) {
          window.sessionStorage.setItem('token', res.data.token)
          window.sessionStorage.setItem('uid', res.data.userid)
          window.sessionStorage.setItem('userImg', 'http://127.0.0.1:8066/images/' + res.data.userImg)
          await this.$router.push('/home')
        }
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  mounted () {
    const appId = 'dingoap70ebnft646kwoyk' // appId 点击创建扫码登录应用授权生成
    const baseUrl = encodeURIComponent('http://127.0.01/main') // 回调域名：扫码成功跳转的url，需要进行编码
    const url = encodeURIComponent(
        `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appId}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${baseUrl}`
    ) // goto参数,需要进行编码
    // eslint-disable-next-line no-undef,no-unused-vars
    var obj = DDLogin({
      id: 'login_container',
      goto: url,
      style: 'border:none;background-color:#FFFFFF;',
      width: '365',
      height: '400'
    })
    var hanndleMessage = function (event) {
      const { origin } = event
      // eslint-disable-next-line eqeqeq
      if (origin == 'https://login.dingtalk.com') { // 判断是否来自ddLogin扫码事件。
        const { data: loginTmpCode } = event // 拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
        // 通过JS获取到loginTmpCode后，需要由你构造并跳转到如下链接：
        // `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=APPID&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=REDIRECT_URI&loginTmpCode=loginTmpCode`
        // 此链接处理成功后，会302跳转到你goto参数指定的redirect_uri，并向url参数中追加临时授权码code及state两个参数。
        window.location.href = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appId}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${baseUrl}&loginTmpCode=${loginTmpCode}` //
      }
    }
    if (typeof window.addEventListener !== 'undefined') {
      window.addEventListener('message', hanndleMessage, false)
    } else if (typeof window.attachEvent !== 'undefined') {
      window.attachEvent('onmessage', hanndleMessage)
    }
  }
}
</script>

<style scoped>
  .logo{
    margin-left: 10%;
    float: left;
  }
  h1 img{
    width: 50px;
    height: 50px;
  }
  .zc{
    float: right;
    margin-right: 10%;
    line-height: 3;
    font-size: 20px;
  }
  .zw img{
    width: 500px;
    height: 600px;
    margin:6%;
  }
  .login{
    width:500px;
    height: 500px;
    margin:6% auto;
    /*float: right;*/
    border: 2px black solid;
  }
  .login .el-form{
    width: 400px;
    margin:100px auto;
  }
  .el-container{
    width: 100%;
    height:100%;
  }
  #login_container{
  }
</style>
