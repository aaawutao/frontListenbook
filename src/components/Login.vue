<template>
  <div id="app">
    <div class="content">
      <div class="content_input">
        <div class="title">
          <p>管理员登录</p>
        </div>
        <el-input v-model="UserName" clearable placeholder="用户名"></el-input>
        <el-input v-model="PassWord" clearable show-password placeholder="密码"></el-input>
        <div class="content_button">
          <el-button type="primary" @click="SignIn">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: "Login",
    data() {
      return {
        UserName: '',
        PassWord: ''
      }
    },
    methods: {
      SignIn() {
        let username = this.UserName;
        let password = this.PassWord;
        if (!username) {
          this.$notify.error({
            message: '用户名不能为空'
          });
          return;
        } else if (!password) {
          this.$notify.error({
            message: '密码不能为空'
          });
          return;
        } else {
          console.log(username+"======="+password);
          this.$message({
            message: '恭喜你，通过了！',

            type: 'success'
          });
          /*setTimeout(() => {
            this.$notify({
              title: '没得办法就这一页',
              message: '自己点 “X” 吧！',
              position: 'top-left'
            });
          }, 2000)*/
        }
      }
    }
  }
</script>

<style scoped>
  .form{
    border: 1px solid gray;
    margin: 100px auto;
    width: 30%;
    border-radius: 25px;
    box-shadow: 0 0 25px lightskyblue;
    padding: 30px 50px;
    text-align: center;
  }
</style>
