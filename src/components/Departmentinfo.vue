<template>
  <div>
    <!-- data:绑定数据  height:声明之后会固定表头-->
    <el-button type="primary" @click="departmentinfo={},addVisible=true">添加</el-button>
    <el-table :data="list" width="50%" height="300px" :stripe="true" border>
      <!-- prop显示绑定的数据的属性 -->
      <el-table-column prop="did" label="部门编号"></el-table-column>
      <el-table-column prop="dname" label="部门名称"></el-table-column>
      <el-table-column label="操作" fixed="right" width="150px">
        <template slot-scope="scope">
          <el-button type="warning" round size="mini" icon="el-icon-edit" @click="showDialog(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
      <!--修改-->
    <el-dialog width="40%" title="修改部门" :visible="dialogVisible">
      <el-form label-width="100px" label-suffix="：" :model="departmentinfo" class="form" :rules="rules" ref="fm">
        <el-form-item label="编号" prop="did">
          <!-- 必须去声明绑定的数据模型 -->
          <el-input v-model="departmentinfo.did"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="dname">
          <el-input v-model="departmentinfo.dname"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="edit()">确 定</el-button>
        <el-button type="success" @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--添加-->
    <el-dialog width="40%" title="添加部门" :visible="addVisible">
      <el-form label-width="100px" label-suffix="：" :model="departmentinfo" class="form" :rules="rules" ref="fm">
        <el-form-item label="编号" prop="did">
          <!-- 必须去声明绑定的数据模型 -->
          <el-input v-model="departmentinfo.did"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="dname">
          <el-input v-model="departmentinfo.dname"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add()">确 定</el-button>
        <el-button type="success" @click="addVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable no-multi-spaces */

export default {
  name: 'Departmentinfo',
  data () {
    return {
      dialogVisible: false,
      addVisible: false,
      departmentinfo: {},
      rules: {
        did: {required: true, message: '不可为空', trigger: ['blur', 'change']},
        dname: {required: true, message: '不可为空', trigger: ['blur', 'change']}
      },
      list: []
    }
  },
  methods: {
    showDialog: function (row) {
      // 显示模态窗口
      this.dialogVisible = true
      this.departmentinfo = row
    },
    add: function () {
      this.addVisible = false
      console.log(this.departmentinfo)
      this.$axios.post('backstage/departmentinfo/add', this.departmentinfo).then((response) => {
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
      console.log(this.departmentinfo)
      this.$axios.post('backstage/departmentinfo/update', this.departmentinfo).then(response => {
        if (response.data > 0) {
          this.$message('修改成功了')
        } else { this.$message('修改失败了') }
      })
    }
  },
  // 查询
  created: function () {
    this.$axios.post('backstage/departmentinfo/departmentinfoAll').then((response) => {
      this.list = response.data
    })
  }
}
</script>

<style scoped>

</style>
