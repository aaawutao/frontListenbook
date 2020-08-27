<template>
  <div>
    <el-button style="float: left" type="success" @click="show()">添加</el-button>
    <el-table border :data="list.slice((currentPage-1)*PageSize,currentPage*PageSize)" stripe height="400px">
      <el-table-column label="员工编号" prop="empid"></el-table-column>
      <el-table-column label="员工姓名" prop="empname"></el-table-column>
      <el-table-column label="出生年月" prop="empbirth"></el-table-column>
      <el-table-column label="电话" prop="empphone"></el-table-column>
      <el-table-column label="身份证编号" prop="empidentity"></el-table-column>
      <el-table-column label="部门编号" prop="did"></el-table-column>
      <el-table-column label="学历" prop="xueli"></el-table-column>
      <el-table-column label="入职" prop="empentrydate"></el-table-column>
      <el-table-column label="离职" prop="empdimissiondate"></el-table-column>
      <el-table-column label="操作">
        <!-- scope：返回当前单元格 -->
        <template slot-scope="scope">
          <el-button type="warning" round size="mini" icon="el-icon-edit" @click="show(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="PageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="empinfo" label-suffix=": "  label-width="100px" :rules="rules" ref="fm">
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
            <el-input v-model="empinfo.empentrydate">
              <!--<el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"></el-date-picker>-->
            </el-input>
        </el-form-item>
        <el-form-item label="离职" prop="empdimissiondate">
          <el-input v-model="empinfo.empdimissiondate"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saves(),dialogFormVisible = false">添加</el-button>
        <el-button type="primary" @click="saves2(),dialogFormVisible = false">修改</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'Empinfo',
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }]
      },
      value1: '',
      dialogFormVisible: false,
      title: '',
      empinfo: {},
      list: [],
      // diyMethods:'',
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [5, 10, 15, 20],
      // 默认每页显示的条数（可修改）
      PageSize: 5,
      rules: {
        empid: {required: true, message: '不可为空', trigger: ['blur', 'change']},
        empname: {required: true, message: '不可为空', trigger: ['blur', 'change']},
        empbirth: {required: true, message: '不可为空', trigger: ['blur', 'change']},
        empphone: {required: true, message: '不可为空', trigger: ['blur', 'change']},
        empidentity: {required: true, message: '不可为空', trigger: ['blur', 'change']},
        did: {required: true, message: '不可为空', trigger: ['blur', 'change']},
        xueli: {required: true, message: '不可为空', trigger: ['blur', 'change']}
        // empentrydate: {required: true, message: '不可为空', trigger: ['blur', 'change']}
      }
    }
  },
  created: function () {
    this.listall()
  },
  methods: {

    listall: function () {
      this.$axios.post('backstage/empinfo/listAll')
        .then(res => {
          this.list = res.data
          this.totalCount = res.data.length
        })
    },

    // 每页显示的条数
    handleSizeChange (val) {
      // 改变每页显示的条数
      this.PageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },
    // 显示第几页
    handleCurrentChange (val) {
      // 改变默认的页数
      this.currentPage = val
    },
    show: function (row) {
      if (row == null) {
        // 添加
        this.title = '添加员工'
        this.dialogFormVisible = true
        this.empinfo = {}
      } else {
        // 修改
        this.title = '修改员工'
        this.dialogFormVisible = true
        // 复制
        this.empinfo = Object.assign({}, row)
      }
    },
    saves: function () {
      console.log(this.empinfo)
      this.$axios.post('backstage/empinfo/save', this.empinfo).then(response => {
        if (response.data > 0) {
          this.$message('添加成功了')
        } else { this.$message('添加失败了') }
        this.listall()
      })
    },
    saves2: function () {
      console.log(this.empinfo)
      this.$axios.post('backstage/empinfo/update', this.empinfo).then(response => {
        if (response.data > 0) {
          this.$message('修改成功了')
        } else { this.$message('修改失败了') }
        this.listall()
      })
    }
  }
}
</script>

<style scoped>
</style>
