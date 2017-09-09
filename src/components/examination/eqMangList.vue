<template>
    <div>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item :title="`第${index+1}题 - ${item.q_type_id=='4'?'填空题':item.q_type_id=='5'?'问答题':'计算题'}`" :name="index" v-for="(item,index) in t_data" :key="index">
                <div v-html="item.q_title"></div>
                <div>
                    学生答案： {{item.answer}}
                </div>
                <div>
                    参考答案： {{item.exam_answer}}
                </div>
                <div style="margin-top:10px;">
                    <span>打分：</span>
                    <el-input class="width150" size="small" placeholder="打分" v-model="item.answer_numbers">

                    </el-input>
                </div>
            </el-collapse-item>
        </el-collapse>
        <div  style="margin-top:10px;margin-left:10px">  
            <el-button type="primary" @click="submits">提交</el-button>
        </div>
    </div>
</template>
<script>

import store from '@/utils/examination'
export default {
    props: ['id'],
    data() {
        return {
            activeNames: [],
            t_data: [],
            input3: ""
        }
    },
    methods: {
        ajax() {
            store.student_qe_list.call(this)
        },
        handleChange() {

        },
        submits(){
            // 提交答案
            console.log(this.t_data)
            store.student_answer_grade.call(this)
        }
    },
    created() {
        console.log(this.id)
        this.ajax();
    },
    mounted() {

    },
    watch: {

    }
}
</script> 