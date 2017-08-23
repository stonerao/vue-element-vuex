import { api } from '@/api/index'
import { getToken } from '@/utils/auth'
export default{
    question_type(){
        this.$http(api.question_type,{
            params:{
                token:getToken()
            }
        }).then((res)=>{
            if(res.data.code){
                this.obj.questionClass=res.data.data;
            }
        })
    }
}