<template>
    <!-- 添加试题 -->
    <div class="add-inp">
        <div style="padding:30px 20px">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="试题类型">
                    <el-select v-model="questionClass" placeholder="主观题" class="width110">
                        <el-option :label="item.type_name" :value="item.type_id" v-for="(item,index) in obj.questionClass" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属分类">
                    <el-select v-model="belongClass1" placeholder="题库一级分类" class="width125" style="font-size:14px">
                        <el-option :label="item.qc_name" :value="item.qc_id" v-for="(item,index) in belongClass.items1" :key="index"></el-option>
                    </el-select>
                    <el-select v-model="belongClass2" placeholder="题库二级分类" class="width125" style="font-size:14px" v-if="belongClass1&&belongClass.items2.length!=0">
                        <el-option :label="item.qc_name" :value="item.qc_id" v-for="(item,index) in belongClass.items2" :key="index"></el-option>
                    </el-select>
                    <el-select v-model="belongClass3" placeholder="题库三级分类" class="width125" style="font-size:14px" v-if="belongClass2&&belongClass.items3.length!=0">
                        <el-option :label="item.qc_name" :value="item.qc_id" v-for="(item,index) in belongClass.items3" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="试题题干">
                    <quillEditor v-model="textF"></quillEditor>
                </el-form-item>
                <el-form-item label="相关相片附件">
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog v-model="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <!-- 单选题 -->
                <div v-if="questionClass==1">
                    <el-form-item label="选项设置">
                        <p>
                            <button class="r-ques-addbutton" @click="pushRadio">增加选项</button>
                        </p>
                        <div class="r-question-radio" v-if="radioItems.length>0">
                            <el-row v-for="(item,index) in radioItems" :key="index">
                                <el-col :span="2">
                                    <label>
                                        <span class="marginright5">选项{{fileNum(index)}}</span>
                                        <input type="radio" class="r-question-radio-select" v-model="radio" :value="index" />
                                    </label>
                                </el-col>
                                <el-col :span="14">
                                    <el-input type="textarea" :rows="2" v-model="item.title" placeholder="请输入相应题目" style="inline-block"></el-input>
                                </el-col>
                                <el-col :span="2">
                                    <i class="el-icon-circle-close r-ques-delet" @click="delectRadio(index)"></i>
                                </el-col>
                            </el-row>
                        </div>
                    </el-form-item>

                </div>
                <!-- 多选题 -->
                <div v-if="questionClass==2">
                    <el-form-item label="选项设置">
                        <p>
                            <button class="r-ques-addbutton" @click="pushRadio">增加选项</button>
                        </p>
                        <div class="r-question-radio" v-if="checkboxItems.length>0">
                            <el-row v-for="(item,index) in checkboxItems" :key="index">
                                <el-col :span="2">
                                    <label>
                                        <span class="marginright5">选项{{fileNum(index)}}</span>
                                        <input type="checkbox" class="r-question-radio-select" v-model="checkbox" :value="index" />
                                    </label>
                                </el-col>
                                <el-col :span="14">
                                    <el-input type="textarea" :rows="2" v-model="item.title" placeholder="请输入相应题目" style="inline-block"></el-input>
                                </el-col>
                                <el-col :span="2">
                                    <i class="el-icon-circle-close r-ques-delet" @click="delectRadio(index)"></i>
                                </el-col>
                            </el-row>
                        </div>
                    </el-form-item>

                </div>
                <div v-if="questionClass==3">
                    <el-form-item label="答案设置">
                        <label>
                            <input type="radio" class="r-question-radio-select" v-model="trueOrFalse" value="1" />
                            <span class="marginright5">正确</span>
                        </label>
                        <label class="marginleft10">
                            <input type="radio" class="r-question-radio-select" v-model="trueOrFalse" value="2" />
                            <span class="marginright5">错误</span>
                        </label>
                    </el-form-item>
                </div>
                <div v-if="questionClass==4">
                    <el-form-item label="答案设置">
                        <p>
                            <button class="r-ques-addbutton" @click="pushRadio">增加选项</button>
                            <span class="hui-color">混杂模式批改（不按答题顺序批改用户答案）</span>
                        </p>
                        <div class="r-question-radio" v-if="fileBlankItems.length>0" style="padding-bottom:0">
                            <div class="r-duo-select" v-for="(item,index) in fileBlankItems" :key="index">
                                {{parseInt(index)+1}}：
                                <el-input v-model="item.title" placeholder="请输入内容" class="width125 marginleft5" size="small"></el-input>
                                <i class="el-icon-circle-close r-ques-delet" @click="delectRadio(index)"></i>
                            </div>

                        </div>
                    </el-form-item>
                </div>

                <el-form-item label="参考答案" v-if="questionClass!=1&&questionClass!=2&&questionClass!=3">
                    <el-input type="textarea" :rows="3" v-model="referenceAnswer"></el-input>
                </el-form-item>

                <el-form-item label="是否共享题目">
                    <el-switch v-model="selectVal" on-color="#13ce66" off-color="" on-text="是" off-text="否">
                    </el-switch>
                </el-form-item>
                <el-form-item label="是否加入老师个人题库 ">
                    <el-switch v-model="isTeacherShare" on-color="#13ce66" off-color="" on-text="是" off-text="否">
                    </el-switch>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button type="success" @click="onSubmit(1)">预览试题</el-button>
                    <el-button @click="quitq">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <Preview :status="questionClass" :obj="previewBox" v-if="isPrev" @CLICKOVER="CLICKOVER"></Preview>
    </div>
