<template>

  <el-container>
    <el-aside width="200px">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>学生管理</template>
          <el-menu-item-group>
            <el-menu-item index="1-1">学生管理</el-menu-item>
            <el-menu-item index="1-2">学生管理</el-menu-item>
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
            <el-dropdown-item>查看新增</el-dropdown-item>
            <el-dropdown-item>新增新增</el-dropdown-item>
            <el-dropdown-item>修改新增</el-dropdown-item>
            <el-dropdown-item>删除新增</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <el-main>
        <el-table  style="width: 100%" max-height="100%">
          <el-table-column fixed prop="date" label="日期" width="150">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="province" label="省份" width="120">
          </el-table-column>
          <el-table-column prop="city" label="市区" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="300">
          </el-table-column>
          <el-table-column prop="zip" label="邮编" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template  style="text-align: left">
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                移除
              </el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
              </el-button>
              <el-button @click.native.prevent="update(scope.$index, tableData)" type="text" size="small">
                修改
              </el-button>
              <el-button @click.native.prevent="add(scope.$index, tableData)" type="text" size="small">
                添加
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "Home"

  }


</script>

<style scoped>
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
