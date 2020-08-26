<template>
  <div>
    <el-button type="primary">账号分配</el-button>
    <el-table :data="list"  width="100%" height="550px" :stripe="true" border>

      <!-- prop显示绑定的数据的属性 -->
      <el-table-column prop="backstage_userid" label="员工编号"></el-table-column>
      <el-table-column  prop="backstage_uname" label="账号"></el-table-column>
      <el-table-column  prop="backstage_upwd" show-password label="密码"></el-table-column>

      <!--<el-table-column  prop="empid"  aria-hidden="true" label="员工编号"></el-table-column>-->
      <el-table-column   prop="isenable" label="启用/禁用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isenable"
            active-text="启用"
            :active-value="0"
            inactive-text="禁用"
            :inactive-value="1"
            @change="changePro($event,scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="backstage_js" label="详情">
        <template slot-scope="scope" >
          <div style="text-align: center"><a class="el-icon-zoom-in" href="#" ></a></div>
        </template>
      </el-table-column>

      <el-table-column prop="backstage_photo"   label="头像"   width="150">
        <template slot-scope="scope">
          <img  :src="scope.row.backstage_photo"   style="width: 40px;height: 40px;vertical-align: middle;" >
        </template>
      </el-table-column>
      <el-table-column  label="操作" fixed="right" width="100px">
        <template slot-scope="scope">
          <!--<el-button type="text" @click="showByrow(scope.row)">修改</el-button>
          <el-button type="text" @click="delBytid(scope.row)" >删除</el-button>-->
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
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
              this.$axios.post("backstage/findAll",
                {"currentPage":this.currentPage,"pageSize":this.pagesize}).then(rep=>{
                this.total = rep.data.total; //总页数
                this.list = rep.data.list; //数据

              })
            },
          handleSizeChange(size) {
              console.log(`每页 ${size} 条`);
              this.pagesize=size;
              this.queryUser();
            },
          handleCurrentChange(curPage) {
            console.log(`当前页: ${curPage}`);
            this.currentPage=curPage;
            this.queryUser();
            },
          changePro: function(val, row) {
            console.log("val"+val);
            console.log("标示"+row.isenable);
            this.$axios.post("backstage/updateFlag", { "backstage_userid": row.backstage_userid,"isenable": val}).then(response => {

              console.log(response)
              /*if (val == 0) {
                this.$message({
                  type: 'success',
                  message: '启用成功!'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: '已禁用!'
                })
              }*/
            })
          }
        }
 }
</script>

<style scoped>

</style>
