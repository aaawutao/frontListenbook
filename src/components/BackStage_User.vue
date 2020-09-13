<template>
  <div>

    <el-drawer
      title="详细信息"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="50%">
      <div>
        <!--用户详情页面-->

        <el-table :data="userdetail"  :border="true">
          <el-table-column prop="empname"  label="姓名"></el-table-column>
          <el-table-column prop="dname" label="部门"></el-table-column>
          <el-table-column prop="empidentity" label="身份证号"></el-table-column>
          <el-table-column prop="empphone" label="手机号"></el-table-column>
          <el-table-column prop="xueli" label="学历"></el-table-column>
          <el-table-column prop="empentrydate" label="入职日期"></el-table-column>
          <el-table-column  label="主播">
            <template slot-scope="scope" v-if="anchorinfo!=null">
              {{anchorinfo.petname}}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>

    <el-button type="primary" @click="showDialog">账号分配</el-button>
    <el-dialog width="30%" @close="closeDialog()" title="账号分配" :visible="dialogVisible">
      <el-form label-width="100px" label-suffix="：" class="form">

        <el-form-item label="类型" prop="actype">
          <el-radio v-model="radio" label="0">主播人员</el-radio>
          <el-radio v-model="radio" label="1">管理人员</el-radio>
        </el-form-item>
        <el-form-item label="选择职位">
          <el-select v-model="did" placeholder="请选择职位">
            <el-option
              v-for="item in departmentinfo"
              :key="item.did"
              :label="item.dname"
              :value="item.did">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择员工">
          <el-select v-model="empid" placeholder="请选择">
            <el-option
              v-for="item in empinfo"
              :key="item.empid"
              :label="item.empname"
              :value="item.empid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
        <el-button type="info" :disabled="show==true || did==null || empid==null ?true:false" @click="showdiv" round>生成账号</el-button>
        </el-form-item>
        <div v-if="show">
            <el-form-item label="账号" prop="backstage_uname">
              <el-input :disabled="true" v-model="user.backstage_uname"></el-input>
            </el-form-item>
          <el-form-item label="密码" prop="backstage_upwd">
            <el-input :disabled="true" clearable show-password v-model="user.backstage_upwd"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add">确 定</el-button>
        <el-button type="success" @click="closeDialog">取 消</el-button>
      </div>
    </el-dialog>

    <el-table :data="list" width="100%" height="550px" :stripe="true" border>
      <el-table-column prop="backstage_userid" label="员工编号"></el-table-column>
      <el-table-column prop="backstage_uname" label="账号"></el-table-column>
      <el-table-column prop="backstage_upwd" show-password label="密码"></el-table-column>

      <!--<el-table-column  prop="empid"  aria-hidden="true" label="员工编号"></el-table-column>-->
      <el-table-column prop="isenable" label="启用/禁用">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isenable" active-text="启用" :active-value="0" inactive-text="禁用" :inactive-value="1"
                     @change="changePro($event,scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="backstage_js" label="详情">
        <template slot-scope="scope">
          <el-button icon="el-icon-search" @click="querydsc(scope.row)"   circle></el-button>
        </template>
      </el-table-column>

    </el-table>


    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                     :page-sizes="[3, 5, 10, 20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  export default {
    name: "BackStage_User",
    data() {
      return {
        list: [], //查询的数据
        total: 0, //数据总数
        pagesize: 5, //每页的数据条数
        currentPage: 1, //默认
        dialogVisible: false,
        did:null,//部门下拉框存储value
        empid:null,//员工下拉框存储value
        departmentinfo:{},//部门存储的数据
        empinfo:{},//员工存储的数据
        show:false,//是否隐藏div
        radio:"0",//单选按钮存储id
        user:{backstage_uname:"",backstage_upwd:""},//账号和密码
        drawer:false,
        chapter:false,
        direction: 'rtl',
        userdetail:[],
        anchorinfo:{},
    }
    },
    created: function() {
      this.queryUser();
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')//关闭抽屉
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      querydsc:function(row){
        this.drawer=true;
        this.direction= 'btt';
        this.$axios.post("backstage/queryByUserdetails",{"backstage_userid":row.backstage_userid}).then(resp=>{
          this.userdetail=resp.data;
          this.$axios.post("backstage/queryBz",{"bfid":row.backstage_userid}).then(resp=>{
            this.anchorinfo=resp.data;
          })

        })
      },
      showDialog:function(){//展开dialog查询数据
        this.dialogVisible=true;
        //获取部门信息
        this.$axios.post("backstage/departmentinfo/depfindAll").then(response=>{
          this.departmentinfo=response.data;
          //获取员工信息
          this.$axios.post("backstage/empinfo/queryByDid").then(resp=>{
             this.empinfo=resp.data;
          })
        })
      },
      showdiv:function(){ //显示隐藏账号密码
        this.show=!this.show;
        let datetime=new Date().getTime();
        let timestamp=Math.round((datetime/1000).toString());
        this.user.backstage_uname=timestamp;
        this.user.backstage_upwd=timestamp;
      },
      closeDialog:function(){//关闭dialog
        this.dialogVisible=false;
      },
      add:function(){
        if(this.show==false || this.did==null ||this.empid==null ){
          this.$message({
            type:'info',
            message:"请填写，完善数据"
          });
        }else{
          this.$axios.post("backstage/addassignment",
            {"backstage_uname":this.user.backstage_uname,"backstage_upwd":this.user.backstage_upwd,
              "did":this.did,"empid":this.empid,"actype":this.radio}).then(resp=>{
            if(resp.data==1){
              this.user.backstage_uname="";
             this.user.backstage_upwd="";
              this.did=null;
              this.empid=null;
              this.radio="0";
              this.show=false;
              this.did=null;
              this.dialogVisible=false;
              this.$message({
                type: 'info',
                message: '操作成功!'
              })
              this.queryUser();
            }
          })
        }

      },
      queryUser: function() {
        this.$axios.post("backstage/findAll", {
          "currentPage": this.currentPage,
          "pageSize": this.pagesize
        }).then(rep => {
          this.total = rep.data.total; //总页数
          this.list = rep.data.list; //数据
        })
      },
      handleSizeChange(size) {
        console.log(`每页 ${size} 条`);
        this.pagesize = size;
        this.queryUser();
      },
      handleCurrentChange(curPage) {
        console.log(`当前页: ${curPage}`);
        this.currentPage = curPage;
        this.queryUser();
      },
      changePro: function(val, row) {
        this.$axios.post("backstage/updateFlag", {
          "backstage_userid": row.backstage_userid,
          "isenable": val
        }).then(response => {
          if (val == 0) {
            this.$message({
              type: 'success',
              message: '启用成功!'
            })
          } else {
            this.$message({
              type: 'info',
              message: '已禁用!'
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
