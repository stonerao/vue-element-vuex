import {api} from '@/api/video'
import { getToken } from '@/utils/auth'


export default {
  first_class_list(){
    this.$http(api.firstClassList,{
      params:{
        token:getToken()
      }
    }).then((res)=>{
      console.log(getToken())
      if(res.data.code==200){
        this.firstClassList=res.data.data;
      }
    })
  },
  //下级视频分类
  under_class_list(id,num){
    this.$http(api.underClassList,{
      params:{
        token:getToken(),
        vc_id:id
      }
    }).then((res)=>{
      if(res.data.code==200){
        let arr=res.data.data;
        const i=arr.length;
        if(num==2){
          this.underList.secondList=res.data.data;
          if(i!=0){
            this.showList=2;
          }else{
            this.showList=1;
          }
        }else if(num==3){
          this.underList.thirdList=res.data.data;
          if(i!=0){
            this.showList=3;
          }else{
            this.showList=2;
          }
        }else if(num==4){
          this.underList.fourList=res.data.data;
          if(i!=0){
            this.showList=4;
          }else{
            this.showList=3;
          }
        }else if(num==5){
          this.underList.fiveList=res.data.data;
          if(i!=0){
            this.showList=5;
          }else{
            this.showList=4;
          }
        }

      }
    })
  },
  //视频列表
  video_list(){
      this.$http(api.videoList,{
        params:{
          token:getToken(),
          curpage:this.pageSize,
          class_id:this.classId,
          keywords:this.searchTxt,
          page:this.currentPage
        }
      }).then((res)=>{
        if(res.data.code==200){
          this.total=res.data.all_pagecount;
          this.classList=res.data.data;
        }
      })
  },
  //学校--删除视频(等数据检测)
  video_delete(id){
    this.$http(api.videoDelet,{
      params:{
        token:getToken(),
        id:id
      }
    }).then((res)=>{
      if(res.data.code==200){
        this.$message({
          message: res.data.data,
          type: 'success'
        });
        this.refreshList();
      }else{
        this.$message.error(res.data.data.error)
      }
    })
  },
  //学校--视频详情
  video_info(id){
    this.$http(api.videoInfo,{
      params:{
        token:getToken(),
        id:id
      }
    }).then((res)=>{
      if(res.data.code==200){
        this.videoId=res.data.data.vid;
      }
    })
  },
}
