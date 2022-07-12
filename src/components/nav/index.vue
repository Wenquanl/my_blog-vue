<template>
  <div>
      <div class="navs" data-aos="fade-down">
<!--          <img src='../../assets/img/home.png' width="50" height="40" class="nav-image" @click="changeStyle('home')"/>-->
          <div class="nav"  style="margin-left: 10%;" :class="{'changeStyle':changeSelectStyle == 'home'}" @click="changeStyle('home')">Home</div>
          <div class="nav"    :class="{'changeStyle':changeSelectStyle == 'code'}"  @click="changeStyle('code')">Label</div>
<!--          <div  class="nav"   :class="{'changeStyle':changeSelectStyle == 'author'}"  @click="changeStyle('author')" >Author </div>-->

          <div class="nav-search"  >
            <i><img class="el-icon-message" src='../../assets/img/searchs.png' @click="changeStyle('search')"></i>
            <i class="el-icon-arrow-down" ref="outlineShow" style="font-size:40px;" @click="showCards" v-show="outlineShow"></i>
              <i class="el-icon-arrow-up" style="font-size:40px;" @click="showCards" v-show="outlineNo"></i>
          </div>
        <div v-if="userid==null">
        <div class="nav"   :class="{'changeStyle':changeSelectStyle == 'login'}"  @click="changeStyle('login')" >Login </div>
        </div>
        <div v-else-if="userid!=null">

          <div class="nav"  style="margin-left: 43%;" :class="{'changeStyle':changeSelectStyle == 'mine'}"  @click="changeStyle('mine')" >{{nickname}} </div>
          <div class="nav"   :class="{'changeStyle':changeSelectStyle == 'edit'}"  @click="changeStyle('edit')" >创作 </div>
          <div class="nav"    @click="logout()" >注销 </div>
        </div>

        <transition name="el-zoom-in-top">
          <div class="show-card" v-show="divContent">
            <h3 class="card-recent"> Labels</h3>
            <div class="small-card">
              <el-row>
                <el-col :span="6" v-for="(item, index) in sorts" :key="index">
                      <p class="card-m" @click="gotoSort(item.sort_name)">{{item.sort_name}}</p>
                </el-col>
              </el-row>
            </div>
          </div>
        </transition>
       </div>
      </div>
</template>

<script>
export default {
  data () {
    return {
      changeSelectStyle: '',
      divContent: false,
      outlineShow: true,
      outlineNo: false,
      articleList: [],
      sorts: [],
      userid: sessionStorage.getItem('userId'),
      imgurl: '../../assets/img/boy.png',
      nickname: sessionStorage.getItem('nickName')
    }
  },
  created () {
    document.addEventListener('click', (e) => {
      if (!this.$refs.outlineShow.contains(e.target)) {
        this.divContent = false
        this.outlineShow = true
        this.outlineNo = false
      }
    })
  },
  mounted () {
  },
  methods: {

    changeStyle (val) {
      this.changeSelectStyle = val
      this.$router.push('/' + val)
    },
    logout () {
      sessionStorage.clear()
      this.$router.push('/login')
    },
    showCards () {
      this.divContent = !this.divContent
      this.outlineShow = !this.outlineShow
      this.outlineNo = !this.outlineNo
      // 出现下拉，加载数据
      if (this.outlineNo === true) {
        this.getListArticle()
        this.getListSort()
      }
    },
    getListArticle (currentPage) {
      this.$fetch('/article/page', {
        page: currentPage
      })
        .then((response) => {
          this.articleList = response.data
          this.articleCount = response.count
        })
    },
    getListSort () {
      this.$fetch('/sort/query1', {
      })
        .then((response) => {
          this.sorts = response.data
          this.articleCount = response.count
        })
    },
    gotoSort (name) {
      this.$router.push(`/labels/${name}`)
    }
  }
}
</script>

<style lang="less" scoped>

