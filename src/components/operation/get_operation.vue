<template>
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="作业名称">
            <div v-html="obj.task_title"></div>
        </el-form-item>
        <el-form-item label="作业内容">
            <div v-html="obj.task_desc"></div>
        </el-form-item>
        <el-form-item label="交作业时间">
            <div v-html="obj.task_time"></div>
        </el-form-item>
        <el-form-item label="老师">
            <div v-html="obj.teacher_name"></div>
        </el-form-item>
        <el-form-item label="我的作业">
            <quillEditor style="background:#fff" v-model="val" :content="content"></quillEditor>
        </el-form-item>
        <el-form-item label=" ">
            <el-button type="primary" @click="submit">去完成作业</el-button>
            <!-- <el-button @click="mangTeacher">查看老师审批</el-button> -->
        </el-form-item>

    </el-form>
</template>
<script>
import store from '@/utils/operation'

import { quillEditor } from 'vue-quill-editor'
export default {
    props: ['status'],
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
            if (this.val == '') {
                this.$notify.error({
                    title: '错误',
                    message: '作业不能为空'
                });
                return
            }
            store.addztask.call(this)
        },
        // mangTeacher(){
        //     //查看老师审批
        //     console.log(1)
        //     this.$emit('Mangtheater',true)
        // }
    },
    created() {
        console.log(this.status)
        if (this.status) {
            store.show_task.call(this, this.status)
        }
    },
    mounted() {

    },
    watch: {

    },
    components: {
        quillEditor
    }
}
</script>
