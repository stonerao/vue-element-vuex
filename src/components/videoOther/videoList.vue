<template>
  <div>
    <el-row class="class-header">
      <el-col :span="4" class="class-titles">
        <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共{{total}}条记录
      </el-col>
      <el-col :span="4" :offset="16">
        <el-input placeholder="请输入关键字" icon="search" v-model="searchTxt" :on-icon-click="handleIconClick" size="small"></el-input>
      </el-col>
    </el-row>
    <el-table :data="videoList" style="width: 100%" >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="视频名称" show-overflow-tooltip>
        <template scope="scope">
          <div class="clear">
            <img :src="scope.row.first_image" alt="" style="width: 160px;height: 120px;float:left">
            <span style="float:left;line-height: 120px;margin-left: 10px">{{scope.row.title}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="filesize" label="大小"  width="120" show-overflow-tooltip >
      </el-table-column>
      <el-table-column prop="add_time" label="发布时间" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column  label="操作" width="100">
        <template scope="scope">
          <div>
            <el-button type="primary" size="small" icon="search" @click="playVideo(scope.row.id)">查看</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--视频播放-->
    <videoPlay v-if="playShow==1" @closePlay="closePlay" :videoId="vid"></videoPlay>
  </div>
</template>
<script>
  import videoPlay from '@/components/video/videoPlay'
  import {set} from '@/assets/icon'
  export default{
    props:['total','videoList'],
    data(){
      return{
        vid:'',//视频id
        playShow:0,//显示播放页面
        searchTxt:'',
      }
    },
    components:{
      videoPlay
    },
    methods:{
      handleIconClick(){
        this.$emit('searchVideo',this.searchTxt)
      },
      //播放视频
      playVideo(id){
        this.playShow=1;
        this.vid=id;
      },
      //关闭视频
      closePlay(val){
        this.playShow=val;
      },
    }
  }
</script>
<style lang="less" type="text/less">

</style>
