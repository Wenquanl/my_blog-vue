<template>
  <el-col :span="7">
      <el-form class="user-account-key" ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="原密码" prop="lastpwd">
          <el-input type="password" placeholder="请输入原密码" v-model="form.lastpwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="userpwd">
          <el-input type="password" placeholder="请设置新密码" v-model="form.userpwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="userpwd1">
          <el-input type="password" placeholder="请确认新密码" v-model="form.userpwd1"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">修改</el-button>
          <el-button @click="">重置</el-button>
        </el-form-item>
      </el-form>

  </el-col>
</template>

<script>
export default {
  data () {
    const validateNewPassword = (rule, value, callback) => {
      if (value === this.form.lastpwd) {
        callback(new Error('新密码不能与原密码相同!'))
      } else {
        callback()
      }
    }
    // 此处即表单发送之前验证  验证新密码与再次确认
    const validateNewPassword2 = (rule, value, callback) => {
      if (value !== this.form.userpwd) {
        callback(new Error('与新密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        lastpwd: '',
        userpwd: '',
        userpwd1: ''
      },
      rules: {
        // 验证规则
        lastpwd: [{
          required: true,
          message: '请输入原密码',
          trigger: 'blur'
        }],
        userpwd: [{
          required: true,
          message: '请设置新密码',
          trigger: 'blur'
        }],
        userpwd1: [{
          required: true,
          message: '请确认新密码',
          trigger: 'blur'
        }, {
          validator: validateNewPassword2,
          trigger: 'blur'
        }]
      }
    }
  },

  methods: {
    change_back () {
      this.$router.push('/login')
    },
    // 提交事件
    onSubmit (formName) {
      this.$fetch('/user/updatepwd', {
        id: sessionStorage.getItem('userId'),
        userpwd: this.form.userpwd,
        nickname: ''
      })
        .then((response) => {
          if (response.code === 0) {
            this.$message({
              type: 'info',
              message: '成功修改'
            })
            sessionStorage.clear()
            this.$router.push('/login')
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
.change-back {
  position: absolute;
  top: 24%;
  left: 0%;
}

.change-content {
  position: absolute;
  top: 40%;
  left: 40%;
}

.change-zhanghao {
  position: relative;
  margin-top: 51px;
  margin-left: 15px;
}

.zhanghao {
  margin-bottom: 0;
}

.user-account-key {
  width: 88%;
}
</style>
