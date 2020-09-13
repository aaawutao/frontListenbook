<template>
    <div>
     <el-form label-suffix="："   class="form">
        <el-form-item label="手机号" >
          <el-input v-model="phone" style="width: 200px;" ></el-input>
          <el-button type="primary" @click="likequery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="list">
        <el-table-column label="订单编号" prop="paymentid"></el-table-column>
        <el-table-column label="充值时间" prop="topupdate"></el-table-column>
        <el-table-column label="用户昵称" prop="front_username"></el-table-column>
        <el-table-column label="用户账号" prop="front_userphone"></el-table-column>
        <el-table-column label="充值类型" prop="tstype">
          <template slot-scope="scope">
            <p v-if="scope.row.tstype==0">懒人币</p>
            <p v-if="scope.row.tstype==1">会员</p>
          </template>
        </el-table-column>
        <el-table-column label="支付方式" prop="topupway"></el-table-column>
        <el-table-column label="支付金额" prop="tsr"></el-table-column>


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
        name: "Usertop",
        data(){
          return {
            list:[],
            total: 0, //数据总数
            pagesize: 5, //每页的数据条数
            currentPage: 1, //默认
            phone:null,


          }
      },created:function () {
          this.queryAll();
      },methods:{
          queryAll:function(){
            this.$axios.post("backstage/topupinfo/querytopupi",
              {"currentPage":this.currentPage,"pageSize":this.pagesize}).then(response=>{
                  console.log(response.data);
                  this.list=response.data.list;
                  this.total=response.data.total;
            })
        },
        handleSizeChange(size) {
          this.pagesize=size;
          this.queryAll();
        },
        handleCurrentChange(curPage) {
          this.currentPage=curPage;
          this.queryAll();
        },
        likequery:function () {
            console.log(this.phone);
        }
      }
    }
</script>

<style scoped>

</style>
