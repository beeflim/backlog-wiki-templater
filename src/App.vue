<template>
  <div id="app">
    <div class="main-logo">
      <img src="./assets/backlog.png">
    </div>
    <router-view/>
  </div>

</template>

<script>

  export default {
    name: 'App'
  }
</script>


<style scoped lang="scss">
  @import "styles/init.css";
  @import "styles/material-icons.min.css";

  .main-logo{
    text-align:center;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;

    margin-top: 60px;

  }

</style>
