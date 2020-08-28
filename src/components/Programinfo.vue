<template>
    <div>

      <el-drawer
        title="详细信息"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose">
        <div>
          <!--详情页面-->
          <el-table :data="details">
            <el-table-column prop="pid" label="编号"></el-table-column>
            <el-table-column prop="pname"  label="姓名"></el-table-column>
            <el-table-column prop="pintroduction" label="介绍"></el-table-column>
            <el-table-column prop="ptname" label="类型"></el-table-column>
            <el-table-column prop="psource" label="来源"></el-table-column>
            <el-table-column prop="petname" label="主播"></el-table-column>
            <el-table-column prop="chapterorder" label="章节顺序">
              <template slot-scope="scope">
                {{scope.row.chapterorder==0?'正序':'倒序' }}
              </template>
            </el-table-column>
            <el-table-column prop="pcreatedate" label="创建时间"></el-table-column>
            <el-table-column prop="buycount" label="售出"></el-table-column>
            <el-table-column prop="pstate" label="连载/完本">
              <template slot-scope="scope">
                {{scope.row.pstate==0?'连载':'完本' }}
              </template>
            </el-table-column>
            <el-table-column prop="allprice" label="价格"></el-table-column>
          </el-table>
        </div>
      </el-drawer>

      <el-table style="text-align: center" :data="list" width="100%" height="550px" :stripe="true"  border>
        <!--编号-->
        <el-table-column prop="pname"  label="姓名"></el-table-column>

        <el-table-column label="封面图">
          <template slot-scope="scope">
            <img :src="scope.row" style="width: 40px;height: 40px;vertical-align: middle;">
          </template>
        </el-table-column>
        <el-table-column prop="ptname" label="类型"></el-table-column>
        <el-table-column prop="pcreatedate" label="创建时间"></el-table-column>
        <el-table-column prop="buycount" label="售出"></el-table-column>
        <el-table-column prop="allprice" label="价格"></el-table-column>
        <el-table-column label="详情">
          <template slot-scope="scope">
            <el-button icon="el-icon-search"  @click="querydetails(scope.row)" circle></el-button>
          </template>
        </el-table-column>
        <el-table-column   prop="pstatus" label="上下架">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.pstatus"
              active-text="上架"
              :active-value="0"
              inactive-text="下架"
              :inactive-value="1"
              @change="changePro($event,scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column  label="操作" fixed="right" width="70px">
          <template slot-scope="scope">
            <el-button type="text" @click="showByrow(scope.row)">修改</el-button>
          </template>
        </el-table-column>
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
        name: "Programinfo",
        data(){
          return {
            list:[],
            total: 0, //数据总数
            pagesize: 5, //每页的数据条数
            currentPage: 1, //默认
            drawer:false,
            direction: 'btt',
            details:[],
          }
        },created:function(){
          this.queryList();
      },methods:{
          queryList:function () {
            this.$axios.post("backstage/programinfo/programinfoAll",
              {"currentPage":this.currentPage,"pageSize":this.pagesize}).then(resp=>{
                this.list=resp.data.list;
            })
          },
        handleSizeChange(size) {
          console.log(`每页 ${size} 条`);
          this.pagesize=size;
          this.queryList();
        },
        handleCurrentChange(curPage) {
          console.log(`当前页: ${curPage}`);
          this.currentPage=curPage;
          this.queryList();
        },
        querydetails:function (row) {
          this.drawer=true;
          this.$axios.post("backstage/programinfo/programinfoAll",
            {"currentPage":this.currentPage,"pageSize":this.pagesize,"pid":row.pid}).then(resp=>{
             this.details=resp.data.list;
          })
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        }
      }
    }
</script>

<style scoped>

</style>
