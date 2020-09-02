<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="用户信息">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <img src="http://localhost:9999/fileclient/staticfile/0/abc/photo/1598580948773.gif" width="100" height="100"></img>
            <!--{{this.user}}-->
          </div>
        </el-col>
        <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
          <el-form-item label="用户名">
            <span>{{this.user.backstage_uname}}</span>
          </el-form-item>
          <el-form-item label="用户员工">
            <span>{{this.user.empid}}</span>
          </el-form-item>
          <el-form-item label="账户类型">
            <span>{{this.user.backstage_type==0?"管理":"主播"}}</span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改密码">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名">
            <span>{{this.user.backstage_uname}}</span>
          </el-form-item>
          <el-form-item label="原密码">
            <span>{{this.user.backstage_upwd="********"}}</span>
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input style="width: 30%;" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input style="width: 30%;" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-row :gutter="20">

      <el-col :span="16">
        <div class="grid-content bg-purple">
        图片上传 / 音频上传
        <el-upload
          class="upload-demo"
          ref="upload"
          action=""
          drag
          :http-request="httpRequest"
           >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <hr/>
      </div>
      </el-col>

    </el-row>


  </div>

</template>

<script>
export default {
  name: 'Personal',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      user: JSON.parse(sessionStorage.getItem('backstageuser')),
      sizeForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.user.backstage_userid)
          console.log(this.ruleForm.pass)
          //走axios
          this.$axios.post("/backstage/upwd",{
            id:this.user.backstage_userid,pwd:this.ruleForm.pass
          }).then(response => {
            console.info(response.data)
          })
          sessionStorage.removeItem('backstageuser')
          this.$router.replace({name: 'Login'})

        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    httpRequest (param) {
      let fd = new FormData()// FormData 对象
      console.log(param)
      fd.append('file', param.file)// 文件对象
      fd.append('userid', this.user.backstage_userid)
      fd.append('username', this.user.backstage_uname)
      fd.append('flag', this.user.flag)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      // 上传 一般上传图片用 $axios2
      this.$axios2.post('backstage/upload', fd).then(response => {
        console.info(response.data)
      })
    }
    // 校验音频格式
    /* beforeAvatarUpload(file) {
        var testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
        const extension = testmsg === 'mp3'
        if(!extension){
          this.$message({
            message:"上传文件只能是mp3格式！",
            type:'error'
          })
        }
        return extension;
      }*/
    }
  }
</script>

<style scoped>

</style>
