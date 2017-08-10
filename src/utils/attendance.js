import {api} from '@/api/attendance'
import { getToken } from '@/utils/auth'
const key = getToken();
export default {
  leave_list(){
    this.$http(api.leaveList,{
      params:{
        token:key,
        page:this.currentPage,
        pagesize:this.pageSize,
        // status:this.status
      }
    }).then((res)=>{

    })
  }
}
