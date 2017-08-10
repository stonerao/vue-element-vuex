import { api } from '@/api/grade'
import { getToken } from '@/utils/auth'
import { removeToken } from '@/utils/auth'
const key = getToken()
export default {
    timetable_list(){
        this.$http(api.quitLogin,{
            params:{
                token:key
            }
        }).then((res)=>{
            removeToken();
            res.data.status=='true'?history.go(0):'';
        })
    }
}