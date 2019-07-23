<template>
  <div>
    <div class="bg" :style="bg"></div>
    <div class="text">真抱歉，您访问的页面走丢了</div>
  </div>
</template>
<style>
.bg{
  height: 24rem;
  background: no-repeat center;
  background-size: 100%;
  margin: 0 auto;
  width: 80%;
}
.text{
  color: #666465;
  font-size: 2em;
  text-align: center;
}
</style>

<script>

  export default {
    data () {
      return {
        bg: {
            backgroundImage: "url(" + require("../assets/404.png") + ")",
        },
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>