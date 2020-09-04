<template>
  <div>
    <el-tabs type="border-card" v-model="activeTab"  @tab-click="checkeduser">
      <el-tab-pane  label="用户信息" name="userdetails">
      <div v-show="show1">
        <el-form  label-suffix="："  label-width="400px" class="form" >
          <el-form-item label="头像" prop="empphone">
            <template slot-scope="scope">
              <img :src="userdetail.backstage_photo" style="width: 70px;height: 70px;">
            </template>
          </el-form-item>
          <el-form-item label="账号" prop="empphone">
            <span>{{userdetail.backstage_uname}}</span>
          </el-form-item>
          <el-form-item label="主播昵称" prop="empphone">
            <span>{{userdetail.petname}}</span>
          </el-form-item>
          <el-form-item label="真实姓名" prop="empname">
            <span>{{userdetail.empname}}</span>
          </el-form-item>
          <el-form-item label="手机号" prop="empphone">
            <span>{{userdetail.empphone}}</span>
          </el-form-item>
          <el-form-item label="学历" prop="empphone">
            <span>{{userdetail.xueli}}</span>
          </el-form-item>
          <el-form-item label="身份证号" prop="empphone">
            <span>{{userdetail.empidentity}}</span>
          </el-form-item>
          <el-form-item label="个人介绍" prop="empphone">
            <span>{{userdetail.backstage_js}}</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="isshow" round>修改信息</el-button>
          </el-form-item>
        </el-form>
      </div>
      </el-tab-pane>


      <el-tab-pane label="修改密码" name="updatepwd">
        <div>
          <el-form :model="rulefrom" ref="rulefrom" :rules="rules" label-suffix="：" class="form">
            <el-form-item label="当前密码" prop="pwd">
              <el-input type="password"  v-model="rulefrom.pwd" style="width:25%"></el-input>
            </el-form-item>
            <el-form-item label="新 密 码  " prop="newpwd">
              <el-input type="password" v-model="rulefrom.newpwd" style="width:25%"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="affirm">
              <el-input type="password" v-model="rulefrom.affirm" style="width:25%"></el-input>
            </el-form-item>
            <el-form-item >
              <el-button type="primary" @click="updatepwd('rulefrom')" round>提交</el-button>
              <el-button type="warning" @click="restpwd('rulefrom')" round>取消</el-button>

            </el-form-item>

          </el-form>
        </div>
      </el-tab-pane>

      <!--修改个人信息-->
      <div id="app" v-show="show">
        <el-form  label-suffix="：" :model="userdetail"  ref="userdetail"  label-width="400px" class="form" >
          <el-form-item label="头像" prop="empphone">
            <template slot-scope="scope">
              <img :src="userdetail.backstage_photo" style="width: 70px;height: 70px;">
              <el-upload
                class="upload-demo"
                ref="upload"
                action=""
                :auto-upload="true"
                :multiple="false"
                :limit="1"
                :http-request="httpRequest">
                <el-button size="mini" round type="primary">更换头像</el-button>
              </el-upload>
            </template>
          </el-form-item>
          <el-form-item label="主播昵称" prop="empphone">
            <el-input style="width: 30%" v-model="userdetail.petname"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="empphone">
            <el-input style="width: 30%" v-model="userdetail.empphone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addpersonal" round>保存</el-button>
            <el-button type="primary" @click="restpersonal" round>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-tabs>

  </div>
</template>

<script>
export default {
  name: 'Personal',
  data () {

    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/;
    var validatePwd=(rule, value, callback)=>{
       if(this.user.backstage_upwd!=value){
        callback(new Error('密码错误！'))
      }else{
        callback()
      }
    }
    //新密码
    var validateNewPwd=(rule, value, callback)=>{
      if (!reg.test(value)) {
        callback(new Error('密码须包含数字、字母两种元素，且密码位数为6-14位'))
      } else if(this.rulefrom.pwd==value){
        callback(new Error('新密码与旧密码不可一致！'))
      }else{
        callback()
      }
    }
    //确认密码
    var validateComfirmPwd=(rule, value, callback) =>{
      if (!reg.test(value)) {
        callback(new Error('密码须包含数字、字母两种元素，且密码位数为6-14位'))
      } else if(this.rulefrom.newpwd !=value){
        callback(new Error('确认密码与新密码不一致！'))
      }else {
        callback()
      }
    }
    return {
      rulefrom:{
        pwd:"",
        newpwd:"",
        affirm:"",

      },
      rules:{
        pwd:[
          { required: true, message: '请输入当前密码', trigger: 'blur' },
          { validator: validatePwd, trigger: 'blur' }
        ],
        newpwd:[
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { validator: validateNewPwd, trigger: 'blur' }
        ],
        affirm:[
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validateComfirmPwd, trigger: 'blur' }
        ]
      },
      activeTab:"userdetails",
      user: JSON.parse(sessionStorage.getItem('backstageuser')),
      userdetail:{},
      show:false,
      show1:true,
    }
  },created:function () {
      this.checkeduser();
  },
  methods: {
    isshow:function () {
      this.show1=!this.show1;
      this.show=!this.show
    },
    restpersonal:function () {
      this.show1=!this.show1;
      this.show=!this.show
    },
    checkeduser:function () {
      if(this.activeTab=="userdetails"){
        this.$axios.post("backstage/empinfo/queryByempid",{"empid":this.user.empid}).then(response=>{
            this.userdetail=response.data;
        })
      }
      if(this.activeTab=="updatepwd"){
        console.log("修改密码")
      }

    },
    updatepwd:function(rulefrom){
        this.$refs['rulefrom'].validate((valid)=>{
          if(valid){
           this.$axios.post("backstage/updatepwd",
             {"backstage_upwd":this.rulefrom.newpwd,"backstage_userid":this.user.backstage_userid}).then(response=>{
             if(response.data==1){
               this.$refs[rulefrom].resetFields();
               sessionStorage.removeItem("backstageuser");
               this.$router.replace({name: "Login"})
             }
           })
          }
        })
    },
    restpwd:function(rulefrom){
      this.$refs[rulefrom].resetFields();
    },
    addpersonal:function () {
      this.$axios.post("backstage/empinfo/updatephoneAndpetname",
        {"empphone":this.userdetail.empphone,
          "empid":this.userdetail.empid,
           "petname":this.userdetail.petname,
          "acid":this.userdetail.acid}).then(response=>{
            if(response.data==1){
              this.$message({
                type:'info',
                message:"已保存"
              });
              this.restpersonal();
            }
      })
    },
    httpRequest (param) {
      let fd = new FormData()// FormData 对象
      fd.append('file', param.file)// 文件对象
      fd.append('backstage_userid', this.user.backstage_userid)
      fd.append('backstage_uname', this.user.backstage_uname)
      fd.append('flag', this.user.flag)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      // 上传 一般上传图片用 $axios2
      //开始提交图片
      this.$axios2.post("backstage/updatephoto",fd).then(response=>{
          if(response.data==1){
            this.$message({
              type:'info',
              message:"已修改"
            });
          }
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
