<template>
  <div>
      <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      style="width: 100%"
      stripe
      height="600"
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
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="性别"
        width="60">
      </el-table-column>
      <el-table-column
        prop="address"
        label="专业"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="name"
        label="班级"
        width="90">
      </el-table-column>
      <el-table-column
        prop="name"
        label="校区"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="电话"
        width="160">
      </el-table-column>
      <el-table-column
        prop="name"
        label="志愿部门一"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="志愿部门二"
        width="120">
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
.el-table__header-wrapper {
    height: 120px;
}
</style>

<script>

  export default {
    data () {
      return {
tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

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
      }
    },

    watch: {}

  }

</script>