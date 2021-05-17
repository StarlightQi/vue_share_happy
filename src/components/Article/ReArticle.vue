<template>
    <div>
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章管理</el-breadcrumb-item>
          <el-breadcrumb-item>文章回收站</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-card>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="title"
            label="标题"
            width="180">
          </el-table-column>

          <el-table-column
            prop="articlecontext"
            label="内容">
          </el-table-column>

          <el-table-column
            prop="createTime"
            :formatter="dateFormat"
            label="时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="deleteEdit(scope.$index, scope.row)">删除</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="ReBack(scope.$index, scope.row)">还原</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-card>
    </div>
</template>

<script>
export default {
  name: 'ReArticle',
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
      const { data: res } = await this.$http.get('reArticle/getReArticle')
      if (!res.success) return this.$message.error(res.message)
      this.tableData = res.list
      console.log(res.list)
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
