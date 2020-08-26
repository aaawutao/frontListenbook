<template>
  <el-container>
    <el-aside width="200px" >

      <el-menu  default-active="1" class="el-menu-vertical-demo" :router="true">
        <div v-for="m in this.user.urls">
          <el-submenu  :index="m.menuid.toString()" :route="{name:m.menuurl}" >
            <template slot="title">
              <span>{{m.menuname}}</span>
            </template>
            <div v-for="z in m.zi">
              <el-menu-item  :index="z.menuid.toString()" :route="{name:z.menuurl}">{{z.menuname}} </el-menu-item>
            </div>
          </el-submenu>
        </div>
      </el-menu >
      <hr/>
      <el-menu :default-openeds="['1', '3']" :router="true">
        <el-submenu index="1" >
          <template slot="title"><i class="el-icon-message"></i>用户管理</template>
          <el-menu-item-group>
            <el-menu-item index="1-1" :route="{name:'BackStage_User'}">用户查询</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>班级管理</template>
          <el-menu-item-group>
            <el-menu-item index="2-1">班级管理</el-menu-item>
            <el-menu-item index="2-2">班级管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="">查看数据</el-dropdown-item>
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
    data(){
      return {user:JSON.parse(sessionStorage.getItem("backstageuser"))}
    },
    methods:{
      handlerCommand:function(command){
        if(command=="Exit"){
          sessionStorage.removeItem("backstageuser");
          this.$router.replace({name:"Login"});
        }else{
          this.$router.push({name:command});
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
</style>
