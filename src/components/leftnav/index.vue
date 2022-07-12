<template>

  <el-col :span="3">
    <h5>个人中心</h5>
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
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>我的</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="mine">我的信息</el-menu-item>
          <el-menu-item index="myblog">我的博客</el-menu-item>
          <el-menu-item index="mycomment">我的评论</el-menu-item>
          <el-menu-item index="updatepwd">密码修改</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
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
