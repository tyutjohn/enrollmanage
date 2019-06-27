<template>
  <div>
    <el-container class="container">
      <el-form label-width="80px" :model="formLabelAlign">
        <el-form-item label="用户名">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input placeholder="请输入密码" v-model="formLabelAlign.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" class="login" @click="login">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </div>
</template>
<style>
  .container {
    width: 60%;
    margin: 0 auto;
    margin-top: 200px;
  }

  .login {
    width: 100%;
  }

</style>
<script>
  import Cookies from 'js-cookie';
  import { Loading } from 'element-ui';

  export default {
    data() {
      return {
        formLabelAlign: {
          name: '',
          password: '',
        }
      }
    },
    components: {},
    computed: {}

    ,

    beforeMount() {}

    ,

    mounted() {}

    ,

    methods: {
        login(){
            this.axios.post('/admin/login',{
                name:this.formLabelAlign.name,
                pwd:this.formLabelAlign.password
            }).then((res)=>{
                let username=res.data.result.userName;
                window.localStorage.setItem('token',res.data.result.token);
                window.localStorage.setItem('username',username);
                this.$store.dispatch('SaveLoginIfno',username);
                if(res.data.status=='0'){
                  Loading.service({ fullscreen: true,text:'登陆成功，正在跳转' });
                  setTimeout(() => {
                    Cookies.set('username',username,{expires:this._expires * (3*60 * 60 * 1000)});//设置接口有效期为1天
                    this.$router.replace('/');
                    Loading.service().close();
                  }, 1000);
                }else{
                  this.$message(res.data.msg);
                }
            }).catch((result)=>{
                console.log(result);
            })
        },
    },

    watch: {}

  }

</script>
