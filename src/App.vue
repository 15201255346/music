<template>
  <div id="app">

    <m-header></m-header>
    <tab></tab>

    <keep-alive>
        <router-view/>
    </keep-alive>

  </div>
</template>

<script>

    import MHeader from "components/header/m-header"
    import Tab from "components/tab/tab"
    export default {
      name: 'App',
      components : {
        MHeader,
        Tab
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  ccmport "common/stylus/variable.styl"
  #app
    color : $color-theme
</style>
