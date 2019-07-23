<template>
  <div>
    <div class="header">
        <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6"><img src="../assets/enroll/logo.png" style="height:36px;padding-left:10px"></el-col>
            <el-col :span="6"><p class="header-p">报名入口</p></el-col>
            <el-col :span="6"></el-col>
        </el-row>
    </div>
    <div class="components">
        <div class="information" :style="note1" v-show="step1">
              <div class="oh">
                <p>姓名</p>
                <el-input prefix-icon="el-icon-user-solid" v-model="form.name"> </el-input>
                <p>电话</p>
                <el-input prefix-icon="el-icon-phone" v-model="form.phone"> </el-input> 
                <p>性别</p>
                <el-select v-model="form.sex" placeholder="请选择自己的性别">
                    <i slot="prefix" class="el-input__icon el-icon-s-custom"></i>
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>             
              </div>
        </div>
        <div class="information" :style="note2" v-show="step2">
              <div class="oh">
                <el-form label-width="60px" :model="form">
                <el-form-item label="校区">
                    <el-select v-model="form.campus" placeholder="请选择所在校区">
                        <el-option label="明向" value="明向"></el-option>
                        <el-option label="迎西" value="迎西"></el-option>
                        <el-option label="虎峪" value="虎峪"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="专业">
                    <el-input v-model="form.major"></el-input>
                </el-form-item>
                <el-form-item label="班级"
                prop='class'
                :rules="[
                    { required: true, message: '年龄不能为空'},
                    {type:'number',message:'班级必须为数字'}
                ]">
                    <el-input v-model.number="form.class" autocomplete="off" type="class" ></el-input>
                </el-form-item>
                <el-form-item label="学号">
                    <el-input v-model="form.schoolNum" type="number"></el-input>
                </el-form-item>
                </el-form>
              </div>
        </div>
        <div class="information" :style="note3" v-show="step3">
              <div class="oh">
                  <el-input v-model="form.introduce" type="textarea" :rows="9"
                    placeholder="请输入个人介绍" maxlength="100" show-word-limit></el-input>
                  <el-select v-model="form.department" placeholder="第一志愿" style="padding-top:70px">
                    <el-option
                    v-for="item in department.list"
                    :key='item.department_id'
                    :label="item.department_name"
                    :value="item.department_id">
                    </el-option>
                  </el-select>
                  <el-select v-model="form.department2" placeholder="第二志愿(可选)" style="padding-top:30px">
                    <el-option
                    v-for="item in department.list"
                    :key='item.department_id'
                    :label="item.department_name"
                    :value="item.department_id">
                    </el-option>
                  </el-select>
                  <div style="padding-top:30px;">
                    <el-input v-model="form.ecode" placeholder="请输入验证码" style="display:inline-block;width:60%"></el-input>          
                    <div v-html="Ecode" @click="getEcode()" v-if="GetCode" style="display:inline-block;width:38%"></div>
                  </div>
              </div>
        </div>

        <div class="progress">
            <el-steps :active="active" finish-status="success" align-center>
                <el-step title="1st" description="第一步"></el-step>
                <el-step title="2ed" description="第二步"></el-step>
                <el-step title="3th" description="第三步"></el-step>
            </el-steps>
            
        </div>
        <div class="button">
              <el-button type="primary" style="width:94%" @click="next1" v-show="step1" :disabled="disabled">下 一 步</el-button>
              <el-button type="primary" style="width:94%;margin:0;" @click="next2" v-show="step2" :disabled="disabled">下 一 步</el-button>
              <el-button type="primary" style="width:94%;margin:0;" @click="join" v-show="step3" :disabled="disabled">报 名</el-button>
        </div>

    </div>

  </div>
</template>
<style>
.header{
    height:50px;
    width: 100%;
    background-color:#fbf5f5;   
}

.header-p{
    margin-top: 8px;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 2px;
    color: #053c6bcf;
}

.components{
    height: 760px;
    padding-top: 1px;

}
.components .information{
    height:600px;
    background: no-repeat center;
    background-size: 100%,100%;
}
.components .information .oh{
    padding: 50px 10px;
}
.components .information .oh p{
    font-size: 18px;
    float: left;
    margin:0;
    padding:0;
    padding-left: 6px;
    color: #aaaaaa;
}
.el-select{
    width: 100%;
}
.components .progress{
    height:100px;
}
.components .button{
    height: 100px;
}
</style>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {
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
        GetCode:false,//判断验证码是否获取
        Ecode:'',//验证码图片
        department:{
            department_name:'',
            department_id:''
        },
        disabled:true,
        note1:{
            backgroundImage:"url(" + require("../assets/enroll/bgd1.png")+")"
          },
          note2:{
            backgroundImage:"url(" + require("../assets/enroll/bgd2.png")+")"
          },
          note3:{
            backgroundImage:"url(" + require("../assets/enroll/bgd3.png")+")"
          },
        active: 0,        
        step1:true, 
        step2:false,
        step3:false
      };
    },

    components: {},

    computed: {},

    created(){
        this.getdepartinit();
    },

    beforeMount() {
        this.CheckTime();
    },

    mounted() {},

    methods: {
        //获取验证码
        getEcode(){
            if(!this.form.phone==''){
                this.axios.post('/users/Rcode',{
                    phone:this.form.phone
                }).then((res)=>{
                    this.Ecode=res.data;
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
                                    this.disabled=true;
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
        },
        //监测报名时间
        CheckTime(){
            let time=new Date().getTime();
            this.axios.post('/admin/ReportTime',{
                time:time
            }).then((res)=>{
                if(res.data.status=='0'){
                    this.disabled=false;
                }else{
                    this.$notify.error({
                    title: '错误',
                    message: res.data.msg,
                    duration: 0
                    });
                }
            }).catch((response)=>{
                console.log(response);
            })
        },
        next1() {
            if (this.active++ > 2) this.active = 0;
            this.step1=false;
            this.step2=true;
        },
        next2() {
            if (this.active++ > 2) this.active = 0;
            this.step2=false;
            this.step3=true;
            this.GetCode=true;
            this.getEcode();
        }
    },

    watch: {}

  }

</script>