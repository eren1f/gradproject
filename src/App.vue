<template>
  <div id="app">
    <router-view></router-view>
    
  </div>
  
</template>

<script>
import Login from "./components/Login.vue";

export default {
  name: 'App',
  components: {
    Login
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.content {
  margin-left: 250px;
  padding: 16px;
}
</style>
