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
          <el-option v-for="item in options" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="1" style="margin-left: 15px">—</el-col>
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

    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="rt">可观看班级：</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="rt">视频描述简介：</div>
      </el-col>
      <el-col :span="20">
        <quillEditor></quillEditor>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { quillEditor } from 'vue-quill-editor'
  export default{
    props:[],
    data(){
      return{
        videoTitle:'',//视频名称
        options:[{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }],
        value:'',

      }
    },
    components:{
      quillEditor,
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
