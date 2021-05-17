<template>
  <div>
<!--    面包屑-->
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息</el-breadcrumb-item>
        <el-breadcrumb-item>修改信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
<!--    主内容-->
    <el-card>
<!--      头像上传-->
      <div class="example-avatar">
        <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
          <h3>Drop files to upload</h3>
        </div>
        <div class="avatar-upload"  v-show="!edit">
          <div class="text-center p-2">
            <label for="file">
              <img :src="files.length ? files[0].url : 'http://127.0.0.1:8066/images/default.jpg'"  class="rounded-circle" />
            </label>
          </div>
          <div class="text-center p-2">
            <file-upload
              extensions="gif,jpg,jpeg,png,webp"
              accept="image/png,image/gif,image/jpeg,image/webp"
              name="file"
              post-action="http://127.0.0.1:8066/authorAdmin/uploadFile"
              :drop="!edit"
              v-model="files"
              @input-filter="inputFilter"
              @input-file="inputFile"
              ref="upload">
            </file-upload>
          </div>
        </div>
        <div class="avatar-edit" v-show="files.length && edit">
          <div class="avatar-edit-image" v-if="files.length">
            <img ref="editImage" :src="files[0].url" />
          </div>
          <div class="text-center p-4">
            <button type="button" class="btn btn-secondary" @click.prevent="$refs.upload.clear">Cancel</button>
            <button type="submit" class="btn btn-primary" @click.prevent="editSave">Save</button>
          </div>
        </div>
      </div>

<!--      个人信息页-->
      <el-card class="box-card">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="ruleForm.gender"  size="medium">
            <el-radio border label="男"></el-radio>
            <el-radio border label="女"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="邮箱" prop="useremain">
          <el-input v-model="ruleForm.useremain" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="等级" prop="grade">
          <el-input v-model="ruleForm.grade" :disabled="true" ></el-input>
        </el-form-item>

        <el-form-item label="积分"  prop="core">
          <el-input v-model="ruleForm.core" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="权限"   prop="permission">
          <el-input v-model="ruleForm.permission" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="userphone">
          <el-input v-model="ruleForm.userphone"></el-input>
        </el-form-item>

        <el-form-item label="创建时间"   required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" :disabled="true" v-model="ruleForm.createDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="更新时间"  required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" :disabled="true"  placeholder="选择日期" v-model="ruleForm.upDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="个人信息" prop="userinfo">
          <el-input type="textarea" v-model="ruleForm.userinfo"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitUserInfo('ruleForm')">立即创建</el-button>
        </el-form-item>
      </el-form>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import FileUpload from 'vue-upload-component'
export default {
  components: {
    FileUpload
  },
  data () {
    return {
      files: [],
      edit: false,
      cropper: false,
      ruleForm: {
        username: '',
        gender: '',
        useremain: '',
        core: '',
        permission: '',
        grade: '',
        userphone: '',
        upDate: '',
        createDate: '',
        userinfo: '',
        userImg: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        gender: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        useremain: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        userphone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    edit (value) {
      if (value) {
        this.$nextTick(function () {
          if (!this.$refs.editImage) {
            return
          }
          const cropper = new Cropper(this.$refs.editImage, {
            aspectRatio: 1 / 1,
            viewMode: 1
          })
          this.cropper = cropper
        })
      } else {
        if (this.cropper) {
          this.cropper.destroy()
          this.cropper = false
        }
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    submitUserInfo (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // eslint-disable-next-line eqeqeq
          if (this.ruleForm.gender == '女') { this.ruleForm.gender = 1 } else { this.ruleForm.gender = 0 }
          this.userInfoChanged()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    editSave () {
      this.edit = false
      const oldFile = this.files[0]
      const binStr = atob(this.cropper.getCroppedCanvas().toDataURL(oldFile.type).split(',')[1])
      const arr = new Uint8Array(binStr.length)
      for (let i = 0; i < binStr.length; i++) {
        arr[i] = binStr.charCodeAt(i)
      }
      const file = new File([arr], oldFile.name, { type: oldFile.type })
      this.ruleForm.userImg = file.name
      this.$refs.upload.update(oldFile.id, {
        file,
        type: file.type,
        size: file.size,
        active: true
      })
    },
    alert (message) {
      alert(message)
    },
    inputFile (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        this.$nextTick(function () {
          this.edit = true
        })
      }
      if (!newFile && oldFile) {
        this.edit = false
      }
    },
    inputFilter (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
          this.alert('Your choice is not a picture')
          return prevent()
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = ''
        const URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file)
        }
      }
    },
    async getUserInfo () {
      const { data: res } = await this.$http.get('authorAdmin/getUserInfo')
      if (!res.success) return this.$message.error(res.message)
      this.files.push({ url: 'http://127.0.0.1:8066/images/' + res.data.userImg })
      this.ruleForm.username = res.data.username
      if (res.data.gender) { this.ruleForm.gender = '女' } else { this.ruleForm.gender = '男' }
      window.sessionStorage.setItem('userImg', 'http://127.0.0.1:8066/images/' + res.data.userImg)
      this.ruleForm.useremain = res.data.useremain
      this.ruleForm.core = res.data.userscore
      this.ruleForm.grade = res.data.usergrade
      this.ruleForm.userphone = res.data.userphone
      this.ruleForm.createDate = res.data.createtime
      this.ruleForm.upDate = res.data.updatetime
      this.ruleForm.userinfo = res.data.userinfo
      this.ruleForm.userImg = res.data.userImg
      // eslint-disable-next-line eqeqeq
      if (res.data.userpermission == 0) { this.ruleForm.permission = '超级管理员' } else { this.ruleForm.permission = '论坛作者' }
    },
    async userInfoChanged () {
      // eslint-disable-next-line eqeqeq
      const { data: res } = await this.$http.put('authorAdmin/updateUserInfo', this.ruleForm)
      window.sessionStorage.setItem('userImg', 'http://127.0.0.1:8066/images/' + this.ruleForm.userImg)
      // eslint-disable-next-line eqeqeq
      if (!res.success) {
        return this.$message.error(res.message)
      }
      this.$message.success(res.message)
      // eslint-disable-next-line eqeqeq
      if (this.ruleForm.gender == 1) { this.ruleForm.gender = '女' } else { this.ruleForm.gender = '男' }
    }
  }
}
</script>

<style scoped>
  .box-card {
    margin: auto;
    width: 50%;
  }
</style>
