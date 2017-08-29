<template>
  <div>
    <el-row>
      <el-col :span="4">
        <div class="rt">视频名称：</div>
      </el-col>
      <el-col :span="8">
        <el-input v-model="videoTitle" size="small"></el-input>
      </el-col>
      <el-col :span="12">
        <div class="gray">请输入视频名称，例如：直线与曲线讲义</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="rt">视频分类：</div>
      </el-col>
      <el-col :span="4">
        <el-select v-model="value" placeholder="一级分类名称" size="small">
          <el-option v-for="item in firstClassList" :label="item.vc_name" :value="item.vc_id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="value" placeholder="二级分类名称" size="small">
          <el-option v-for="item in options" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="rt">视频缩略图：</div>
      </el-col>
      <el-col :span="10">

      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="rt">可观看班级：</div>
      </el-col>
      <el-col :span="20">
        <el-select v-model="value5" multiple placeholder="请选择" style="width: 80%">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
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
  export default{
    props:['firstClassList'],
    data(){
      return{
        videoTitle:'',//视频名称
        options:[{value: '选项1', label: '黄金糕'}, {value: '选项2', label: '双皮奶'}, {value: '选项3',label: '蚵仔煎'}],
        value:'',
        value5:'',
        htmlTxt:'',//富文本
      }
    },
    components:{
      quillEditor,
    },
    methods: {
      upload(){

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
