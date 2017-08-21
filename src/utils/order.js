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
        this.orderList=res.data.datas;
        this.total=parseInt(res.data.page_total);
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
        this.orderList=res.data.datas;
        this.total=parseInt(res.data.page_total);
      })
    }
    console.log(getToken())
  },
  t_delete(){
    let isClass=getClass();
    if(isClass==2){
      this.$http(api.teaDelete,{
        params:{
          order_id:this.orderId,
          token:getToken()
        }
      }).then((res)=>{
        console.log(res)
        if(res.data.code==200){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.refreshList();
        }
      })
    }else{
      this.$http(api.stuDelete,{
        params:{
          order_id:this.orderId,
          token:getToken()
        }
      }).then((res)=>{
        console.log(res)
        if(res.data.code==200){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.refreshList();
        }
      })
    }

  }
}
