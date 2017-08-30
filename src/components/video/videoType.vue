<template>
    <el-row>
      <el-col :span="4">
        <div class="rt">视频分类：</div>
      </el-col>
      <el-col :span="3">
        <el-select v-model="firstName" placeholder="一级分类名称" size="small" @change="listChoose" v-if="showList>=1">
          <el-option v-for="item in firstClassList" :label="item.vc_name" :value="item.vc_id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="secondName" placeholder="二级分类名称" size="small" @change="listChoose" v-if="showList>=2">
          <el-option v-for="item in underList.secondList" :label="item.vc_name" :value="item.vc_id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="thirdName" placeholder="三级分类名称" size="small" @change="listChoose" v-if="showList>=3">
          <el-option v-for="item in underList.thirdList" :label="item.vc_name" :value="item.vc_id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="fourName" placeholder="四级分类名称" size="small" @change="listChoose" v-if="showList>=4">
          <el-option v-for="item in underList.fourList" :label="item.vc_name" :value="item.vc_id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="fiveName" placeholder="五级分类名称" size="small" @change="listChoose" v-if="showList>=5">
          <el-option v-for="item in underList.fiveList" :label="item.vc_name" :value="item.vc_id">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
</template>
<script>
  export default{
    props:['firstClassList','underList','showList'],
    data(){
      return{
        firstName:'',
        secondName:'',
        thirdName:'',
        fourName:'',
        fiveName:'',
        listNum:1,
      }
    },
    methods:{
      listChoose(val){
        if(this.listNum!=6){
          this.$emit('underListChoose',val,this.listNum);
        }
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
