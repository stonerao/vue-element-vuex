<template>
  <div>
    <el-row class="class-header">
      <el-col :span="11" class="class-titles">
        <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共{{total}} 条记录
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-input  v-modle="name" placeholder="请输入姓名"></el-input>
      </el-col>
      <el-col :span="6">
        <el-date-picker  v-modle="sTime" type="date" placeholder="选择开始日期" class="rt"></el-date-picker>
      </el-col>
      <el-col :span="1" style="text-align: center;line-height: 40px">—</el-col>
      <el-col :span="6">
        <el-date-picker  v-modle="eTime" type="date" placeholder="选择结束日期" class="lf"></el-date-picker>
      </el-col>
      <el-col :span="6">
        <el-button @click="search" type="primary" class="lf">搜索</el-button>
      </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="" label="姓名"  show-overflow-tooltip></el-table-column>
      <el-table-column prop="" label="应上课时"></el-table-column>
      <el-table-column prop="" label="实上课时数"></el-table-column>
      <el-table-column prop="" label="缺勤课时数"></el-table-column>
      <el-table-column prop="" label="请假课时数"></el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default{
    props:['total','list','isClassLogin'],
    data(){
      return{
        name:'',
        sTime:'',
        eTime:'',
      }
    },
    method:{
      search(){
        let data={

        }
        console.log(data);
      }
    }
  }
</script>
<style lang="less" type="text/less">

</style>
