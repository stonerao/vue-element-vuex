<template>
  <div>
    <el-row>
      <el-col :span="4">
        <div class="rt">视频名称：</div>
      </el-col>
      <el-col :span="8">
        <el-input v-model="videoTitle" size="small" id="title"></el-input>
      </el-col>
      <el-col :span="12">
        <div class="gray">请输入视频名称，例如：直线与曲线讲义</div>
      </el-col>
    </el-row>
    <!--视频分类-->
    <videoType :firstClassList="firstClassList" @underListChoose="underListChoose" :underList="underList" :showList="showList"></videoType>
    <videoUp :classList="classList"></videoUp>
    <el-row>
      <el-col :span="4">
        <div class="rt">可观看班级：</div>
      </el-col>
      <el-col :span="20">
        <el-select v-model="value5" multiple placeholder="请选择" style="width: 80%">
          <el-option v-for="item in department_list" :label="item.department_name" :value="item.department_id">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="rt">视频描述简介：</div>
      </el-col>
      <el-col :span="20">
        <quillEditor v-model="htmlTxt"></quillEditor>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" :offset="4">
        <el-button type="primary">主要按钮</el-button>
        <el-button >主要按钮</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { quillEditor } from 'vue-quill-editor'
  import videoType from '@/components/video/videoType'
  import videoUp from '@/components/video/videoUp'
  export default{
    props:['firstClassList','underList','showList','classList'],
    data(){
      return{
        videoTitle:'',//视频名称
        value5:'',
        htmlTxt:'',//富文本
        department_list:[
          {department_name:'三年级一班',department_id:1},
          {department_name:'三年级2班',department_id:2},
          {department_name:'三年级3班',department_id:3},
        ]
      }
    },
    components:{
      quillEditor,videoType,videoUp
    },
    methods: {
      upload(){

      },
      underListChoose(id,num){
        this.$emit('underClassList',id,num)
      }
    },
    watch:{
      videoTitle(){

      }
    }
  }
</script>
<style lang="less" type="text/less">
  .ql-container,.ql-editor{
    height:auto;
    min-height:100px;
  }
  div{
    line-height: 30px;
    font-size: 12px;
    .gray{
      color:#808080;
      margin-left: 15px;
    }
  }
</style>
