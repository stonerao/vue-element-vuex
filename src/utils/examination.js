import { api } from '@/api/index'
import { getToken } from '@/utils/auth'

import { encodeUnicode } from '@/utils/auth'
export default {
    Studentexamination_list() {
        this.$http(api.Studentexamination_list, {
            params: {
                token: getToken(),
                e_title: this.seach,
                page: this.page,
                curpage: this.curpage
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.t_data = res.data.data;
                this.all_pagecount = parseInt(res.data.page_total)
            }
        })
    },
    examination_info() {
        this.$http(api.examination_info, {
            params: {
                token: getToken(),
                e_id: this.e_id
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.items = [];
                this.obj = res.data.data
                let data = res.data.data.question_list;
                for (var key in data) {
                    for (var j in data[key]) {
                        if (data[key][j].q_type_id == '2') {
                            data[key][j].answer = []
                        }
                        else if (data[key][j].q_type_id == '4') {

                        } else {
                            data[key][j].answer = ''
                        }

                        this.items.push(data[key][j])
                    }
                }
                data = null;
            }
        })
    },
    pushAnswer(answer) {
        // 学生提交答案
        this.$http({
            method: "post",
            data: {
                token: getToken(),
                e_id: this.e_id,
                answer_list: encodeUnicode(JSON.stringify(answer))
            },
            url: api.pushAnswer
        }).then((res) => {
            if (res.data.code == 200) {
                this.answer = []
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
    mang_list() {
        console.log(api.show_studentanswerlist)
        this.$http(api.show_studentanswerlist, {
            params: {
                token: getToken(),
                e_id: this.id,
                page: this.page,
                curpage: this.curpage
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.page_total = parseInt(res.data.page_total);
                this.t_data = res.data.data;
            } else {

            }
        })
    },
    student_qe_list() {
        this.$http(api.student_answer_info, {
            params: {
                token: getToken(),
                exam_id: this.id
            }
        }).then((res) => {
            if (res.data.code == 200) {
                let data = res.data.data; 
                for(var key in data){
                    data[key]['answer_numbers']="";
                    this.t_data.push(data[key]);
                }
                data = null;
            } else {

            }
        })
    },
    student_answer_grade(){
        this.$http({
            method:"post",
            url:api.student_answer_grade,
            data:{
                token:getToken(),
                obj:encodeUnicode(JSON.stringify(this.t_data))
            }
        })
    }
}