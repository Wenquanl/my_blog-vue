<template>
  <div>
    <div class="l-banan">
        <div class="img-content " data-aos="fade-down">
          <h1 class="m-hero-title bigger">{{name}}</h1>
          <p class="m-heading__description">
            {{articleCount}} articles with this tag
          </p>
        </div>
      <div class="l-image">
        <img src="../../assets/img/label.jpg" class="image">
      </div>
      </div>
        <div class="l-content" data-aos="fade-up">
           <card :articleList="articleList"/>
      </div>
      <div class="l-content-foot">
        <el-pagination
          small
          layout="prev, pager, next"
           @current-change="current_change"
            :page-size="8"
          :total='articleCount'>
        </el-pagination>
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
      name: this.$route.params.name,
      articleList: [],
      articleCount: 0
    }
  },
  created () {
    this.getListArticle()
    this.$router.afterEach((to, from, next) => {
      window, scrollTo(0, 0)
    })
  },
  mounted () {

  },
  methods: {
    current_change (currentPage) { // 改变当前页
      this.currentPage = currentPage
      this.getListArticle(currentPage)
    },
    getListArticle (currentPage) {
      this.$fetch('/article/sortpage', {
        sort_name: this.name,
        page: currentPage
      }).then(res => {
        this.articleList = res.data
        this.articleCount = res.count
      })
    }
  }
}
</script>

<style scoped>
  .l-banan{
    width: 100%;
    height: 5%;
    position: relative;
  }
   @media screen and (max-width: 3000px) and (min-width: 767px) {
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

  .m-hero-content{
     color: rgb(218, 216, 216);
  }
.image{
   width: 100%;
   background: rgb(190, 207, 203);
    object-fit: cover;
}
  .l-content-foot{
    font-size: 40px;
    margin-top: 50px;
    height: 120px;
  }
</style>
