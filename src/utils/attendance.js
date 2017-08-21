import {api} from '@/api/attendance'
import { getToken } from '@/utils/auth'
import { getClass } from '@/utils/auth'

export default {
  // 请假列表
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
  //考勤记录
  attendance_list(){
    const isClass=getClass();
    if(isClass==1){

    }else if(isClass==2){
      //老师个人考勤记录
      this.$http(api.attendanceList,{
        params:{
          token:getToken(),
          page:this.currentPage,
          pagesize:this.pageSize,
        }
      }).then((res)=>{

      })
    }else{

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
  }
}
