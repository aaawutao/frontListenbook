<template>
    <div>

      <el-drawer
        title="章节目录"
        :visible.sync="chapter"
        :direction="direction"
        :before-close="handleClose"
        size="70%">
        <el-table :data="chapters" :border="true">

          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="artist" label="作者"></el-table-column>
          <el-table-column prop="mp3" label="音频路径"></el-table-column>
          <el-table-column prop="state" label="是否付费">
            <template slot-scope="scope">
              {{scope.row.state==0?'免费':'付费'}}
            </template>
          </el-table-column>
          <el-table-column prop="virtualcurrency" label="应付喜币"></el-table-column>

          <el-table-column prop="createdate" label="上传时间"></el-table-column>

        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSize"
            @current-change="handleCurrent"
            :current-page="currentPage"
            :page-sizes="[5]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>

      </el-drawer>

      <el-drawer
        title="详细信息"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
         size="50%">
        <div>
          <!--详情页面-->
          <el-table :data="details" :border="true">
            <el-table-column prop="pid" label="编号" ></el-table-column>
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
       <el-table-column prop="pname"  label="姓名"></el-table-column>
        <el-table-column label="封面图">
          <template slot-scope="scope">
            <img :src="scope.row.poster" style="width: 40px;height: 40px;vertical-align: middle;">
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
        <el-table-column label="章节目录">
          <template slot-scope="scope">
            <el-button icon="el-icon-search"  @click="querychapters(scope.row.pid)" circle></el-button>
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
              @change="changeStatus($event,scope.row)">
            </el-switch>
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
            chapter:false,
            direction: 'rtl',//设置默认
            details:[],
            chapters:[],
            id:"",

          }
        },created:function(){
          this.queryList();
      },methods:{
          queryList:function () {
            this.$axios.post("backstage/programinfo/programinfoAll",
              {"currentPage":this.currentPage,"pageSize":this.pagesize}).then(resp=>{
                this.total=resp.data.total;
                this.list=resp.data.list;
            })
          },
        handleSizeChange(size) {
          this.pagesize=size;
          this.queryList();

        },
        handleCurrentChange(curPage) {
          this.currentPage=curPage;
          this.queryList();
        },
        querydetails:function (row) {
          this.drawer=true;
          this.direction= 'btt',
          this.$axios.post("backstage/programinfo/programinfoAll",
            {"currentPage":this.currentPage,"pageSize":this.pagesize,"pid":row.pid}).then(resp=>{
             this.details=resp.data.list;
          })
        },
        //章节目录
        querychapters:function(pid){
          this.chapter=true;
          this.direction= 'rtl';
          this.id=pid;
         this.$axios.post("backstage/chapterinfo/chapterinfoQuery",
            {"currentPage":this.currentPage,"pageSize":this.pagesize,"pid":this.id}).then(resp=>{
              console.log(resp.data.list);
              this.total=resp.data.total;
              this.chapters=resp.data.list;
          })
        },handleSize:function(size){
          this.pagesize=size;
          this.querychapters(this.id);
        },
        handleCurrent:function(curPage){
          this.currentPage=curPage;
          this.querychapters(this.id);
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        changeStatus:function (val, row) {
          this.$axios.post("backstage/programinfo/updateppstatus"
            ,{"pstatus":row.pstatus,"pid":row.pid}).then(response=>{
              if(response.data==1){
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                })
              }
          })
        }
      }
    }
</script>

<style scoped>

</style>
