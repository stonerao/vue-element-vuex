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
    create_question_type(){
        this.$http(api.question_type, {
            params: {
                token: getToken()
            }
        }).then((res) => {
            if (res.data.code) {
                this.questionItems = [];
                let data = res.data.data;
                data.forEach((x)=>{
                    this.questionItems.push({
                        total:'',
                        every:'',  
                        type_id:x.type_id,
                        type_name:x.type_name
                    })
                }) 
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
            if (res.data.data.length == 0 && this.belongClass.items1.length != 0) {
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
    questions_add(option, answer) {
        let qc_id = this.belongClass3 ? this.belongClass3 : (this.belongClass2 ? this.belongClass2 : this.belongClass1);
        this.$http({
            method: "post",
            url: this.isSetQues?api.question_edit:api.questions_add,
            data: {
                token: getToken(),
                qc_id: qc_id,
                is_share: this.selectVal ? '1' : '2',//是否共享 1：是，2：否
                q_type_id: this.questionClass,//题型ID
                answer: answer,//参考的答案
                option: option ? encodeUnicode(JSON.stringify(option)) : null,//选项内容 json
                q_title: this.textF,//题干
                q_id:this.isSetQues?this.setQuestionObj.q_id:''
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.$notify({
                    message: res.data.data,
                    type: 'success'
                });
            } else {
                this.$notify({
                    message: res.data.datas.error,
                    type: 'warning'
                });
            }
        })
    },
    question_list(name) {
        // 试题列表
        this.$http(api.question_list, {
            params: {
                token: getToken(),
                q_title: this.seach,
                page: this.page,
                curpage: this.curpage
            }
        }).then((res) => {
            if (res.data.code == 200) {
                let data = res.data.data;
                data.forEach((x) => {
                    x.is_share = x.is_share == '1' ? true : false;
                })
                this.t_data = data;
                this.page_total = parseInt(res.data.page_total);
                data = null;
            }
        })
    },
    question_delete(id) {
        if (!id) {
            this.$notify({
                message: '请删除要选择的试题',
                type: 'warning'
            });
        }
        this.$http({
            method: "post",
            url: api.question_delete,
            data: {
                token: getToken(),
                del_id: id
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.$message({
                    type: 'success',
                    message: res.data.data
                });
                this.dataAjax();
            }
        })
    },
    question_info(id) {
        this.$http({
            method: 'get',
            url: api.question_info,
            params: {
                token: getToken(),
                q_id: id
            }
        }).then((res) => {
            if (res.data.code == 200) {
                let data = res.data.data;
                this.questionClass = data.q_type_id;
                this.textF = data.q_title;
                if (data.qc_class.parent_id_1) {
                    // 如果有一级分类
                    this.belongClass1 = data.qc_class.parent_id_1;
                    if (!data.qc_class.parent_id_2) {
                        setTimeout(() => {
                            this.belongClass2 = '2';
                        }, 100)
                    }
                }
                if (data.qc_class.parent_id_2) {
                    this.belongClass2 = data.qc_class.parent_id_2;
                    if (!data.qc_class.parent_id_3) {
                        setTimeout(() => {
                            this.belongClass3 = '2';
                        }, 100)
                    }
                }

                // 普题目
                //class type id 
                let num = parseInt(data.q_type_id);
                var arr = data.q_option;
                switch (num) {
                    case 1: 
                    this.radioItems=[];
                    this.radio = this.A_Z.indexOf(data.answer) 
                        arr.forEach((x) => { 
                            this.radioItems.push(x);
                        })
                        break;
                    case 2:
                        let boxArr = [];
                        this.checkboxItems = [];
                        this.checkbox = data.answer.split(",");
                        this.checkbox.forEach((x, index) => {
                            if (this.A_Z.indexOf(x) != -1) {
                                console.log(this.A_Z.indexOf(x))
                                boxArr.push(this.A_Z.indexOf(x))
                            }

                        })
                        this.checkbox = boxArr.sort();
                        arr.forEach((x) => {
                            this.checkboxItems.push(x)
                        })
                        arr = null;
                        break;
                    case 3:
                        this.trueOrFalse  = data.answer;
                    break;
                    case 4: 
                        this.fileBlankItems = [];
                        arr.forEach((x) => {
                            this.fileBlankItems.push(x)
                        })
                        this.referenceAnswer = data.answer
                    break;
                    case 5: 
                    this.referenceAnswer = data.answer
                    break;
                    case 6: 
                    this.referenceAnswer = data.answer
                    break;
                }
                data = null;
            }
        })
    }
}