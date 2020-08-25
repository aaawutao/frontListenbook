<template>
  <div>
    <el-table :data="list"  width="100%" height="550px" :stripe="true" border>
      <!-- prop显示绑定的数据的属性 -->
      <el-table-column prop="backstage_userid" label="员工编号"></el-table-column>
      <el-table-column  prop="backstage_uname" label="账号"></el-table-column>
      <el-table-column  prop="backstage_upwd" label="密码"></el-table-column>
      <el-table-column  prop="empid" hidden label="员工编号"></el-table-column>
      <el-table-column   prop="flag" label="禁用/未禁用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.tstate"
            active-text="禁用"
            :active-value="1"
            inactive-text="未禁用"
            :inactive-value="0"
            @change="changePro($event,scope.row)">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column  label="操作" fixed="right" width="100px">
        <template slot-scope="scope">
          <el-button type="text" @click="showByrow(scope.row)">修改</el-button>
          <el-button type="text" @click="delBytid(scope.row)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 10, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
    export default {
        name: "BackStage_User",
      data(){
        return {
          list:[],//查询的数据
          total: 0, //数据总数
          pagesize: 3, //每页的数据条数
          currentPage: 1 //默认
        }
      },
      created:function () {
        this.queryUser();
      },methods:{
            queryUser:function () {
              this.$axios.post("backstage/test"/*,
                {"currentPage":this.currentPage,"pageSize":this.pagesize}*/).then(rep=>{
                  console.log(rep.data);
              })
            },
      handleSizeChange(size) {
        console.log(`每页 ${size} 条`);
        this.pagesize=size;
        this.getTeacher();
      },
      handleCurrentChange(curPage) {
        console.log(`当前页: ${curPage}`);
        this.currentPage=curPage;
        this.getTeacher();
      }
      }

    }
</script>

<style scoped>

</style>
