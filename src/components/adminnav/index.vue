<template>
  <el-col :span="3">
    <h5>后台管理</h5>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      router="router">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>首页</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="home">Home</el-menu-item>
          <el-menu-item index="code">Label</el-menu-item>
          <el-menu-item index="edit">Edit</el-menu-item>
          <el-menu-item @click="logout">Logout</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="admin">
        <i class="el-icon-menu"></i>
        <span slot="title">数据一览</span>
      </el-menu-item>
      <el-menu-item index="manageuser">
        <i class="el-icon-menu"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="manageblog">
        <i class="el-icon-menu"></i>
        <span slot="title">博文管理</span>
      </el-menu-item>
      <el-menu-item index="managecomment">
        <i class="el-icon-menu"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="managesort">
        <i class="el-icon-menu"></i>
        <span slot="title">标签管理</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    logout () {
      sessionStorage.clear()
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>

</style>
