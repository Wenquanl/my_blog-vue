<template>

  <el-card class="box-card"
           shadow="hover">
    <div slot="header" class="clearfix">
      <span>个人信息</span>
      <el-button type="primary" icon="el-icon-edit" @click="handleEdit()" ></el-button>
    </div>
    <div class="card-massges" @click="">
      <h3 class="card-m" style="height:30px">昵称：{{user.nickname}}</h3>
      <p class="card-m" style="height:60px">身份：{{user.role_name}}</p>
      <p class="card-m" style="height:60px">联系方式：{{user.phone}}</p>
      <p class="card-m" style="height:60px">电子邮箱：{{user.email}}</p>
      <p class="card-m" style="height:60px">签名：{{user.motto}}</p>
    </div>
    <el-dialog :visible.sync="dialogFormVisible"
               :close-on-click-modal="false"
               class="edit-form"
               title="编辑"
               style="width: 50%;top:20%;left:27%;">
      <el-form :model="user" >
        <el-form-item label="昵称" :label-width="'120px'" >
          <el-input v-model="user.nickname" autocomplete="off"  :value="user.nickname"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="'120px'" >
          <el-input v-model="user.phone" autocomplete="off" :value="user.phone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" :label-width="'120px'" >
          <el-input v-model="user.email" autocomplete="off" :value="user.email"></el-input>
        </el-form-item>
        <el-form-item label="签名" :label-width="'120px'">
          <el-input v-model="user.motto" autocomplete="off" :value="user.motto"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="updateit(user.id,user.nickname,user.phone,user.email,user.motto)">确定</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // user:{},
      user: {
        id: '',
        nickname: '',
        phone: '',
        email: '',
        motto: ''
      },
      dialogFormVisible: false
    }
  },
  created () {
    this.getuser()
  },
  methods: {
    getuser () {
      this.$fetch('/user/finduser', {
        id: sessionStorage.getItem('userId')
      }).then((response) => {
        this.user = response.data
      })
    },
    handleEdit: function () {
      this.dialogFormVisible = true// dialog对话窗口打开
    },
    updateit (id, nickname, phone, email, motto) {
      this.$fetch('/user/update', {
        id: id,
        nickname: nickname,
        phone: phone,
        email: email,
        motto: motto
      })
        .then((response) => {
          if (response.code === 0) {
            this.$message({
              type: 'info',
              message: '成功修改'
            })
            this.dialogFormVisible = false
            this.getuser()
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
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px
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
