import { api } from '@/api/index'
import { getToken } from '@/utils/auth'
export default {
    sign_setting_info() {
        this.$http(api.sign_setting_info, {
            params: {
                token: getToken()
            }
        }).then((res) => {
            if (res.data.code == 200) {
                res.data.data ? this.input = parseInt(res.data.data.sign_timeframe) : '';
            }
        })
    },
    sign_setting() {
        this.$http({
            method: 'post',
            data: {
                token: getToken(),
                sign_timeframe: this.input
            },
            url: api.sign_setting
        }).then((res) => {
            if (res.data.code == 200) {
                this.$notify({
                    title: '成功',
                    message: res.data.data,
                    type: 'success'
                });
            } else {
                this.$notify.error({
                    title: '错误',
                    message: res.data.data.error
                });
            }
        })
    },

    mobile_setting_info() {
        this.$http(api.mobile_setting_info, {
            params: {
                token: getToken()
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.form.mobile_host = res.data.data.mobile_host;
                this.form.mobile_username = res.data.data.mobile_username;
                this.form.mobile_pwd = res.data.data.mobile_pwd;
            }
        })
    },
    mobile_setting() {
        this.$http({
            method: 'post',
            data: {
                token: getToken(),
                mobile_username: this.form.mobile_username,
                mobile_pwd: this.form.mobile_pwd,
                mobile_host: this.form.mobile_host
            },
            url: api.mobile_setting
        }).then((res) => {
            if (res.data.code == 200) {
                this.$notify({
                    title: '成功',
                    message: res.data.data,
                    type: 'success'
                });
            } else {
                this.$notify.error({
                    title: '错误',
                    message: res.data.data.error
                });
            }
        })
    },
    lock_setting() {
        this.$http({
            method: 'post',
            data: {
                token: getToken(),
                lock_status: this.locak
            },
            url: api.lock_setting
        }).then((res) => {
            if (res.data.code == 200) {
                this.$notify({
                    title: '成功',
                    message: res.data.data,
                    type: 'success'
                });
            } else {
                this.$notify.error({
                    title: '错误',
                    message: res.data.data.error
                });
            }
        })
    },
    lock_setting_info() {
        this.$http(api.lock_setting_info, {
            params: {
                token: getToken()
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.locak = res.data.data.lock_status
            }
        })
    }

}