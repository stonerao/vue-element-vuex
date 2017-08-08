import { api } from '@/api/grade'
const key = getToken()
export default {
    quitLogin(){
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