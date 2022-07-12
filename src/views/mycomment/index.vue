<template>
  <div class="com-t">
  <el-col :span="18">
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
            width="80">
            <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)" ></el-button>
            </template>
          </el-table-column>
        <el-table-column
          width="180">
          <template slot-scope="scope">
          <el-button  type="primary" icon="el-icon-delete" @click="deleteit(scope.row.comment_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

    <el-dialog :visible.sync="dialogFormVisible"
               :close-on-click-modal="false"
               class="edit-form"
               title="编辑"
               style="width: 50%;top:20%;left:27%;">
      <el-form :model="editForm">
        <el-form-item label="评论内容" :label-width="formLabelWidth">
          <el-input v-model="editForm.comment_con" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="updateit(editForm.comment_con,editForm.comment_id)">确定</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </span>
      </template>
    </el-dialog>

  </el-col>
  </div>
</template>

<script >
export default {
  inject: ['reload'], // 引入页面同步刷新的依赖
  data () {
    return {
      isPage: false,
      tableData: [],
      commentCount: 0,
      editForm: {
        comment_con: '',
        comment_id: ''
      },
      formLabelWidth: '120px',
      dialogFormVisible: false
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
    getListComment () {
      this.$fetch('/comment/findbyid', {
        id: sessionStorage.getItem('userId')
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
            this.getListComment()
          } else {
            alert('删除失败', '提示', {
              confirmButtonText: '确定'
            })
          }
        })
    },
    updateit (comment_con, comment_id) {
      this.$fetch('/comment/update', {
        comment_con: comment_con,
        comment_id: comment_id
      })
        .then((response) => {
          if (response.code === 0) {
            // this.reload();
            this.getListComment()
            this.$message({
              type: 'info',
              message: '成功修改'
            })
            this.dialogFormVisible = false
            // this.$router.go(0)
          } else {
            alert('修改失败', '提示', {
              confirmButtonText: '确定'
            })
          }
        })
    },
    handleEdit: function (row) {
      this.dialogFormVisible = true// dialog对话窗口打开
      this.editForm = Object.assign({}, row)// 将数据传入dialog页面
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
.com-t{
  width: 100%;
  margin: 0 auto;

}
</style>
