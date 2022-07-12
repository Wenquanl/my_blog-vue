<template>
  <div class="card-t">
      <el-row>
        <el-col v-for="(item, index) in articleList" :key="index">
            <el-card :body-style="{ padding: '0px'}" class="card-blog" shadow="hover">
                <img
                v-lazy="item.article_img" :key="item.article_img"
                  class="image"  @click="getArticleDetail(item.article_id)"  >
                    <div class="card-label" style="padding: 10px;">
                        <p class="m-card-tag" @click="gotoSort(item.sort_name)">{{item.sort_name}}</p>
                    </div>
                    <div class="card-massges" @click="getArticleDetail(item.article_id)">
                    <h3 class="card-m" style="height:30px">{{item.article_title}}</h3>
                      <p class="card-m" style="height:60px">{{item.article_content}}</p>
                    </div>
                    <hr class="l-hr" style="height:0.5px;border:none;border-top:0.5px solid rgb(218, 216, 216) ;width:100%;" />
                        <p class="l-time">{{(item.release_time)}}</p>
            </el-card>
        </el-col>
    </el-row>
    <div class="el-top">
     <el-backtop :bottom="250" :right="100" :visibility-height="400">
        <i class="el-icon-thumb"></i>
     </el-backtop>
    </div>
  </div>
</template>

<script>
// import { before_time } from '@/utils/common'
export default {
  data () {
    return {
    }
  },
  props: {
    articleList: {
      type: Array,
      default: () => {
        return []
      }
    }

  },

  methods: {
    // before_time,
    getArticleDetail (id) {
      this.$router.push(`/essaydetail/${id}`)
    },
    gotoSort (name) {
      this.$router.push(`/labels/${name}`)
    }
  }
}
</script>

<style scoped>
.card-t{
  width: 80%;
  margin: 0 auto;

}
.el-row{
   /**
  卡片居中
  */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.el-col{
    width: 350px;
    height: 500px;
    padding: 20px;
    margin-top: 40px;
    border-radius:10px;
}
  /*
  阴影+鼠标划过浮动
 */
  .card-blog{
     border-radius:10px;
  }
  .card-blog:hover{
    border-radius:10px;
    transform: translate(0,-7px);transition-delay: 0s !important;
  }
.card-m{
    width:100%;
    height: 100px;
    overflow: hidden;/* 超出的文本隐藏 */
    text-overflow: ellipsis; /* 溢出用省略号显示 */
}

  .image {
    width: 100%;
    height: 250px;
    display: block;
    object-fit: cover;
    cursor: pointer;
  }
  .card-massges{
    height: 120px;
    text-align: center;
    width: 80%;
    margin:0 auto;
    background: #ffffff;

    cursor: pointer;
  }
  .card-label{
    margin-right: 260px;
  }
  .m-card-tag{
    cursor: pointer;
    margin: 0 auto;
    border-radius: 15px;
    background: #2ec4b6;
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    padding: 5px 10px;
    color: rgb(250, 250, 250);
  }
    .l-time{
   margin-right: 55%;
   color: rgb(124, 120, 120) ;
  }
   @media screen and (max-width: 3000px) and (min-width: 1000px) {

   }
   @media screen and (max-width:1000px) and (min-width: 100px){
   .el-top{
      visibility: hidden;
     }
   }

</style>
