<template>
<div style="width: 70%; "
        >
  <el-col :span="8">
    <el-card class="box-card"
             shadow="hover">
      <div slot="header" class="clearfix">
        <span>用户总数</span>
      </div>
      <div class="card-massges" >
        <h3 class="card-m" style="height:30px">{{usernum}}</h3>
      </div>
    </el-card>
  </el-col>
  <el-col :span="8">
    <el-card class="box-card"
             shadow="hover">
      <div slot="header" class="clearfix">
        <span>博文总数</span>
      </div>
      <div class="card-massges" >
        <h3 class="card-m" style="height:30px">{{articlenum}}</h3>
      </div>
    </el-card>
  </el-col>
  <el-col :span="8">
    <el-card class="box-card"
             shadow="hover">
      <div slot="header" class="clearfix">
        <span>评论总数</span>
      </div>
      <div class="card-massges" >
        <h3 class="card-m" style="height:30px">{{commentnum}}</h3>
      </div>
    </el-card>
  </el-col>
  <el-col :span="8">
    <el-card class="box-card"
             shadow="hover">
      <div slot="header" class="clearfix">
        <span>标签总数</span>
      </div>
      <div class="card-massges" >
        <h3 class="card-m" style="height:30px">{{sortnum}}</h3>
      </div>
    </el-card>
  </el-col>
</div>

</template>

<script>
export default {
  data () {
    return {
      usernum: '',
      articlenum: '',
      commentnum: '',
      sortnum: ''
    }
  },
  created () {
    this.getuser()
    this.getarticle()
    this.getsort()
    this.getcomment()
  },
  methods: {
    getuser () {
      this.$fetch('/user/count', {
      }).then((response) => {
        this.usernum = response.data
      })
    },
    getarticle () {
      this.$fetch('/article/count', {
      }).then((response) => {
        this.articlenum = response.data
      })
    },
    getcomment () {
      this.$fetch('/comment/count', {
      }).then((response) => {
        this.commentnum = response.data
      })
    },
    getsort () {
      this.$fetch('/sort/count', {
      }).then((response) => {
        this.sortnum = response.data
      })
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}

</style>
