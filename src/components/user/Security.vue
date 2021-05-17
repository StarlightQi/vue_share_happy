<template>
<div>
  <!--    面包屑-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>安全设置</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
<!--  -->
  <el-card>
    <el-button type="primary" plain  @click="dialogVisible = true">修改密码</el-button>
<!--修改密码对话框-->
    <el-dialog
      title="密码修改"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="form">
        <el-form-item label="原密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="再次输入" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.rePassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>

    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">

      <el-table-column
        prop="userIp"
        label="登录IP"
        width="180">
      </el-table-column>

      <el-table-column
        prop="equipment"
        label="设备"
        width="180">
      </el-table-column>

      <el-table-column
        prop="browser"
        label="浏览器">
      </el-table-column>

      <el-table-column
        prop="createTime"
        :formatter="dateFormat"
        label="时间">
      </el-table-column>

    </el-table>
  </el-card>
</div>
</template>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
<script>
export default {
  name: 'Security',
  created () {
    this.getSecurity()
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    dateFormat: function (row, column) {
      var date = row[column.property]
      // eslint-disable-next-line eqeqeq
      if (date == undefined) {
        return ''
      }
      return this.$moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    async getSecurity () {
      const { data: res } = await this.$http.get('authorAdmin/getSecurity')
      if (!res.success) return this.$message.error(res.message)
      this.tableData = res.list
      console.log(res.list)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    async save () {
      console.log(this.form)
      const { data: res } = await this.$http.post('authorAdmin/updateUserPassword', 'oldPassword=' + this.form.oldPassword + '&newPassword=' + this.form.newPassword)
      // eslint-disable-next-line eqeqeq
      if (!res.success) this.$message.error('修改失败，请输入正确的密码')
      this.dialogFormVisible = false
      this.$message.success(res.message)
    }
  },
  data () {
    return {
      tableData: [],
      dialogVisible: false,
      form: {
        oldPassword: '',
        newPassword: '',
        rePassword: ''
      },
      formLabelWidth: '100px'
    }
  }
}
</script>

<style scoped>

</style>
