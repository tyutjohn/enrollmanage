<!--
 * @Author: johnwang
 * @since: 2019-10-18 08:22:34
 * @lastTime: 2019-10-26 21:05:32
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 -->
<template>
  <div class="install-body">
    <el-card v-if="box1" class="box-card">
      <span>程序安装协议</span>
      <el-divider></el-divider>
      <ul style="overflow:auto;list-style:none;height:250px" class="infinite-list">
        <p>协议声明</p>
        <li>1、本系统由tyutjohn制作开发，本系统专为太理易班设计制作，不属于开源系统</li>
        <li>2、鉴于网站的安全和隐私性，本系统不做公开发布，请勿将本系统用于商业牟利<包括但不限于企业网站，经营性网站，以营利为目的或实现盈利的网站</li> <li>
            3、如果您不是该系统的内部开发人员或未拥有该系统的权限，请勿将该系统用于除太理易班管理以外的任何用途，否则我们将会追究您的法律责任。</li>
        <li>4、一旦您勾选《仔细阅读并同意》我方默许您拥有使用但不得向外传播的权限，您若违反以上任何一条条例，我们有权禁止你对该程序的使用，情节严重则需承担法律责任</li>
      </ul>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-select v-model="value" clearable placeholder="阅读方式和是否同意">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" @click="FirstButton()">下一步</el-button>
      </el-row>
    </el-card>
    <el-card v-if="box2" class="box-card" style="position:relative">
      <span>程序安装</span>
      <el-divider></el-divider>
      <div style="width:300px;margin-top:50px">
        <el-form ref="form" :model="BoxForm2" label-width="120px" size="mini">
          <el-form-item label="管理员用户名:">
            <el-input v-model="BoxForm2.dataBaseUser" style="margin-left:40px" placeholder="请输入后台管理员用户名"></el-input>
          </el-form-item>
          <el-form-item label="管理员用户密码:">
            <el-input v-model="BoxForm2.dataBasePassword" style="margin-left:40px" placeholder="请输入后台管理员密码"></el-input>
          </el-form-item>
          <el-form-item label="管理员联系电话:">
            <el-input v-model="BoxForm2.dataBasePhone" style="margin-left:40px" placeholder="请输入后台管理员联系方式"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" style="position: absolute;right:30px;bottom:30px" @click="SecondButton()">下一步
      </el-button>
    </el-card>
  </div>
</template>
<style>
  .box-card {
    width: 60%;
    height: 400px;
    margin: 0 auto;
    margin-top: 200px;
  }

  .infinite-list p {
    font-size: 20px;
    font-weight: 700;
    text-align: left;
  }

  .infinite-list li {
    font-size: 16px;
    text-align: left;
    margin: 10px auto;
  }

</style>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '1',
          label: '仔细阅读并同意'
        }, {
          value: '2',
          label: '未仔细阅读并同意'
        }, {
          value: '3',
          label: '从未阅读但同意'
        }, {
          value: '4',
          label: '未阅读也不同意'
        }],
        value: '',
        //调试
        box1: true,
        box2: false,
        //调试
        BoxForm2: {
          dataBaseUser: "",
          dataBasePassword: "",
          dataBasePhone: ""
        },
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
      FirstButton() {
        if (this.value == 1) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          setTimeout(() => {
            loading.close();
            this.box1 = false;
            this.box2 = true;
          }, 1000);
        } else {
          this.$message.error("您未同意程序安装协议，安装进程结束");
        }
      },
      SecondButton() {
        if (this.BoxForm2.dataBaseUser && this.BoxForm2.dataBasePassword) {
          this.axios.post('/admin/InitSupAdmin', {
            name: this.BoxForm2.dataBaseUser,
            pwd: this.BoxForm2.dataBasePassword,
            phone: this.BoxForm2.dataBasePhone
          }).then((res) => {
            if (res.data.status == "0") {
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              setTimeout(() => {
                const loading = this.$loading({
                  lock: true,
                  text: '初始化程序成功,正在跳转',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0,0,0,0.7)'
                });
                setTimeout(()=>{
                this.$router.replace('/Loginconsole');
                loading.close();
                },1000);
              }, 2000);
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          this.$message.error("您未填写管理员用户名或密码");
        }
      },
    },

    watch: {}

  }

</script>
