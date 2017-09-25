import {api} from '@/api/record'
import {getToken} from '@/utils/auth'
import {removeToken} from '@/utils/auth'
import {encodeUnicode} from '@/utils/auth'

export default {
    //查询
    recordCheck(code) {
        this.$http(api.recordCheck, {
            params: {
                token: getToken(),
                st_certificates_number: code
            }
        }).then((res) => {
            if (res.status === 200) {
                if(res.data.code!=400){
                    this.$notify({
                        message: res.data.data,
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                           this.l_query = false;
                        }
                    });
                }else{
                    this.$notify.error({
                        message: res.data.data.error
                    });
                }
            }else{
                this.$notify.error({
                    message: res.data.data.error
                });
            }
        })
    },
}