<template>
  <div>
    <p style="color: red">待做(等接口)</p>
    <el-row class="class-header">
      <el-col :span="11" class="class-titles">
        <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共{{total}} 条记录
      </el-col>
      <el-col :span=13>
        <el-switch v-if="isClassLogin==1" v-model="value3" on-color="#1998e4" off-color="#1183dc" on-text="老师" off-text="学生" class="lf" style="margin-top: 10px"></el-switch>
        <el-date-picker v-model="value6" @change="timeChange" type="daterange" placeholder="选择日期范围" class="rt"></el-date-picker>
      </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="m" label="月份时段"  show-overflow-tooltip></el-table-column>
      <el-table-column prop="total_time" label="应上课时"></el-table-column>
      <el-table-column prop="actual_time" label="实上课时数"></el-table-column>
      <el-table-column prop="absence_time" label="缺勤课时数"></el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default{
    props:['total','list','isClassLogin'],
    data(){
      return{
        value6:'',//考勤统计日期选择
        value3:true,//查看老师或学生考勤
        startTime:'',//开始时间
        endTime:'',//结束时间
      }
    },
    methods:{
      timeChange(val){
        let arr=val.split(' ');
        this.startTime=Date.parse(arr[0]);
        this.endTime=Date.parse(arr[2]);
        this.$emit('attTimeChange',this.startTime,this.endTime)
      }
    },
    watch:{
      value3(val){
        this.$emit('sAttendance',val,this.startTime,this.endTime)
      }
    }
  }
</script>
<style lang="less" type="text/less">

</style>
