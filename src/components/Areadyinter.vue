<template>
  <div>
    <el-table ref="multipleTable" :data="usergetdata.list" tooltip-effect="dark" style="width: 100%" stripe border
      height="600px" @selection-change="handleSelectionChange">
      <el-table-column type="index" :index="indexMethod">
      </el-table-column>
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="姓名" width="80">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="性别" width="60">
        <template slot-scope="scope">{{ scope.row.sex }}</template>
      </el-table-column>
      <el-table-column label="专业" width="120">
        <template slot-scope="scope">{{ scope.row.major }}</template>
      </el-table-column>
      <el-table-column label="班级" width="90">
        <template slot-scope="scope">{{ scope.row.class }}</template>
      </el-table-column>
      <el-table-column label="校区" width="80">
        <template slot-scope="scope">{{ scope.row.campus }}</template>
      </el-table-column>
      <el-table-column label="电话" width="160">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column label="志愿部门" width="100">
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
          <el-select v-model="department_id" placeholder="请选择查看的部门" @change="interdepart()">
            <el-option v-for="item in departdata" :key="item.department_id" :label="item.department_name"
              :value="item.department_id">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom-top">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10,20,50,100]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
        :total="usergetdata.count">
      </el-pagination>
    </div>
    <div class="main-bottom">
      <div class="bottom-left">
        <el-select v-model="value" filterable placeholder="请选择发送签名模板">
          <el-option v-for="item in smsdata" :label="item.SignName" :key="item.id" :value="item.SignName">
          </el-option>
        </el-select>
        <el-select v-model="value1" filterable placeholder="请选择发送短信模板">
          <el-option v-for="item in smsdata" :label="item.describe" :key="item.id" :value="item.TemplateCode">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button @click="toggleSelection()">取消全部</el-button>
        <el-button type="primary" round style='margin-right:100px;margin-top:20px' @click="sendSms()">发送</el-button>
      </div>
      <el-dialog title="请选择" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-alert title="请最终确认所选的短信模板并进行下一步操作" type="warning" :closable="false" style="margin-bottom:10px">
        </el-alert>
        <el-button type="primary" @click="enrollsucess">面试通过</el-button>
        <el-button type="danger" @click="enrollfail">面试未通过</el-button>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<style scoped>
  .bottom-top {
    margin: 0 auto;
  }

  .main-bottom {
    display: flex;
    justify-content: space-between
  }

</style>

<script>
  export default {
    data() {
      return {
        usergetdata: [],
        department_id: '',
        multipleSelection: [],
        departdata: {
          department_name: {}
        }, //部门配置
        currentPage4: 4, //页
        pageSize: '', //每页的条数
        page: '', //选择页数
        judge: false, //判断全部还是分类
        value: '', //签名模板
        value1: '', //短信模板
        smsdata: {}, //短信配置
        phones: '', //选中手机号
        dialogVisible: false, //发送弹窗层
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
      this.getsmscode();
    },

    methods: {
      //选择框值
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //索引排序
      indexMethod(index) {
        return index + 1;
      },
      //获取部门配置
      departmentdata() {
        this.axios.get('/users/departments').then((res) => {
          this.departdata = res.data.result.list;
          // console.log(res);
        }).catch((response) => {
          console.log(response);
        })
      },
      //获取全部信息
      infordata() {
        this.axios.post('/users/ainterview', {
          page: this.page,
          pageSize: this.pageSize
        }).then((res) => {
          this.usergetdata = res.data.result
          //console.log(res);
        }).catch((response) => {
          console.log(response);
        })
      },
      //获取各个部门的信息
      interdepart() {
        this.axios.post('/users/ainterdepart', {
          department: this.department_id,
          page: this.page,
          pageSize: this.pageSize
        }).then((res) => {
          this.usergetdata = res.data.result;
          this.judge = true;
        }).catch((response) => {
          console.log(response);
        })
      },
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
      //分页
      handleSizeChange(val) {
        this.pageSize = val;
        // console.log(`每页 ${val} 条`);
        if (this.judge) {
          this.interdepart();
        } else {
          this.infordata();
        }
      },
      handleCurrentChange(val) {
        this.page = val - 1;
        // console.log(`当前页: ${val}`);
        if (this.judge) {
          this.interdepart();
        } else {
          this.infordata();
        }
      },
      //获取短信配置
      getsmscode() {
        this.axios.get('/admin/SmsConfig').then((res) => {
          this.smsdata = res.data.result.list;
          //console.log(res);
        }).catch((response) => {
          console.log(response);
        })
      },
      //发送弹窗
      sendSms() {
        this.dialogVisible = true
      },
      //发送弹窗关闭
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //面试通过
      enrollsucess() {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection.length == 1) {
            this.phones = this.multipleSelection[i].phone;
          } else {
            let num = this.multipleSelection[i].phone + ',';
            this.phones += num;
          }
        }
        if (!this.value == '') {
          if (!this.value1 == '') {
            if (!this.phones=='') {
              this.axios.post('/users/sendmsgpass', {
                SignName: this.value, //签名模板
                TemplateCode: this.value1, //短信模板
                phones: this.phones //手机号
              }).then((res) => {
                this.$message(res.data.msg);
                this.infordata();
              }).catch((response) => {
                console.log(response);
              })
            } else {
              this.$message('未选择发送短信的手机号')
            }
          } else {
            this.$message('未选中短信模板')
          }
        } else {
          this.$message('未选中签名模板')
        }
      },
      //面试未通过
      enrollfail() {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection.length == 1) {
            this.phones = this.multipleSelection[i].phone;
          } else {
            let num = this.multipleSelection[i].phone + ',';
            this.phones += num;
          }
        }
        if (!this.value == '') {
          if (!this.value1 == '') {
            if (!this.phones=='') {
              this.axios.post('/users/sendmsgnopass', {
                SignName: this.value, //签名模板
                TemplateCode: this.value1, //短信模板
                phones: this.phones //手机号
              }).then((res) => {
                this.$message(res.data.msg);
                this.infordata();
              }).catch((response) => {
                console.log(response);
              })
            } else {
              this.$message('未选择发送短信的手机号')
            }
          } else {
            this.$message('未选中短信模板')
          }
        } else {
          this.$message('未选中签名模板')
        }
      }
    },

    watch: {}

  }

</script>
