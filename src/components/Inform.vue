<template>
  <div>
      <el-table
      ref="multipleTable"
      :data="usergetdata.list"
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
                v-for="item in departdata"
                :key="item.department_id"
                :label="item.department_name"
                :value="item.department_id">
              </el-option>
            </el-select>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom-top">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10,20,50,100]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="usergetdata.count">
        </el-pagination>
      </div>
    <div class="main-bottom">
      <div class="bottom-left">
        <el-select v-model="value" filterable placeholder="请选择发送签名模板">
          <el-option
            v-for="item in smsdata"
            :label="item.SignName"
            :key="item.id"
            :value="item.SignName">
          </el-option>
        </el-select>
        <el-select v-model="value1" filterable placeholder="请选择发送短信模板">
          <el-option
            v-for="item in smsdata"
            :label="item.describe"
            :key="item.id"
            :value="item.TemplateCode">
          </el-option>
        </el-select>
        <el-date-picker
          v-model="value2"
          type="datetime"
          placeholder="选择日期时间">
         </el-date-picker>
      </div>
      <div>
        <el-button @click="toggleSelection()">取消全部</el-button>
        <el-button 
        type="primary" 
        round 
        style='margin-right:100px;margin-top:20px' 
        @click="sendSms()">发送</el-button>
      </div>
    </div>
  </div>
</template>
<style>
.el-table--border {
    padding-left: 20px;
    padding-top:20px;
    padding-bottom:20px;
}
.main-bottom{
  display:flex;
  justify-content: space-between ;
}

.bottom-top{
  margin:0 auto;
}

.bottom-left{
  margin:20px 10px
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
        value: '',//签名模板
        value1: '',//短信模板
        value2:'',//时间
        smsdata:{},//短信配置
        phones:'',//选中手机号
        department_id:'',
        currentPage4:4,//页
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
      }
    },

    beforeMount() {
      this.departmentdata();
    },

    mounted() {
      this.infordata();
      this.getsmscode();
    },

    methods: {
      //取消全选
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      //选择框值
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //索引排序
      indexMethod(index) {
        return index+1;
      },
      //获取全部信息
      infordata(){
        this.axios.post('/users/',{
          page:this.page,
          pageSize:this.pageSize
        }).then((res)=>{
          this.usergetdata=res.data.result
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
      //获取短信配置
      getsmscode(){
        this.axios.get('/admin/SmsConfig').then((res)=>{
          this.smsdata=res.data.result.list;
          //console.log(res);
        }).catch((response)=>{
          console.log(response);
        })
      },
      //发送短信
      sendSms(){
        for(let i=0;i<this.multipleSelection.length;i++){
          if(this.multipleSelection.length==1){
            this.phones=this.multipleSelection[i].phone;
          }else{
            let num=this.multipleSelection[i].phone+',';
            this.phones+=num;
          }     
        }
        let time=this.value2.getFullYear()+'年'+(this.value2.getMonth()+1)+'月'+this.value2.getDate()+'日'+this.value2.getHours()+'时'+this.value2.getMinutes()+'分';
        this.axios.post('/users/sendmsg',{
          SignName:this.value,//签名模板
          TemplateCode:this.value1,//短信模板
          time:time,//时间
          phones:this.phones//手机号
        }).then((res)=>{
          if(res.data.status=='0'){
            this.$message('短信发送成功');
            this.infordata();
          }else{
            this.$message(res.data.msg);
          }
        },(error)=>{
          console.log(error);
        }).catch((response)=>{
          console.log(response);
        })
      },
      //选择各个部门报名的信息
      selectdiffdepart(){
        this.axios.post('/users/classify',{
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
      //分页
      handleSizeChange(val) {
        this.pageSize=val;
       // console.log(`每页 ${val} 条`);
       if(this.judge){
         this.selectdiffdepart();
       }else{
        this.infordata();
       }
      },
      handleCurrentChange(val) {
        this.page=val-1;
       // console.log(`当前页: ${val}`);
       if(this.judge){
         this.selectdiffdepart();
       }else{
         this.infordata();
       }
      }
    },

    watch: {}

  }

</script>