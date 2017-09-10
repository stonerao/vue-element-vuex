<template>
    <el-form ref="form" :model="form" label-width="120px" class="margintop20">
        <el-form-item label="作业名称">
            <div v-html="obj.task_title"></div>
        </el-form-item>
        <el-form-item label="作业内容">
            <div v-html="obj.at_desc"></div>
        </el-form-item>
        <el-form-item label="老师评阅">
            <div v-html="obj.review_desc"></div>
        </el-form-item> 
        <el-form-item label="交作业时间">
            <div v-html="obj.review_time"></div>
        </el-form-item>
        <el-form-item label="老师">
            <div v-html="obj.teacher_name"></div>
        </el-form-item> 
        <el-form-item label=" "> 
            <el-button @click="quits">返回</el-button>
        </el-form-item> 
    </el-form>
</template>
<script>
import store from '@/utils/operation'
export default {
    props: ['id'],
    data() {
        return {
            form: {

            },
            obj: {

            },
            val: '',
            content: ""
        }
    },
    methods: {
        ajax() {
            store.mang_list.call(this)
        },
        handleChange() {

        },
        submits() {
            // 提交答案 
        },
        quits(){
            // 返回
            this.$emit('quit',true)
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