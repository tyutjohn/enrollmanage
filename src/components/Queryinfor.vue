<template>
  <div>
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="form">
    <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="手机号">
        <el-input v-model="form.phone"></el-input>
    </el-form-item>
     <el-button type="primary" round @click="find()">查询</el-button>
     <div v-if="show">{{result}}</div>
    </el-form>
  </div>
</template>
<style>

</style>

<script>

  export default {
    data () {
      return {
        labelPosition: 'right',
        form:{
            name:'',
            phone:''
        },
        result:'',
        show:false
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        find(){
            this.result='';//初始化
            this.show=true;
            this.axios.post('/users/userfind',{
                name:this.form.name,
                phone:this.form.phone
            }).then((res)=>{
                if(res.data.status=='0'){
                    this.result=res.data.msg
                }else{
                    this.$message(res.data.msg);
                }
            }).catch((response)=>{
                console.log(response)
            })
        }
    },

    watch: {}

  }

</script>