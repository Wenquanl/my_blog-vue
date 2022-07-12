<template>

  <el-col :span="18">

    <el-button  type="primary"  icon="el-icon-edit"  @click="handleAdd()">添加</el-button>
    <el-table
      :data="tableData"
      style="width: 70%"
    >
      <el-table-column
        prop="sort_id"
        label="标签编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sort_name"
        label="标签名称"
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
          <el-button  type="primary" icon="el-icon-delete" @click="deleteit(scope.row.sort_id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="adddialogFormVisible"
               :close-on-click-modal="false"
               class="add-form"
               title="添加"
               style="width: 50%;top:20%;left:27%;">
      <el-form :model="addForm">
        <el-form-item label="标签名称：" :label-width="formLabelWidth">
          <el-input v-model="addForm.sort_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="addSort(addForm.sort_name)">确定</el-button>
        <el-button @click="adddialogFormVisible = false">取消</el-button>
      </span>
      </template>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible"
               :close-on-click-modal="false"
               class="edit-form"
               title="编辑"
               style="width: 50%;top:20%;left:27%;">
      <el-form :model="editForm">
        <el-form-item label="标签名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.sort_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="updateit(editForm.sort_name,editForm.sort_id)">确定</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </span>
      </template>
    </el-dialog>
    <div class="l-content-foot" >
      <el-pagination v-show="isPage"
                     small
                     layout="prev, pager, next"
                     @current-change="current_change"
                     :page-size="8"
                     :total='sortCount'>
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
      sortCount: 0,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      adddialogFormVisible: false,
      addForm: {
        sort_name: ''
      },
      editForm: {
        sort_name: ''
      }
    }
  },
  mounted () {
    this.getListSort()
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex
    },
    current_change (currentPage) { // 改变当前页
      this.currentPage = currentPage
      this.getListSort(currentPage)
    },
    getListSort (currentpage) {
      this.$fetch('/sort/query', {
        page: currentpage
      })
        .then((response) => {
          this.tableData = response.data
          this.sortCount = 10
        })
    },

    deleteit (id) {
      this.$fetch('/sort/delete', {
        sort_id: id
      })
        .then((response) => {
          if (response.code === 0) {
            this.$message({
              type: 'info',
              message: '成功删除'
            })
            this.getListSort(this.currentPage)
          } else {
            alert('删除失败', '提示', {
              confirmButtonText: '确定'
            })
          }
        })
    },

    addSort () {
      this.$fetch('/sort/add', {
        sort_name: this.addForm.sort_name
      }).then((response) => {
        this.adddialogFormVisible = false
        this.getListSort(this.currentPage)
      })
    },
    handleAdd: function () {
      this.adddialogFormVisible = true// dialog对话窗口打开
    },
    handleEdit: function (row) {
      this.dialogFormVisible = true// dialog对话窗口打开
      this.editForm = Object.assign({}, row)// 将数据传入dialog页面
    },
    updateit (sort_name, sort_id) {
      this.$fetch('/sort/update', {
        sort_name: sort_name,
        sort_id: sort_id
      })
        .then((response) => {
          if (response.code === 0) {
            this.$message({
              type: 'info',
              message: '成功修改'
            })
            this.dialogFormVisible = false
            this.getListSort(this.currentPage)
          } else {
            alert('修改失败', '提示', {
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
#search-box {
  width: 555px;
  height: 300px;
  margin-top: 0px;
  padding-bottom: 20px;
}

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
