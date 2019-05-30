<template>
  <div>
      <el-table
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
    </el-table>
    <!-- <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination> -->
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>
<style>
.el-table--border {
    padding-left: 20px;
    padding-top:20px;
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
        }
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
      this.departmentdata();
    },

    methods: {
       toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      indexMethod(index) {
        return index+1;
      },
      infordata(){
        this.axios.get('/users/').then((res)=>{
          this.usergetdata=res.data.result.list
        console.log(res);
        }).catch((response)=>{
          console.log(response);
        })
      },
      departmentdata(){
        this.axios.get('/users/departments').then((res)=>{
          this.departdata=res.data.result.list;
          //console.log(res);
        }).catch((response)=>{
          console.log(response);
        })
      }
    },

    watch: {}

  }

</script>