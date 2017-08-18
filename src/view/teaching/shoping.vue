<template>
  <div class="app">
    <div id="header">
      <HeadSide></HeadSide>
    </div>
    <div id="box" class="r-shoping">
      <div class="r-shoping-head">
        <el-row>
          <el-col :span="12">
            <el-breadcrumb separator="》" class="r-shoping-line">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>活动管理</el-breadcrumb-item>
              <el-breadcrumb-item>活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="12" class="r-shoping-line">
            <span class="float-right">
              <el-button type="text" icon="circle-close"></el-button>
            </span>
          </el-col>
        </el-row>
      </div>
      <div class="r-shoping-info">
        <div class="r-shoping-left">
          <div class="r-shoping-img">
            <img src='../../assets/login/back.jpg'/>
          </div>
          <div class="r-shoping-shar"></div>
        </div>
        <div class="r-shoping-right">
          <div class="r-shoping--info">
            <div class="r-shoping--title">【中共教育】广西公务员2018年广西考试教材</div>
            <p class="r-shoping--code">编号：GSADASD</p>
            <p class="r-shoping-price">
              <a class="letter-spacing">价格</a><span>￥654654.00</span>
            </p>
            <ul class="r-shoping-listinfo">
              <li><span>教材所属费雷：</span><span>打撒大</span></li>
              <li><span>教材所属费雷：</span><span>打撒大</span></li>
              <li><span>教材所属费雷：</span><span>打撒大</span></li>
              <li><span>教材所属费雷：</span><span>打撒大</span></li>
              <li><span>教材所属费雷：</span><span>打撒大</span></li>
               
            </ul>
          </div>
          <div class="r-shoping-btns">
            <button>dsad</button>
            <button>dsad</button>
            <button>dsad</button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>
<script>
import { HeadSide } from '@/view/layout/index.js' 
export default {
  data() {
    return {
      swiper: []
    }
  },
  components: {
    HeadSide, 
  },
  created() {
  },
  methods: {
    onSlideChangeStart(currentPage) {
      console.log('onSlideChangeStart', currentPage);
    },
    onSlideChangeEnd(currentPage) {
      console.log('onSlideChangeEnd', currentPage);
    }
  }
}
</script>
<style>

</style>
