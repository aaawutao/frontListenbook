<template>
  <div>
    <el-button style="float: left" type="success" @click="show()">添加</el-button>
    <el-table border :data="list.slice((currentPage-1)*PageSize,currentPage*PageSize)" stripe height="400px">
      <el-table-column label="员工编号" prop="empid"></el-table-column>
      <el-table-column label="员工姓名" prop="empname"></el-table-column>
      <el-table-column   label="性别">
        <template slot-scope="scope">
          <span>{{getsex(scope.row.empidentity)}}</span>
        </template>
      </el-table-column>

      <el-table-column   label="出生日器">
        <template slot-scope="scope">
          <span>{{empbirth(scope.row.empidentity)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" prop="empphone"></el-table-column>
      <el-table-column label="身份证编号" prop="empidentity"></el-table-column>
      <el-table-column label="学历" prop="xueli"></el-table-column>
      <el-table-column label="入职" prop="empentrydate"></el-table-column>
      <el-table-column label="离职" prop="empdimissiondate"></el-table-column>
      <!--<el-table-column label="操作">-->
        <!--&lt;!&ndash; scope：返回当前单元格 &ndash;&gt;-->
        <!--<template slot-scope="scope">-->
          <!--<el-button type="warning" round size="mini" icon="el-icon-edit" @click="show(scope.row)"></el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
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
        <el-form-item label="员工姓名" prop="empname">
          <el-input v-model="empinfo.empname"></el-input>
        </el-form-item>
        <!--<el-form-item label="出生年月" prop="empbirth">-->
          <!--<el-input v-model="empinfo.empbirth"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="电话" prop="empphone">
          <el-input v-model="empinfo.empphone"></el-input>
        </el-form-item>
        <el-form-item label="身份证编号" prop="empidentity">
          <el-input v-model="empinfo.empidentity"></el-input>
        </el-form-item>



        <el-form-item label="学历" prop="xueli">
          <el-select v-model="empinfo.xueli" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!--<el-input v-model="empinfo.xueli"></el-input>-->
        </el-form-item>
        <!--<el-form-item label="did" prop="did">-->
          <!--<el-input v-model="empinfo.did"></el-input>-->
        <!--</el-form-item>-->
          <!--<el-form-item label="离职" prop="empdimissiondate">-->
          <!--<el-date-picker-->
            <!--v-model="empinfo.empdimissiondate"-->
            <!--align="right"-->
            <!--type="date"-->
            <!--placeholder="选择日期"-->
            <!--:picker-options="pickerOptions">-->
          <!--</el-date-picker>-->
          <!--</el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saves(),dialogFormVisible = false">添加</el-button>
        <!--<el-button type="primary" @click="update(),dialogFormVisible = false">修改</el-button>-->
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
      options: [{
        value: '选项1',
        label: '本科'
      }, {
        value: '选项2',
        label: '大专'
      }, {
        value: '选项3',
        label: '高中'
      }],
      value: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      dialogFormVisible: false,
      dialogFormVisible2: false,
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
        empname: [
          {required: true, message: '不能为空', trigger: 'blur'},
          {required: true,
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: '只能输入汉字',
            trigger: 'blur'}
        ],
        empphone: [
          {required: true, message: '不能为空', trigger: 'blur'},
          {required: true, pattern: /^[0-9]*$/, message: '只能输入数字', trigger: 'blur'},
          {required: true, pattern: /^[1][358]\d{9}$/, message: '13-15-18开头的长度为11位', trigger: 'blur'}
        ],
        empidentity: [
          {required: true, message: '不能为空', trigger: 'blur'},
          {required: true, pattern: /^[0-9]*$/, message: '只能输入数字', trigger: 'blur'},
          {required: true, pattern: /^[4][1]\d{16}$/, message: '41开头的长度为18位', trigger: 'blur'}
        ],
        xueli: [
          {required: true, message: '不能为空', trigger: 'blur'},
          {required: true,
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: '只能输入汉字',
            trigger: 'blur'}
        ]
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
    getsex:function (idcard) {
      return  idcard.substr(16,1)%2==1 ?'男':'女'
    },
    empbirth:function(empbirth){
      let str =empbirth.substring(6, 14).slice(0, 4)+ "-" + empbirth.substring(6, 14).slice(4, 6)+ "-" + empbirth.substring(6, 14).slice(6, 8);
      return str;
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
    }
    // update: function () {
    //   console.log(this.empinfo)
    //   this.$axios.post('backstage/empinfo/update', this.empinfo).then(response => {
    //     if (response.data > 0) {
    //       this.$message('修改成功了')
    //     } else { this.$message('修改失败了') }
    //     this.listall()
    //   })
    // }
  }
}
</script>

<style scoped>
</style>
