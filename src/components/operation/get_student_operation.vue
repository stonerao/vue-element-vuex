<template>
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="作业名称">
            <div v-html="obj.task_title"></div>
        </el-form-item>
        <el-form-item label="作业内容">
            <div v-html="obj.at_desc"></div>
        </el-form-item>
        <el-form-item label="交作业时间">
            <div v-html="obj.student_time"></div>
        </el-form-item>
        <el-form-item label="老师">
            <div v-html="obj.teacher_name"></div>
        </el-form-item>
        <el-form-item label="学生">
            <div v-html="obj.student_name"></div>
        </el-form-item>
        <el-form-item label="作业评阅">
            <!-- <quillEditor style="background:#fff" v-model="val" :content="content"></quillEditor> -->
            <input type="text" v-model="val">
        </el-form-item>
        <el-form-item label=" ">
            <el-button type="primary" @click="submit">评阅</el-button>
            <el-button @click="quit">取消</el-button>
        </el-form-item>

    </el-form>
</template>
<script>
import store from '@/utils/operation'

// import { quillEditor } from 'vue-quill-editor'
export default {
    props: ['state'],
    data() {
        return {
            form: {

            },
            obj: {},
            content: " ",
            val: ''
        }
    },
    methods: {
        submit() { 
            store.teacher_review.call(this)
        },
        quit() {
            this.$emit("quit", true)
        }
    },
    created() {
        console.log(this.state)
        if (this.state) {
            store.show_student_task.call(this, this.state)
        }
    },
    mounted() {

    },
    watch: {

    },
    components: {
        // quillEditor
    }
}
</script>
