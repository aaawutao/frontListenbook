<template>
    <div>
      <el-table :data="list"  width="100%" height="550px" :stripe="true" border>
        <el-table-column prop="front_username"  label="名称"></el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.front_userpic" style="width: 50px;height: 50px;vertical-align: middle;">
          </template>
        </el-table-column>
        <el-table-column prop="front_userphone" label="手机号"></el-table-column>
        <el-table-column prop="front_userpwd" label="密码"></el-table-column>
       <!-- 0.正常 1.禁用.2 vip-->
        <el-table-column prop="front_userstate" label="用户状态">
          <template slot-scope="scope">
            <p v-if="scope.row.front_userstate==0">非会员</p>
            <p v-if="scope.row.front_userstate==1">禁用</p>
            <p v-if="scope.row.front_userstate==2">VIP会员</p>
          </template>
        </el-table-column>
        <el-table-column prop="front_usercreatedate" label="VIP创建时间"></el-table-column>
        <el-table-column prop="front_uservipoutdata" label="VIP过期时间"></el-table-column>
        <!--角色标识1.听客 2.个人主播,3机构-->
        <el-table-column prop="front_userflag" label="是否绑定">
          <template slot-scope="scope">
            <p v-if="scope.row.front_userflag==1">听客</p>
            <p v-if="scope.row.front_userflag==2">个人主播</p>
            <p v-if="scope.row.front_userflag==3">机构</p>
          </template>
        </el-table-column>
        <el-table-column prop="front_usermoney" label="用户虚拟币"></el-table-column>
        <el-table-column prop="front_userwd" label="提现金额"></el-table-column>

      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
</template>

<script>
    export default {
        name: "FrontUser",
        data(){
          return {
            list:[],//查询的数据
            total: 0, //数据总数
            pagesize: 5, //每页的数据条数
            currentPage: 1, //默认
          }
        },created:function () {
        this.queryFrontUser();

      },methods: {
        queryFrontUser:function () {
          this.$axios.post("backstage/frontuser/frontUserfindAll",
            {"currentPage":this.currentPage,"pageSize":this.pagesize}
          ).then(response=>{
            console.log(response.data.list)
            this.total=response.data.total;
            this.list= response.data.list;
          }).catch(err=>{
            console.log(err);
          })
        },
        handleSizeChange(size) {
          this.pagesize=size;
          this.queryFrontUser();
        },
        handleCurrentChange(curPage) {
          this.currentPage=curPage;
          this.queryFrontUser();
        }
      }
    }
</script>

<style scoped>

</style>
