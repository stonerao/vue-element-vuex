import { api } from '@/api/login'
import { getToken } from '@/utils/auth'
import { quitRemoveAll } from '@/utils/auth'
const key = getToken()
export default {
    quitLogin(state) { 
        this.$http(api.quitLogin, {
            params: {
                token: getToken()
            }
        }).then((res) => {
            quitRemoveAll()
            if (res.data.status == 'true') {
                if (state == '1') { 
                    this.$router.push({ path: "/admin" })
                } else {
                    this.$router.push({ path: "/login" })
                }
            }
        })
    },
    bottom() {
        this.$http({
            method: "get",
            url: 'Admin/Footer/footer_index',
            params: {
                token: getToken()
            }
        }).then((res) => {

            this.txt = res.data.datas;

        })
    }
}