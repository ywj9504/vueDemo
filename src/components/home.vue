<template>
  <div class="fillcontain">
  <head-top></head-top>

  <h1>{{ msg }}</h1>
  </div>
</template>

<script>
    import HeadTop from "./headTop";
    export default {
        name: "home",
      components: {HeadTop},
      data(){
          return{
            msg:'首页'
          }
      },
    }
</script>

<style scoped>
  h1 {
    font-weight: normal;
  }
</style>
