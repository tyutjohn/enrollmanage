<template>
  <div>
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="form">
        <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-select v-model="form.sex" placeholder="请选择自己的性别">
             <el-option label="男" value="男"></el-option>
             <el-option label="女" value="女"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="班级"
        prop='class'
        :rules="[
            { required: true, message: '年龄不能为空'},
            {type:'number',message:'班级必须为数字'}
        ]">
            <el-input v-model.number="form.class" autocomplete="off" type="class" ></el-input>
        </el-form-item>
        <el-form-item label="专业">
            <el-input v-model="form.major"></el-input>
        </el-form-item>
        <el-form-item label="电话">
            <el-input v-model="form.phone" type="number"></el-input>
        </el-form-item>
        <el-form-item label="个人介绍">
            <el-input v-model="form.introduce" type="textarea" :rows="2"
  placeholder="请输入个人介绍"></el-input>
        </el-form-item>
        <el-form-item label="学号">
            <el-input v-model="form.schoolNum" type="number"></el-input>
        </el-form-item>
        <el-form-item label="部门">
            <el-select v-model="form.department">
                <el-option
                v-for="item in department.list"
                :key='item.department_id'
                :label="item.department_name"
                :value="item.department_id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="第二志愿">
            <el-select v-model="form.department2">
                <el-option
                v-for="item in department.list"
                :key='item.department_id'
                :label="item.department_name"
                :value="item.department_id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="校区">
            <el-select v-model="form.campus" placeholder="请选择所在校区">
             <el-option label="明向" value="明向"></el-option>
             <el-option label="迎西" value="迎西"></el-option>
             <el-option label="虎峪" value="虎峪"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" round v-if="GetCode" @click="getEcode()">获取验证码</el-button>
            <div v-else v-html="Ecode" @click="getEcode()"></div>
        </el-form-item>
        <el-form-item label="验证码">
            <el-input v-model="form.ecode" placeholder="请输入验证码"></el-input>
        </el-form-item>
         <el-button type="primary" round @click="join()">报名</el-button>
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
            sex:'',
            class:'',
            major:'',
            phone:'',
            schoolNum:'',
            introduce:'',
            department:'',
            department2:'',
            campus:'',
            ecode:''
            },
        GetCode:true,//判断是否获取
        Ecode:'',//验证码图片
        department:{
            department_name:'',
            department_id:''
        }
      };
    },

    components: {},

    computed: {},

    created(){
        this.getdepartinit();
    },

    beforeMount() {},

    mounted() {},

    methods: {
        //获取验证码
        getEcode(){
            if(!this.form.phone==''){
                this.axios.post('/users/Rcode',{
                    phone:this.form.phone
                }).then((res)=>{
                    this.Ecode=res.data;
                    this.GetCode=false;
                }).catch((response)=>{
                    console.log(response)
                })
            }else{
                this.$message('请输入手机号');
            }
        },
        //获取部门信息
        getdepartinit(){
            this.axios.get('/users/departments').then((res)=>{
                if(res.data.status=='0'){
                    this.department=res.data.result;
                }else{
                    this.$message('网络异常');
                }
            }).catch((response)=>{
                console.log(response);
            })
        },
        //报名
        join(){
            if(!this.form.phone==''){
                if(!this.form.ecode==''){
                    this.axios.post('/users/CheckRcode',{
                        phone:this.form.phone
                    }).then((res)=>{
                        if(this.form.ecode==res.data){
                            this.axios.post('/users/apply',{
                                name:this.form.name,
                                sex:this.form.sex,
                                class:this.form.class,
                                major:this.form.major,
                                phone:this.form.phone,
                                schoolNum:this.form.schoolNum,
                                introduce:this.form.introduce,
                                department:this.form.department,
                                department2:this.form.department2,
                                campus:this.form.campus
                            }).then((res)=>{
                                if(res.data.status=='0'){
                                    this.$message(res.data.msg)
                                }else{
                                    this.$message(res.data.msg)
                                }
                            }).catch((response)=>{
                                console.log(response);
                            })
                        }else{
                            this.$message('验证码填写错误，请重新填写');
                            this.getEcode();
                        }
                    }).catch((response)=>{
                        console.log(response);
                    })
                }else{
                    this.$message('请输入验证码');
                }
            }else{
                this.$message('请输入手机号');
            }
        }
    },

    watch: {}

  }

</script>