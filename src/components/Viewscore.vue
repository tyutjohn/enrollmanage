<template>
  <div>
     <el-table
      ref="multipleTable"
      :data="usergetdata.list"
      tooltip-effect="dark"
      style="width: 100%"
      stripe
      border
      height="620px"
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
                v-for="item in departdata"
                :key="item.department_id"
                :label="item.department_name"
                :value="item.department_id">
              </el-option>
            </el-select>
        </template>
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" class="search" @click="selEnrollButton(scope.row._id)">开始打分</el-button>
          <el-button type="danger" icon="el-icon-brush" circle @click="enrollLoading(scope.row._id)"></el-button>
          <el-button type="warning" icon="el-icon-s-tools" circle @click="userAdjust(scope.row._id)"></el-button>
          <el-dialog :visible.sync="dialogFormVisible">
            <div slot="title" class="dialog-title">{{userinformation.name}}的个人报名信息</div>
            <div>
              <el-button-group>
                <el-button type="primary" icon="el-icon-edit" plain>资料</el-button>
              </el-button-group>
              <div class="flex">
                <div class="flex-dir flex-left">
                  <ul>
                    <li>姓名:{{userinformation.name}}</li>
                    <li>性别:{{userinformation.sex}}</li>
                    <li>专业:{{userinformation.major}}</li>
                    <li>班级:{{userinformation.class}}</li>
                    <li>学号:{{userinformation.schoolNum}}</li>
                    <li>第一志愿:{{getuserpartname(userinformation.department)}}</li>
                    <li>第二志愿:{{getuserpartname(userinformation.department2)}}</li>
                    <li>校区:{{userinformation.campus}}</li>
                    <li>个人介绍:{{userinformation.introduce}}</li>
                    <li style="display:none" id='userId'>{{userinformation._id}}</li>
                  </ul>
                </div>
                <div class="flex-dir flex-right">
                  <el-input
                    type="number"
                    placeholder="请输入分数"
                    v-model="score"
                    maxlength="100"
                    show-word-limit
                    clearable
                  >
                  </el-input>
                  <div style="margin: 20px 0;"></div>
                  <el-input
                    type="textarea"
                    placeholder="请输入评价"
                    v-model="evaluate"
                    maxlength="50"
                    show-word-limit
                  >
                  </el-input>
                </div>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="enrollScore()">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10,20,50,100]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="usergetdata.count">
    </el-pagination>
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

.flex-right{
  margin-right:30px
}

.el-textarea__inner{
  height: 140px;
}
</style>

<script>

  export default {
    data () {
      return {
          multipleSelection: [],
          usergetdata:[],
          departdata:{
            department_name:{}
          },
          department_id:'',
        dialogFormVisible: false,//对话框遮罩层是否开启
        formLabelWidth: '120px',//对话框大小
        userinformation:{
          department:'',
          department2:''
        },//用户个人信息
        score:'',//打分
        evaluate:'',//评价
        currentPage:4,//页
        pageSize:'',//每页的条数
        page:'',//选择页数
        judge:false//判断全部还是分类
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
         // return res;
          switch(res){
            case '0':
              return '未填写'
              break;
            case '1':
              return '技术组'
              break;
            case '2':
              return '设计组'
              break;
            case '3':
              return '事务组'
              break;
            case '4':
              return '企划组'
              break;
            case '5':
              return '外宣组'
              break;
            case '6':
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
        this.axios.post('/users/mark',{
          page:this.page,
          pageSize:this.pageSize
        }).then((res)=>{
          this.usergetdata=res.data.result;
          //console.log(res);
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
      //选择各个部门报名的信息
      selectdiffdepart(){
        this.axios.post('/users/markdepart',{
            department:this.department_id,
            page:this.page,
            pageSize:this.pageSize
        }).then((res)=>{
          this.usergetdata=res.data.result;
          this.judge=true;
          //console.log(res);
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
      //面试评价和打分提交
      enrollScore(){
        var id=document.querySelector('#userId').innerHTML;
        this.axios.post('/users/enrollScore',{
          score:this.score,
          evaluate:this.evaluate,
          id:id
        }).then((res)=>{
          if(res.data.status=='0'){
            this.dialogFormVisible = false;
            this.enrollAll();
          }
        }).catch((response)=>{
          console.log(response);
        })
      },
      //面试延迟
      enrollLoading(event){
        this.$confirm('是否延迟该同学的面试?','警告',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          this.axios.post('/users/loading',{
            id:event
          }).then((res)=>{
            this.$message({
              type:'success',
              message:res.data.msg
            });
            this.enrollAll();
          }).catch((response)=>{
            console.log(response);
          })
        }).catch(()=>{
          this.$message({
            type:'info',
            message:'已取消延迟面试'
          })
        })
      },
      //转部门
      userAdjust(event){
        this.$confirm('是否将此同学转至第二志愿面试?','警告',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          this.axios.post('/users/adjust',{
            id:event
          }).then((res)=>{
            this.$message({
              type:'success',
              message:res.data.msg
            });
            this.enrollAll();
          }).catch((response)=>{
            console.log(response);
          })
        }).catch(()=>{
          this.$message({
            type:'info',
            message:'已取消调剂面试'
          })
        })
      },
      //分页
      handleSizeChange(val) {
        this.pageSize=val;
       // console.log(`每页 ${val} 条`);
       if(this.judge){
         this.selectdiffdepart();
       }else{
        this.enrollAll();
       }
      },
      handleCurrentChange(val) {
        this.page=val-1;
       // console.log(`当前页: ${val}`);
       if(this.judge){
         this.selectdiffdepart();
       }else{
         this.enrollAll();
       }
      },
    },

    watch: {
    }

  }

</script>