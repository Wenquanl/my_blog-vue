<template>

  <el-col :span="21">
    <el-table
      :data="tableData"
      style="width: 70%"
    >

      <el-table-column
        prop="id"
        label="用户编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="用户昵称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系方式"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="电子邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="motto"
        label="个人签名"
        width="180">
      </el-table-column>
      <el-table-column
        width="180">
        <template slot-scope="scope">
          <el-button  type="primary" icon="el-icon-delete" @click="deleteit(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="l-content-foot" >
      <el-pagination v-show="isPage"
                     small
                     layout="prev, pager, next"
                     @current-change="current_change"
                     :page-size="8"
                     :total='userCount'>
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
      userCount: 0,
      formLabelWidth: '120px',
      dialogFormVisible: false
    }
  },
  mounted () {
    this.getListUser(1)
  },
  methods: {
    current_change (currentPage) { // 改变当前页
      this.currentPage = currentPage
      this.getListUser(currentPage)
    },
    getListUser (currentPage) {
      this.$fetch('/user/listpage', {
        page: currentPage,
        role_id: 2
      })
        .then((response) => {
          this.tableData = response.data
          this.userCount = response.data.length
        })
    },
    deleteit (id) {
      this.$fetch('/user/delete', {
        id: id
      })
        .then((response) => {
          if (response.code === 0) {
            this.$message({
              type: 'info',
              message: '成功删除'
            })
            this.$router.go(0)
          } else {
            alert('删除失败', '提示', {
              confirmButtonText: '确定'
            })
          }
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
</style>
