import { api } from '@/api/login'
import { setToken } from '@/utils/auth'
import { getToken } from '@/utils/auth'
import { isClassLogin } from '@/utils/auth'
import { setCookie } from '@/utils/auth' 
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
                        this.$router.push({ path: '/teacherindex' })
                    }
                });
            } else {
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
    studentLogin() {
        this.$http({
            url: api.studentLogin,
            method: 'post',
            data: {
                member_name: this.form.username,
                password: this.form.password
            }
        }).then((res) => {
            if (res.data.status == true) {
                isClassLogin(3)
                utils.setCookieAdmin(res.data.data);
                this.checked ? utils.setCookie("ISLOGIN", true) : utils.setCookie("ISLOGIN", false)
                this.$notify({
                    message: '登录成功!',
                    type: 'success',
                    duration: 1000,
                    onClose: () => {
                        this.$router.push({ path: '/students' })
                    }
                });
            } else {
                this.$notify.error({
                    title: '错误',
                    message: res.data.data.error
                });
            }
        }).then(() => {
            setTimeout((x) => {
                this.$http(api.is_file_certification, {
                    params: {
                        token: getToken()
                    }
                }).then((ret) => {
                    if (ret.data.code == 200) {

                    } else {
                        this.$confirm(ret.data.data.error, '提示', {
                            confirmButtonText: '立即去缴纳',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            setCookie("filepay",'0')
                        }).catch(() => { 
                            this.$message({
                                type: 'info',
                                message: '取消输入'
                            });
                        });
                    }
                })
            }, 1000)
        })
    },
    teacherPwd(obj) {
        this.$http({
            method: 'post',
            data: this.obj,
            url: this.status == 1 ? api.editpwd : api.teacherPwd
        }).then((res) => {
            if (res.data.status == 'true') {
                this.$router.push({ path: "/" })
                this.$notify({
                    title: '成功',
                    message: res.data.msg,
                    type: 'success'
                });
            } else {
                this.$notify({
                    title: '警告',
                    message: res.data.msg,
                    type: 'warning'
                });
            }
        })
    },
    editpassword() {
        this.$http({
            method: 'post',
            data: this.obj,
            url: {

            }
        }).then((res) => {
            if (res.data.status == 'true') {
                this.$router.push({ path: "/" })
                this.$notify({
                    title: '成功',
                    message: res.data.data,
                    type: 'success'
                });
            } else {
                this.$notify({
                    title: '警告',
                    message: res.data.data.error,
                    type: 'warning'
                });
            }
        })
    },
    getcode() {
        this.$http({
            method: 'post',
            data: {
                tel: this.form.phone
            },
            url: api.sendsms
        }).then((res) => {
            if (res.data.code == 200) {
                this.$router.push({ path: "/" })
                this.$notify({
                    title: '成功',
                    message: res.data.data,
                    type: 'success'
                });
            } else {
                this.$notify({
                    title: '警告',
                    message: res.data.data.error,
                    type: 'warning'
                });
            }
        })
    }

}
