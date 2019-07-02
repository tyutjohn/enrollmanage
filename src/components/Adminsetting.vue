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
      <el-tab-pane label="部门信息管理">部门信息管理</el-tab-pane>
      <el-tab-pane label="阿里云ak管理">阿里云ak管理</el-tab-pane>
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
        dialogSmsVisible: false,//编辑短信模板
        dialogSmsaddVisible:false,//添加短信模板
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
        }
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {
      this.getSmsData();
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
            id:this.Smsform.id=row._id
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
            this.$message('修改失败'+res.data.msg);
          }
        }).catch((response)=>{
          console.log(response);
        })
      },
    },

    watch: {}

  }

</script>