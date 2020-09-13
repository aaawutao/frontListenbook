<template>
    <div>
     <!-- <el-form label-suffix="："   class="form">
        <el-form-item label="账号" >
          <el-input v-model="phone" style="width: 200px;" ></el-input>
          <el-button type="primary"  @click="querytoset">查询</el-button>
        </el-form-item>
      </el-form>-->
      <el-table  :data="list.slice((currenPage-1)*PageSize,currenPage*PageSize)">
        <el-table-column label="用户昵称" prop="front_username"></el-table-column>
        <el-table-column label="用户账号" prop="front_userphone"></el-table-column>

        <el-table-column label="购买节目" prop="pname"></el-table-column>
        <el-table-column label="购买章节" prop="title"></el-table-column>
        <el-table-column label="购买时间" prop="buydate"></el-table-column>
        <el-table-column label="虚拟币" prop="purchaservc"></el-table-column>
        <el-table-column label="人民币(元)" prop="purchasermoney"></el-table-column>
      </el-table>
     <div class="block">
       <el-pagination  @size-change="handleSize"
                       @current-change="handleCurrent"
                       :current-page="currenPage"
                       :page-sizes="pageSizes"
                       :page-size="PageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="totalCount">
       </el-pagination>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Userconumption",
        data(){
          return {
            list:[],
            phone:null,
            currenPage: 1,
            // 总条数，根据接口获取数据长度(注意：这里不能为空)
            totalCount: 1,
            // 个数选择器（可修改）
            pageSizes: [5, 10],
            // 默认每页显示的条数（可修改）
            PageSize: 5,
          }
        },created:function () {
          this.querytoset();
      },methods:{
          querytoset:function () {
            this.$axios.post("backstage/topupsetinfo/selecttopset",).then(response=>{
              this.totalCount = response.data.length;
              this.handleCurrent(1);
              console.log(response.data);
              this.list=response.data

            })
          },
            // 每页显示的条数
          handleSize(val) {
            // 改变每页显示的条数
            this.PageSize = val
            // 注意：在改变每页显示的条数时，要将页码显示到第一页
            this.currenPage = 1
          },
          // 显示第几页
          handleCurrent(val) {
            // 改变默认的页数
            this.currenPage = val
        }
      }
    }
</script>

<style scoped>

</style>
