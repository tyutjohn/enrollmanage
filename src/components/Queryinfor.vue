<template>
  <div>
    <div class="header">
        <div class="left">
        <img src="../assets/querylogo.png" >
        </div>
        <div class="middle"><p style="margin-top:12px;font-weight:700;letter-spacing:2px;">录取查询</p></div>
        <div class="right" ></div>
      </div>
      <div class="components" :style="note">
          <div class="information">
              <div class="oh">
                <p>姓名</p>
                <el-input prefix-icon="el-icon-user-solid" v-model="form.name"></el-input>
                <p>电话</p>
                <el-input prefix-icon="el-icon-phone" v-model="form.phone"> </el-input>                
              </div>
          </div>
          <div class="popup">
              <div v-if="show1">
                  <p style="color:#aaaaaa;padding-top:150px;">太原理工大学·易班发展中心</p>
              </div>
              <div v-if="show2" style="background:rgba(255,255,255,0.4);height:200px">
                  <h2 style="opacity:1;padding-top:10px">{{result}}</h2>
                  <p style="color:#aaaaaa;padding-top:80px;">太原理工大学·易班发展中心</p>
              </div>
          </div>
          <div class="button">
              <el-button type="primary" style="width:94%" @click="find()" :disabled="disabled">查询</el-button>
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
.header .left{
    float:left;
    height: 50px;
    width: 33%;
}
.header .left img{
    padding-top: 8px;
    height: 36px;
    float: left;
    padding-left: 4px;
}
.header .middle{
    float:left;
    height: 50px;
    width: 33%;
    text-align: center;
    font-size: 20px;
}
.header .right{
    float: left;
    width: 33%;
}
.components{
    height: 760px;
    padding-top: 1px;
    background: no-repeat center;
    background-size: 100%,100%;
}
.components .information .oh{
    padding: 100px 10px;
}
.components .information .oh p{
    font-size: 18px;
    float: left;
    padding:0;
    padding-left: 6px;
    color: #aaaaaa;
    margin:0;
}
.components .popup{
    height: 280px;
}
</style>

<script>

  export default {
    data () {
      return {
        form:{
            name:'',
            phone:''
        },
        result:'',
        note:{
            backgroundImage:"url(" + require("../assets/bgd.jpg")+")"
          },
          show1:true,
          show2:false,
          disabled:true
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {
        this.CheckTime();
    },

    methods: {
        find(){
            this.result='';//初始化
            this.axios.post('/users/userfind',{
                name:this.form.name,
                phone:this.form.phone
            }).then((res)=>{
                if(res.data.status=='0'){
                  this.show1=false,
                  this.show2=true
                  this.result=res.data.msg
                }else{
                    this.$message(res.data.msg);
                }
            }).catch((response)=>{
                console.log(response)
            })
        },
        //监测查询时间是否开放
        CheckTime(){
            let time=new Date().getTime();
            this.axios.post('/admin/QueryTime',{
                time:time
            }).then((res)=>{
                if(res.data.status=='0'){
                    this.disabled=false;
                }else{
                    this.$message(res.data.msg);
                    this.show1=false
                    this.show2=true;
                    this.result=res.data.msg;
                }
            }).catch((response)=>{
                console.log(response);
            })
        }
    },

    watch: {}

  }

</script>