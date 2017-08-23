<template>
  <div>
    <el-row class="class-header">
      <el-col :span="2">
        <el-button @click="returnList" type="primary" size="small">返回列表</el-button>
      </el-col>
      <el-col :span="3" class="class-titles">
        <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共{{total}}条记录
      </el-col>
      <el-col :span="11" style="color:#20A0FF;line-height: 36px;text-align: center">
        <span style="color:#ff703b">{{classInfo.class_name}}</span>&nbsp;共 <span style="color:#ff703b">{{parseInt(classInfo.boy_num)+parseInt(classInfo.girl_num)}}</span>人&nbsp;男生<span style="color:#ff703b">{{classInfo.boy_num}}</span>人&nbsp;女生<span style="color:#ff703b">{{classInfo.girl_num}}</span>人&nbsp;教学科目：<span style="color:orangered">{{classInfo.subject_name}}</span>
      </el-col>
      <el-col :span="3">
        <el-select @change="sexChoose" v-model="sex" placeholder="选择性别" size="small" class="rt">
          <el-option v-for="item in sexList" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-input placeholder="请输入学生姓名" icon="search" size="small" v-model="stuName" :on-icon-click="handleIconClick">
        </el-input>
      </el-col>
    </el-row>
    <el-table :data="listDetail">
      <template scope="scope">
        <el-table-column prop="st_id" label="ID" width="100">
        </el-table-column>
        <el-table-column prop="st_name" label="学生姓名"  width="150" >
        </el-table-column>
        <el-table-column prop="st_sex" label="性别" min-width="50" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="st_phone" label="电话" min-width="100" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template scope="scope">
            <el-button size="small">作业</el-button>
            <el-button size="small">成绩</el-button>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
  export default{
    props:['total','listDetail','classInfo'],
    data(){
      return{
        sex:'',//性别
        sexNum:'',//选择性别
        stuName:'',//学生姓名
        sexList:[{name:'保密',value:1},{name:'男',value:2},{name:'女',value:3}],
      }
    },
    created(){

    },
    methods:{
      returnList(){
        this.$emit('return_list',0)
      },
      sexChoose(val){
        this.sexNum=val;
        this.$emit('detailList',val,this.stuName)
      },
      handleIconClick(){
        this.$emit('detailList',this.sexNum,this.stuName)
      }
    }
  }
</script>
<style lang="less" type="text/less">

</style>
