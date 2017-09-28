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
           
        </el-row>
      </div>
      <div class="r-shoping-info"> 
      </div>
      <div class="r-shoping-swiper">
         
      </div>
    </div>
    
  </div>
</template>
<script>
import { HeadSide } from '@/view/layout/index.js'
import alertTeaching from '@/components/teaching/alert'
import testHmls from '@/components/teaching/test'
import store from '@/utils/teaching'
import { isClassLogin } from '@/utils/auth';
export default {
  data() {
    return {
      swiper: [],
      datas: {},
      // num: 1,
      isAlert: false,
      thisState: 0,
      dada:{}, 
      isTest:false
    }
  },
  components: {
    HeadSide, alertTeaching,testHmls
  },
  created() {
    /* 职位信息  1是管理员2是老师3是学生
      老师直接领取，学生需要购买
    */
    this.thisState = isClassLogin(); 
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
    },
    testHtml(){
      // 
      if(this.thisState=='2'){
        
      }else if(this.thisState=='3'){
        
      } 
      store.teacher_paper_preview.call(this)
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
