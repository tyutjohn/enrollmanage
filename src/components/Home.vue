<template>
  <div>
    <el-container>
        <el-header>Header</el-header>
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
                    <el-menu-item index="1-1">通知面试</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item index="1-2">面试打分</el-menu-item>
                    </el-menu-item-group>     
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>录取管理控制台</span>
                    </template>
                    <el-menu-item-group>
                    <el-menu-item index="2-1">已面试</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item index="2-2">已录取</el-menu-item>
                    </el-menu-item-group>     
                </el-submenu>       
                </el-menu>
            </el-aside>
            <el-main>
              <!-- <nav-inform></nav-inform> -->
              <router-view></router-view>
            </el-main>
        </el-container>
        <el-footer class="footer">footer</el-footer>
    </el-container>
  </div>
</template>
<style>
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 30px;
  }
  
  .el-main {
    padding: 0;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height:700px;
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

  export default {
    data () {
      return {
        
      };
    },

    components: {
      NavInform
    },

    computed: {},

    beforeMount() {},

    mounted() {
      
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
          case '2-1':
            this.$router.push('/Areadyinter');
            break;
          case '2-2':
            this.$router.push('/Areadyenroll');
            break;
        }
      }
    },

    watch: {}

  }

</script>