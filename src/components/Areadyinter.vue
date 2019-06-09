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
        width="80">
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
        width="80">
        <template slot-scope="scope">{{ scope.row.campus }}</template>
      </el-table-column>
      <el-table-column
        label="电话"
        width="160">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column
        label="志愿部门"
        width="100">
        <template slot-scope="scope">{{ getdepartname(scope.row.department) }}</template>
      </el-table-column>
      <el-table-column
        label="分数"
        width="80">
        <template slot-scope="scope">{{ scope.row.score }}</template>
      </el-table-column>
      <el-table-column
        label="面试官意见"
        width="140">
        <template slot-scope="scope">{{scope.row.evaluate}}</template>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
            <el-select v-model="department_id" placeholder="请选择查看的部门" @change="interdepart()">
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
  </div>
</template>
<style>

</style>

<script>

  export default {
    data () {
      return {
        usergetdata:[],
        department_id:'',
        multipleSelection: [],
        departdata:{
          department_name:{}
        },//部门配置

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
      //获取部门配置
      departmentdata(){
        this.axios.get('/users/departments').then((res)=>{
          this.departdata=res.data.result.list;
         // console.log(res);
        }).catch((response)=>{
          console.log(response);
        })
      },
       //获取全部信息
      infordata(){
        this.axios.get('/users/ainterview').then((res)=>{
          this.usergetdata=res.data.result.list
          //console.log(res);
        }).catch((response)=>{
          console.log(response);
        })
      },
      //获取各个部门的信息
      interdepart(){
        this.axios.post('/users/ainterdepart',{
          department:this.department_id
        }).then((res)=>{
          this.usergetdata=res.data.result.list;
          console.log(res)
        }).catch((response)=>{
          console.log(response);
        })
      }
    },

    watch: {}

  }

</script>