import {api} from '@/api/attendance'
import { getToken } from '@/utils/auth'
const key = getToken();
export default {
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
    })
  },
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
  }
}
