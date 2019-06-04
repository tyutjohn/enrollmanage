<template>
  <div>
     <el-table
      ref="multipleTable"
      :data="usergetdata"
      tooltip-effect="dark"
      style="width: 100%"
      stripe
      border
      height="600px"
      @selection-change="handleSelectionChange">
      <el-table-column
      type="index"
      :index="indexMethod">
    </el-table-column>
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="姓名"
        width="100">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column
        label="性别"
        width="60">
        <template slot-scope="scope">{{ scope.row.sex }}</template>
      </el-table-column>
      <el-table-column
        label="专业"
        width="120">
        <template slot-scope="scope">{{ scope.row.major }}</template>
      </el-table-column>
      <el-table-column
        label="班级"
        width="90">
        <template slot-scope="scope">{{ scope.row.class }}</template>
      </el-table-column>
      <el-table-column
        label="校区"
        width="120">
        <template slot-scope="scope">{{ scope.row.campus }}</template>
      </el-table-column>
      <el-table-column
        label="电话"
        width="160">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column
        label="志愿部门一"
        width="120">
        <template slot-scope="scope">{{ getdepartname(scope.row.department) }}</template>
      </el-table-column>
      <el-table-column
        label="志愿部门二"
        width="120">
        <template slot-scope="scope">{{ getdepartname(scope.row.department2) }}</template>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
            <el-select v-model="department_id" placeholder="请选择查看的部门" @change="selectdiffdepart()">
              <el-option
                v-for="item in departmentinfor"
                :key="item.department_id"
                :label="item.department_name"
                :value="item.department_id">
              </el-option>
            </el-select>
        </template>
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" class="search" @click="selEnrollButton(scope.row._id)">开始打分</el-button>
          <el-dialog :visible.sync="dialogFormVisible">
            <div slot="title" class="dialog-title">{{userinformation.name}}的个人报名信息</div>
            <div>
              <el-button-group>
                <el-button type="primary" icon="el-icon-edit" plain>资料</el-button>
                <el-button type="primary" icon="el-icon-share" plain>转部门</el-button>
                <el-button type="primary" icon="el-icon-delete" plain>延迟面试</el-button>
              </el-button-group>
              <div class="flex">
                <div class="flex-dir flex-left">
                  <ul>
                    <li>姓名:{{userinformation.name}}</li>
                    <li>性别:{{userinformation.sex}}</li>
                    <li>专业:{{userinformation.major}}</li>
                    <li>班级:{{userinformation.class}}</li>
                    <li>学号:{{userinformation.schoolNum}}</li>
                    <li>第一志愿:{{userinformation.department}}</li>
                    <li>第二志愿:{{userinformation.department2}}</li>
                    <li>个人介绍:{{userinformation.introduce}}</li>
                  </ul>
                </div>
                <div class="flex-dir flex-right">test</div>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style>
.search{
  margin-left: 50px;
}

.el-table--border {
    padding-left: 20px;
    padding-top:20px;
}

.el-dialog__body{
  padding:0;
}

.el-button-group .el-button--primary{
  height: 34px;
}

.flex{
  display:flex;
  flex-direction: row;
  justify-content: space-between;
}

</style>

<script>

  export default {
    data () {
      return {
          multipleSelection: [],
          usergetdata:[],
          departmentinfor:{
            department_name:'',
          },//各部门信息
          departdata:{
            department_name:{}
          },
          department_id:'',
        dialogFormVisible: false,//对话框遮罩层是否开启
        formLabelWidth: '120px',//对话框大小
        userinformation:{}//用户个人信息
      };
    },

    components: {},

    computed: {
      getdepartname(){
        return function(res){
            return this.departdata[res].department_name;
        }
      },
      //计算个人信息的部门
      getuserpartname(){
        return function(res){
          switch(res){
            case 0:
              return '未填写'
              break;
            case 1:
              return '技术组'
              break;
            case 2:
              return '设计组'
              break;
            case 3:
              return '事务组'
              break;
            case 4:
              return '企划组'
              break;
            case 5:
              return '外宣组'
              break;
            case 6:
              return '采编组'
              break;
          }
        }
      }
    },

    beforeMount() {
      this.departmentdata();
    },

    mounted() {
      this.getdepart();
      this.departmentdata();
      this.enrollAll();
    },

    methods: {
     //选择框值
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //索引排序
      indexMethod(index) {
        return index+1;
      },
      //获取全部面试者信息
      enrollAll(){
        this.axios.get('/users/mark').then((res)=>{
          this.usergetdata=res.data.result.list;
          console.log(res);
        }).catch((response)=>{
          console.log(response);
        })
      },
      //获取部门配置
      departmentdata(){
        this.axios.get('/users/departments').then((res)=>{
          this.departdata=res.data.result.list;
         // console.log(res);
        }).catch((response)=>{
          console.log(response);
        })
      },
      //获取部门信息
      getdepart(){
        this.axios.get('/users/departments').then((res)=>{
          this.departmentinfor=res.data.result.list;
          //console.log(res);
        }).catch((response)=>{
          console.log(response);
        })
      },
      //选择各个部门报名的信息
      selectdiffdepart(){
        this.axios.post('/users/markdepart',{
            department:this.department_id
        }).then((res)=>{
          this.usergetdata=res.data.result.list
          console.log(res);
        }).catch((response)=>{
          console.log(response);
        })
      },
      //选择开始面试按钮
      selEnrollButton(event){
        this.dialogFormVisible = true;
        this.axios.post('/users/markperson',{
          id:event
        }).then((res)=>{
          this.userinformation=res.data.result.list
          console.log(res)
        }).catch((response)=>{
          console.log(response);
        });
      },
    },

    watch: {

    }

  }

</script>