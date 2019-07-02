<template>
  <div>
     <el-tabs :tab-position="tabPosition" style="margin-left:20px;margin-top:40px">
      <el-tab-pane label="短信模板管理">
        <el-button type="primary" icon="el-icon-edit" class="Smsadd" @click="dialogSmsaddVisible = true">添加</el-button>
        <el-dialog title="添加短信模板" :visible.sync="dialogSmsaddVisible">
          <el-form :model="Smsaddform">
            <el-form-item label="短信签名" :label-width="formLabelWidth">
              <el-input v-model="Smsaddform.SignName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="模板编号" :label-width="formLabelWidth">
              <el-input v-model="Smsaddform.TemplateCode" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="模板描述" :label-width="formLabelWidth">
              <el-input v-model="Smsaddform.describe" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogSmsaddVisible = false">取 消</el-button>
            <el-button type="primary" @click="SmsAddinfor()">确 定</el-button>
          </div>
        </el-dialog>
        <el-table
          :data="SmsModeldata.list"
          style="width: 100%">
          <el-table-column
            label="短信签名"
            width="150">
            <template slot-scope="scope">
              <i class="el-icon-message"></i>
              <span style="margin-left: 10px">{{ scope.row.SignName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="模板编号"
            width="180">
            <template slot-scope="scope">
              <i class="el-icon-chat-dot-round"></i>
              <span style="margin-left: 10px">{{ scope.row.TemplateCode }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="描述"
            width="300">
            <template slot-scope="scope">
              <i class="el-icon-edit-outline"></i>
              <span style="margin-left: 10px">{{ scope.row.describe }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-dialog title="模板编辑" :visible.sync="dialogSmsVisible">
                  <el-form :model="Smsform">
                    <el-form-item label="短信签名" :label-width="formLabelWidth">
                      <el-input v-model="Smsform.SignName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="模板编号" :label-width="formLabelWidth">
                      <el-input v-model="Smsform.TemplateCode" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="模板描述" :label-width="formLabelWidth">
                      <el-input v-model="Smsform.describe" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogSmsVisible = false">取 消</el-button>
                    <el-button type="primary" @click="Smsalterinfo()">确 定</el-button>
                  </div>
                </el-dialog>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="部门信息管理">
        <el-button type="primary" icon="el-icon-edit" class="Smsadd" @click="dialogDepaddVisible = true">添加</el-button>
        <el-dialog title="添加部门" :visible.sync="dialogDepaddVisible">
          <el-form :model="Depaddform">
            <el-form-item label="部门名称" :label-width="formLabelWidth">
              <el-input v-model="Depaddform.department_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="部门id(从0开始依次加一)" :label-width="formLabelWidth">
              <el-input v-model="Depaddform.department_id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="部门qq群" :label-width="formLabelWidth">
              <el-input v-model="Depaddform.department_qq" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogDepaddVisible = false">取 消</el-button>
            <el-button type="primary" @click="DepAddinfor()">确 定</el-button>
          </div>
        </el-dialog>
        <el-table
          :data="DepModeldata.list"
          style="width: 100%">
          <el-table-column
            label="部门名称"
            width="150">
            <template slot-scope="scope">
              <i class="el-icon-message"></i>
              <span style="margin-left: 10px">{{ scope.row.department_name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="部门编号"
            width="100">
            <template slot-scope="scope">
              <i class="el-icon-chat-dot-round"></i>
              <span style="margin-left: 10px">{{ scope.row.department_id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="部门qq群"
            width="300">
            <template slot-scope="scope">
              <i class="el-icon-edit-outline"></i>
              <span style="margin-left: 10px">{{ scope.row.department_qq }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleDepEdit(scope.$index, scope.row)">编辑</el-button>
                <el-dialog title="部门编辑" :visible.sync="dialogDepVisible">
                  <el-form :model="Depform">
                    <el-form-item label="部门名称" :label-width="formLabelWidth">
                      <el-input v-model="Depform.department_name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="部门编号" :label-width="formLabelWidth">
                      <el-input v-model="Depform.department_id" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="部门qq群" :label-width="formLabelWidth">
                      <el-input v-model="Depform.department_qq" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogDepVisible = false">取 消</el-button>
                    <el-button type="primary" @click="Depalterinfo()">确 定</el-button>
                  </div>
                </el-dialog>
              <el-button
                size="mini"
                type="danger"
                @click="handleDepDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="阿里云ak管理">
        <el-form label-width="80px" :model="AliyunConfig">
            <el-form-item label="阿里云ak">
              <el-input v-model="AliyunConfig.AccessKeyId" :disabled="updateinfo"></el-input>
            </el-form-item>
            <el-form-item label="AkSecret">
              <el-input v-model="AliyunConfig.AccessKeySecret" :disabled="updateinfo"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="warning" round @click="updateinfo=false">点击修改</el-button>
          <el-button type="danger" round @click='SaveAk()'>保存</el-button>
      </el-tab-pane>
      <el-tab-pane label="开放时间管理">系统开放时间</el-tab-pane>
    </el-tabs>
  </div>
</template>
<style>
.Smsadd{
  float:right;
  margin-right: 30px;
  margin-bottom: 10px;
}
</style>

<script>

  export default {
    data () {
      return {
        tabPosition: 'left',//标签页方向
        SmsModeldata:{},//短信模板
        DepModeldata:{},//部门信息
        dialogSmsVisible: false,//编辑短信模板
        dialogSmsaddVisible:false,//添加短信模板
        dialogDepaddVisible:false,//添加部门
        dialogDepVisible:false,//编辑部门
        Smsform: {//短信模板修改
          SignName: '',
          TemplateCode:'',
          describe:'',
          id:''
        },
        formLabelWidth: '120px',
        Smsaddform:{//短信模板添加
          SignName: '',
          TemplateCode:'',
          describe:''
        },
        Depaddform:{//部门添加
          department_name:'',
          department_qq:'',
          department_id:''
        },
        Depform:{//部门修改
          department_name:'',
          department_qq:'',
          department_id:'',
          id:''
        },
        AliyunConfig:{//配置表
          AccessKeyId:'',
          AccessKeySecret:'',
          id:''
        },
        updateinfo:true,//禁用配置
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {
      this.getSmsData();
      this.getDepdata();
      this.getAliyunConfig();
    },

    methods: {
       //短信模板编辑
       handleEdit(index, row) {
         this.dialogSmsVisible=true;
         this.Smsform.SignName=row.SignName;
         this.Smsform.TemplateCode=row.TemplateCode;
         this.Smsform.describe=row.describe;
         this.Smsform.id=row._id;
      },
      //短信模板删除
      handleDelete(index, row) {
        this.Smsform.id=row._id;
        this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post('/admin/SmsDelModel',{
            id:this.Smsform.id
          }).then((res)=>{
            this.$message({
              type:'success',
              message:res.data.msg
            })
            this.getSmsData();
          }).catch((response)=>{
            console.log(response);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      //获取短信模板
      getSmsData(){
        this.axios.get('/admin/SmsConfig').then((res)=>{
          this.SmsModeldata=res.data.result
        }).catch((response)=>{
          console.log(response)
        })
      },
      //修改短信模板
      Smsalterinfo(){
        this.axios.post('/admin/SmsInfoModel',{
          id:this.Smsform.id,
          SignName:this.Smsform.SignName,
          TemplateCode:this.Smsform.TemplateCode,
          describe:this.Smsform.describe
        }).then((res)=>{
          if(res.data.status=='0'){
            this.$message('修改成功');
            this.dialogSmsVisible=false;
            this.getSmsData();
          }else{
            this.$message('修改失败'+res.data.msg)
          }
        }).catch((response)=>{
          console.log(response)
        })
      },
      //添加新短信模板
      SmsAddinfor(){
        this.axios.post('/admin/SmsPushModel',{
          SignName:this.Smsaddform.SignName,
          TemplateCode:this.Smsaddform.TemplateCode,
          describe:this.Smsaddform.describe
        }).then((res)=>{
          if(res.data.status=='0'){
            this.$message('添加成功');
            this.dialogSmsaddVisible=false;
            this.getSmsData();
          }else{
            this.$message('添加失败'+res.data.msg);
          }
        }).catch((response)=>{
          console.log(response);
        })
      },
      //添加部门
      DepAddinfor(){
        this.axios.post('/admin/AddDepartinfor',{
          department_name:this.Depaddform.department_name,
          department_id:this.Depaddform.department_id,
          department_qq:this.Depaddform.department_qq
        }).then((res)=>{
          if(res.data.status=='0'){
            this.$message('添加成功');
            this.dialogDepaddVisible=false;
            this.getDepdata();
          }else{
            this.$message('添加失败'+res.data.msg)
          }
        }).catch((response)=>{
          console.log(response)
        })
      },
      //获取部门信息
      getDepdata(){
        this.axios.get('/users/departments').then((res)=>{
            this.DepModeldata=res.data.result
        }).catch((response)=>{
          console.log(response);
        })
      },
      //部门信息编辑
      handleDepEdit(index,row){
        this.dialogDepVisible=true;
        this.Depform.department_name=row.department_name;
        this.Depform.department_id=row.department_id;
        this.Depform.department_qq=row.department_qq;
        this.Depform.id=row._id;
      },
      //修改部门信息
      Depalterinfo(){
        this.axios.post('/admin/infoDepartmation',{
          id:this.Depform.id,
          department_name:this.Depform.department_name,
          department_qq:this.Depform.department_qq,
          department_id:this.Depform.department_id
        }).then((res)=>{
            if(res.data.status=='0'){
              this.$message('修改成功');
              this.dialogDepVisible=false;
              this.getDepdata();
            }else{
              this.$message('修改失败'+res.data.msg);
            }
        }).catch((response)=>{
          console.log(response)
        })
      },
      //部门删除
      handleDepDelete(index,row){
        this.Depform.id=row._id;
        this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post('/admin/DeleteDepart',{
            id:this.Depform.id
          }).then((res)=>{
            this.$message({
              type:'success',
              message:res.data.msg
            })
            this.getDepdata();
          }).catch((response)=>{
            console.log(response);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      //获取配置表
      getAliyunConfig(){
        this.axios.get('/admin/getconfig').then((res)=>{
          this.AliyunConfig.AccessKeyId=res.data.result.list[0].AccessKeyId;
          this.AliyunConfig.AccessKeySecret=res.data.result.list[0].AccessKeySecret;
          this.AliyunConfig.id=res.data.result.list[0]._id;
        }).catch((response)=>{
          console.log(response);
        })
      },
      //修改aliyunAk
      SaveAk(){
        this.axios.post('/admin/UpdataAliunAk',{
          AccessKeyId:this.AliyunConfig.AccessKeyId,
          AccessKeySecret:this.AliyunConfig.AccessKeySecret,
          id:this.AliyunConfig.id
        }).then((res)=>{
          if(res.data.status=='0'){
            this.$message('保存成功');
            this.getAliyunConfig();
            this.updateinfo=true;
          }else{
            this.$message('保存失败'+res.data.msg)
          }
        }).catch((response)=>{
          console.log(response);
        })
      }
    },

    watch: {}

  }

</script>