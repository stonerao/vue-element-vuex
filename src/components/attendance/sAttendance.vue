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
          <el-option v-for="item in type" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <div v-if="typeVal==1" >
          <el-select  @change="gradeChoose" v-model="gradeName" placeholder="请选择年级" size="small" style="margin-bottom: 10px">
            <el-option v-for="item in gradeList" :label="item.department_name" :value="item.department_id"></el-option>
          </el-select>
          <el-select @change="classChoose" v-model="className" placeholder="请选择班级" size="small">
            <el-option v-for="item in classList" :label="item.department_name" :value="item.department_id"></el-option>
          </el-select>
        </div>
        <div v-else>
          <el-select @change="classChoose" v-model="className" placeholder="请选择班级" size="small">
            <el-option v-for="item in classList" :label="item.department_name" :value="item.department_id"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-input v-model="personName" placeholder="请输入姓名" size="small"></el-input>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-date-picker v-model="value6" @change="timeChange" type="date" placeholder="选择日期" class="rt" size="small"></el-date-picker>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-select  @change="lessonChoose" v-model="lessonName" placeholder="请选择节次" size="small">
          <el-option v-for="item in lessonList" :label="item.lesson" :value="item.num"></el-option>
        </el-select>
        <el-button @click="searchList" type="primary" size="small" :disabled="isTrue">查询</el-button>
      </el-col>
    </el-row>
    <!--学生老师考勤-->
    <el-row v-else>
      <el-col :span="2">
        <el-select @change="typeChange" v-model="typeName" placeholder="类型" size="small">
          <el-option v-for="item in type" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-col>
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
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="" label="姓名"  show-overflow-tooltip></el-table-column>
      <el-table-column prop="" label="应到人数"></el-table-column>
      <el-table-column prop="" label="实到人数"></el-table-column>
      <el-table-column prop="" label="缺勤人数"></el-table-column>
      <el-table-column prop="" label="请假人数"></el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { getToken } from '@/utils/auth'
  export default{
    props:['total','list','state','gradeList','classList','lessonList'],
    data(){
      return{
        isTrue:true,//是否可以查询
        type:[{name:'实体班',value:1},{name:'虚拟班',value:2}],//班级类型
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
      //查询按钮启用
      submitTrue(){
        if(this.typeName!=""&&this.className!=""){
          this.isTrue=false
        }
      },
      //班级类型选择
      typeChange(val){
        this.typeVal=val;
        this.$emit('changeType',val,this.gradeId);
      },
      //年级id选择
      gradeChoose(val){
        this.gradeId=val;
        this.$emit('changeType',this.typeVal,val);
        this.submitTrue();
      },
      //班级id选择
      classChoose(val){
        this.classId=val;
        this.$emit('chooseClass',val,this.time);
        this.submitTrue();
      },
      //课节数
      lessonChoose(val){
        this.lessonNum=val;
        this.submitTrue();
      },
      //选择时间
      timeChange(val){
        this.time=val;
      },
      searchList(){
        let key=getToken();
        if(this.state==5){
          //学校中心老师考勤
        }else if(this.state==6){
          //学校中心学生考勤
        }else{
          //学校中心班级考勤
          let data={
            token:key,
            department_id:this.classId,
            class_num:this.lessonNum,
            search_time:this.time
          }
        }

      },

    },
    watch:{
      type(){
        this.personName='';//姓名
        this.className='';//班级名称
        this.gradeName='';//年级名称
        this.lessonName='';//节次名称
        this.gradeId='';//年级Id
        this.classId='';//班级Id
        this.value6='';//时间
        this.time='';//选择的时间
      }
    }
  }
</script>
<style lang="less" type="text/less">

</style>
