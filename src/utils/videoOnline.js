import {api} from '@/api/videoOnline'
import { getToken ,getClass} from '@/utils/auth'

export default {
  //发布直播--展示页面
  live_add(){
    this.$http(api.liveAdd,{
      params:{
        token:getToken()
      }
    }).then((res)=>{
      this.addShowList=res.data.data
    })
  },
  //发布直播
  live_add_submit(data){
    this.$http({
      url:api.liveAddSubmit,
      method:'post',
      data:data
    }).then((res)=>{
      if(res.data.code==200){
        this.$message({
          message: res.data.data,
          type: 'success'
        });
        this.addOnline=0;
        this.refreshList();
      }else{
        this.$message.error(res.data.data.error)
      }
    })
  },
  video_list(){
    this.$http(api.videoList,{
      params:{
        token:getToken(),
        curpage:this.pageSize,
        keywords:this.searchTxt,
        page:this.currentPage,
        state:this.checkType
      }
    }).then((res)=>{
      if(res.data.code==200){
        this.total=res.data.all_pagecount;
        let arr=res.data.data;
        for(let i=0;i<res.data.data.length;i++){
          if(arr[i].cancel_state==1){
            arr[i].cancel_state='false'
          }else{
            arr[i].cancel_state='true'
          }
        }
        this.videoList=arr;
        console.log(this.videoList)
      }
    })
  }
}
