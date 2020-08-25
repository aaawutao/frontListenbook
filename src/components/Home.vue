<template>
  <el-container>
    <el-aside width="200px" >
      <el-menu :default-openeds="['1', '3']" :router="true">
        <el-submenu index="1" >
          <template slot="title"><i class="el-icon-message"></i>员工管理</template>
          <el-menu-item-group>
            <el-menu-item index="1-1" :route="{name:'BackStage_User'}">员工管理</el-menu-item>
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
            <el-dropdown-item>查看数据</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <el-main>
        <!-- 二级路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

  import "../../static/deploy/js/index1.js"
  export default {
    name: "Home",
    methods:{
      handlerCommand:function(command){
        this.$router.push({name:command});

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
