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
        console.log(233)
        this.firstClassList=res.data.datas;
      }
    })
  },

}
