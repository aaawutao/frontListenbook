<template>
  <div>

    <el-form label-suffix="：" ref="fm" :model="protype" :rules="rule" class="form">
      <el-form-item label="类型名称" prop="dname">
        <el-input style="width: 200px;" v-model="protype.dname"></el-input>
        <el-button type="primary" @click="addtype">上传</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" width="50%" height="500px" :stripe="true" border>
      <el-table-column prop="did" label="编号"></el-table-column>
      <el-table-column prop="dname" label="节目类型"></el-table-column>
      <el-table-column label="操作" fixed="right" width="150px">
        <template slot-scope="scope">
          <el-button type="primary" @click="updatepro(scope.row)" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" @click="delBytid(scope.row)" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                     :page-sizes="[5, 10, 20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Departmentinfo',
  data () {
    return {
      list: [], // 查询的数据
      total: 0, // 数据总数
      pagesize: 5, // 每页的数据条数
      currentPage: 1, // 默认
      protype: {did: '', dname: ''}, // 添加时提交的表单数据
      url: '',
      rule: {
        dname: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        },
        {
          required: true,
          pattern: /^[\u4e00-\u9fa5]+$/,
          message: '只能输入汉字',
          trigger: 'blur'
        }
        ]
      }
    }
  },
  created: function () {
    this.queryProgramtype()
  },
  methods: {
    queryProgramtype: function () {
      this.$axios.post('backstage/departmentinfo/departmentinfoAll', {
        'currentPage': this.currentPage,
        'pageSize': this.pagesize
      }).then(response => {
        this.list = response.data.list
        this.total = response.data.total
      })
    },
    handleSizeChange (size) {
      console.log(`每页 ${size} 条`)
      this.pagesize = size
      this.queryProgramtype()
    },
    handleCurrentChange (curPage) {
      console.log(`当前页: ${curPage}`)
      this.currentPage = curPage
      this.queryProgramtype()
    },
    addtype: function () {
      this.$refs['fm'].validate(vlid => {
        if (vlid) {
          this.$axios.post('backstage/departmentinfo/add', {
            'dname': this.protype.dname, 'did': this.protype.did
          }).then(response => {
            if (response.data == 1) {
              this.protype.ptname = ''
              this.$message({
                type: 'success',
                message: '操作完成!'
              })
              this.protype.did = ''
              this.protype.dname = ''
              this.queryProgramtype()
            }
          })
        }
      })
    },
    delBytid: function (row) {
      this.$confirm('是否删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonClass: '取消',
        type: 'warning'
      }).then(res => {
        this.$axios.post('backstage/departmentinfo/delete', {
          'did': row.did
        }).then(response => {
          if (response.data == 1) {
            this.$message({
              type: 'info',
              message: '已删除'
            })
            this.queryProgramtype()
          }
        })
      }).catch(error => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    updatepro: function (row) {
      this.protype = row
    }
  }
}
</script>

<style scoped>

</style>
