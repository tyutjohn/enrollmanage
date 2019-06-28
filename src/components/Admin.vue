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
    <el-tab-pane label="用户添加" name="second">用户添加</el-tab-pane>
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
      return {
        activeName: 'first',
        admindata:{//用户组信息
          rank:''//权限信息
        },
        departdata:{
         department_name:'' 
        }//部门配置
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
    },

    watch: {}

  }

</script>