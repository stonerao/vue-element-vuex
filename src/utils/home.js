import { api } from '@/api/index'
import { getToken } from '@/utils/auth'

export default {
    studentclass_info(time) {
        this.$http(api.studentclass_info, {
            params: {
                token: getToken(),
                start_time: time
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.t_data = res.data.data.model_common;
                this.department_id = res.data.department_id;
            }
        })
    },
    techaerclass_info(time) {
        this.$http(api.techaerclass_info, {
            params: {
                token: getToken(),
                start_time: time
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.t_data = res.data.data; 
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
    },
    student_sign(contents_id, id) {
        this.$http(api.student_sign, {
            params: {
                token: getToken(),
                contents_id: contents_id,
                id: id
            }
        }).then((x) => {
            if (res.data.code == 200) {
                this.$notify({
                    title: '成功',
                    message: res.data.data,
                    type: 'success'
                });
            }
        })
    },
    teacher_sign(contents_id){
        this.$http(api.teacher_sign, {
            params: {
                token: getToken(),
                contents_id: contents_id, 
            }
        }).then((x) => {
            if (res.data.code == 200) {
                this.$notify({
                    title: '成功',
                    message: res.data.data,
                    type: 'success'
                });
                this.ajax
            }
        })
    }
}