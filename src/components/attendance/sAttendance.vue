<template>
  <div>
    <el-row class="class-header">
      <el-col :span="11" class="class-titles">
        <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共{{total}} 条记录
      </el-col>
    </el-row>
    <!--班级考勤-->
    <el-row v-if="state==7">
      <el-col :span="2">
        <el-select @change="typeChange" v-model="typeName" placeholder="类型" size="small">
          <el-option v-for="item in ClassType" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col v-if="typeVal==1" :span="3" :offset="1">
          <el-select  @change="gradeChoose" v-model="gradeName"  placeholder="请选择年级" size="small" style="margin-bottom: 10px">
            <el-option v-for="item in gradeList" :label="item.department_name" :value="item.department_id"></el-option>
          </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-select @change="classChoose" v-model="className" :disabled="typeVal==1? (gradeName===''):false" placeholder="请选择班级" size="small">
          <el-option v-for="item in classList" :label="item.department_name" :value="item.department_id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-date-picker v-model="value6" @change="timeChange" :disabled="className===''" type="date" placeholder="选择日期" class="rt" size="small"></el-date-picker>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-select  @change="lessonChoose" v-model="lessonName" :disabled="value6===''" placeholder="请选择节次" size="small">
          <el-option v-for="item in lessonList" :label="item.lesson" :value="item.num"></el-option>
        </el-select>
        <el-button @click="searchList" type="primary" size="small" :disabled="lessonName===''">查询</el-button>
      </el-col>
    </el-row>
    <!--学生老师考勤-->
    <el-row v-else>
      <el-col :span="3" :offset="1">
        <el-input v-model="personName" placeholder="请输入姓名" size="small"></el-input>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-date-picker v-model="value6" @change="timeChange" type="daterange" placeholder="选择日期范围" class="rt" size="small"></el-date-picker>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-button @click="searchList" type="primary" size="small">查询</el-button>
      </el-col>
    </el-row>
    <el-table  v-if="state==7" :data="list" style="width: 100%">
      <el-table-column prop="class_name" label="班级"  show-overflow-tooltip></el-table-column>
      <el-table-column prop="student_count" label="应到人数"></el-table-column>
      <el-table-column prop="sign_count" label="实到人数"></el-table-column>
      <el-table-column prop="absent_count" label="缺勤人数"></el-table-column>
      <el-table-column prop="leave_count" label="请假人数"></el-table-column>
    </el-table>
    <el-table v-else :data="list" style="width: 100%">
      <el-table-column prop="" label="姓名"  show-overflow-tooltip></el-table-column>
      <el-table-column prop="student_count" label="应上课节"></el-table-column>
      <el-table-column prop="sign_count" label="实上课节"></el-table-column>
      <el-table-column prop="absent_count" label="缺勤课节"></el-table-column>
      <el-table-column prop="leave_count" label="请假课节"></el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { getToken } from '@/utils/auth'
  export default{
    props:['total','list','state','gradeList','classList','lessonList'],
    data(){
      return{
        ClassType:[{name:'实体班',value:1},{name:'虚拟班',value:2}],//班级类型
        typeName:'',
        typeVal:2,//班级类型值
        personName:'',//姓名
        className:'',//班级名称
        gradeName:'',//年级名称
        gradeId:'',//年级Id
        classId:'',//班级Id
        value6:'',//时间
        time:'',//选择的时间
        lessonName:'',//节次名称
        lessonNum:'',//节次数
      }
    },
    methods:{
      //清空名称
      clearBoth(){
        this.personName='';//姓名
        this.className='';//班级名称
        this.gradeName='';//年级名称
        this.lessonName='';//节次名称
        this.gradeId='';//年级Id
        this.classId='';//班级Id
        this.value6='';//时间
        this.time='';//选择的时间
      },
      //班级类型选择
      typeChange(val){
        this.typeVal=val;
        this.$emit('changeType',val,this.gradeId);
        this.clearBoth()
      },
      //年级id选择
      gradeChoose(val){
        this.gradeId=val;
        this.$emit('changeType',this.typeVal,val);
      },
      //班级id选择
      classChoose(val){
        this.classId=val;
      },
      //课节数
      lessonChoose(val){
        this.lessonNum=val;
      },
      //选择时间
      timeChange(val){
        this.time=val;
        if(this.state==7){
          this.$emit('chooseClass', this.classId,this.time);
        }
      },
      searchList(){
        let key=getToken();
        let data={};
        if(this.state==5){
          //学校中心老师考勤
        }else if(this.state==6){
          //学校中心学生考勤
        }else{
          //学校中心班级考勤
          data={
            token:key,
            department_id:this.classId,
            class_num:this.lessonNum,
            search_time:this.time
          }
        }
        this.$emit('getSList',data)
      },

    },
    watch:{
    }
  }
</script>
<style lang="less" type="text/less">

</style>
