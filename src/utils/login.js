import { api } from '@/api/login'
import { setToken } from '@/utils/auth'
import { isClassLogin } from '@/utils/auth'
import utils from '@/utils'
export default {
    login(form) {
        this.$http({
            url: api.login,
            method: 'post',
            data: form
        }).then((res) => {
            if (res.data.status === "true") {
                isClassLogin(2)
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
            }else{
              this.$notify.error({
                message: res.data.msg
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
                isClassLogin(1)
                setToken(res.data.token);
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
    },
    loginCode() {
        // 获取验证码
        this.$http(api.loginCode).then((res) => {
            if (res.status == 200) {
                this.codeSrc = res.data.code_img;
            }
        })
    },
    studentLogin(){
      this.$http({
        url:api.studentLogin,
        method:'post',
        data:{
          member_name:this.form.username,
          password:this.form.password
        }
      }).then((res)=>{
        if(res.data.status == true){
          isClassLogin(3)
          utils.setCookieAdmin(res.data.data);
          this.checked ? utils.setCookie("ISLOGIN", true) : utils.setCookie("ISLOGIN", false)
          this.$notify({
            message: '登录成功!',
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.$router.push({ path: '/' })
            }
          });
        }
      })
    }

}
