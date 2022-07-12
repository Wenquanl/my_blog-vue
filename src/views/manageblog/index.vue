<template>

  <el-col :span="21">
    <el-input v-model="articleTitle" placeholder="搜索" >
      <el-button  type="info" slot="append" icon="el-icon-search" id="search" @click="findArticle(1)"></el-button>
    </el-input>
    <el-table
      :data="tableData"
      style="width: 70%"
    >
      <el-table-column
        prop="article_id"
        label="博文编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="article_title"
        label="博文标题"
        width="180">
        <template slot-scope="scope">
          <div>
            <i href="javascript:;" @click="getArticleDetail(scope.row.article_id)">{{scope.row.article_title}}</i>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="博文作者"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sort_name"
        label="博文标签"
        width="180">
      </el-table-column>
      <el-table-column
        prop="release_time"
        label="发布时间"
        width="180">
      </el-table-column>
      <el-table-column
        width="180">
        <template slot-scope="scope">
          <el-button  type="primary" icon="el-icon-delete" @click="deleteit(scope.row.article_id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="l-content-foot" >
      <el-pagination v-show="isPage"
                     small
                     layout="prev, pager, next"
                     @current-change="current_change"
                     :page-size="8"
                     :total='articleCount'>
      </el-pagination>
    </div>
  </el-col>

</template>

<script >
export default {
  data () {
    return {
      isPage: true,
      tableData: [],
      articleCount: 0,
      formLabelWidth: '120px',
      articleTitle: '',
      articleCount1: 0
    }
  },
  mounted () {
    this.getListArticle(1)
  },
  methods: {
    getArticleDetail (id) {
      this.$router.push(`/essaydetail/${id}`)
    },
    current_change (currentPage) { // 改变当前页
      this.currentPage = currentPage
      this.getListArticle(currentPage)
    },
    getListArticle (currentPage) {
      this.$fetch('/article/page', {
        page: currentPage
      })
        .then((response) => {
          this.tableData = response.data
          this.articleCount = response.count
        })
    },
    deleteit (id) {
      this.$fetch('/article/delete', {
        article_id: id
      })
        .then((response) => {
          if (response.code === 0) {
            this.$message({
              type: 'info',
              message: '成功删除'
            })
            this.getListArticle(this.currentPage)
          } else {
            alert('删除失败', '提示', {
              confirmButtonText: '确定'
            })
          }
        })
    },
    findArticle (currentPage) {
      this.$fetch('/article/find', {
        article_title: this.articleTitle,
        page: currentPage
      })
        .then((response) => {
          this.tableData = response.data
          // this.articleCount1=response.count()
        })
    }

  }
}
</script>
<style scoped>
.el-dialog{
  display: flex;
  flex-direction: column;
  margin:0 !important;
  position:absolute;
  top:50%;
  left:50%;
  width: 50%;
  transform:translate(-50%,-50%);
  /*height:600px;*/
  max-height:calc(100% - 30px);
  max-width:calc(100% - 30px);
}
.el-dialog .el-dialog__body{
  flex:1;
  overflow: auto;
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
