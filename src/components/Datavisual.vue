<template>
  <div>
    <div style="display:inline-block;margin-top:50px"><v-chart :options='department'/></div>
    <div style="display:inline-block;margin-top:50px"><v-chart :options="campus"/></div>
  </div>
</template>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
  import ECharts from 'vue-echarts'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/tooltip'
  export default {
    data () {
      return {
        campus:{
          title : {
              text: '各校区报名总人数',
              x:'center'
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: ['迎西','明向','虎峪']
          },
          series : [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:[],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
        },
        department:{
          title : {
              text: '各部门报名人数',
              x:'center'
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: ['技术组','设计组','采编组','外宣组','事务组','企划组']
          },
          series : [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:[],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
        }
      }
    },

    components: {
      'v-chart': ECharts
    },

    computed: {},

    beforeMount() {
      this.getCampus();
      this.getDepartment()
    },

    mounted() {},

    methods: {
      //获取各个校区报名人数
      getCampus(){
        this.axios.get('/users/CampusNum').then((res)=>{
          if(res.data.status=='0'){
            this.campus.series[0].data=res.data.result
          }
        })
      },
      //获取各个部门的报名人数
      getDepartment(){
        this.axios.get('/users/DepartNum').then((res)=>{
          if(res.data.status=='0'){
            this.department.series[0].data=res.data.result
          }
        })
      }
    },

    watch: {}

  }

</script>