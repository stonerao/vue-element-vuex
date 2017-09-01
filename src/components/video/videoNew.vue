<template>
  <div>
    <el-button type="primary" size="small" @click="back">返回</el-button>
    <iframe v-if="upType==0" :src="srcTxt" scrolling="no" width="100%" height="500px"></iframe>
    <iframe v-else :src="srcEdit" scrolling="no" width="100%" height="500px"></iframe>
  </div>
</template>
<script>
  import { getToken } from '@/utils/auth'
  export default{
    props:['videoId','upType'],
    data(){
      return{
        tokenId:'',
        srcTxt:'',//上传视频地址
        srcEdit:'',//视频编辑地址
      }
    },
    mounted(){
      this.tokenId=getToken();
      this.srcTxt=`http://kdxx.test.kh888.cn/Admin/Video/video_add?token=${this.tokenId}`;
      this.srcEdit=`http://kdxx.test.kh888.cn/Admin/Video/video_add?token=${this.tokenId}&id=${this.videoId}`
    },
    methods:{
      back(){
        this.$emit('hiddenUp',0)
      }
    }
  }
</script>
<style lang="less" type="text/less">

</style>
