<template>

      <div id="editor">
        <el-page-header @back="goBack" style="color: black;line-height: 60px;margin-left: 20px;" >
        </el-page-header>
        <div>
          标题：
          <el-input v-model="article_title" style="width: 20%" placeholder="请输入"></el-input>
          图片链接：
          <el-input v-model="article_img" style="width: 20%"
                    placeholder="请前往此链接：https://imgtu.com/"></el-input>
        </div>

        <mavon-editor
          v-model="article_content"
          style="height: 100%;
                 "
        ></mavon-editor>

        <el-select v-model="sort_id" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.sort_id"
            :label="item.sort_name"
            :value="item.sort_id">
          </el-option>
        </el-select>
        <el-button type="primary" style="width: 10%;font-size: large" @click="handleSubmit">提交</el-button>
      </div>

</template>
<script>
import 'mavon-editor/dist/css/index.css'
var loadin
var mavonEditor = require('mavon-editor')
export default {
  name: 'editor',
  data () {
    return {
      nickname: sessionStorage.getItem('nickName'),
      article_title: '',
      article_content: '',
      id: '',
      defaultData: 'preview',
      options: [],
      sort_name: '',
      sort_id: '',
      article_img: ''
    }
  },
  components: {
    'mavon-editor': mavonEditor.mavonEditor
  },
  created: function () {
    this.findsort()
  },
  methods: {

    handleSubmit () {
      this.$fetch('/article/add', {
        article_title: this.article_title,
        article_content: this.article_content,
        id: sessionStorage.getItem('userId'),
        sort_id: this.sort_id,
        article_img: this.article_img
      }).then((response) => {
        if (response.code === 0) {
          this.$message({
            type: 'info',
            message: '成功提交'
          })
          this.$router.push('/home')
        } else {
          alert('发布失败', '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    findsort () {
      this.$fetch('/sort/query1', {
      }).then((response) => {
        if (response.code === 0) {
          this.options = response.data
        } else {
          alert('查询失败', '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    goBack () {
      this.$router.go(-1)
    }

  }
}
</script>

<style scoped>
#editor {
  margin: auto;
  width: 100%;
  height: 780px;
}
.Name{
  float: left;
  width: 200px;
  color: #606266;
  font-size: 20px;
  margin-top: 15px;
}
</style>
