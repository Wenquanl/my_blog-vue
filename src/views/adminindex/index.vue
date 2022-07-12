<template>
  <div>
    <adminnav></adminnav>
    <router-view></router-view>
  </div>
</template>

<script>
import adminnav from '../../components/adminnav'

export default {
  components: {
    adminnav
  }
}
</script>

<style scoped>

</style>
