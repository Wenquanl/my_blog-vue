<template>
    <div>
      <div class="l-banan">
        <div class="img-content " data-aos="fade-down">
          <h1 class="m-hero-title bigger">Label</h1>
          <p class="m-heading__description">
            {{articleCount}} articles with this label
          </p>
        </div>
        <div class="l-image">
          <img src="../../assets/img/code.jpg" class="image">
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
      articleList: [],
      articleCount: 0,
      url: ''
    }
  },
  created () {
    this.getListArticle()
  },
  mounted () {
  },
  methods: {
    current_change (currentPage) { // 改变当前页
      this.currentPage = currentPage
      this.getListArticle(currentPage)
    },
    getListArticle (currentPage) {
      this.$fetch('/article/page1', {
        page: currentPage
      })
        .then((response) => {
          this.articleList = response.data
          this.articleCount = response.count
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/common.less';
</style>
