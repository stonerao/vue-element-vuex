import { api } from '@/api/login'
import { getToken } from '@/utils/auth'
export default {
    Studentline_examlist() {
        this.$http(api.Studentline_examlist, {
            params: {
                token: getToken(),
                lex_name: '',
                page: '',
                curpage: ''
            }
        }).then((res) => {
            if (res.data.code == 200) {

            } else {

            }
        })
    },
    Studentline_gradeslist() {
        this.$http(api.Studentline_examlist, {
            params: {
                token: getToken(),
                le_student_name: '',
                page: '',
                lex_id: '',
                curpage: ''
            }
        }).then((res) => {
            if (res.data.code == 200) {

            } else {

            }
        })
    },
    Studentline_grades_static() {
        this.$http({
            method: "post",
            url: api.Studentline_grades_static,
            data: {
                token: getToken(),
                lex_id: ''
            }
        }).then((res) => {
            if (res.data.code == 200) {

            } else {

            }
        })
    }
}
