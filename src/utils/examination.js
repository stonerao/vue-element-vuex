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
                console.log(this.items)
            }
        })
    },
    pushAnswer(answer){
        // 学生提交答案
        this.$http({
            method:"post",
            data:{
                token:getToken(),
                e_id:this.e_id,
                answer_list:encodeUnicode(JSON.stringify(answer))
            },
            url:api.pushAnswer
        }).then((res)=>{
            if(res.data.code==200){
                this.answer=[]
                this.$notify({
                    title: '成功',
                    message: res.data.data,
                    type: 'success'
                  });

            }else{
                this.$notify.error({
                    title: '错误',
                    message: res.data.data.error
                  });
            }
        })
    }
}