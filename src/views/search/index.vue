<template>
  <div>
    <div class="l-banan">
      <div class="img-content" data-aos="fade-down">
        <h1 class="m-hero-title bigger">Search</h1>
        <p class="m-heading__description" style="color:#000000" >
          Search what you want to search
        </p>
      </div>
      <div class="l-image">
        <!--        <img src="" class="image" style="height:500px;">-->
      </div>
    </div>

    <div class="el-card-messages">
      <el-input v-model="article_title" placeholder="搜索">
        <el-button  type="info" slot="append" icon="el-icon-search" id="search" @click="getListArticle(1)"></el-button>
      </el-input>
      <div class="l-content" data-aos="fade-up">
        <card :articleList="articleList"/>
      </div>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>

      <div class="l-content-foot" >
        <el-pagination v-show="isPage"
                       small
                       layout="prev, pager, next"
                       @current-change="current_change"
                       :page-size="8"
                       :total='articleCount'>
        </el-pagination>
      </div>
    </div>

  </div>
</template>
<script>
import Card from '@/components/card'
export default {
  components: {
    Card
  },
  data () {
    return {
      isPage: false,
      articleList: [],
      articleCount: 0,
      article_title: ''
    }
  },
  mounted () {
    // 开启滚动监听
    window.addEventListener('scroll', this.handleScroll)
    this.getListArticle()
  },
  methods: {
    // 滚动监听  滚动触发的效果写在这里
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

      if (scrollTop >= 20) {
        this.getListArticle()
        this.isPage = true
        window.removeEventListener('scroll', this.handleScroll) // 关闭监听
      }
    },
    current_change (currentPage) { // 改变当前页
      this.currentPage = currentPage
      this.getListArticle(this.currentPage)
    },
    getListArticle (currentPage) {
      this.$fetch('/article/find', {
        article_title: this.article_title,
        page: currentPage
      })
        .then((response) => {
          this.articleList = response.data
          this.articleCount = response.count
          // if(response.count===0){
          //   this.$message({
          //     type: 'info',
          //     message: '未找到'
          //   });

          // }
        })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/common.less';

@media screen and (max-width: 2000px) and (min-width: 767px) {
  .m-hero-title{
    text-shadow:
      -1px 1px 0 #ddd,
      -2px 2px 0 #c8c8c8,
      -3px 3px 0 #ccc,
      -4px 4px 0 #b8b8b8,
      -4px 4px 0 #bbb,
      0px 1px 1px rgba(0,0,0,.4),
      0px 2px 2px rgba(0,0,0,.3),
      -1px 3px 3px rgba(0,0,0,.2),
      -1px 5px 5px rgba(0,0,0,.1),
      -2px 8px 8px rgba(0,0,0,.1),
      -2px 13px 13px rgba(0,0,0,.1)
  ;
  }
  .img-content{
    position: absolute;
    left:45%;
    top:38%;
    transform: translate(-45%, -38%);
    color:  #faf9f9;
  }
}
@media screen and (max-width:768px) and (min-width: 100px){

  .img-content{
    position: absolute;
    left:30%;
    top:30%;
    transform: translate(-45%, -45%);
    color:  #faf9f9;
  }
}
#search-box {
  width: 555px;
  height: 300px;
  margin-top: 0px;
  padding-bottom: 20px;
}
.el-input {
  width: 20%;
}
</style>
