<template>
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="年/班级">
            <el-select v-model="form.class_list" placeholder="请选择">
                <el-option v-for="item in class_list" :key="item.department_id" :label="item.class_name" :value="item.department_id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="作业名称">
            <el-input v-model="form.title" class="width200"></el-input>
        </el-form-item>
        <!-- <el-form-item label="附件">
                                                <input type="file">
                                            </el-form-item> -->
        <el-form-item label="作业相关要求">
            <!-- <quillEditor v-model="task_desc" style="background:#fff" :content="content"></quillEditor> -->
            <input type="text" v-model="task_desc">
        </el-form-item>
        <!-- <el-form-item label="参考资料">
                                                <quillEditor style="background:#fff" :content="content"></quillEditor>
                                            </el-form-item>
                                            <el-form-item label="相关参考答案">
                                                <quillEditor style="background:#fff" :content="content"></quillEditor>
                                            </el-form-item>
                                            <el-form-item label="学生交作业时间">
                                                <el-date-picker :picker-options="pickerOptions0" v-model="content" type="datetime" placeholder="选择日期时间">
                                                </el-date-picker>
                                            </el-form-item>
                                            <el-form-item label="是否提交给学生">
                                                <el-radio class="radio" v-model="radio" label="1">立即</el-radio>
                                                <el-radio class="radio" v-model="radio" label="2">暂不</el-radio>
                                            </el-form-item> -->
        <el-form-item label=" ">
            <el-button type="primary" @click="submit">保存</el-button>
            <el-button @click="quitsss">取消</el-button>
        </el-form-item>

    </el-form>
</template>
<script>
// import { quillEditor } from 'vue-quill-editor'
import store from '@/utils/operation'
export default {
    props: ['obj'],
    data() {
        return {
            form: {
                title: '',
                class_list: ''
            },
            options: [],
            content: '',
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            radio: '',
            class_list: [],
            task_desc: '',//作业内容
        }
    },
    methods: {
        submit() {
            // 添加
            if (!this.obj.task_id) {
                store.add_task.call(this);
            } else {
                store.teacher_edit_task.call(this);
            }
        },
        quitsss(){
            console.log(1)
            this.$emit("quitsss",true)
        }
    },
    created() {
        store.Teacherclass_list.call(this);
        if (!this.obj.task_id) {
        } else {
            this.form.class_list = this.obj.task_class
            this.form.title = this.obj.task_title;
            this.task_desc = this.obj.task_desc;
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
<style>
.ql-editor{
    min-height: 100px;
}
</style>
