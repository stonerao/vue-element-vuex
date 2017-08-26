<template>
    <div class="kd-app-main kd-z-main">
        <titleItem :titleText="$route.name.substring(1)"></titleItem>
        <div class="kd-box">
            <div class="kd-app-box">
                <titleActive :titles="titleItem" @Transfer="emitTransfer" :state="state"></titleActive>
            </div>
            <div class="kd-box-content">
                <description :prompts="prompts" @PromPts="promptsTem"></description>
                <!--请假管理-->
                <div v-if="state==0&&addState!=1">
                  <applyLeave :underTeacherList="underTeacherList" :isClassLogin="isClassLogin" :total="total" :checkTypeList="checkTypeList" :list="leaveList" @apply="showAdd" @typeChange="changeType" @leaveApply="applyLeave" @ChooseTeacher="teacherChoose"></applyLeave>
                </div>
                <!--调课管理-->
                <div v-if="state==1&&addState!=1">
                  <changeClass :total="total" :checkTypeList="checkTypeList" :list="changeList" :underTeacherList="underTeacherList" @ChooseTeacher="teacherChoose" @apply="showAdd" @typeChange="changeType"></changeClass>
                </div>
                <!--代课管理-->
                <div v-if="state==2&&addState!=1">
                  <relieveClass :total="total" :checkTypeList="checkTypeList" :list="relList" @apply="showAdd" @typeChange="changeType" :underTeacherList="underTeacherList" @ChooseTeacher="teacherChoose" ></relieveClass>
                </div>
                <!--考勤统计(老师和学生自己的)-->
                <div v-if="state==3">
                  <attendance :total="total" :list="attList" :isClassLogin="isClassLogin" @attTimeChange="attTimeChange" :underTeacherList="underTeacherList" @ChooseTeacher="teacherChoose" ></attendance>
                </div>
                <!--待我审批-->
              <div v-if="state==4">
                <waitApprove :total="total" :checkTypeList="checkTypeList" :list="waitList" @apply="showAdd" @typeChange="changeType" @chooseApprove="approveChoose"></waitApprove>
              </div>
              <!--学生请假申请-->
              <div v-if="state==8">
                <stuApply :list="stuApplyList" :total="total" @typeChange="changeType" @leaveApply="applyLeave"></stuApply>
              </div>
              <!--学校中心老师考勤-->
              <div v-if="state==5">
                <sAttendance :total="total" :list="sAttList" :state="state"></sAttendance>
              </div>
              <!--学校中心学生考勤-->
              <div v-if="state==6">
                <sAttendance :total="total" :list="sAttList" :state="state"></sAttendance>
              </div>
              <!--学校中心班级考勤-->
              <div v-if="state==7">
                <sAttendance :total="total" :list="sAttList" :gradeList="gradeList" :classList="classList" :lessonList="lessonList" :state="state" @changeType="chooseClass" @chooseClass="classChoose" @getSList="getsAttList"></sAttendance>
              </div>
                <!--填写申请-->
                <div v-if="addState==1">
                  <applyAdd :state="state" @changeAddState="changeAdd" @submit="submitApply"></applyAdd>
                </div>
                <div class="kd-page" v-else>
                <el-row>
                  <el-col :span="24">
                    <el-pagination class="float-right" :current-page="currentPage" :page-sizes="[10, 15, 20, 25]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                    </el-pagination>
                  </el-col>
                </el-row>
              </div>
            </div>
            <bottomItem></bottomItem>
        </div>
    </div>
</template>

