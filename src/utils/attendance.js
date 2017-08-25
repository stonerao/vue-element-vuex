import {api} from '@/api/attendance'
import { getToken } from '@/utils/auth'
import { getClass } from '@/utils/auth'

export default {
  // 请假列表(学生列表接口等待修改)
  leave_list(){
    const isClass=getClass();
    if(isClass==2){
      //老师进入
      this.$http(api.leaveList,{
        params:{
          token:getToken(),
          page:this.currentPage,
          pagesize:this.pageSize,
          status:this.status
        }
      }).then((res)=>{
        this.leaveList=res.data.data.list;
        this.currentPage=res.data.data.page;
        this.total=parseInt(res.data.data.rows);
        let arr=res.data.data.stutas;
        this.checkTypeList=[];
        for(let i=1;i<4;i++){
          let obj={};
          obj.value=i;
          obj.name=arr[i];
          this.checkTypeList.push(obj);
        }
        console.log(getToken())
      })
    }else if(isClass==1){
      this.$http(api.sleaveLlist,{
        params:{
          token:getToken(),
          page:this.currentPage,
          pagesize:this.pageSize,
          status:this.status
        }
      }).then((res)=>{
        console.log(res)
        this.leaveList=res.data.data.list;
        this.currentPage=res.data.data.page;
        this.total=parseInt(res.data.data.rows);
        let arr=res.data.data.stutas;
        this.checkTypeList=[];
        for(let i=1;i<4;i++){
          let obj={};
          obj.value=i;
          obj.name=arr[i];
          this.checkTypeList.push(obj);
        }
      })
    }else{
      //学生请假列表
      this.$http(api.stuleaveList,{
        params:{
          token:getToken(),
          page:this.currentPage,
          curpage:this.pageSize,
        }
      }).then((res)=>{
        console.log(res)
        this.leaveList=res.data.data;
      })
    }
  },
  //请假申请提交
  apply_leave(data){
    const isClass=getClass();
    if(isClass==2){
      this.$http({
        url:api.applyLeave,
        method:'post',
        data:data
      }).then((res)=>{
        if(res.data.code==200){
          this.$message({
            message: res.data.data,
            type: 'success'
          });
          this.addState=0;
        }else{
          this.$message.error(res.data.data.error)
        }
      })
    }else{
      data.start_time=Date.parse(data.start_time);
      data.end_time=Date.parse(data.end_time);
      console.log(data)
      this.$http({
        url:api.stuApplyLeave,
        method:'post',
        data:data
      }).then((res)=>{
        console.log(res)
        if(res.data.code==200){
          this.$message({
            message: res.data.data,
            type: 'success'
          });
          this.addState=0;
        }else{
          this.$message.error(res.data.data.error)
        }
      })
    }
  },
  // 调课列表
  change_list(){
    this.$http(api.changeClass,{
      params:{
        token:getToken(),
        page:this.currentPage,
        pagesize:this.pageSize,
        status:this.status
      }
    }).then((res)=>{
      if(res.data.code==200){
        this.changeList=res.data.data.list;
        this.currentPage=res.data.data.page;
        this.total=parseInt(res.data.data.rows);
        let arr=res.data.data.stutas;
        this.checkTypeList=[];
        for(let i=1;i<4;i++){
          let obj={};
          obj.value=i;
          obj.name=arr[i];
          this.checkTypeList.push(obj);
        }
      }
    })
  },
  // 我的当日课程
  my_class(){
    this.$http(api.myClass,{
      params:{
        token:getToken(),
        search_time:this.chooseTime
      }
    }).then((res)=>{
      console.log(res);
      if(res.data.code==200){
        this.myClassList=res.data.data;
      }
    })
  },
  // 他人当日课程
  other_class(){
    this.$http(api.otherClass,{
      params:{
        token:getToken(),
        search_time_two:this.changeTime,
        schedule_id:this.scheduleId,
        contents_id:this.meId
      }
    }).then((res)=>{
      if(res.data.code==200){
        this.otherClassList=res.data.data;
      }else{
        this.$message.error(res.data.data.error)
      }
    })
  },
  //调课申请提交
  apply_change(data){
    this.$http({
      url:api.applyChange,
      method:'post',
      data:data
    }).then((res)=>{
      if(res.data.code==200){
        this.$message({
          message: res.data.data,
          type: 'success'
        });
        this.addState=0;
      }else{
        this.$message.error(res.data.data.error)
      }
    })
  },
  // 代课列表
  relieve_list(){
    this.$http(api.relieveList,{
      params:{
        token:getToken(),
        page:this.currentPage,
        pagesize:this.pageSize,
        status:this.status
      }
    }).then((res)=>{
      console.log(res)
      this.relList=res.data.data.list;
      this.currentPage=res.data.data.page;
      this.total=parseInt(res.data.data.rows);
      let arr=res.data.data.stutas;
      this.checkTypeList=[];
      for(let i=1;i<4;i++){
        let obj={};
        obj.value=i;
        obj.name=arr[i];
        this.checkTypeList.push(obj);
      }
    })
  },
  //获取同科目的老师
  relieve_teacher(){
    this.$http(api.relieveTeacher,{
      params:{
        token:getToken(),
        contents_id:this.meId
      }
    }).then((res)=>{
      if(res.data.code==200){
        this.teacherList=res.data.data;
      }
    })
  },
  //代课申请提交
  apply_relieve(data){
    this.$http({
      url:api.applyRelieve,
      method:'post',
      data:data
    }).then((res)=>{
      if(res.data.code==200){
        this.$message({
          message: res.data.data,
          type: 'success'
        });
        this.addState=0;
      }else{
        this.$message.error(res.data.data.error)
      }
    })
  },
  //考勤记录(未做完)
  attendance_list(){
    const isClass=getClass();
    if(isClass==2){
      //老师个人考勤记录
      this.$http(api.attendanceList,{
        params:{
          token:getToken(),
          page:this.currentPage,
          pagesize:this.pageSize,
          start_time:this.stime,
          end_time:this.etime
        }
      }).then((res)=>{
        if(res.data.code==200){
          this.total=res.data.data.rows;
          this.attList=res.data.data.list;
        }
      })
    }else{
      //学生考勤记录
      this.$http(api.stuAttendanceList,{
        params:{

        }
      }).then((res)=>{

      })
    }
  },
  //审核调课/代课列表
  approve_list(){
    this.$http(api.approveList,{
      params:{
        token:getToken(),
        page:this.currentPage,
        pagesize:this.pageSize,
        status:this.status
      }
    }).then((res)=>{
      if(res.data.code==200){
        console.log(res)
        this.waitList=res.data.data.list;
        this.currentPage=res.data.data.page;
        this.total=parseInt(res.data.data.rows);
        let arr=res.data.data.stutas;
        this.checkTypeList=[];
        for(let i=1;i<4;i++){
          let obj={};
          obj.value=i;
          obj.name=arr[i];
          this.checkTypeList.push(obj);
        }
      }
    })
  },
  //老师调课/代课审批
  approve_choose(num,id){
    this.$http(api.approveChoose,{
      params:{
        token:getToken(),
        id:id,
        status:num
      }
    }).then((res)=>{
      if(res.data.code==200){
        this.$message({
          message: res.data.data,
          type: 'success'
        });
        this.refreshList();
      }
    })
  },
  //老师请假审批
  sapply_leave(num,id){
    this.$http(api.sapplyLeave,{
      params:{
        token:getToken(),
        sign_leaveid:id,
        status:num
      }
    }).then((res)=>{
      if(res.data.code==200){
        this.$message({
          message: res.data.data,
          type: 'success'
        });
        this.refreshList();
      }
    })
  },
  //获取某老师所处节点及向下所有节点的组织部门ID+老师ID+老师姓名
  under_teacher_list(){
    this.$http(api.underTeacherList,{
      params:{
        token:getToken()
      }
    }).then((res)=>{
      if(res.data.code==200){
        this.underTeacherList=res.data.data;
      }
    })
  },
  //学生请假申请列表
  stu_apply_list(){
    this.$http(api.stuApplyList,{
      params:{
        token:getToken(),
        apply_stutas:this.status
      }
    }).then((res)=>{
      if(res.data.code==200){
        this.total=res.data.all_pagecount;
        this.stuApplyList=res.data.data;
      }
    })
  },
  //处理学生请假
  stu_apply_approve(num,id){
    this.$http(api.stuApplyApprove,{
      params:{
        token:getToken(),
        sign_leaveid:id,
        apply_stutas:num
      }
    }).then((res)=>{
      if(res.data.code==200){
        this.$message({
          message: res.data.data,
          type: 'success'
        });
        this.refreshList();
      }
    })
  },
  //学校中心班级考勤记录（获取年级和班级）
  s_attendance_list(type,pid){
    this.$http(api.gradeList,{
      params:{
        token:getToken(),
        type:type,
        pid:pid
      }
    }).then((res)=>{
      if(res.data.code==200){
        if(type==1){
          if(pid==""){
            this.gradeList=res.data.data;
          }else{
            this.classList=res.data.data;
          }
        }else{
          this.classList=res.data.data;
        }
      }
    })
  },
  //学校中心班级考勤记录（获取课节)
  get_schedule_lesson(id,time){
    this.$http(api.getScheduleLesson,{
      params:{
        token:getToken(),
        search_time:time,
        department_id:id
      }
    }).then((res)=>{
      if(res.data.code==200){
        this.lessonList=res.data.data;
      }
    })
  },
  //学校中心班级考勤记录（查看班级学生考勤统计)
  show_classstudent_static(data){
    this.$http(api.showClassStudentStatic,{
      params:data
    }).then((res)=>{
      if(res.data.code==200){
        this.sAttList.push(res.data.data);
      }
    })
  },
  //学校中心查看学生/老师考勤统计
  sAttendanceList(state,data){
    if(state==6){
      //学生考勤
      this.$http(api.sstudentAttendance,{
        params:data
      }).then((res)=>{
        if(res.data.code==200){
          this.sAttList=res.data.data;
        }
      })
    }else{
      //老师考勤
      this.$http(api.steacherAttendance,{
        params:data
      }).then((res)=>{
        if(res.data.code==200){
          this.sAttList=res.data.data;
        }
      })
    }
  }
}
