<template>
  <div>
    <div class="l-banan">
      <img :src="articleDetail.article_img" class="image">
    </div>
    <div class="e-content"  data-aos="fade-up" v-highlight>
      <div>
        <h1 align='center'  style="font-size:200%;">{{articleDetail.article_title}}</h1>
        <br>
      </div>
<!--      <article v-html="articleDetail.article_content"></article>-->
      <mavon-editor class="markdown"
                    :value="articleDetail.article_content"
                    :subfield = "false"
                    :defaultOpen = "prop.defaultOpen"
                    :toolbarsFlag = "prop.toolbarsFlag"
                    :editable="prop.editable"
                    :scrollStyle="prop.scrollStyle"
      ></mavon-editor>
    </div>
    <div class="e-banan">

      <img src="../../assets/img/message.png" @click="drawer = true" v-if="userid!=null" class="mage">
      <el-drawer
        direction='btt'
        size="80%"
        :visible.sync="drawer"
        :with-header="false">
        <div class="el-drawer-d">
          <el-card class="el-card-d" shadow="always">
            <div class="infinite-list-wrapper" style="overflow:auto;">
              <el-timeline
                infinite-scroll-disabled="disabled">
                <div v-if="allcomments.count==null">
                  <el-timeline-item v-for="(item,index) in allcomments"  :key="index" :timestamp='item.comment_time' placement="top">
                    <el-card class="el-card-m" style="height:120px">
                      <h4>{{item.nickname}}：</h4>

                      <p >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.comment_con}}</p>

                    </el-card>
                  </el-timeline-item>
                </div>
                <div v-else>
                  <el-timeline-item placement="top">
                    <el-card class="el-card-m" style="height:120px">
                      <h4>Lwq：</h4>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 说点什么吧😁</p>
                    </el-card>
                  </el-timeline-item>
                </div>
              </el-timeline>
            </div>
            <div class="el-card-messages">
              <el-input type="textarea" :rows="5" placeholder="输入评论" maxlength="200" v-model="comment"></el-input>
              <el-button type="info" round class="submit-message" @click="submitComment">评论</el-button>
            </div>
          </el-card>
        </div>
      </el-drawer>
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
        subfield: false, // 单双栏模式
        defaultOpen: 'preview', // edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true,
        navigation: true
      }
      return data
    }
  },
  data () {
    return {
      articleDetail: {},
      id: this.$route.params.id,
      userid: sessionStorage.getItem('userId'),
      count: 10,
      loading: false,
      drawer: false,
      comment: '',
      nickname: sessionStorage.getItem('nickName'),
      allcomments: []
    }
  },
  created () {
    this.getArticle()
    this.findComment()
    this.$router.afterEach((to, from, next) => {
      window, scrollTo(0, 0)
    })
  },
  mounted () {
  },

  methods: {
    submitComment () {
      if (this.comment === '' || this.comment.replace(/(^\s*)|(\s*$)/g, '') === '') {
        this.$message('写点啥提交也行呀😉')
        return
      }
      this.$fetch('/comment/add', {
        article_id: this.id,
        id: sessionStorage.getItem('userId'),
        comment_con: this.comment
      })
        .then(res => {
          if (res.code === 0) {
            this.$message('留言成功')
            this.comment = ''
            this.findComment()
          } else if (res.code === 1) {
            this.$message(res.msg + '😉')
          }
        })
    },
    findComment () {
      this.$fetch('/article/findComment', {
        article_id: this.id
      })
        .then(res => {
          this.allcomments = res.data
        })
    },
    mouseover () { // 移进显示
      this.getcontent()
    },
    getcontent () {
      const contents = [
        '你能看到这句话一定是个细心的人呀。😁',
        '不管生活如何，一定要充满希望！😝',
        '年轻就要有年轻的样子。😉',
        '哎呀，来看博客呀，怪不得这么有为。😊',
        '看了文章之后有什么要对大黄子说的吗。😊'
      ]
      const cons = contents[Math.floor((Math.random() * contents.length))]
      this.contente = '我说：“' + cons + '”'
    },
    getArticle () {
      this.$fetch('article/look', {
        article_id: this.id
      })
        .then(res => {
          this.articleDetail = res.data
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
