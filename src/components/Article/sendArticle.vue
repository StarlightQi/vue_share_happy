<template lang="html">
<div>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章发表</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-card style="overflow: auto">
    <div style="float: left;width: 25%">
      <el-row class="tac">
        <el-col :span="12">
          <el-button  type="primary"  icon="el-icon-plus" @click="newArticle">新建文章</el-button>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo">
            <el-menu-item :index="art.articleid+''" v-for="(art,index) in articleList" :key="art.articleid" @click="setArticle(index)">
                <span slot="title" v-text="art.title"></span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div style="float: right ;width: 73%">
      <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="文章标题" prop="username">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="文章类型">
          <el-select v-model="ruleForm.articletypeid" placeholder="请选择活动区域" style="float: left;width: 50%">
            <el-option :label="ty.articleType" :value="ty.articleID"  v-for="ty in type" :key="ty.articleID"></el-option>
          </el-select>
          &nbsp;
          <el-button type="primary" @click="changStatu('ruleForm')"  style="float: right">发表</el-button>
          <el-button type="primary" @click="submitArticle('ruleForm')" style="float: right;margin-right: 50px">保存</el-button>
        </el-form-item>
      </el-form>
      <div class="editor" style="height: 900px">
        <div ref="toolbar" class="toolbar"></div>
        <div ref="editor" class="text"></div>
      </div>
    </div>
  </el-card>
</div>
</template>

<script>
// import E from "wangeditor";
const E = process.browser ? require('wangeditor') : undefined
export default {
  data () {
    return {
      // uploadPath,
      editor: null,
      info_: null,
      articleList: [],
      type: [],
      ruleForm: {
        articleid: '',
        title: '',
        articletypeid: 2,
        articlecontext: '内容',
        articleDir: '默认文件夹'
      },
      changstatus: {
        articleid: '',
        status: '1'
      }
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    isClear: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isClear (val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear()
        this.info_ = null
      }
    },
    value: function (value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value)
      }
    }
  },
  mounted () {
    this.seteditor()
    this.editor.txt.html(this.value)
  },
  created () {
    this.getTypeList()
    this.getArticleList()
  },
  methods: {
    async getTypeList () {
      const { data: res } = await this.$http.get('articleType/getAllType')
      if (!res.success) return this.$message.error(res.message)
      this.type = res.list
    },
    async changstatu () {
      const { data: res } = await this.$http.put('article/modArtStatus', this.changstatus)
      if (!res.success) return this.$message.error(res.message)
      this.$message.success(res.message)
    },
    setArticle (ix) {
      this.ruleForm.title = this.articleList[ix].title
      this.changstatus.articleid = this.articleList[ix].articleid
      this.ruleForm.articleid = this.articleList[ix].articleid
      this.ruleForm.articletypeid = this.articleList[ix].articletypeid
      this.ruleForm.articlecontext = this.articleList[ix].articlecontext
      this.editor.txt.html(this.articleList[ix].articlecontext)
    },
    async changeArticle () {
      if (this.info_ != null) { this.ruleForm.articlecontext = this.info_ } else return this.$message.error('文章不能为空，或未作修改')
      const { data: res } = await this.$http.put('article/modArticle', this.ruleForm)
      if (!res.success) return this.$message.error(res.message)
      this.$message.success(res.message)
    },
    async newArticle () {
      this.ruleForm.title = '新建文章'
      this.ruleForm.articlecontext = '内容'
      const { data: res } = await this.$http.post('article/addArticle', this.ruleForm)
      if (!res.success) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.getArticleList()
    },
    async getArticleList () {
      const { data: res } = await this.$http.get('article/getAuthorArticleShow?authorId=' + window.sessionStorage.getItem('uid'))
      if (!res.success) return this.$message.error(res.message)
      this.articleList = res.list
      // eslint-disable-next-line eqeqeq
      if (res.list.length != 0) {
        this.ruleForm.title = res.list[0].title
        this.ruleForm.articletypeid = res.list[0].articletypeid
        this.ruleForm.articleid = res.list[0].articleid
        this.changstatus.articleid = res.list[0].articleid
        this.editor.txt.html(res.list[0].articlecontext)
      }
    },
    submitArticle (formName) {
      // const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // eslint-disable-next-line eqeqeq
          this.changeArticle()
          this.getArticleList()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    changStatu (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // eslint-disable-next-line eqeqeq
          this.changstatu()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    seteditor () {
      // http://192.168.2.125:8080/admin/storage/create
      this.editor = new E(this.$refs.toolbar, this.$refs.editor)
      this.editor.customConfig.uploadImgShowBase64 = true // base 64 存储图片
      this.editor.customConfig.uploadImgServer = 'http://127.0.0.1:8066/authorAdmin/uploadFile'
      //   ""; // 配置服务器端地址
      this.editor.customConfig.uploadImgHeaders = { token: window.sessionStorage.getItem('token'), text: 'file' } // 自定义 header
      this.editor.customConfig.uploadFileName = 'file' // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
      // this.editor.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
      // this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间

      // 配置菜单
      this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'video', // 插入视频
        'code', // 插入代码
        'undo', // 撤销
        'redo', // 重复
        'fullscreen' // 全屏
      ]

      this.editor.customConfig.uploadImgHooks = {
        fail: (xhr, editor, result) => {
          // 插入图片失败回调
        },
        success: (xhr, editor, result) => {
          // 图片上传成功回调
        },
        timeout: (xhr, editor) => {
          // 网络超时的回调
        },
        error: (xhr, editor) => {
          // 图片上传错误的回调
        },
        customInsert: (insertImg, result, editor) => {
          // 图片上传成功，插入图片的回调
          var url = 'http://127.0.0.1:8066/images/' + result.data
          insertImg(url)
        }
      }
      this.editor.customConfig.onchange = html => {
        this.info_ = html // 绑定当前逐渐地值
        this.$emit('change', this.info_) // 将内容同步到父组件中
      }
      // 创建富文本编辑器
      this.editor.create()
    }
  }
}
</script>

<style lang="css">
  .editor {
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 0;
  }
  .toolbar {
    border: 1px solid #ccc;
  }
  .text {
    border: 1px solid #ccc;
    min-height: 500px;
  }
</style>
