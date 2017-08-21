<template>
  <div class="att-main">
    <div v-if="state!=0">
      <el-row :gutter="20">
        <el-col :span="4">
          <div v-if="state==2" class="att-name rt">代课课时：</div>
          <div v-else class="att-name rt">调换课时：</div>
        </el-col>
        <el-col :span="20">
          <div class="att-time">
            <el-date-picker v-model="chooseTime" type="date" placeholder="选择日期" @change="choose_time">
            </el-date-picker>
          </div>
          <div class="att-checkbox">
            <el-radio-group v-model="radio1" @change="changeRadio1">
              <template v-for="(item,index) in myClassList">
                <el-radio :label="index">{{item.lesson}}</el-radio>
              </template>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div v-if="state==2" class="att-name rt">请选择代课老师：</div>
          <div v-else class="att-name rt">找人调课：</div>
        </el-col>
        <el-col :span="20" v-if="state==2">
          <el-select v-model="tname" @change="teacherChoose" placeholder="请选择">
            <el-option v-for="item in teacherList" :key="item.teacher_id" :label="item.teacher_name" :value="item.teacher_id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="20" v-else>
          <div class="att-time">
            <el-date-picker v-model="changeTime" type="date" placeholder="选择日期" @change="change_time">
            </el-date-picker>
          </div>
          <div class="att-checkbox">
            <el-radio-group v-model="radio2" @change="changeRadio2">
              <el-radio v-for="item in otherClassList" :label="item.contents_id">{{item.lesson}}&nbsp;{{item.teacher}}</el-radio>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="20" v-if="state==0">
      <el-col :span="4">
        <div class="att-name rt">请假时间：</div>
      </el-col>
      <el-col :span="5">
        <div class="block">
          <el-date-picker v-model="leaveStart" type="datetime" placeholder="选择日期时间" @change="leave_start">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="block">
          <el-date-picker v-model="leaveEnd" type="datetime" placeholder="选择日期时间" @change="leave_end">
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 30px">
      <el-col :span="4">
        <div class="att-name rt">申请原因：</div>
      </el-col>
      <el-col :span="15">
        <el-form>
          <el-form-item>
            <el-input v-model="msg" type="textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="applySubmit(state)">提交申请</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {getToken} from '@/utils/auth'
  import { getClass } from '@/utils/auth'
  import att from '@/utils/attendance'
  export default({
    props:['state','addState'],
    data(){
      return{
        leaveStart:'',//请假时间开始
        leaveEnd:'',//请假时间结束
        chooseTime:'',//调课时间，代课时间
        changeTime: '',//找人调课时间
        radio:'1',
        radio1:2,//调课radio1
        radio2:1,//调课radio2
        teacherList:[],//代课老师列表
        tname:'',//代课老师
        teacherId:'',//代课老师ID
        msg:'',//原因
        key:getToken(),//key值
        myClassList:[],//本人当天课程
        scheduleId:0,//调课课表id
        otherId:0,//他人课节id
        meId:0,//本人课节id
        otherClassList:[],//其他老师当天课程
        isClassLogin:1,//登录状态（1.管理员；2.老师；3.学生）
      }
    },
    created(){
      this.isClassLogin=getClass();
    },
    watch:{
      state(){
        this.$emit('changeAddState',2333);
        this.tname='';
      }
    },
    methods:{
      //取消
      cancel(){
        this.$emit('changeAddState');
      },
      //提交
      applySubmit(num){
        let data={};
        if(num==0){
          if(this.isClassLogin==2){
            //老师请假提交
            data={
              token:getToken(),
              start_time:this.leaveStart,
              end_time:this.leaveEnd,
              content:this.msg
            }
          }else{
            //学生请假提交
            data={
              token:getToken(),
              start_time:this.leaveStart,
              end_time:this.leaveEnd,
              leave_desc:this.msg
            };
          }
        }else if(num==1){
          data={
            token:getToken(),
            search_time:this.chooseTime,
            search_time_two:this.changeTime,
            content:this.msg,
            schedule_id:this.scheduleId,
            me_cid:this.meId,
            other_cid:this.otherId
          }
        }else{
          data={
            token:getToken(),
            substitute_time:this.chooseTime,
            schedule_id:this.scheduleId,
            contents_id:this.meId,
            teacher_id:this.teacherId,
            content:this.msg,
          }
        }
        this.$emit('submit',data)
      },
      leave_start(val){
        this.leaveStart=val;
      },
      leave_end(val){
        this.leaveEnd=val;
      },
      //调换日期，代课日期
      choose_time(val){
        this.chooseTime=val;
        //根据指定日期获取当天的课程
        att.my_class.call(this);
        if(this.state==2){
          //获取老师列表
          att.relieve_teacher.call(this);
        }
      },
      //找人调课时间
      change_time(val){
        this.changeTime=val;
        att.other_class.call(this);
      },
      //调课radio1
      changeRadio1(val){
        this.scheduleId=this.myClassList[val].schedule_id;
        this.meId=this.myClassList[val].contents_id;
      },
      //调课radio2
      changeRadio2(val){
        this.otherId=val;
      },
      //选择的老师ID
      teacherChoose(val){
        this.teacherId=val;
      }
    },

  })
</script>
<style lang="less" type="text/less">

</style>