<script>
import titleItem from '@/components/main/title.vue'
import titleActive from '@/components/main/titleActive.vue'
import description from '@/components/main/description.vue'
import bottomItem from '@/components/bottom/bottom.vue'
import applyAdd from '@/components/attendance/applyAdd'
import applyLeave from '@/components/attendance/applyLeave'
import changeClass from '@/components/attendance/changeClass'
import relieveClass from '@/components/attendance/relieveClass'
import attendance from '@/components/attendance/attendance'
import waitApprove from '@/components/attendance/waitApprove'
import sAttendance from '@/components/attendance/sAttendance'
import stuApply from '@/components/attendance/stuApplyLeave'
import att from '@/utils/attendance'
import { getClass } from '@/utils/auth'
import { getToken } from '@/utils/auth'
export default {
    data() {
        return {
            titleItem: [],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 0,
            addState:0,//显示申请页面
            promptsPad: true,
            total:0,//总条数
            currentPage:1,//当前页
            pageSize:10,//每页显示数量
            status:'',//审核状态
            checkTypeList:[],//审批的几种状态
            relList:[],//代课列表
            leaveList:[],//请假列表
            changeList:[],//调课列表
            attList:[],//考勤列表
            waitList:[],//待我审批列表
            searchMsg:'',//搜索
            Msg:'',//左下角选择框
            isClassLogin:1,//登录状态（1.管理员；2.老师；3.学生）
            stime:'',//考勤统计时间开始
            etime:'',//考勤统计时间结束
            underTeacherList:{},//获取某老师所处节点及向下所有节点的组织部门ID+老师ID+老师姓名
            stuApplyList:[],//学生请假申请列表
            sAttList:[],//学校中心考勤列表
            gradeList:[],//学校中心班级年级列表
            classList:[],//学校中心班级班级列表
            lessonList:[],//学校中心班级课节列表
        }
    },
    created() {
      this.refreshList();
      this.isClassLogin=getClass();
      if(this.isClassLogin==2){
        this.titleItem=[
          { name: "请假管理", index: 0 },
          { name: "调课管理", index: 1 },
          { name: "代课管理", index: 2 },
          { name: "考勤统计", index: 3 },
          { name: "待我审批", index: 4 },
          { name: "学生请假", index: 8 }
        ]
      }else if(this.isClassLogin==1){
        this.titleItem=[
          { name: "请假管理", index: 0 },
          { name: "老师考勤", index: 5 },
          { name: "学生考勤", index: 6 },
          { name: "班级考勤", index: 7 },
        ]
      }else{
        this.titleItem=[
          { name: "请假管理", index: 0 },
          { name: "考勤统计", index: 3 },
        ]
      };
      att.under_teacher_list.call(this);
    },
    components: {
        titleItem, titleActive, description, bottomItem,applyAdd,applyLeave,changeClass,relieveClass,attendance,waitApprove,sAttendance,stuApply
    },
    methods: {
        emitTransfer(index) {
            if (this.state == index) {
                return
            }
            this.state = index;
        },
        promptsTem(status) {
            console.log(status)
        },
        //关闭填写申请页面
        changeAdd(num){
          this.addState=0;
          console.log(num);
        },
        //显示填写申请页面
        showAdd(){
          this.addState=1;
        },
        //提交申请
        submitApply(data){
          this.$confirm('此操作将发送您的申请, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if(this.state==0){
              att.apply_leave.call(this,data);
            }else if(this.state==1){
              att.apply_change.call(this,data);
            }else{
              att.apply_relieve.call(this,data)
            }
            this.refreshList();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消发送'
            });
          });
        },
      //更新列表
      refreshList(){
        if(this.state==0){
          att.leave_list.call(this);
        }else if(this.state==1){
          att.change_list.call(this);
        }else if(this.state==2){
          att.relieve_list.call(this);
        }else if(this.state==3){
          att.attendance_list.call(this)
        }else if(this.state==4){
          att.approve_list.call(this)
        }else if(this.state==8){
          att.stu_apply_list.call(this)
        }else{
          att.s_attendance_list.call(this)
        }
      },
      //每页条数变化
      handleSizeChange(val) {
        this.pageSize=val;
        this.refreshList();
      },
      //点击翻页
      handleCurrentChange(val) {
        this.currentPage=val;
        this.refreshList();
      },
      //审核状态选择(请假管理、调课管理、代课管理、待我审批、学生请假)
      changeType(val){
        this.status=val;
        this.refreshList();
      },
      //老师待我审批同意或拒绝
      approveChoose(num,id){
        if(num==2){
          this.$confirm('确定同意吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            att.approve_choose.call(this,num,id);

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消发送'
            });
          });
        }else{
          this.$confirm('确定拒绝吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            att.approve_choose.call(this,num,id);
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消发送'
            });
          });
        }
      },
      //请假审批(学校中心和老师中心)
      applyLeave(num,id){
        if(num==2){
          this.$confirm('确定同意申请吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //学校中心老师请假审批
            if(this.isClassLogin==1){
              att.sapply_leave.call(this,num,id)
            }else{
              //老师中心学生请假审批
              att.stu_apply_approve.call(this,num,id)
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消发送'
            });
          });
        }else{
          this.$confirm('确定拒绝申请吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //学校中心老师请假审批
            if(this.isClassLogin==1){
              att.sapply_leave.call(this,num,id)
            }else{
              //老师中心学生请假审批
              att.stu_apply_approve.call(this,num,id)
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消发送'
            });
          });
        }
      },
      //考勤统计时间选择
      attTimeChange(stime,etime){
        this.stime=stime;
        this.etime=etime;
        this.refreshList();
      },
      //获取某老师所处节点及向下所有节点的组织部门ID+老师ID+老师姓名
      teacherChoose(){
        this.refreshList();
      },
      //学校中心班级考勤(获取班/年级数据)
      chooseClass(type,pid){
        this.classList=[];
        this.lessonList=[];
        att.s_attendance_list.call(this,type,pid);
      },
      //学校中心班级考勤(获取课节)
      classChoose(id,time){
        att.get_schedule_lesson.call(this,id,time)
      },
      //学校中心班级考勤(获取考勤列表)
      getsAttList(data){
        this.sAttList=[];
        if(this.state==7){
          //班级考勤列表
          att.show_classstudent_static.call(this,data)
        }else{
          //老师学生考勤
          att.sAttendanceList.call(this,this.state,data)
        }
      },
    },
    watch:{
      addState(){
        this.refreshList();
      },
      state(){
        this.currentPage=1;
        this.pageSize=10;
        this.total=0;
        this.sAttList=[];
        this.refreshList();
      }
    }

}
</script>

<style type="text/less" lang="less">
  .hidden{
    display: none;
  }
</style>
