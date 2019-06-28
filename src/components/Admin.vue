<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="header-tabs">
    <el-tab-pane label="用户组" name="third">用户组</el-tab-pane>
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
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="用户添加" name="second">
      <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" :inline="true" size="small">
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
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" :inline="true">
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
        }
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
    },

    methods: {
      //切换tabs
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //编辑用户信息
       handleEdit(index, row) {
        console.log(index, row);
      },
      //删除用户
      handleDelete(index, row) {
        console.log(index, row);
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
        this.axios.post('/admin/addadmin',{
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
      }
    },

    watch: {}

  }

</script>