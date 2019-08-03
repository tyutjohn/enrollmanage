<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="usergetdata.list"
      tooltip-effect="dark"
      style="width: 100%"
      stripe
      border
      height="600px">
      <el-table-column
      type="index"
      :index="indexMethod">
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
        label="部门"
        width="100">
        <template slot-scope="scope">{{ getdepartname(scope.row.department) }}</template>
      </el-table-column>
      <el-table-column label="分数" width="80">
        <template slot-scope="scope">{{ scope.row.score }}</template>
      </el-table-column>
      <el-table-column label="面试官意见" width="140">
        <template slot-scope="scope">{{scope.row.evaluate}}</template>
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
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10,20,50,100]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
        :total="usergetdata.count">
    </el-pagination>
  </div>
</template>
<style>

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
        department_id: '',
        currentPage4: 4, //页
        pageSize: '', //每页的条数
        page: '', //选择页数
        judge: false, //判断全部还是分类
      };
    },

    components: {},

    computed: {
     getdepartname(){
        return function(res){
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
      this.infordata();
    },

    methods: {
      //索引排序
      indexMethod(index) {
        return index+1;
      },
      //获取全部信息
      infordata(){
        this.axios.post('/users/admitall',{
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
      //选择各个部门已录取的信息
      selectdiffdepart(){
        this.axios.post('/users/admitdepart',{
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
        this.pageSize = val;
        // console.log(`每页 ${val} 条`);
        if (this.judge) {
          this.selectdiffdepart();
        } else {
          this.infordata();
        }
      },
      handleCurrentChange(val) {
        this.page = val - 1;
        // console.log(`当前页: ${val}`);
        if (this.judge) {
          this.selectdiffdepart();
        } else {
          this.infordata();
        }
      },
    },

    watch: {}

  }

</script>