<template>
  <div id="app">
    

    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
   data() {
      return {
        value1: true,
        value2: true
      }
    },
  created() {
    this.$http.get(this.$api.logout).then(()=>console.log('退出登陆'))
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
