<template>
  <div>
    <el-row class="class-header">
      <el-col :span="4" class="class-titles">
        <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共{{total}} 条记录
      </el-col>
      <el-col :span="20">
        <el-date-picker v-model="value6" @change="timeChange" type="daterange" placeholder="选择日期范围" class="rt">
        </el-date-picker>
      </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="apply_time" label="日期"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="time" label="应出勤课时">
      </el-table-column>
      <el-table-column prop="time" label="实际勤课时">
      </el-table-column>
      <el-table-column prop="time" label="缺勤课时">
      </el-table-column>
      <el-table-column prop="time" label="请假课时">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default{
    props:['total','list'],
    data(){
      return{
        value6:'',//考勤统计日期选择
      }
    },
    methods:{
      timeChange(val){
        let arr=val.split(' ');
      }
    }
  }
</script>
<style lang="less" type="text/less">

</style>
