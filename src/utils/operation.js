import { api } from '@/api/index'
import { getToken } from '@/utils/auth'

export default {
    task_list() {
        this.$http(api.task_list, {
            params: {
                token: getToken(),
                task_title: "",
                task_class: this.task_class,
                page: this.page,
                curpage: this.curpage
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.t_data = res.data.data;
                this.page_total = parseInt(res.data.page_total)
            }
        })
    },
    Teacherclass_list() {
        this.$http({
            method: 'post',
            url: api.Teacherclass_list,
            data: {
                token: getToken(),
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.class_list = res.data.data;
            }
        })
    },
    add_task() {
        this.$http({
            method: 'post',
            url: api.add_task,
            data: {
                token: getToken(),
                task_title: this.form.title,
                task_desc: this.task_desc,
                task_class: this.form.class_list
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.$notify({
                    title: '成功',
                    message: res.data.data,
                    type: 'success'
                });
            } else {

            }
        })
    },
    studentList() {
        this.$http(api.studentTask_list, {
            params: {
                token: getToken(),
                task_title: "",
                task_class: this.task_class,
                page: this.page,
                curpage: this.curpage
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.t_data = res.data.data;
                this.page_total = parseInt(res.data.page_total)
            }
        })
    },
    show_task(id) {
        this.$http(api.show_task, {
            params: {
                token: getToken(),
                task_id: id
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.obj = res.data.data
            }
        })
    },
    addztask() {
        this.$http({
            method: "post",
            url: api.addztask,
            data: {
                token: getToken(),
                task_id: this.status,
                at_desc: this.val
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
    teacher_tasklist(id) {
        this.$http(api.teacher_tasklist, {
            params: {
                token: getToken(),
                is_review: this.form.state,
                task_class: this.seach,
                page: this.page,
                curpage: this.curpage,
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.t_data = res.data.data;
                this.page_total = parseInt(res.data.page_total)
            }
        })
    },
    show_addtesklist(id) {
        this.$http(api.show_addtesklist, {
            params: {
                token: getToken(),
                task_id: id,
                is_review: this.form.state,
                page: this.page,
                curpage: this.curpage,
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.t_data = res.data.data;
                this.page_total = parseInt(res.data.page_total)
            }
        })
    },
    show_student_task(id) {
        // 老师查看学生作业
        this.$http(api.show_student_task, {
            params: {
                token: getToken(),
                at_id: id
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.obj = res.data.data;
            }
        })
    },
    teacher_review() {
        //老师提交
        this.$http({
            method: 'post',
            url: api.teacher_review,
            data: {
                token: getToken(),
                at_id: this.state,
                review_desc: this.val
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.$notify({
                    title: '成功',
                    message: res.data.data,
                    type: 'success'
                });
                this.$emit("quit", true)
            } else {
                this.$notify.error({
                    title: '错误',
                    message: res.data.data.error
                });
            }
        })
    },
    mang_list() {
        // 学生查看老师批语列表
        this.$http(api.show_teacher_review, {
            params: {
                token: getToken(),
                at_id: this.id
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.obj = res.data.data
            }
        })
    }
}