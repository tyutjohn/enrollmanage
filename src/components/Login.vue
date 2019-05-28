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
                console.log(res);
                let cookie=document.cookie.indexOf('userId');
                if(cookie>-1){
                    this.$router.replace('/')
                }else{
                    console.log('no router');
                }
            }).catch((result)=>{
                console.log(result);
            })
        }
    },

    watch: {}

  }

</script>
