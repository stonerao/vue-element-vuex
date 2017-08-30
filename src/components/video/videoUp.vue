<template>
  <el-row>
    <el-col :span="4">
      <div class="rt">视频上传：</div>
    </el-col>
    <el-col :span="10">
      <el-button id="file_upload" type="primary">上传视频<i class="el-icon-upload el-icon--right"></i></el-button>
    </el-col>
  </el-row>
</template>
<script>
  export default{
    props:['classList'],
    data(){
      return{

      }
    },
    methods:{

    },
    mounted(){
    }
  }
</script>
<style lang="less" type="text/less">

</style>
