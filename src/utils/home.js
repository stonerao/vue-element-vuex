import { api } from '@/api/index'
import { getToken } from '@/utils/auth'

export default {
    studentclass_info() {
        this.$http(api.studentclass_info, {
            params: {
                token: getToken()
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.t_data = res.data.data.model_common;
            }
        })
    },
    studentIndexHome() {
        this.$http({
            method: "post",
            data: {
                token: getToken()
            },
            url: api.studentIndexHome
        }).then((res) => {
            if (res.data.code == 200) {
                this.obj = res.data.data
            }
        })
    }
}