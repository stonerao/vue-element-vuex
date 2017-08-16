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
                  <applyLeave :isClassLogin="isClassLogin" :total="total" :checkTypeList="checkTypeList" :list="leaveList" @apply="showAdd" @typeChange="changeType" @leaveApply="applyLeave"></applyLeave>
                </div>
                <!--调课管理-->
                <div v-if="state==1&&addState!=1">
                  <changeClass :total="total" :checkTypeList="checkTypeList" :list="changeList" @apply="showAdd" @typeChange="changeType"></changeClass>
                </div>
                <!--代课管理-->
                <div v-if="state==2&&addState!=1">
                  <relieveClass :total="total" :checkTypeList="checkTypeList" :list="relList" @apply="showAdd" @typeChange="changeType"></relieveClass>
                </div>
                <!--考勤统计-->
                <div v-if="state==3">
                  <attendance :total="total" :list="attList" :isClassLogin="isClassLogin" @sAttendance="attendanceList"></attendance>
                </div>
                <!--待我审批-->
              <div v-if="state==4">
                <waitApprove :total="total" :checkTypeList="checkTypeList" :list="waitList" @apply="showAdd" @typeChange="changeType" @chooseApprove="approveChoose"></waitApprove>
              </div>
                <!--填写申请-->
                <div v-if="addState==1">
                  <applyAdd :state="state" @changeAddState="changeAdd" @submit="submitApply"></applyAdd>
                </div>
                <div class="kd-page" v-else>
                <el-row>
                  <!--<el-col :span="12" style="padding-left:15px">-->
                    <!--<el-select v-model="Msg" placeholder="请选择" size="small" class="margin-left">-->
                      <!--<el-option v-for="item in attList" :key="item.leave_desc" :label="item.leave_desc" :value="item.sign_leaveid">-->
                      <!--</el-option>-->
                    <!--</el-select>-->
                  <!--</el-col>-->
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
import att from '@/utils/attendance'
import { getClass } from '@/utils/auth'
export default {
    data() {
        return {
            titleItem: [
                { name: "请假管理", index: 0 },
                { name: "调课管理", index: 1 },
                { name: "代课管理", index: 2 },
                { name: "考勤统计", index: 3 },
                { name: "待我审批", index: 4 },
            ],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 3,
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
        }
    },
    created() {
      this.refreshList();
//      this.isClassLogin=getClass();
      if(this.isClassLogin==2){
        this.titleItem=[
          { name: "请假管理", index: 0 },
          { name: "调课管理", index: 1 },
          { name: "代课管理", index: 2 },
          { name: "考勤统计", index: 3 },
          { name: "待我审批", index: 4 }
        ]
      }else{
        this.titleItem=[
          { name: "请假管理", index: 0 },
          { name: "考勤统计", index: 3 }
        ]
      }
    },
    components: {
        titleItem, titleActive, description, bottomItem,applyAdd,applyLeave,changeClass,relieveClass,attendance,waitApprove
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
          if(this.isClassLogin==1){

          }else if(this.isClassLogin==2){
            att.attendance_list.call(this)
          }else{

          }
        }else{
          att.approve_list.call(this)
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
      //审核状态选择(请假管理、调课管理、代课管理、待我审批)
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
      //学校中心老师请假审批
      applyLeave(num,id){
        if(num==2){
          this.$confirm('确定同意吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            att.sapply_leave.call(this,num,id)
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
            att.sapply_leave.call(this,num,id)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消发送'
            });
          });
        }
      },
      //考勤管理
      attendanceList(val){
        att.attendance_list.call(this,val)
      }
    },
    watch:{
      addState(){
        this.refreshList();
      },
      state(){
        this.currentPage=1;
        this.pageSize=10;
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
