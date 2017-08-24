<template>
  <div>
    <el-row class="class-header">
      <el-col :span="11" class="class-titles">
        <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共{{total}} 条记录
      </el-col>
      <el-col :span=13>
        <!--<uteacher :underTeacherList="underTeacherList" @teacherChoose="teacher" class="lf"></uteacher>-->
        <el-date-picker v-model="value6" @change="timeChange" type="daterange" placeholder="选择日期范围" class="rt"></el-date-picker>
      </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="day" label="日期"  show-overflow-tooltip></el-table-column>
      <el-table-column prop="should" label="应上课节"></el-table-column>
      <el-table-column prop="actual" label="实上课节数"></el-table-column>
      <el-table-column prop="absent" label="缺勤课节数"></el-table-column>
      <el-table-column prop="leave" label="请假课节数"></el-table-column>
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
        this.startTime=arr[0];
        this.endTime=arr[2];
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
