import {api} from '@/api/video'
import { getToken } from '@/utils/auth'
import Cookies from 'js-cookie'

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
  //发布视频--展示页面
  video_add_show(){
    this.$http(api.videoAddShow,{
      params:{
        token:getToken()
      }
    }).then((res)=>{
      if(res.data.code==200){
        // this.classList=res.data.data.department_list;
        // this.cataid=res.data.data.cataid;
        // this.writetoken=res.data.data.writetoken;
        this.classList=res.data.data;
        Cookies.set('cataid',res.data.data.cataid);
        Cookies.set('writetoken',res.data.data.writetoken);
      }
    })
  },
}
