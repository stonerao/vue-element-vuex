import { api } from '@/api/index'
import { getToken } from '@/utils/auth'
import { isClassLogin } from '@/utils/auth'
export default {
    add_notice() {
        this.$http({
            method: "post",
            url: api.add_notice,
            data: {
                token: getToken(),
                zn_receive_type: this.form.zn_receive_type,
                zn_receive: this.form.zn_receive.join(','),
                zn_desc: this.textF,
                zn_title: this.form.title,
            }
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
    receive_list() {
        this.$http(api.receive_list, {
            params: {
                token: getToken(),
                receive_type: this.form.zn_receive_type
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.options = res.data.data;
            } else {

            }
        })
    },
    AdminNotice_list() {
        const state = isClassLogin();
        let url;
        if (state == 1) {
            url = api.AdminNotice_list;
        } else if (state == 2) {
            url = api.student_notice_list;
        } else if (state === 3) {
            url = api.teacher_notice_list;
        }
        this.$http(url, {
            params: {
                token:getToken(),
                curpage:this.curpage,
                keywords:this.seach,
                page:this.page
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.t_data = res.data.data;
                this.page_total = parseInt(res.data.page_total);
            } else {

            }
        })
    }
}