// @media screen and (max-width: 3000px) and (min-width: 767px) {
    /* GitHub Cornor */
    .github-corner :hover .octo-arm {
        animation: octocat-wave 560ms ease-in-out;
    }
   .github-corner >svg {
     fill: rgb(0, 0, 0) !important;
     color: rgb(255, 255, 255) !important;
   }
    .github-corner .github-corner:hover .octo-arm {
      animation: none;
    }
    .github-corner .github-corner .octo-arm {
      animation: octocat-wave 560ms ease-in-out;
    }
  // }
  @-moz-keyframes octocat-wave {
    0%, 100% {
      -webkit-transform: rotate(0);
      -moz-transform: rotate(0);
      -ms-transform: rotate(0);
      -o-transform: rotate(0);
      transform: rotate(0);
    }
    20%, 60% {
      -webkit-transform: rotate(-25deg);
      -moz-transform: rotate(-25deg);
      -ms-transform: rotate(-25deg);
      -o-transform: rotate(-25deg);
      transform: rotate(-25deg);
    }
    40%, 80% {
      -webkit-transform: rotate(10deg);
      -moz-transform: rotate(10deg);
      -ms-transform: rotate(10deg);
      -o-transform: rotate(10deg);
      transform: rotate(10deg);
    }
  }
  @-webkit-keyframes octocat-wave {
    0%, 100% {
      -webkit-transform: rotate(0);
      -moz-transform: rotate(0);
      -ms-transform: rotate(0);
      -o-transform: rotate(0);
      transform: rotate(0);
    }
    20%, 60% {
      -webkit-transform: rotate(-25deg);
      -moz-transform: rotate(-25deg);
      -ms-transform: rotate(-25deg);
      -o-transform: rotate(-25deg);
      transform: rotate(-25deg);
    }
    40%, 80% {
      -webkit-transform: rotate(10deg);
      -moz-transform: rotate(10deg);
      -ms-transform: rotate(10deg);
      -o-transform: rotate(10deg);
      transform: rotate(10deg);
    }
  }
  @-o-keyframes octocat-wave {
    0%, 100% {
      -webkit-transform: rotate(0);
      -moz-transform: rotate(0);
      -ms-transform: rotate(0);
      -o-transform: rotate(0);
      transform: rotate(0);
    }
    20%, 60% {
      -webkit-transform: rotate(-25deg);
      -moz-transform: rotate(-25deg);
      -ms-transform: rotate(-25deg);
      -o-transform: rotate(-25deg);
      transform: rotate(-25deg);
    }
    40%, 80% {
      -webkit-transform: rotate(10deg);
      -moz-transform: rotate(10deg);
      -ms-transform: rotate(10deg);
      -o-transform: rotate(10deg);
      transform: rotate(10deg);
    }
  }
  @keyframes octocat-wave {
    0%, 100% {
      -webkit-transform: rotate(0);
      -moz-transform: rotate(0);
      -ms-transform: rotate(0);
      -o-transform: rotate(0);
      transform: rotate(0);
    }
    20%, 60% {
      -webkit-transform: rotate(-25deg);
      -moz-transform: rotate(-25deg);
      -ms-transform: rotate(-25deg);
      -o-transform: rotate(-25deg);
      transform: rotate(-25deg);
  }
  40%, 80% {
    -webkit-transform: rotate(10deg);
    -moz-transform: rotate(10deg);
    -ms-transform: rotate(10deg);
    -o-transform: rotate(10deg);
    transform: rotate(10deg);
  }
}

  /*
  屏幕小于768px的
  */
  @media screen and (max-width:768px) and (min-width: 100px){
     .navs{
      width: 100%;
      height: 80px;
      /* line-height: 80px; */
      background: rgb(254, 254, 254);

      .nav{
      display: none;
      }
      .changeStyle{
        font-weight: bold;
      }
      .nav-image{
        float: left;
        display: inline;
        margin-top: 10px;
        margin-left: 30px;
      }

      .nav-search{
      float: left;
      margin-left:28%;
      margin-top: 23px;
      }
       .el-icon-message{
          margin-left: 70px;
          cursor: pointer;
      }
      .github-corner{
        display: none;
      }
  }
  .show-card{
   width: 100%;
   background-image: url(../../assets/img/tags.jpeg);
   z-index: 100;
   position:absolute;
   margin-top: 100px;
   height:450px ;
   border-top: 0.5px solid rgb(214, 212, 212);
  .card-recent{
    display: none;
    margin-top: 20px;
    margin-right: 65%;
  }
  .small-card{
   display: none;
   width:100%;
   margin: 0 auto;
    .el-col{
    float: left;
    margin-left: 20px;
    width:100px;
    height:100px;
      .nav-show-image{
        width: 100%;
        height:140px;
        object-fit: cover;
        transition: all 0.6s;
        }
      .nav-show-image:hover{
        transform: scale(1.2);
        }
      .card-massges{
        object-fit: cover;
        height: 20px;
        font-size: 15px;
      }
    }
  }
  .nav-tags{
    float: left;
    margin-top: 30px;
    margin-left: 80px;
    color: rgb(228, 236, 218);
    font-size: 150%;
  }
  .tags-div{
    float: right;
    margin-right: 40%;
    margin-top: 80px;
    .tags{
      margin-top: 15px;
      font-size: 20px;
      color: rgb(226, 238, 225);
    }
  }
  }
}

  @media screen and (max-width: 3000px) and (min-width: 767px) {
     .navs{
        width: 100%;
        height: 80px;
        /* line-height: 80px; */
        .nav{
        float:left;
        margin-left: 40px;
        font-size: 18px;
        cursor: pointer;
        margin-top: 30px;
        }
        .changeStyle{
          font-weight: bold;
        }
        .nav-image{
          float: left;
          display: inline;
          margin-top: 10px;
          margin-left: 17%;
        }

        .nav-search{
        float: right;
        margin-left: 15px;
        margin-top: 23px;
        cursor: pointer;
        }
        .el-icon-message{
          margin-right: 100px;
          cursor: pointer;
        }
    }
     .show-card{
   width: 100%;
   height: 400px;
   background: rgb(255, 255, 255);
   z-index: 100;
   position:absolute;
   margin-top: 100px;
   border-top: 0.5px solid rgb(214, 212, 212);
  .card-recent{
    margin-top: 20px;
    margin-right: 65%;
  }
   .small-card{
   width:75%;
   margin: 0 auto;
    .card-blog{
    margin-left: 20px;
    width:200px;
    height:200px;
      .nav-show-image{
        width: 100%;
        height:140px;
        object-fit: cover;
        transition: all 0.6s;
        }
      .nav-show-image:hover{
        transform: scale(1.2);
        }
      .card-massges{
        object-fit: cover;
        height: 20px;
        font-size: 15px;
      }
    }
  }
  .nav-tags{
   margin-top: 30px;
   margin-right: 72%;
  }
   .tags-div{
    margin-left: 200px;
  }
  .tags{
    float:left;
    margin-left:3%;
    font-size: 18px;
    cursor: pointer;
    margin-top: 10px;
    font-weight: bold;
    }
 }
}

</style>
