<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="header-tabs">
    <el-tab-pane label="用户管理" name="first">
      <el-table
        :data="admindata.list"
        style="width: 100%">
        <el-table-column
          label="姓名"
          width="120">
          <template slot-scope="scope">
            <i class="el-icon-user"></i>
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="部门"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-s-home"></i>
            <span style="margin-left:10px">{{getdepartname(scope.row.department)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="联系电话"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-phone-outline"></i>
            <span style="margin-left:10px">{{scope.row.phone}}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="tag"
            label="权限"
            width="140"
            :filters="[{ text: '超级管理员', value: '0' }, { text: '普通管理员', value: '1' },{text:'普通用户',value:'2'}]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.rank === '0' ? 'danger' : 'success'"
                disable-transitions>{{rankname(scope.row.rank)}}</el-tag>
            </template>
          </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
              <el-dialog title="用户信息修改" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="联系方式" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="所属部门" :label-width="formLabelWidth">
                    <el-select v-model="form.department" placeholder="请选择所在部门">
                      <el-option :label="departdatas.department_name" :value="departdatas.department_id" v-for='(departdatas,index) in departdata' :key='index'></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="权限" :label-width="formLabelWidth">
                    <el-select v-model="form.rank" placeholder="请选择权限">
                      <el-option label="超级管理员" value="0"></el-option>
                      <el-option label="普通管理员" value="1"></el-option>
                      <el-option label="普通用户" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="infouserinfor()">确 定</el-button>
                </div>
              </el-dialog>
            <el-button
              size="mini"
              type="warning"
              @click="handleDelete(scope.$index, scope.row)">禁用</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="AdminPwdDig(scope.row)"            
            >修改密码</el-button>
            <el-dialog title="用户密码修改" :visible.sync="dialogPwdVisible">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" :inline="true">
                  <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogPwdVisible = false">取 消</el-button>
                  <el-button type="primary" @click="AdminPwdUpdate()">确 定</el-button>
                </div>
              </el-dialog>
            <el-button type="danger" icon="el-icon-delete" circle @click="AdminDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="用户添加" name="second">
      <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" style="width:300px;margin-left:30px">
        <el-form-item label="注册用户名">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="formLabelAlign.phone"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-select v-model="formLabelAlign.rank" placeholder="设置用户权限">
            <el-option label="超级管理员" value="0"></el-option>
            <el-option label="普通管理员" value="1"></el-option>
            <el-option label="普通用户" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="formLabelAlign.department_id" placeholder="所在部门">
            <el-option :label="departdatas.department_name" :value="departdatas.department_id" v-for='(departdatas,index) in departdata' :key='index'></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:300px;margin-left:30px">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="禁用管理" name="third">
      <el-table
        :data="unadmindata.list"
        style="width: 100%">
        <el-table-column
          label="姓名"
          width="120">
          <template slot-scope="scope">
            <i class="el-icon-user"></i>
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="部门"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-s-home"></i>
            <span style="margin-left:10px">{{getdepartname(scope.row.department)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="联系电话"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-phone-outline"></i>
            <span style="margin-left:10px">{{scope.row.phone}}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="tag"
            label="权限"
            width="140"
            :filters="[{ text: '超级管理员', value: '0' }, { text: '普通管理员', value: '1' },{text:'普通用户',value:'2'}]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.rank === '0' ? 'danger' : 'success'"
                disable-transitions>{{rankname(scope.row.rank)}}</el-tag>
            </template>
          </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="removedisable(scope.row)">解除禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style>
.header-tabs{
  margin:30px
}

</style>

<script>

  export default {
    data () {
      //设置密码验证
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        activeName: 'first',
        admindata:{//用户组信息
          rank:''//权限信息
        },
        departdata:{
         department_name:'',
         department_id:'0'
        },//部门配置
        labelPosition: 'right',//用户添加表单对齐
        formLabelAlign: {
          name: '',
          phone: '',
          rank:'',
          department_id:''
        },
        //验证密码
        ruleForm: {
          pass: '',
          checkPass: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
        //内嵌表单
        dialogFormVisible: false,
        form: {
          name: '',
          department: '',
          rank:'',
          phone:'',
          id:'',
          pwd:''
        },
        formLabelWidth: '120px',
        //修改密码
        dialogPwdVisible:false,
        //禁用管理员
        unadmindata:'',
        removename:''//解除管理员
      };
    },

    components: {},

    computed: {
      //动态权限
      rankname(){
        return function(res){
          switch(res){
            case '0':
              return '超级管理员'
              break;
            case '1':
              return '普通管理员'
              break;
            case '2':
              return '普通用户'
              break;
          }
        }
      },
      //动态部门
      getdepartname(){
        return function(res){
          return this.departdata[res].department_name;
        }
      }
    },

    beforeMount() {
      this.departmentdata();
    },

    mounted() {
      this.getadmindata();
      this.getunadmin();
    },

    methods: {
      //切换tabs
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //编辑用户信息
       handleEdit(index, row) {
        this.dialogFormVisible=true;
        this.form.name=row.name;
        this.form.rank=row.rank;
        this.form.department=row.department;
        this.form.phone=row.phone;
      },
      //禁用用户
      handleDelete(index, row) {
        this.$confirm('此操作将永久禁用该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post('/admin/deleteadmin',{
            'name':row.name
          }).then((res)=>{
            if(res.data.status=='0'){
              this.$message({
              type: 'success',
              message: '禁用成功!'
              });
              this.getadmindata();
              this.getunadmin();
            }else{
              this.$message('禁用失败'+res.data.msg)
            }
          }).catch((response)=>{
            console.log(response);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用'
          });          
        });
      },
      //获取用户组信息
      getadmindata(){
        this.axios.get('/admin/').then((res)=>{
          this.admindata=res.data.result
        }).catch((response)=>{
          console.log(response);
        })
      },
      filterTag(value, row) {
        return row.rank === value;
      },
      //获取部门配置
      departmentdata() {
        this.axios.get('/users/departments').then((res) => {
          this.departdata = res.data.result.list;
        }).catch((response) => {
          console.log(response);
        })
      },
      //提交表单注册用户
      submitForm() {
        this.axios.post('/admin/Addadmin',{
          name:this.formLabelAlign.name,
          phone:this.formLabelAlign.phone,
          department:this.formLabelAlign.department_id,
          rank:this.formLabelAlign.rank,
          pwd:this.ruleForm.pass
        }).then((res)=>{
          if(res.data.status=='0'){
            this.$message(res.data.msg);
            this.getadmindata();
          }else{
            this.$message('注册失败'+res.data.msg);
          }
        }).catch((response)=>{
          console.log(response);
        })
      },
      //重置表单信息
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //修改用户个人信息
      infouserinfor(){
        this.axios.post('/admin/alteradmin',{
          name:this.form.name,
          phone:this.form.phone,
          rank:this.form.rank,
          department:this.form.department
        }).then((res)=>{
          if(res.data.status=='0'){
            this.$message('修改成功');
            this.dialogFormVisible = false
            this.getadmindata();
          }else{
            this.$message('修改失败'+res.data.msg)
          }
        }).catch((response)=>{
          console.log(response);
        })
      },
      //删除管理员
      AdminDelete(row){
        this.form.id=row._id;
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post('/admin/AdminDelete',{
            id:this.form.id
          }).then((res)=>{
            if(res.data.status=='0'){
              this.$message({
              type: 'success',
              message: '删除成功!'
              });
              this.getadmindata();
            }else{
              this.$message('删除失败'+res.data.msg)
            }
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
      //修改密码对话框
      AdminPwdDig(row){
        this.form.phone=row.phone;
        this.dialogPwdVisible=true;
      },
      //修改密码
      AdminPwdUpdate(){
        this.axios.post('/admin/alteradminpwd',{
          pwd:this.ruleForm.pass,
          phone:this.form.phone
        }).then((res)=>{
          if(res.data.status=='0'){
            this.$message(res.data.msg);
            this.dialogPwdVisible=false;
            this.getadmindata();
          }else{
            this.$message(res.data.msg);
          }
        }).catch((response)=>{
          console.log(response);
        })
      },
      //获取禁用管理员列表
      getunadmin(){
        this.axios.get('/admin/GetUnadmin').then((res)=>{
          this.unadmindata=res.data.result;
        }).catch((response)=>{
          console.log(response)
        })
      },
      //解除禁用
      removedisable(row){
        this.removename=row.name;
        this.axios.post('/admin/undeleteadmin',{
          name:this.removename
        }).then((res)=>{
          if(res.data.status=='0'){
            this.$message(res.data.msg);
            this.getunadmin();
            this.getadmindata();
          }else{
            this.$message(res.data.msg);
          }
        }).catch((response)=>{
          console.log(response);
        })
      },
    },

    watch: {}

  }

</script>