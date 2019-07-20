<template>
  <div>
    <el-container>
        <el-header>
          <div class="container">
            <el-row type="flex" justify="space-between">
              <el-col :span="4">
                <img src="../assets/logo.png" style="height:50px;display:inline-block">
                <div style="display:inline-block"><p class="p">易班发展中心</p><p class="p">--www.yiban.cn--</p></div>
              </el-col>
              <el-row><p class="header-p">招新报名管理系统</p></el-row>
              <el-col :span="2">
                <el-popover
                  placement="bottom"
                  width="120"
                  trigger="click">
                  <el-form :label-position="labelPosition" label-width="80px" :model="AdminUserInfor">
                    <div class="el-user-col">
                      <i class="el-icon-user-solid" style="margin-right:6px"></i>
                      {{AdminUserInfor.name}}
                    </div>
                    <div class="el-user-col">
                      <i class="el-icon-star-on" style="margin-right:6px"></i>        
                      {{rankname(AdminUserInfor.rank)}}
                    </div>        
                      <el-button type="primary" @click="logout()" round style="width:150px">退出登陆</el-button>
                  </el-form>
                  <img src="../assets/avter.png" width="60px" height="60px" slot="reference">
                </el-popover>
              </el-col>
            </el-row>
          </div>
        </el-header>
        <el-container>
            <el-aside width="210px">
                <el-menu
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                default-active='1-1'
                @select="handleSelect"
                active-text-color="#ffd04b">
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>面试管理控制台</span>
                    </template>
                    <el-menu-item-group>
                    <el-menu-item index="1-1" v-if="normalconsole">通知面试</el-menu-item>
                    <el-menu-item index="1-2">面试打分</el-menu-item>
                    <el-menu-item index="1-3">面试报名统计</el-menu-item>
                    </el-menu-item-group>     
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>录取管理控制台</span>
                    </template>
                    <el-menu-item-group>
                    <el-menu-item index="2-1" v-if="normalconsole">已面试</el-menu-item>
                    <el-menu-item index="2-2">已录取</el-menu-item>
                    <el-menu-item index="2-3">未录取</el-menu-item>
                    </el-menu-item-group>     
                </el-submenu>   
                <el-submenu index="3" v-if="adminconsole">
                  <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>管理员控制台</span>
                  </template>
                  <el-menu-item index="3-1">管理员</el-menu-item>
                  <el-menu-item index="3-2">系统配置设置</el-menu-item>
                </el-submenu>    
                </el-menu>
            </el-aside>
            <el-main>
              <router-view></router-view>
            </el-main>
        </el-container>
        <el-footer class="footer">
          <div class="container">
            © 2019-2020 Powered By tyutjohn
          </div>
        </el-footer>
    </el-container>
  </div>
</template>
<style>
.p{
  margin: 0;
  padding:0;
  color:#fff;
  letter-spacing: 2px
}

.header-p{
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 4px;
    margin: 0;
    padding: 0;
    margin-top: 10px;
}

.el-user-col{
    margin-bottom: 10px;
    font-size: 16px;
    margin-left: 10px;
}
.el-header, .el-footer {
    background-color: rgb(84, 92, 100);
    color: #333;
    text-align: center;
    line-height: 30px;
  }
  
  .el-main {
    padding: 0;
    background-color: #fffbfb5c;
    color: #333;
    text-align: center;
  }

  .container{
    width:96%;
    margin:0 auto;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-submenu__title{
    padding-left:10px !important;
  }

  .el-menu-vertical-demo{
    width: 200px;
    min-height: 700px;
  }

  .footer{
      position: absolute;;
      bottom:0;
      height: 30px !important;
      width:100%;
      background:rgba(71, 71, 71, 0.555)(51, 51, 51, 0.719);
      color:#E9EEF3;
      text-align:center;
  }
</style>

<script>
  import NavInform from './../components/Inform.vue';
import { Loading } from 'element-ui';

  export default {
    data () {
      return {
        adminconsole:false,//超级管理员
        normalconsole:false,//普通管理员
        AdminUserInfor:{//管理员登陆信息
          name:'',
          rank:''
        },
        labelPosition:'right',//表单排序方向
      };
    },

    components: {
      NavInform
    },

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
    },

    beforeMount() {},

    mounted() {
      this.adminrank();
      this.adminOne();
    },

    methods: {
        handleOpen(key, keyPath) {
        
      },
      handleClose(key, keyPath) {
        
      },
      handleSelect(key,keyPath){
        switch(key){
          case '1-1':
            this.$router.push('/Inform');
            break;
          case '1-2':
            this.$router.push('/Viewscore');
            break;
          case '1-3':
            this.$router.push('/Datavisual');
            break;
          case '2-1':
            this.$router.push('/Areadyinter');
            break;
          case '2-2':
            this.$router.push('/Areadyenroll');
            break;
          case '2-3':
            this.$router.push('/Nopass');
            break;
          case '3-1':
            this.$router.push('/Admin');
            break;
          case '3-2':
            this.$router.push('/Adminsetting');
            break;
        }
      },
      //获得用户权限
      adminrank(){
        let username=window.localStorage.getItem('username');
        this.axios.post('/admin/adminone',{
          username:username
        }).then((res)=>{
          if(res.data.result.list.rank=='0'){
             this.adminconsole=true;//超级管理员
             this.normalconsole=true;
          }else if(res.data.result.list.rank=='1'){
            this.normalconsole=true;//普通管理员
          }
        }).catch((response)=>{
          console.log(response);
        })
      },
      //获取登陆管理员信息
      adminOne(){
        let username=window.localStorage.getItem('username');
        this.axios.post('/admin/adminone',{
          username:username
        }).then((res)=>{
          if(res.data.status=='0'){
            this.AdminUserInfor.name=res.data.result.list.name;
            this.AdminUserInfor.rank=res.data.result.list.rank;
          }else{
            this.$message('登陆信息已过期');
            localStorage.clear();
            this.$router.replace('/Loginconsole');
          }
        }).catch((response)=>{
          console.log(response);
        })
      },
      //退出管理员登陆
      logout(){
        let username=window.localStorage.getItem('username');
        localStorage.clear();
        this.axios.post('/admin/logout',{
          username:username
        }).then((res)=>{
          if(res.data.status=='0'){
            Loading.service({fullscreen:true,text:'退出成功,正在跳转'});
            setTimeout(()=>{
              this.$router.replace('/Loginconsole');
              Loading.service().close();
            },1000);
          }else{
            this.$message('退出失败');
          }
        }).catch((response)=>{
          console.log(response);
        })
      }
    },

    watch: {}

  }

</script>