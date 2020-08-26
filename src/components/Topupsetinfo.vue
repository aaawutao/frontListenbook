<template>
  <div>
    <el-table :data="list"  width="100%" height="550px" :stripe="true" border>
      <!-- prop显示绑定的数据的属性 -->
      <el-table-column prop="tsid" label="编号"></el-table-column>
      <el-table-column  prop="tstype" label="充值的类型"></el-table-column>
      <el-table-column  prop="tscustom" label="虚拟币/天数"></el-table-column>
      <el-table-column  prop="tsmoney" label="真实金额"></el-table-column>
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
  name: 'Topupsetinfo',
  data () {
    return {
      list: [], // 查询的数据
      total: 0, // 数据总数
      pagesize: 3, // 每页的数据条数
      currentPage: 1 // 默认
    }
  },
  created: function () {
    this.queryUser()
  },
  methods: {
    queryUser: function () {
      this.$axios.post('backstage/topupsetinfo/topupsetinfoAll',
        {'currentPage': this.currentPage, 'pageSize': this.pagesize}).then(rep => {
        this.total = rep.data.total // 总页数
        this.list = rep.data.list // 数据
      })
    },
    handleSizeChange (size) {
      console.log(`每页 ${size} 条`)
      this.pagesize = size
      this.queryUser()
    },
    handleCurrentChange (curPage) {
      console.log(`当前页: ${curPage}`)
      this.currentPage = curPage
      this.queryUser()
    },
    changePro: function (val, row) {
      console.log('标示' + row.isenable)
      this.$axios.post('backstage/updateFlag', { 'backstage_userid': row.backstage_userid, 'isenable': row.isenable}).then(response => {
        console.log(response)
        /* if (val == 0) {
            this.$message({
              type: 'success',
              message: '启用成功!'
            })
          } else {
            this.$message({
              type: 'info',
              message: '已禁用!'
            })
          } */
      })
    }
  }
}
</script>

<style scoped>

</style>
