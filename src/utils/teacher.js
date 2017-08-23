import { api } from '@/api/index'
import { getToken } from '@/utils/auth'
let key = getToken()
export default {
    teacher_list() {
        this.$http(api.teacher_list, {
            params: {
                token: getToken(),
                curpage: this.tracherList.curpage,//当前页数
                teacher_name: this.tracherList.teacher_name,//老师姓名
                teacher_sex: this.tracherList.teacher_sex,//性别
                teach_subject: this.tracherList.teach_subject,//老师科目
                one_pagenum: this.tracherList.one_pagenum,//单页数量
            }
        }).then((res) => {
            if (res.status === 200) {
                // 教师列表
                let data = res.data.teacher_list;
                // 清楚默认
                this.t_data = [];
                data.forEach((x) => {
                    this.t_data.push({
                        member_name: x.member_name,
                        teach_subject_name: x.teach_subject_name,
                        teacher_id: x.teacher_id,
                        teacher_name: x.teacher_name,
                        teacher_phone: x.teacher_phone,
                        teacher_desc: x.teacher_desc,
                        teach_subject: x.teach_subject,
                        delete_tstatus: x.delete_tstatus,
                        sex: x.teacher_sex,
                        teacher_sex: x.teacher_sex == '1' ? '保密' : (x.teacher_sex == '2' ? '男' : '女'),
                    })
                })
                this.tracherList.hasmore = res.data.hasmore;
                this.tracherList.one_pagenum = res.data.one_pagenum;
                this.tracherList.page_count = res.data.page_count;
                this.tracherList.total_num = parseInt(res.data.total_num);
            }
        })
    },
    subjectlist() {
        // 教师科目列表
        this.$http(api.teacher_kemu, {
            params: {
                token: getToken()
            }
        }).then((res) => {
            if (res.status === 200) {
                let data = res.data;
                data.forEach((x) => {
                    let arr = {
                        name: x.s_name,
                        id: x.s_id,
                        time: x.s_time,
                        school_identify: x.school_identify
                    }
                    this.teacher_kemu.items.push(arr)
                    this.kemu.push(arr)
                })
                console.log(data)
            }

        })
    },
    addTeacher(form) {
        form.token = getToken();
        this.$http({
            url: api.teacher_add,
            method: 'post',
            data: form
        }).then((res) => {
            if (res.data.status == 'true') {
                for (let k in form) {
                    form[k] = ""
                }
            }
            this.$message({
                type: 'success',
                message: res.data.msg
            });
        })
    },
    deleteTeacher(id) {
        this.$http(api.teacher_delete, {
            params: {
                token: getToken(),
                number_id: id
            }
        }).then((res) => {
            if (res.data.status == 'true') {
                this.$message({
                    type: 'success',
                    message: res.data.msg
                });
            } else {
                this.$message({
                    type: 'info',
                    message: res.data.msg
                });
            }
        })
    },
    setTeacher(form) {
        form.token = getToken();
        this.$http({
            url: api.teacher_edit,
            method: 'post',
            data: form
        }).then((res) => {

        })
    },
    studentlist(id) {
        this.$http(api.studentlist, {
            params: {
                token: getToken(),
                st_name: this.studentList.st_name,
                st_sex: this.studentList.st_sex,
                st_status: this.state != 2 ? this.studentList.st_status : 20,
                page: this.studentList.curpage,
                curpage: this.studentList.one_pagenum,
                st_grade: this.studentList.st_grade,
                st_class: this.studentList.st_class,
            }
        }).then((res) => {
            if (res.status === 200) {
                let data = res.data.data;
                data.forEach((x) => {
                    x.sex = x.st_sex == '1' ? '保密' : (x.st_sex == '2' ? '男' : '女');
                    x.cer = x.st_certificates == '0' ? '无' : (x.st_certificates == '2' ? '身份证' : '学生证');
                    switch (x.st_status) {
                        case "1":
                            x.status = '在校'
                            break;
                        case "2":
                            x.status = '毕业'
                            break;
                        case "3":
                            x.status = '休学'
                            break;
                        case "4":
                            x.status = '开除'
                            break;
                        case "5":
                            x.status = '退学'
                            break;
                        case "6":
                            x.status = '转学'
                            break;
                        case "7":
                            x.status = '停学'
                            break;
                    }
                    this.t_data.push({
                        x
                    })
                })
                this.t_data = res.data.data;
                this.stundentCount = res.data.count;
                this.studentList.total_num = parseInt(res.data.page_total);


            }
        })
    },
    department_list() {
        this.$http(api.studentListMent, {
            params: {
                token: getToken(),
            }
        }).then((res) => {
            if (res.status == 200) {
                this.sdata = res.data.department_list
            }
        })
    },
    addStundet(obj, state) {
        obj.token = getToken();
        this.$http({
            url: state == 1 ? api.addStundet : api.setStundet,
            method: 'post',
            data: obj
        }).then((res) => {
            if (res.data.code == 200) {
                this.$notify({
                    title: '成功',
                    message: res.data.data,
                    type: 'success',
                    onClose: () => {
                        this.$emit("SetQuti", this.goState)
                    }
                });
            }
            else {
                this.$notify.error({
                    message: res.data.data.error
                });

            }
        })

    },
    studentdelete(arr) {
        this.$http({
            url: api.studentdelete,
            method: 'post',
            data: {
                token: getToken(),
                del_id: arr
            }
        }).then((res) => {

        })

    },
    grade_list() {
        this.$http(api.grade_list).then((res) => {
            if (res.data.code == 200) {
                this.gradeForm = res.data.data;
            }
        })
    },
    class_list(id) {
        this.$http(api.class_list, {
            params: {
                id: id,
                token: getToken(),
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.classForm = res.data.data;
            } else {
                this.$alert(res.data.data.error, '', {
                    confirmButtonText: '确定'
                });
            }
        })
    }

}