<template>
  <div>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="did"
      label="部门编号"
      width="120px">
    </el-table-column>
    <el-table-column
      prop="dname"
      label="部门名称"
      width="120px">
    </el-table-column>
    <el-table-column label="操作" fixed="right" width="100px">
      <template slot-scope="scope">
        <el-button type="primary" @click="permissionset()">
          权限分配
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog width="40%" title="权限操作" :visible="logstate"  :before-close="handleClose">
    <!--
      default-expanded-keys: 展开
      default-checked-keys: 选中
    -->
    <el-tree
      :data="mune"
      show-checkbox
      node-key="id"
      :default-expanded-keys="[1]"
      :default-checked-keys="[1]"
      :props="defaultProps">
    </el-tree>
  </el-dialog>
  </div>
</template>

<script>
  //menuid menuname menuurl
  export default {
    name: 'PermissionSetting',
    data() {
      return {
        tableData:[],
        mune: [],
        defaultProps: {
          children: 'children',
          label: 'menuname',
          id:'menuid'
        },
        logstate:false
      };
    },
    mounted(){
      this.getDepartment();
      this.getmenu();
    },
    methods:{
      getmenu(){
        this.$axios.get("backstage/menu/menushow").then(response=>{
          this.mune=response.data;
        })
      },
      //获取部门 注意 箭头函数才能设置到值
      getDepartment(){
        this.$axios.get("backstage/departmentinfo/departmentinfoAll").then(response=>{
          this.tableData=response.data;
        })
      },
      permissionset(){
        this.logstate=true;
      },
      handleClose(){
        this.logstate=false;
      }
    }
  };
</script>

<style scoped>

</style>
