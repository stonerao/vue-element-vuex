<template>
  <div>
    <p style="color: red">待做(等接口)</p>
    <el-row class="class-header">
      <el-col :span="11" class="class-titles">
        <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共{{total}} 条记录
      </el-col>
      <el-col :span=13>
        <uteacher :underTeacherList="underTeacherList" @teacherChoose="teacher" class="lf"></uteacher>
        <el-date-picker v-model="value6" @change="timeChange" type="daterange" placeholder="选择日期范围" class="rt"></el-date-picker>
      </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="" label="日期"  show-overflow-tooltip></el-table-column>
      <el-table-column prop="" label="应上课时"></el-table-column>
      <el-table-column prop="" label="实上课时数"></el-table-column>
      <el-table-column prop="" label="缺勤课时数"></el-table-column>
      <el-table-column prop="" label="请假课时数"></el-table-column>
    </el-table>
  </div>
</template>
<script>
  import uteacher from '@/components/attendance/underTeacher'
  export default{
    props:['total','list','isClassLogin','underTeacherList'],
    data(){
      return{
        value6:'',//考勤统计日期选择
        startTime:'',//开始时间
        endTime:'',//结束时间
      }
    },
    components:{
      uteacher
    },
    methods:{
      timeChange(val){
        let arr=val.split(' ');
        this.startTime=Date.parse(arr[0]);
        this.endTime=Date.parse(arr[2]);
        this.$emit('attTimeChange',this.startTime,this.endTime)
      },
      //选中节点下的老师
      teacher(){
        this.$emit('ChooseTeacher')
      }
    },
    watch:{
    }
  }
</script>
<style lang="less" type="text/less">

</style>
