<template>
    <!--创建考试 -->
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="考试名称">
            <el-input v-model="form.name" class="width200"></el-input>
        </el-form-item>

        <el-form-item label="开始时间">
            <el-col :span="24">
                <el-date-picker v-model="form.date1" type="datetime" :picker-options="pickerOptions0" placeholder="选择日期时间">
                </el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="结束时间">
            <el-col :span="24">
                <el-date-picker v-model="form.date2" type="datetime" :picker-options="pickerOptions0" placeholder="选择日期时间">
                </el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="考试班级">
            <el-select class="width200" v-model="form.age" multiple placeholder="考试年纪">
                <el-option :label="item.class_name" :value="item.department_id" v-for="item in ages.age" :key="item.department_id"></el-option>
            </el-select>

        </el-form-item>
        <el-form-item label="考试市场">
            <el-input v-model="form.tiem" class="width150"></el-input>
        </el-form-item>
        <el-form-item label="考试总分">
            <el-input v-model="form.tol" class="width150"></el-input>
        </el-form-item>
        <!-- <el-form-item label="班级id">
                            <el-input v-model="form.ex1" class="width150"></el-input>
                        </el-form-item> -->
        <el-form-item label="选择试卷">
            <el-button @click="selectExam">选择</el-button>
            <span v-if="exam_info" class="marginleft15">
                已选择:{{selectObjs.t_title}}
            </span>
            <span v-else class="marginleft15">
                已选择:{{t.t_title}}
            </span>
        </el-form-item>
        <!-- <el-form-item label="e_question_source">
                            <el-input v-model="form.e_question_source" class="width150"></el-input>
                        </el-form-item> -->
        <el-form-item label=" ">
            <el-button type="primary" @click="onSubmit">{{!if_set?'立即创建':'确认编辑'}}</el-button>
            <el-button @click="quit">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>

import store from '@/utils/questions'
import {setCookie} from '@/utils/auth'
import {getCookie} from '@/utils/auth' 

export default {
    props: ['selectObjs', 'set_e_id'],
    data() {
        return {
            form: {
                name: '',
                age: [],
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
                e_id: '',
                tol: "",
                ex2: '',
                ex1: '',//班级id
                e_question_source: '',
                tiem: ""
            },
            pickerOptions0: {
                disabledDate(time) { 
                }
            },
            ages: {
                age: [],
                class: []
            },
            exam_info: false,
            if_set: false,
            t: {
                t_title: '',
                t_id: ''
            }
        }

    },
    methods: {
        onSubmit() {   
            if (this.form.tiem == ''|| !parseInt(this.form.tiem)>0 ) {
                this.$notify({
                    message: '考试时长有误',
                    type: 'info',
                });
                return
            }
            if (!this.if_set) {
                store.createExamQuestion.call(this);
            } else {
                store.setExamQuestion.call(this);
            }
        },
        selectExam() {
            // 选择试卷 
            setCookie("CREATEDEXAM",this.form);
            console.log(JSON.parse(getCookie("CREATEDEXAM")))
            this.$emit("selectExam", true);
        },
        quit() {
            if (this.if_set) {
                this.$emit("quit", false)
            }
        }
    },
    created() {
        store.grade_list.call(this);
        if (this.selectObjs.t_id) {
            this.form.ex1 = this.selectObjs.t_id;
            this.exam_info = true;
            this.form=JSON.parse(getCookie("CREATEDEXAM"));
        } 
        if (this.set_e_id.e_id) {
            let obj = this.set_e_id;
            this.if_set = true;
            this.form.name = obj.e_title
            this.form.date1 = new Date(parseInt(obj.e_starttime) * 1000)
            this.form.date2 = new Date(parseInt(obj.e_time) * 1000)
            this.form.age = obj.e_class.split(",")
            this.form.tol = obj.e_allsource;
            this.form.tiem = obj.e_whenlong;
            this.form.e_id = obj.e_id;
            this.t.t_title = obj.t_title;
            this.t.t_id = obj.e_relation_tid;
            console.log(this.set_e_id)

        } else {
            this.if_set = false;
        }

    },
    mounted() {

    },
    watch: {
         
    }
}
</script>
