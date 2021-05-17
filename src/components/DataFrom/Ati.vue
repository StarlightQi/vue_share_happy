<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据来源</el-breadcrumb-item>
        <el-breadcrumb-item>活动中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-card>
        <el-carousel height="600px" direction="vertical" :autoplay="false">
          <el-carousel-item v-for="item in show" :key="item">
            <img :src="item" style="width: 100%;height: 100%">
          </el-carousel-item>
        </el-carousel>
        <el-row>
          <el-col :span="4" v-for="(o, index) in 4" :key="o" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
              <div style="padding: 14px;">
                <span>征文比赛</span>
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
      show: ['http://127.0.0.1:8066/images/b2.jpg', 'http://127.0.0.1:8066/images/b1.jpg', 'http://127.0.0.1:8066/images/b3.jpg', 'http://127.0.0.1:8066/images/b4.jpg', 'http://127.0.0.1:8066/images/b5.jpg'],
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
