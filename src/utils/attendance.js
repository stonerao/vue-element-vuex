import {api} from '@/api/attendance'
import { getToken } from '@/utils/auth'
export default {
  // 请假列表
  leave_list(){
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
  },
  //请假申请提交
  apply_leave(data){
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
      }
    })
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
        schedule_id:this.scheduleId
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
        console.log(res)
      }
    })
  },
}
