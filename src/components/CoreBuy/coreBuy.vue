<template>
<div>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>积分商城</el-breadcrumb-item>
      <el-breadcrumb-item>积分交易</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div>
    <el-card>
      <el-carousel :interval="5000" type="card" height="400px">
        <el-carousel-item v-for="s in show" :key="s">
          <h3 class="medium"><img :src="s" style="width: 100%;height: 100%"></h3>
        </el-carousel-item>
      </el-carousel>
      <el-row>
        <el-col :span="3" v-for="(o, index) in 5" :key="o" :offset="index > 0 ? 2 : 0" shadow>
          <el-card :body-style="{ padding: '0px' }">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</div>
</template>

<script>
export default {
  name: 'coreBuy',
  data () {
    return {
      show: ['http://127.0.0.1:8066/images/a1.jpg', 'http://127.0.0.1:8066/images/a2.jpg', 'http://127.0.0.1:8066/images/a3.jpg', 'http://127.0.0.1:8066/images/a4.jpg', 'http://127.0.0.1:8066/images/a5.jpg'],
      currentDate: new Date()
    }
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
