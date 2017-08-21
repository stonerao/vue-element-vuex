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
              <el-breadcrumb-item :to="{ path: '/' }">学生管理中心</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/teaching' }">教材中心</el-breadcrumb-item>
              <el-breadcrumb-item>{{datas.paper_name}}</el-breadcrumb-item>
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
            <img src='../../assets/login/back.jpg' />
          </div>
          <div class="r-shoping-shar">
            <span class="r-shoping-shou">
              <img src="../../assets/icon/shou.png" />收藏</span>
            <span class="r-shoping-fen">
              <img src="../../assets/icon/shar.png" />分享</span>
            <span class="float-right">
              <img src="../../assets/icon/icon_good.png" />67943</span>
          </div>
        </div>
        <div class="r-shoping-right">
          <div class="r-shoping--info">
            <div class="r-shoping--title">{{datas.paper_name}}</div>
            <p class="r-shoping-price">
              <a class="letter-spacing">价格</a>
              <span>￥{{datas.paper_price}}</span>
            </p>
            <ul class="r-shoping-listinfo">
              <li>
                <span>教材所属分类：</span>
                <span>{{datas.tc_name}}</span>
              </li>
              <li>
                <span>出版社：</span>
                <span>{{datas.publish_name}}</span>
              </li>
              <li>
                <span>出版时间：</span>
                <span>{{datas.publish_time}}</span>
              </li>
              <li>
                <span>版次：</span>
                <span>{{datas.revision}}</span>
              </li>
              <li>
                <span>ISNB号：</span>
                <span>{{datas.isnb_number}}</span>
              </li>
              <!-- <li>
                <span>数量：</span>
                <span>
                  <el-input-number size="small" v-model="num"></el-input-number>
                </span>
              </li> -->
            </ul>
          </div>
          <div class="r-shoping-btns">
            <button @click="eventInfos">教材介绍</button>
            <button @click="goodShoping(thisState)">{{thisState=='2'?'立即领取':'立即购买'}}</button>
            <button>试读</button>
          </div>
        </div>
      </div>
      <div class="r-shoping-swiper">
        <div class="r-shoping-swiper-title">
          相关教材
        </div>
        <ul class="r-shoping-swiper-list">
          <li>
            <img src="../../assets/index/fenm.jpg" />
          </li>
        </ul>
      </div>
    </div>
    <alertTeaching :status="isAlert" @isAlertClick="isAlertFalse" :datas="datas.paper_descript"></alertTeaching>
  </div>
</template>
<script>
import { HeadSide } from '@/view/layout/index.js'
import alertTeaching from '@/components/teaching/alert'
import store from '@/utils/teaching'
import { isClassLogin } from '@/utils/auth';
export default {
  data() {
    return {
      swiper: [],
      datas: {},
      // num: 1,
      isAlert: false,
      thisState: 0
    }
  },
  components: {
    HeadSide, alertTeaching
  },
  created() {
    /* 职位信息  1是管理员2是老师3是学生
      老师直接领取，学生需要购买
    */
    this.thisState = isClassLogin();
    console.log(this.thisState)
    this.dataAjax();
  },
  methods: {
    onSlideChangeStart(currentPage) {
      console.log('onSlideChangeStart', currentPage);
    },
    onSlideChangeEnd(currentPage) {
      console.log('onSlideChangeEnd', currentPage);
    },
    dataAjax() {
      store.teaching_info.call(this)
    },
    eventInfos() {
      // 教材详情
      this.isAlert = !this.isAlert
    },
    isAlertFalse() {
      this.isAlert = false
    },
    goodShoping(state) {
      if (state == 2) {
        this.$confirm('是否立即领取?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
          store.teaching_collect.call(this,this.$route.query.id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else if (state == 3) {

      }
    }
  },

}
</script>
<style>
.r-shoping-listinfo .el-input-number__decrease,
.el-input-number__increase {
  top: 3px;
}
</style>
