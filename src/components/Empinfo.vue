<template>
  <div>
    <!--<el-button style="float: left" type="success" @click="empinfo={},addVisible=true">添加</el-button>-->
    <el-table :data="list"  width="100%" height="550px" :stripe="true" border>
      <!-- prop显示绑定的数据的属性 -->
      <el-table-column prop="empid" label="员工编号"></el-table-column>
      <el-table-column  prop="empname" label="员工姓名"></el-table-column>
      <el-table-column prop="empbirth" label="出生年月"></el-table-column>
      <el-table-column prop="empphone" label="电话"></el-table-column>
      <el-table-column prop="empidentity" label="身份证编号"></el-table-column>
      <el-table-column prop="did" label="部门编号"></el-table-column>
      <el-table-column prop="xueli" label="学历"></el-table-column>
      <el-table-column prop="empentrydate" label="入职"></el-table-column>
      <el-table-column prop="empdimissiondate" label="离职"></el-table-column>
      <el-table-column label="操作" fixed="right" width="100px">
        <template slot-scope="scope">
          <el-button type="warning" round size="mini" icon="el-icon-edit" @click="showDialog(scope.row)"></el-button>
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
        <!--修改-->
      </el-pagination>
      <el-dialog width="40%" title="修改员工" :visible="dialogVisible">
        <el-form label-width="100px" label-suffix="：" :model="empinfo" class="form" :rules="rules" ref="fm">
          <el-form-item label="员工编号" prop="empid">
            <el-input v-model="empinfo.empid"></el-input>
          </el-form-item>
          <el-form-item label="员工姓名" prop="empname">
            <el-input v-model="empinfo.empname"></el-input>
          </el-form-item>
          <el-form-item label="出生年月" prop="empbirth">
            <el-input v-model="empinfo.empbirth"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="empphone">
            <el-input v-model="empinfo.empphone"></el-input>
          </el-form-item>
          <el-form-item label="身份证编号" prop="empidentity">
            <el-input v-model="empinfo.empidentity"></el-input>
          </el-form-item>
          <el-form-item label="部门编号" prop="did">
            <el-input v-model="empinfo.did"></el-input>
          </el-form-item>
          <el-form-item label="学历" prop="xueli">
            <el-input v-model="empinfo.xueli"></el-input>
          </el-form-item>
          <el-form-item label="入职" prop="empentrydate">
            <el-input v-model="empinfo.empentrydate"></el-input>
          </el-form-item>
          <el-form-item label="离职" prop="empdimissiondate">
            <el-input v-model="empinfo.empdimissiondate"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="edit()">确 定</el-button>
          <el-button type="success" @click="addVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Empinfo',
  data () {
    return {
      dialogVisible: false,
      addVisible: false,
      rules: {},
      empinfo: {},
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
      this.$axios.post('backstage/empinfo/empinfoAll',
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
    showDialog: function (row) {
      // 显示模态窗口
      this.dialogVisible = true
      this.empinfo = row
    },
    add: function () {
      this.addVisible = false
      console.log(this.empinfo)
      this.$axios.post('backstage/empinfo/add', this.departmentinfo).then((response) => {
        if (response.data > 0) {
          this.$message('添加成功了'); this.list[this.list.length] = this.departmentinfo; this.list.splice()
        } else {
          this.$message('添加失败了')
        }
      })
    },
    // 修改
    edit: function () {
      this.dialogVisible = false
      console.log(this.empinfo)
      this.$axios.post('backstage/empinfo/update', this.empinfo).then(response => {
        if (response.data > 0) {
          this.$message('修改成功了')
        } else { this.$message('修改失败了') }
      })
    }
  }
}
</script>

<style scoped>

</style>
