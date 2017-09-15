import { api } from '@/api/login'
import { getToken } from '@/utils/auth'
import { removeToken } from '@/utils/auth'
const key = getToken()
export default {
    quitLogin() {
        this.$http(api.quitLogin, {
            params: {
                token: getToken()
            }
        }).then((res) => {
            removeToken();

            if (res.data.status == 'true') {
                this.$router.push({ path: "/login" })
            }
        })
    },
    bottom() { 
        this.$http({
            method: "get",
            url: 'Admin/Footer/footer_index',
            params:{
                token: getToken()
            }
        }).then((res) => {
           
                this.txt = res.data.datas;
          
        })
    }
}