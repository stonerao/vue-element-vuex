import {api} from '@/api/order'
import { getToken } from '@/utils/auth'
import { getClass } from '@/utils/auth'

export default {
  // 教材订单
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
  // 教材订单删除
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

  },
  // 空间订单
  space_list(){
    let isClass=getClass();
    // 老师中心空间订单
    if(isClass==2){
      this.$http(api.teaSpaceList,{
        params:{
          token:getToken(),
          page:this.currentPage,
          curpage:this.pageSize,
          query_start_time:this.sTime,
          query_end_time:this.eTime
        }
      }).then((res)=>{
        if(res.data.code==200){
          this.total=parseInt(res.data.all_pagecount);
          this.spaceList=res.data.datas;
        }
      })
    }else{
      //学生中心空间订单
      this.$http(api.stuSpaceList,{
        params:{
          token:getToken(),
          page:this.currentPage,
          curpage:this.pageSize,
          query_start_time:this.sTime,
          query_end_time:this.eTime
        }
      }).then((res)=>{
        this.total=parseInt(res.data.all_pagecount);
        this.spaceList=res.data.datas;
      })
    }
  },
  //空间订单删除
  space_list_delete(){
    let isClass=getClass();
    //老师中心空间订单删除
    if(isClass==2){
      this.$http(api.teaSpaceDelete,{
        params:{
          token:getToken(),
          order_id:this.orderId
        }
      }).then((res)=>{
        if(res.data.code==200){
          this.$message({
            type: 'success',
            message: res.data.datas
          });
          this.refreshList();
        }
      })
    }else{
      //学生中心空间订单删除
      this.$http(api.stuSpaceDelete,{
        params:{
          token:getToken(),
          order_id:this.orderId
        }
      }).then((res)=>{
        if(res.data.code==200){
          this.$message({
            type: 'success',
            message: res.data.datas
          });
          this.refreshList();
        }
      })
    }
  },
  //空间购买
  space_list_buy(){
    let isClass=getClass();
    // //老师中心空间订单购买
    // if(isClass==2){
    //   this.$http(api.teaSpaceBuy,{
    //     params:{
    //       token:getToken(),
    //       order_id:this.orderId
    //     }
    //   }).then((res)=>{
    //     if(res.data.code==200){
    //       this.$message({
    //         type: 'success',
    //         message: res.data.datas
    //       });
    //       this.refreshList();
    //     }
    //     console.log(this.orderId,getToken())
    //     console.log(res)
    //   })
    // }else{
    //   //学生中心空间订单购买
    //   this.$http(api.stuSpaceBuy,{
    //     params:{
    //       token:getToken(),
    //       order_id:this.orderId
    //     }
    //   }).then((res)=>{
    //     if(res.data.code==200){
    //       this.$message({
    //         type: 'success',
    //         message: res.data.datas
    //       });
    //       this.refreshList();
    //     }
    //   })
    // }
  }
}
