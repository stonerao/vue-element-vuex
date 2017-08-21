import {api} from '@/api/order'
import { getToken } from '@/utils/auth'
import { getClass } from '@/utils/auth'

export default {
  order_list(){
    let isClass=getClass();
    if(isClass==3){
      this.$http(api.stuList,{
        params:{
          token:getToken(),
          page:this.currentPage,
          curpage:this.pageSize,
          query_start_time:this.sTime,
          query_end_time:this.eTime
        }
      }).then((res)=>{
        console.log(res)
        this.orderList=res.data.datas;
      })
    }else{
      this.$http(api.teaList,{
        params:{
          token:getToken(),
          page:this.currentPage,
          curpage:this.pageSize,
          query_start_time:this.sTime,
          query_end_time:this.eTime
        }
      }).then((res)=>{
        console.log(res)
        this.orderList=res.data.datas;
      })
    }
    console.log(getToken())
  }
}
