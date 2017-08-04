import { api } from '@/api/login'
import utils from '@/utils' 
export default {
    login(form) {
        this.$http({
            url: api.login,
            method: 'post',
            data: form

        }).then((res) => {
            if (res.data.status === "true") {
                utils.setCookieAdmin(res.data.token);
                this.checked ? utils.setCookie("ISLOGIN", true) : utils.setCookie("ISLOGIN", false)
                this.$notify({
                    message: res.data.msg,
                    type: 'success',
                    duration: 1000,
                    onClose: () => {
                        this.$router.push({ path: '/' })
                    }
                });
            }
        })
    },
    adminLogin(form) {
        // 登录
        this.$http({
            url: api.adminLogin,
            method: 'post',
            data: form
        }).then((res) => {
            if (res.data.status === "true") {
                utils.setCookieAdmin(res.data.token);
                this.checked ? utils.setCookie("ISLOGIN", true) : utils.setCookie("ISLOGIN", false)
                this.$notify({
                    message: res.data.msg,
                    type: 'success',
                    duration: 1000,
                    onClose: () => {
                        this.$router.push({ path: '/' })
                    }
                });
            }
        })
    },
    adminLoginCode() {
        // 获取验证码
        this.$http(api.adminLoginCode).then((res) => {
            if (res.status == 200) {
                this.codeSrc = res.data.code_img;
            }
        })
    }, loginCode() {
        // 获取验证码
        this.$http(api.loginCode).then((res) => {
            if (res.status == 200) {
                this.codeSrc = res.data.code_img;
            }
        })
    },

}