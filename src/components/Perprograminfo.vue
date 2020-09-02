<template>
   <div>

     <el-drawer
       title="详细信息"
       :visible.sync="drawer"
       :direction="direction"
       :before-close="handleClose"
       size="50%">
       <div>
         <!--详情页面-->
         <el-table :data="details" :border="true">
           <el-table-column prop="pname"  label="姓名"></el-table-column>
           <el-table-column prop="pintroduction" label="介绍"></el-table-column>
           <el-table-column prop="ptname" label="类型"></el-table-column>
           <el-table-column prop="psource" label="来源"></el-table-column>
           <el-table-column prop="petname" label="主播"></el-table-column>
           <el-table-column prop="chapterorder" label="章节顺序">
             <template slot-scope="scope">
               {{scope.row.chapterorder==0?'正序':'倒序' }}
             </template>
           </el-table-column>
           <el-table-column prop="pcreatedate" label="创建时间"></el-table-column>
           <el-table-column prop="buycount" label="售出"></el-table-column>
           <el-table-column prop="pstate" label="连载/完本">
             <template slot-scope="scope">
               {{scope.row.pstate==0?'连载':'完本' }}
             </template>
           </el-table-column>
           <el-table-column prop="allprice" label="价格"></el-table-column>
         </el-table>
       </div>
     </el-drawer>

     <!--添加-->
     <el-dialog width="50%" :before-close="restFrom"  title="添加" :visible="dialogVisible">
       <el-form :model="rulefrom" :rules="rules" ref="rulefrom"  label-width="100px" class="demo-ruleForm">
         <el-form-item label="名称："  prop="pname">
           <el-input v-model="rulefrom.name"></el-input>
         </el-form-item>
          <el-form-item label="封面：" prop="poster">
            <el-upload
              class="upload-demo"
              ref="upload"
              action=""
              :auto-upload="false"
              :multiple="false"
              :limit="1"
              :http-request="httpRequest">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>

         <el-form-item label="类型：" prop="ptid">
           <el-select v-model="rulefrom.ptid"  placeholder="请选择">
             <el-option
               v-for="item in programtypeinfo"
               :key="item.ptid"
               :label="item.ptname"
               :value="item.ptid">
             </el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="连载/完本：" prop="pstate">
           <el-radio-group v-model="rulefrom.pstate">
             <el-radio v-model="rulefrom.pstate" label="0">连载</el-radio>
             <el-radio v-model="rulefrom.pstate" label="1">完本</el-radio>
           </el-radio-group>
         </el-form-item>
         <el-form-item label="来源：" prop="psource">
           <el-input  v-model="rulefrom.psource"></el-input>
         </el-form-item>
         <el-form-item label="章节排序：" prop="chapterorder">
           <el-radio-group v-model="rulefrom.chapterorder">
             <el-radio v-model="rulefrom.chapterorder" label="0">正序</el-radio>
             <el-radio v-model="rulefrom.chapterorder" label="1">倒序</el-radio>
           </el-radio-group>
         </el-form-item>
         <el-form-item label="价格：" prop="allprice">
           <el-input v-model="rulefrom.allprice"></el-input>
         </el-form-item>
         <el-form-item label="介绍：" prop="pintroduction">
           <el-input type="textarea" v-model="rulefrom.pintroduction" ></el-input>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" @click="submitForm">添加</el-button>
           <el-button @click="restFrom">重置</el-button>
         </el-form-item>
       </el-form>
     </el-dialog>
     <el-button type="primary" @click="newlyprogram" >添加</el-button>
     <el-table style="text-align:center" :data="list"  width="100%" height="550px" :stripe="true"  border>
       <el-table-column prop="pname"  label="姓名"></el-table-column>
       <el-table-column label="封面图">
         <template slot-scope="scope">
           <img :src="scope.row.poster" style="width: 40px;height: 40px;vertical-align: middle;">
         </template>
       </el-table-column>
       <el-table-column prop="ptname" label="类型"></el-table-column>
       <el-table-column prop="pcreatedate" label="创建时间"></el-table-column>
       <el-table-column prop="buycount" label="售出"></el-table-column>
       <el-table-column prop="allprice" label="价格"></el-table-column>
       <el-table-column label="详情">
         <template slot-scope="scope">
           <el-button icon="el-icon-search" @click="querydetails(scope.row)" circle></el-button>
         </template>
       </el-table-column>
     </el-table>



     <div class="block">
       <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="currentPage"
         :page-sizes="[5, 10, 20]"
         :page-size="pagesize"
         layout="total, sizes, prev, pager, next, jumper"
         :total="total">
       </el-pagination>
     </div>
   </div>
