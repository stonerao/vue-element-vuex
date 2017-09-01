<template>
  <div class="video_detail">
    <div>
      <a href="javascript:void(0)" @click="close">x</a>
      <iframe src="http://www.jiaozi.com/videoPlay.html" scrolling="no" ></iframe>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{

      }
    },
    methods:{
      close(){
        this.$emit('closePlay',0)
      }
    },
    mounted(){

    }
  }
</script>
<style lang="less" type="text/less">
  .video_detail{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.8);
    z-index: 100;
    a{
      position: absolute;
      top: 8px;
      right: 9px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      color: #fff;
      background:  #5b5b5b;
      font-size: 16px;
      border-radius: 15px;
      &:hover{
        background: #545454;
      }
    }
    div{
      z-index: 200;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 800px;
      height: 600px;
      iframe{
        width: 100%;
        height: 100%;
      }
    }

  }
</style>
