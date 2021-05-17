<template>
<div>
  <!-- 面包屑导航区域 -->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>浏览论坛</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
 <el-card>
   This is show
 </el-card>

</div>
</template>

<script>
export default {
  name: 'Show'
}
</script>

<style scoped>

</style>
