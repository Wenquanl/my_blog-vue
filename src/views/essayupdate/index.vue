<template>
  <div>
    <div class="l-banan">
      <img :src="articleDetail.article_img" class="image">
    </div>
    <el-page-header @back="goBack" style="color: black;line-height: 60px;margin-left: 20px; size: 80px" >
    </el-page-header>
    <div class="e-content"  data-aos="fade-up" v-highlight>
      <el-button type="primary" style="width: 10%;font-size: large" @click="handleSubmit">提交</el-button>
      <div>
        <el-input align='center'  style="font-size:200%;" v-model="articleDetail.article_title" :value="articleDetail.article_title"  clearable ></el-input>
      </div>

      <mavon-editor class="markdown"
                    :value="articleDetail.article_content"
                    v-model="articleDetail.article_content"
                    :subfield = "prop.subfield"
                    :defaultOpen = "prop.defaultOpen"
                    :toolbarsFlag = "prop.toolbarsFlag"
                    :editable="prop.editable"
                    :scrollStyle="prop.scrollStyle"
      ></mavon-editor>
    </div>

  </div>

</template>

<script>
import Card from '@/components/card'
import 'mavon-editor/dist/css/index.css'
var mavonEditor = require('mavon-editor')
export default {
  components: {
    Card,
    'mavon-editor': mavonEditor.mavonEditor
  },
  computed: {
    prop () {
      const data = {
        subfield: true, // 单双栏模式
        defaultOpen: 'preview', // edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: true,
        toolbarsFlag: true,
        scrollStyle: true
      }
      return data
    }
  },
  data () {
    return {
      articleDetail: {},
      id: this.$route.params.id,
      vipid: '',
      count: 10,
      loading: false,

      nickname: sessionStorage.getItem('nickName')

    }
  },
  created () {
    this.getArticle()

    this.$router.afterEach((to, from, next) => {
      window, scrollTo(0, 0)
    })
  },
  mounted () {
  },

  methods: {
    goBack () {
      this.$router.go(-1)
    },
    handleSubmit () {
      this.$fetch('/article/update', {
        article_title: this.articleDetail.article_title,
        article_content: this.articleDetail.article_content,
        sort_id: this.articleDetail.sort_id,
        article_img: '',
        article_id: sessionStorage.getItem('articleId')
      }).then((response) => {
        if (response.code === 0) {
          this.$message({
            type: 'info',
            message: '成功提交'
          })
          this.$router.push('/myblog')
        } else {
          alert('发布失败', '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    getArticle () {
      this.$fetch('article/look', {
        article_id: this.id
      })
        .then(res => {
          this.articleDetail = res.data
          sessionStorage.setItem('articleId', this.articleDetail.article_id)
        })
    }
  }
}
</script>

<style scoped>
.l-banan{
  margin: 0 auto;
  width: 100%;
  height: 500px;
}
.image{
  width: 100%;
  height:100%;
  object-fit: cover;
}
@media screen and (max-width: 3000px) and (min-width: 767px) {
  .e-content{
    width: 50%;
    height: 70%;
    margin:0 auto;
    text-align:left;
    margin-top: 50px;
  }
}
/*
屏幕小于768px的
*/
@media screen and (max-width:768px) and (min-width: 100px){
  .e-content{
    width: 90%;
    height: 70%;
    margin:0 auto;
    text-align:left;
    margin-top: 50px;
  }
}

.e-banan{
  background: rgb(235, 245, 247);
  width: 100%;
  height: 200px;
  margin-top: 40px;
}
.essay-card{
  margin-bottom: 80px;
}
.boy-content{
  margin-top: 30px;
}

.mage{
  margin-left: 30px;
  cursor: pointer;
}
.el-drawer-d{
  width: 100%;
  height: 100%;
  background: rgb(235, 245, 247);
  text-align: left;
}
.el-card-messages{
  margin-top: 10px;
}
.infinite-list-wrapper{
  width: 100%;
  height: 330px;
}
.submit-message{
  width: 100%;
  background: rgb(235, 245, 247);
  color: cadetblue;
  letter-spacing:20px;
}
@media screen and (max-width: 3000px) and (min-width: 767px) {
  .el-card-d{
    float: left;
    margin-top: 20px;
    margin-left: 10%;
    width: 80%;
    height: 90%;
  }

}
/*
屏幕小于768px的
*/
@media screen and (max-width:768px) and (min-width: 100px){
  .el-card-d{

    width: 100%;
    height: 100%;
  }
}
/*
  变更  v-html 中的 img样式
 */
article >>> img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
