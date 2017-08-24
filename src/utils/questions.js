import { api } from '@/api/index'
import { getToken } from '@/utils/auth'
import { encodeUnicode } from '@/utils/auth'
export default {
    question_type() {
        // 试题分类
        this.$http(api.question_type, {
            params: {
                token: getToken()
            }
        }).then((res) => {
            if (res.data.code) {
                this.obj.questionClass = res.data.data;
            }
        })
    },
    question_classlist(id, status) {
        // 试题所属分类
        this.$http({
            method: "get",
            url: api.question_classlist,
            params: {
                token: getToken(),
                qc_id: id
            }
        }).then((res) => {
            if (res.data.data.length == 0&&this.belongClass.items1.length!=0) {
                // 如果没有下一级就为true
                this.isBelongSelect = true;
                return
            }
            if (status == 1) {
                this.belongClass.items1 = res.data.data;
            } else if (status == 2) {
                this.belongClass.items2 = res.data.data;
            } else if (status == 3) {
                this.belongClass.items3 = res.data.data;
            }

        })
    },
    // class_list(id) {
    //     // 年纪下的分类
    //     this.$http(api.class_list, {
    //         params: {
    //             id: id,
    //             token:getToken()
    //         }
    //     }).then((res) => {
    //         if (res.data.code == 200) {
    //             this.classForm = res.data.data;
    //         } else {
    //             this.$alert(res.data.data.error, '', {
    //                 confirmButtonText: '确定'
    //             });
    //         }
    //     })
    // }
    questions_add(option,answer){
        let qc_id = this.belongClass3?this.belongClass3:(this.belongClass2?this.belongClass2:this.belongClass1) ;
        let obj = {
            token: getToken(),
            qc_id: qc_id, 
            is_share:this.selectVal?'1':'2',//是否共享 1：是，2：否
            q_type_id:this.questionClass,//题型ID
            answer:answer,//参考的答案
            option:option?encodeUnicode(JSON.stringify(option)):'',//选项内容 json
            q_title:this.textF,//题干
        }
        console.log(obj)
        return
        this.$http({
            method: "post",
            url: api.questions_add,
            data: {
                token: getToken(),
                qc_id: qc_id, 
                is_share:this.selectVal?'1':'2',//是否共享 1：是，2：否
                q_type_id:this.questionClass,//题型ID
                answer:answer,//参考的答案
                option:encodeUnicode(JSON.stringify(option)),//选项内容 json
                q_title:this.textF,//题干
            }
        })
    }
}