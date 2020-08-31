<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8"><div class="grid-content bg-purple">
        <img src="http://localhost:9999/fileclient/staticfile/0/abc/photo/1598580948773.gif" width="100" height="100"></img>
        {{this.user}}
      </div></el-col>
      <el-col :span="16"><div class="grid-content bg-purple">
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



      </div></el-col>

    </el-row>

  </div>

</template>

<script>
  export default {
    name: 'Personal',
    data(){
      return{user:JSON.parse(sessionStorage.getItem("backstageuser"))}
    },
    methods:{
      httpRequest(param) {
        let fd = new FormData()// FormData 对象
        console.log(param)
        fd.append('file', param.file)// 文件对象
        fd.append("userid",this.user.backstage_userid);
        fd.append("username",this.user.backstage_uname);
        fd.append("flag",this.user.flag);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        //上传 一般上传图片用 $axios2
        this.$axios2.post("backstage/upload",fd).then(response=>{
          console.info(response.data);
        })
      },
      //校验音频格式
      /*beforeAvatarUpload(file) {
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
