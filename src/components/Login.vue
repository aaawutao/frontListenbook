<template>
  <div id="app">
    <div class="content">
      <div class="content_input">
        <div class="title">
          <p>管理员登录</p>
        </div>
        <el-input v-model="user.backstage_uname" clearable placeholder="用户名"></el-input>
        <el-input v-model="user.backstage_upwd" clearable show-password placeholder="密码"></el-input>
        <div class="content_button">
          <el-button type="primary" @click="SignIn">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import  "../../static/js/ribbon.js"
  import  "../../static/js/index.js"
  export default {
    name: "Login",
    data() {
      return {
        user:{}
      }
    },
    methods: {
      SignIn() {
        let username = this.user.backstage_uname;
        let password = this.user.backstage_upwd;
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
          this.$axios.post("backstage/login-check",this.user).then(response=>{
            if(response.data.message!=undefined){
              this.$message({
                message:response.data.message
              })
            }else{
              //保存session的登录信息
              localStorage.setItem('backstageuser',response.data);
              this.$router.push({name:"Home"});
            }
          }).catch(error=>{
            console.info(error);
          });

        }
      }
    }
  }
</script>

<style scoped>
  @import "../../static/css/style.css";
</style>
