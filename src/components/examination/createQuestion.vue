<template>
    <div class="add-inp">
        <!-- create questions -->
        <div class="r-add-created">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="试卷标题">
                    <el-input v-model="form.title" class="width200"></el-input>
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
                <el-form-item label="试卷描述">
                    <el-input v-model="form.t_desc" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="是否自动生成">
                    <el-switch v-model="isQuestion" on-color="#13ce66" off-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="自动生成试卷" v-if="isQuestion">
                    <el-row>
                        <el-col :span='24' v-for="item in questionItems" :key="item.type_id">
                            <span>{{item.type_name}}：共
                                <el-input class="width60 margin5" v-model="item.total" size="mini"></el-input>题,</span>
                            <span>每道
                                <el-input class="width60 margin5" v-model="item.every" size="mini"></el-input>分</span>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="已选择题目" v-if="!isQuestion">
                    <!-- 新添加题库 -->
                    <el-row>
                        <el-col :span='24'>
                            <el-button @click="newAddQuestion">新增题目</el-button>
                        </el-col> 
                    </el-row>
                </el-form-item>
                <el-form-item label="选择题目" v-if="!isQuestion">
                    <!-- 选择题库 -->
                    <el-row>
                        <el-col :span='24'>
                            <el-button @click="addList">添加试题</el-button>
                        </el-col>
                        <el-col> 
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="已选择题目" v-if="!isQuestion">
                    <!-- 选择题库 -->
                    {{strSelect}}
                </el-form-item>
                
                <el-form-item label="是否共享">
                    <el-switch v-model="shared" on-color="#13ce66" off-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button @click="quits">取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script>
import store from '@/utils/questions'
import { removeSelectQuestion } from '@/utils/auth'
export default {
    props: ['selectQuestList'],
    data() {
        return {
            form: {
                title: '',
                t_desc: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            isQuestion: true,//是否自动生成试卷
            questionItems: [],
            belongClass: {
                items1: [],
                items2: [],
                items3: [],
            },
            belongClass1: '',
            belongClass2: '',
            belongClass3: '',
            isBelongSelect: false,
            strSelect: '',//已选择的提
            shared: true
        }
    },
    methods: {
        onSubmit() {
            removeSelectQuestion()
            if (this.isQuestion) {
                // 是否自动生成试卷

            }
            store.pushQuestion.call(this)
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
        addList() {
            // 跳转添加试题列表 
            if (typeof this.selectQuestList == 'string') {
                this.$emit('SELECTQUESTIONLISTEVENT', this.selectQuestList)
            }
            this.$emit("list", true)
        },
        quits() {
            // 点击取消
            removeSelectQuestion();
        },
        newAddQuestion(){
            //新添加题目。去题库添题目
            this.$emit("newAddQuestion",true)
        }
    },
    created() {
        this.question_classlist("", 1);
        store.create_question_type.call(this);
        removeSelectQuestion();
    },
    mounted() {
        if (typeof this.selectQuestList == 'string') {
            this.strSelect = this.selectQuestList.split(",").join(" / ");
            this.isQuestion = false;
        } else {
            this.strSelect = '';
        }
    },
    watch: {
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
        selectQuestList(val) {
        }
    }
}
</script>
