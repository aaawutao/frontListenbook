<template>
  <el-container>
    <el-aside width="200px">
      <el-menu  default-active="1" class="el-menu-vertical-demo" :router="true">
        <div v-for="m in this.user.urls">
          <el-submenu  :index="m.id.toString()" :route="{name:m.menuurl}" >
            <template slot="title">
              <span>{{m.menuname}}</span>
            </template>
            <div v-for="z in m.children">
              <el-menu-item  :index="z.id.toString()" :route="{name:z.menuurl}">{{z.menuname}} </el-menu-item>
            </div>
          </el-submenu>
        </div>
      </el-menu >
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px ;position:relative; right:200px " >
        <el-dropdown @command="handlerCommand">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Personal">个人信息</el-dropdown-item>
            <el-dropdown-item command="Exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{this.user.backstage_uname}}</span>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

  import "../../static/deploy/js/index1.js"
  export default {
    name: "Home",
    data() {
      return {
        user: JSON.parse(sessionStorage.getItem("backstageuser")),
        timer: null,
      }
    }, created: function () {
      /*this.timer=setInterval(()=>{
        this.getNotReadCount();
      },5000)*/
    },
    methods: {
      getNotReadCount: function () {
        this.$axios.post("backstage/frontuser/updateTime").then(response => {
          console.log(response.data);
        })
      },
      handlerCommand: function (command) {
        if (command == "Exit") {
          sessionStorage.removeItem("backstageuser");
          this.$router.replace({name: "Login"});
        } else {
          this.$router.push({name: command});
        }
      }
    }
  }

</script>

<style scoped>
  @import "../../static/deploy/css/index.css";
  .el-header {
    height: 60px;
    font-size: 20px;
    line-height: 60px;
    color: #333;
    background-color: #b3c0d1;
    width:1510px;;
  }

  .el-container {
    height: 100%;

  }

  .el-aside {
    height: 100vh;
  }

  .el-menu {
    background: #b3c0d1;
  ;
    height: 100%;
  }

  .el-button+.el-button {
    margin-left: 2px;
  }
  aside.el-aside{
    margin-top: 60px;
  }
</style>
