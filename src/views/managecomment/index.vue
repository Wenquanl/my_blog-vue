<template>

  <el-col :span="18">
    <el-input v-model="commentCon" placeholder="搜索" >
      <el-button  type="info" slot="append" icon="el-icon-search" id="search" @click="findComment(1)"></el-button>
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
        prop="comment_con"
        label="评论内容"
        width="180">
      </el-table-column>
      <el-table-column
        prop="comment_time"
        label="评论时间"
        width="180">
      </el-table-column>

      <el-table-column
        width="180">
        <template slot-scope="scope">
          <el-button  type="primary" icon="el-icon-delete" @click="deleteit(scope.row.comment_id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="l-content-foot" >
      <el-pagination v-show="isPage"
                     small
                     layout="prev, pager, next"
                     @current-change="current_change"
                     :page-size="8"
                     :total='commentCount'>
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
      commentCount: 0,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      commentCon: ''
    }
  },
  mounted () {
    this.getListComment()
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex
    },
    current_change (currentPage) { // 改变当前页
      this.currentPage = currentPage
      this.getListComment(currentPage)
    },
    getListComment (currentpage) {
      this.$fetch('/comment/query', {
        page: currentpage
      })
        .then((response) => {
          this.tableData = response.data
          this.commentCount = response.data.length
        })
    },
    getArticleDetail (id) {
      this.$router.push(`/essaydetail/${id}`)
    },
    deleteit (id) {
      this.$fetch('/comment/delete', {
        comment_id: id
      })
        .then((response) => {
          if (response.code === 0) {
            this.$message({
              type: 'info',
              message: '成功删除'
            })
            this.getListComment(this.currentPage)
          } else {
            alert('删除失败', '提示', {
              confirmButtonText: '确定'
            })
          }
        })
    },
    findComment (currentPage) {
      this.$fetch('/comment/querycom', {
        comment_con: this.commentCon,
        page: currentPage
      })
        .then((response) => {
          this.tableData = response.data
          this.commentCount = response.data.length
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
