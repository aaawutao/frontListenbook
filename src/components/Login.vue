<template>
  <div id="app">
    <div class="content">
      <div class="content_input">
        <div class="title">
          <p>管理员登录</p>
        </div>
        <el-input v-model="user.backstage_uname" clearable placeholder="用户名"></el-input>
        <el-input v-model="user.backstage_upwd" clearable show-password placeholder="密码"></el-input>
        <el-checkbox v-model="checked" :checked="checked">记住密码</el-checkbox>
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
        checked:false,
        user:{backstage_uname:'',backstage_upwd:''}
      }
    },
    mounted(){
      if(localStorage.getItem('backstageuser')){
        let str=JSON.parse(localStorage.getItem('backstageuser'));
        this.user.backstage_uname=str.backstage_uname;
        this.user.backstage_upwd=str.backstage_upwd;
        if(localStorage.getItem("checked")){
            this.checked=true;
        }
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

              //成功
              console.info(this.checked);
              if(this.checked){
                //保存cookie
                localStorage.setItem("backstageuser",JSON.stringify({backstage_uname:response.data.backstage_uname,backstage_upwd:response.data.backstage_upwd}));
                localStorage.setItem("checked","true");
              }else{
                //删除cookie
                localStorage.removeItem('backstageuser');
                localStorage.removeItem("checked");
              }
              ////保存session的登录信息
              sessionStorage.setItem('backstageuser',JSON.stringify(response.data));
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