</template>
<script>
import store from '@/utils/questions'
import Preview from '@/components/questions/Preview'
import { quillEditor } from 'vue-quill-editor'
export default {
    props: ['setQuestionObj', 'isSetQues', 'newAddQuestion'],//newAddQuestion true 考试添加试题过来 
    data() {
        return {
            form: {
                questionClass: '1',//试题分类
                name: '',
            },
            dialogImageUrl: '',
            dialogVisible: false,
            textF: '',//富文本编辑
            obj: {
                questionClass: [],//试题分类
            },
            questionClass: '1',//试题分类
            // 所属分类
            belongClass: {
                items1: [],
                items2: [],
                items3: [],
            },
            belongClass1: '',
            belongClass2: '',
            belongClass3: '',
            isBelongSelect: false,//是否选择完成 为true表示没有下一级
            A_Z: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"],
            fileNum: (num) => {
                num = parseInt(num);
                if (num != NaN) {
                    return this.A_Z[num]
                }
            },
            radio: '',//单选
            radioItems: [{ title: '' }, { title: '' }, { title: '' }],//单选题目 
            checkbox: [],//多选题
            checkboxItems: [{ title: '' }, { title: '' }, { title: '' }],//多题目 
            selectVal: true,//是否共享题目
            referenceAnswer: '',//参考答案
            qc_id: '',//题库分类id
            trueOrFalse: '',//判断题
            fileBlank: '',
            fileBlankItems: [{ title: '' }, { title: '' }, { title: '' }],//填空题
            qOrA: '',//问答题
            calculation: '',//计算题
            previewBox: {},//试题预览
            isPrev: false,
            isTeacherShare: true,//是否加入老师个人题库
        }
    },
    methods: {
        onSubmit(statusIndex) {
            if (!this.isBelongSelect) {
                // 是否选择题库类型 
                this.notify('请选择题库类型');
                return;
            }
            let title, answer;//题干 答案
            let status = parseInt(this.questionClass);
            switch (status) {
                case 1:
                    // 题目以及对应选项
                    for (var k in this.radioItems) {
                        if (!this.radioItems[k].title) {
                            this.notify(`请在选项${this.A_Z[parseInt(k)]}填写对应数据`);
                            return
                        }
                        this.radioItems[k].index = this.A_Z[parseInt(k)];
                    }
                    // 选择题
                    title = this.radioItems;
                    answer = this.A_Z[this.radio];
                    break;
                case 2:
                    for (var k in this.checkboxItems) {
                        if (!this.checkboxItems[k].title) {
                            this.notify(`请在选项${this.A_Z[parseInt(k)]}填写对应数据`);
                            return
                        }
                        this.checkboxItems[k].index = this.A_Z[parseInt(k)];
                    }
                    title = this.checkboxItems;
                    let box = this.checkbox;
                    answer = [];
                    box.forEach((x) => {
                        answer.push(this.A_Z[x])
                    })
                    answer = answer.join(",")
                    break;
                case 3:
                    title = null;
                    answer = this.trueOrFalse
                    break;
                case 4:
                    for (var k in this.fileBlankItems) {
                        if (!this.fileBlankItems[k].title) {
                            this.notify(`请在选项${this.A_Z[parseInt(k)]}填写对应数据`);
                            return
                        }
                        this.fileBlankItems[k].index = parseInt(k);
                    }
                    title = this.fileBlankItems;
                    answer = this.referenceAnswer;
                    break;
                case 5:
                    title = this.qOrA;
                    answer = this.referenceAnswer;
                    break;
                case 6:
                    title = this.calculation;
                    answer = this.referenceAnswer;
                    break;
            }
            if (!this.textF) {
                this.notify('请输入题干内容');
                return
            }
            // return
            if (statusIndex == 1) {
                // 预览题录过去
                let name, q_class;
                let qc_id = this.belongClass3 ? this.belongClass3 : (this.belongClass2 ? this.belongClass2 : this.belongClass1);
                if (this.belongClass3) {
                    for (let k in this.belongClass.items3) {
                        if (qc_id == this.belongClass.items3[k].qc_id) {
                            name = this.belongClass.items3[k].qc_name;
                        }
                        break
                    }
                } else if (this.belongClass2) {
                    for (let k in this.belongClass.items2) {
                        if (qc_id == this.belongClass.items2[k].qc_id) {
                            name = this.belongClass.items2[k].qc_name;
                        }
                        break
                    }
                } else {
                    for (let k in this.belongClass.items1) {
                        if (qc_id == this.belongClass.items1[k].qc_id) {
                            name = this.belongClass.items1[k].qc_name;
                        }
                        break
                    }
                }
                for (let k in this.obj.questionClass) {
                    if (this.questionClass == this.obj.questionClass[k].type_id) {
                        q_class = this.obj.questionClass[k].type_name;
                        break
                    }
                }
                this.isPrevClick({
                    qc_id: name,
                    is_share: this.selectVal,//是否共享 1：是，2：否
                    q_type_id: this.questionClass,//题型ID
                    answer: answer,//参考的答案
                    option: title ? title : '',//选项内容 json
                    q_title: this.textF,//题干
                    q_class: q_class
                })
            } else {
                console.log(this.newAddQuestion)
                if (this.newAddQuestion) {
                    // 是否是添加试卷过来的
                    store.questions_add.call(this, title, answer ? answer : '',1)
                } else {
                    store.questions_add.call(this, title, answer ? answer : '');
                }
            }
        },
        questionAll() {

        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        pushRadio() {
            // 单选题增加选项
            const num = 6; //选择题最大条数
            let obj = { title: '' }

            if (this.radioItems.length >= num) {
                this.$notify({
                    message: `添加选项不能超过${num}条`,
                    type: 'warning'
                });
                return
            }
            if (this.questionClass == '1') {
                this.radioItems.push(obj)
            } else if (this.questionClass == '2') {
                this.checkboxItems.push(obj)
            }
        },
        delectRadio(index) {
            // 删除单选框
            this.radioItems.splice(index, 1)
        },
        question_classlist(id, status) {
            // 所属分类
            store.question_classlist.call(this, id, status)
        },
        notify(val) {
            this.$notify({
                title: '警告',
                message: val,
                type: 'warning'
            });
        },
        isPrevClick(obj) {
            this.isPrev = !this.isPrev;
            this.previewBox = obj
        },
        CLICKOVER(obj) {
            this.isPrev = false;
        },
        quitq() {
            // 取消; 
            if (this.isSetQues) {
                this.$emit("quits", true);
            }
        }

    },
    created() {
        // 获取题干类型
        store.question_type.call(this)
        // 获取所属分类第一集
        this.question_classlist("", 1);

    },
    mounted() {
        // 编辑试题过来
        if (this.setQuestionObj && this.isSetQues) {
            store.question_info.call(this, this.setQuestionObj.q_id);

        }
    },
    watch: {
        questionClass(val) {
            // change question class
            this.form.questionClass = val;
        },
        belongClass1(val) {
            // 所属分类1
            this.belongClass.item2 = [];
            this.belongClass.item3 = [];
            this.belongClass2 = '';
            this.belongClass3 = '';
            this.question_classlist(val, 2);
        },
        belongClass2(val) {
            // 所属分类2
            this.belongClass.item3 = [];
            this.belongClass3 = '';
            this.question_classlist(val, 3);
        },
        checkbox(val) {

        }
    },
    components: {
        quillEditor, Preview
    }
}
</script>
<<style>
.ql-container,.ql-editor{
    height:auto;
    min-height:100px;
}
/* .el-upload--picture-card{
        width: 100px;
    height: 100px;line-height: 100px;
} */

</style>
