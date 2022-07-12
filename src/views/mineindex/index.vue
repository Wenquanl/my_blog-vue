<template>
  <div>
    <leftnav></leftnav>
    <router-view></router-view>
  </div>

</template>

<script>
import leftnav from '../../components/leftnav'

export default {
  components: {
    leftnav
  }
}
</script>

<style scoped>

</style>
