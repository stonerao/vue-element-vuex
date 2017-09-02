import { api } from '@/api/index'
import { getToken } from '@/utils/auth'
import { encodeUnicode } from '@/utils/auth'
import { setCookie } from '@/utils/auth'
import { getCookie } from '@/utils/auth'
import { removeSelectQuestion } from '@/utils/auth'
import { removeCookie } from '@/utils/auth'
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
    create_question_type() {
        this.$http(api.question_type, {
            params: {
                token: getToken()
            }
        }).then((res) => {
            if (res.data.code) {
                this.questionItems = [];
                let data = res.data.data;
                data.forEach((x) => {
                    this.questionItems.push({
                        total: '',
                        every: '',
                        type_id: x.type_id,
                        type_name: x.type_name
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
    questions_add(option, answer, state) {
        let qc_id = this.belongClass3 ? this.belongClass3 : (this.belongClass2 ? this.belongClass2 : this.belongClass1);
        let datas = {
            token: getToken(),
            qc_id: qc_id,
            is_share: this.selectVal ? '1' : '2',//是否共享 1：是，2：否
            q_type_id: this.questionClass,//题型ID
            answer: answer,//参考的答案
            option: option ? encodeUnicode(JSON.stringify(option)) : null,//选项内容 json
            q_title: this.textF,//题干
            q_id: this.isSetQues ? this.setQuestionObj.q_id : ''
        }
        if (state == 1) {
            datas.is_add = this.isTeacherShare ? '1' : '2'
        }
        let url;
        if (this.isSetQues) {
            url = api.question_edit
        } else if (state == 1) {
            url = api.testpaper_addquestion
        } else {
            url = api.questions_add
        }
        this.$http({
            method: "post",
            url: url,
            data: datas
        }).then((res) => {
            if (res.data.code == 200) {
                if (state == 1) {
                    if (this.isTeacherShare) {
                        this.$emit('newAddwQuestOut', 1, res.data.data)
                    } else {
                        let get = getCookie('NEWADDQUESTIONOUT');
                        this.$emit('newAddwQuestOut', 2, res.data.data);
                        if (get) {
                            setCookie('NEWADDQUESTIONOUT', JSON.stringify([...JSON.parse(get), res.data.data]))
                        } else {
                            setCookie('NEWADDQUESTIONOUT', JSON.stringify([res.data.data]))
                        }
                    }
                } else {
                    this.$notify({
                        message: res.data.data,
                        type: 'success'
                    });
                }
            } else {
                this.$notify({
                    message: res.data.data.error,
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
    question_list_select(name) {
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
                if (this.stateList) {
                    setTimeout((x) => {
                        let arr = [];//存储选中过的id
                        // let rows = this.t_data;
                        if (this.getSelectedQuestionList()) { 
                            let list = this.getSelectedQuestionList().split(',').sort();
                            list.forEach((x, index) => {
                                this.t_data.forEach((y, i) => {
                                    if (y.q_id == x) {
                                        this.$refs.multipleTable.toggleRowSelection(y)
                                    }
                                })
                            })
                        }
                    }, 150)

                }
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
                        this.radioItems = [];
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
                        this.trueOrFalse = data.answer;
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
    },
    pushQuestion(arr) {
        // 提交试卷 
        let qc_id = this.belongClass3 ? this.belongClass3 : (this.belongClass2 ? this.belongClass2 : this.belongClass1);
        this.$http({
            url: api.add_testpaper,
            method: 'post',
            data: {
                token: getToken(),
                t_title: this.form.title,
                t_desc: this.form.t_desc,
                is_auto: this.isQuestion ? '2' : '1',
                q_id: this.selectQuestList,
                is_share: this.shared ? '1' : '2',
                question_list: this.isQuestion ? encodeUnicode(JSON.stringify(arr)) : '',
                q_add_question: getCookie('NEWADDQUESTIONOUT')?encodeUnicode(getCookie('NEWADDQUESTIONOUT')):'',
                qc_id: qc_id,
            }
        }).then((res) => {
            if (res.data.code == 200) {
                removeSelectQuestion();
                removeCookie("NEWADDQUESTIONOUT");
                this.getNewTile=0;
                this.$notify({
                    title: '成功',
                    message: res.data.data,
                    type: 'success'
                  });

            } else {
                this.$message({
                    type: 'success',
                    message: res.data.data.error
                });
            }
        })
    },
    TeacherQuestionList(){
        this.$http(api.testpaper_list,{
            params:{
                token:getToken(),
                t_title:this.seach,
                page:this.page,
                curpage:this.curpage
            }
        }).then((res)=>{ 
            if(res.data.code==200){
                let data = res.data;
                this.t_data = res.data.data;
                this.all_pagecount =  parseInt(data.page_total)
                data = null;
            }else{

            }
        })
    },
    testpaper_delete(id) {
        if (typeof id == 'object') {
            id = id.join(",")
        }
        this.$http(api.testpaper_delete, {
            params: {
                token: getToken(),
                t_id: id
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.$message({
                    type: res.data.data,
                    message: '删除成功!'
                });
            }else{
                this.$message({
                    type: 'info',
                    message: res.data.data.error
                });
            }
        })
    }
}