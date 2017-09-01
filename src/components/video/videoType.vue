<template>
    <el-row>
      <el-col :span="3" class="class-titles">
        <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共{{total}}条记录
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="upload"><b>+</b>上传视频</el-button>
      </el-col>
      <el-col :span="2" :offset="3">
        <el-select v-model="firstName" placeholder="一级分类名称" size="small" @change="listChoose" >
          <el-option v-for="item in firstClassList" :label="item.vc_name" :value="item.vc_id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-select v-model="secondName" placeholder="二级分类名称" size="small" @change="listChoose" :disabled ="firstName===''">
          <el-option v-for="item in underList.secondList" :label="item.vc_name" :value="item.vc_id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-select v-model="thirdName" placeholder="三级分类名称" size="small" @change="listChoose" :disabled="secondName===''">
          <el-option v-for="item in underList.thirdList" :label="item.vc_name" :value="item.vc_id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-select v-model="fourName" placeholder="四级分类名称" size="small" @change="listChoose" :disabled="thirdName===''">
          <el-option v-for="item in underList.fourList" :label="item.vc_name" :value="item.vc_id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-select v-model="fiveName" placeholder="五级分类名称" size="small" @change="listChoose" :disabled="fourName===''">
          <el-option v-for="item in underList.fiveList" :label="item.vc_name" :value="item.vc_id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-input placeholder="请输入关键字" icon="search" v-model="searchTxt" :on-icon-click="handleIconClick" size="small"></el-input>
      </el-col>
    </el-row>
</template>
<script>
  export default{
    props:['firstClassList','underList','showList','total'],
    data(){
      return{
        firstName:'',
        secondName:'',
        thirdName:'',
        fourName:'',
        fiveName:'',
        listNum:1,
        searchTxt:'',//搜索关键字
        classId:'',//分类ID
      }
    },
    methods:{
      listChoose(val){
        this.classId=val;
        this.$emit('searchList',val,this.searchTxt);
        if(this.listNum!=6){
          this.$emit('underListChoose',val,this.listNum);
        }
      },
      //搜索关键字
      handleIconClick(){
        this.$emit('searchList',parseInt(this.classId),this.searchTxt);
      },
      //上传视频
      upload(){
        this.$emit('showUp',1,0);
      }
    },
    watch:{
      firstName(){
        this.listNum=2;
      },
      secondName(){
        this.listNum=3;
      },
      thirdName(){
        this.listNum=4;
      },
      fourName(){
        this.listNum=5;
      },
      fiveName(){
        this.listNum=6;
      }
    }
  }
</script>
<style lang="less" type="text/less">

</style>
