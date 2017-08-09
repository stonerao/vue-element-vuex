<template>
  <div class="kd-app-main kd-z-main">
    <titleItem :titleText="$route.name.substring(1)"></titleItem>
    <div class="kd-box">
      <div class="kd-app-box">
        <titleActive :titles="titleItem" @Transfer="emitTransfer" :state="state"></titleActive>
      </div>
      <div class="kd-box-content">
        <description :prompts="prompts" @PromPts="promptsTem"></description>
        <div v-if="state==0&&addState!=1">
          <el-row class="class-header">
            <el-col :span="4" class="class-titles">
              <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共 111 条记录
            </el-col>
            <el-col :span="20">
              <el-select v-model="typeText1" placeholder="请选择审核状态" size="small" class="rt">
                <el-option v-for="item in checkTypeList"
                           :key="item.value"
                           :label="item.name"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default({
    data(){
      return{

      }
    }
  })
</script>
<style lang="less" type="text/less">

</style>