</template>

<script>
    export default {
        name: "Perprograminfo",
      data(){
          return {
            user:JSON.parse(sessionStorage.getItem("backstageuser")),
            total: 0, //数据总数
            pagesize: 5, //每页的数据条数
            currentPage: 1,
            list:[],
            direction: 'btt',//设置默认
            drawer:false,
            details:[],
            dialogVisible:false,
            programtypeinfo:{},
            rulefrom:{
              name:"",//名称
              poster:"",//图片
              pintroduction:"",//介绍
              acid:null,
              psource:"",//来源
              chapterorder:"0",//章节顺序
              ptid:null,//节目类型
              pstate:"0",//连载/完本
              allprice:"",//价格
            },
            anchorinfo:{},//获取主播编号
            multiple:"false",//是否支持多选文件
            rules:{
                pname:[
                  { required: true, message: '请输入名称', trigger: 'blur' },
                ],
              allprice:[
                  { required: true, message: '请输入价格', trigger: 'blur' },
              ],
              pstate:[
                { required: true, message: '请选择连载/完本', trigger: 'change' }
              ],
              ptid:[
                { required: true, message: '请选择类型', trigger: 'change' }
              ],
              chapterorder:[
                { required: true, message: '请选择章节排序', trigger: 'change' }
              ],
              psource:[
                { required: true, message: '请输入来源', trigger: 'blur' },
              ],
              pintroduction:[
                { required: true, message: '请输入介绍', trigger: 'blur' }
              ]
            }
          }
      },created:function(){
          this.queryAll();
    },methods:{
        //文件上传
        httpRequest(param){
          let fd = new FormData()// FormData 对象
          fd.append('file', param.file)// 文件对象图片
          fd.append("pname",this.rulefrom.name);//名称
          fd.append("acid",this.rulefrom.acid);//主播
          fd.append("psource",this.rulefrom.psource);//来源
          fd.append("chapterorder",this.rulefrom.chapterorder);//章节顺序
          fd.append("ptid",this.rulefrom.ptid);//节目类型
          fd.append("pstate",this.rulefrom.pstate);//连载/完本
          fd.append("allprice",this.rulefrom.allprice);//价格
          fd.append("pintroduction",this.rulefrom.pintroduction);//介绍
          fd.append("flag",this.user.flag);//用户标示
          fd.append("backstage_uname",this.user.backstage_uname);//用户账号
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          //上传 一般上传图片用 $axios2
          this.$axios2.post("backstage/programinfo/insertprograminfo",fd).then(response=>{
            if(response.data==1){
              this.dialogVisible=false;
              this.rulefrom={};
              this.queryAll();
            }
          })
        },
        submitForm:function(){
          this.rulefrom.acid= this.anchorinfo.acid;
          this.$refs.upload.submit();
        },
        restFrom(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              this.dialogVisible=false;
              this.rulefrom={};
              this.queryAll();
              done();
            })
            .catch(_ => {});
          },
          queryAll:function () {
            this.$axios.post("backstage/programinfo/programinfoAll",
              {"currentPage":this.currentPage,"pageSize":this.pagesize,"bfid":this.user.backstage_userid}).then(resp=>{
                this.total=resp.data.total;
                this.list=resp.data.list;
            })
          },
        handleSizeChange(size) {
          this.pagesize=size;
          this.queryAll();
        },
        handleCurrentChange(curPage) {
          this.currentPage=curPage;
          this.queryAll();
        },
        querydetails:function (row) {
          this.drawer=true;
            this.$axios.post("backstage/programinfo/programinfoAll",
              {"currentPage":this.currentPage,"pageSize":this.pagesize,"pid":row.pid,"bfid":this.user.backstage_userid}).then(resp=>{
                console.log(resp.data.list)
                 this.details=resp.data.list;
            })
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },newlyprogram:function () {
          this.dialogVisible=true;
          this.$axios.post("backstage/programtypeinfo/queryAllProtype").then(response=>{
            this.programtypeinfo=response.data;
            this.$axios.post("backstage/anchorinfo/queryAllByacid",{"bfid":this.user.backstage_userid}).then(res=>{
              this.anchorinfo=res.data[0];
            })
          })

        }
      }
    }
</script>

<style scoped>

</style>
