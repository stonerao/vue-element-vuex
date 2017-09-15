import { api } from '@/api/index'
import { getToken } from '@/utils/auth'
export default {
    Studentline_examlist() {
        this.$http(api.Studentline_examlist, {
            params: {
                token: getToken(),
                lex_name: this.seach,
                page: this.page,
                curpage: this.curpage
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.t_data = res.data.data;
                this.page_total = parseInt(res.data.page_total)
            } else {

            }
        })
    },
    Studentline_gradeslist() {
        this.$http(api.Studentline_gradeslist, {
            params: {
                token: getToken(),
                le_student_name: this.seach,
                lex_id: this.id,
                page: this.page,
                curpage: this.curpage
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.t_data = res.data.data;
                this.page_total = parseInt(res.data.page_total)
            } else {

            }
        })
    },
    Studentline_grades_static() {
        this.$http({
            method: "get",
            url: api.Studentline_grades_static,
            params: {
                token: getToken(),
                lex_id: this.id
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.t_data = res.data.data; 
            } else {

            }
        })
    }
}
