<template>
  <div>
    <nav-bar></nav-bar>
    <router-view></router-view>
    <my-footer></my-footer>
  </div>

</template>

<script>
import NavBar from '../../components/nav'
import MyFooter from '../../components/footer'

export default {
  components: {
    NavBar,
    MyFooter
  }

}
</script>

<style>
body{
  /*background: radial-gradient(200% 100% at bottom center,#f7f7b6,#e96f92,#1b2947);*/
  background: white;
  background-attachment: fixed;
}
</style>
