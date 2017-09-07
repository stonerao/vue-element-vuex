<template>
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="通知标题">
            <el-input v-model="form.title" class="width200"></el-input>
        </el-form-item>
        <el-form-item label="接收人">
            <el-radio-group v-model="form.zn_receive_type">
                <el-radio :label="1">学生</el-radio>
                <el-radio :label="2">老师</el-radio>
                <el-radio :label="3">班级</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="接受人列表" v-if="form.zn_receive_type==1">
            <el-select v-model="form.zn_receive" multiple placeholder="请选择">
                <el-option v-for="item in options" :key="item.st_id" :label="item.st_name" :value="item.st_id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="接受人列表" v-if="form.zn_receive_type==2">
            <el-select v-model="form.zn_receive" multiple placeholder="请选择">
                <el-option v-for="item in options" :key="item.teacher_id" :label="item.teacher_name" :value="item.teacher_id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="接受人列表" v-if="form.zn_receive_type==3">
            <el-select v-model="form.zn_receive" multiple placeholder="请选择">
                <el-option v-for="item in options" :key="item.department_id" :label="item.department_name" :value="item.department_id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="发布信息">
            <quillEditor v-model="textF"></quillEditor>
        </el-form-item>
        <el-form-item label=" ">
            <el-button type="primary" @click="submit">确认发布</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import store from '@/utils/notice'
import { quillEditor } from 'vue-quill-editor'
export default {
    data() {
        return {
            form: {
                title: '',
                zn_receive_type: '',
                zn_receive: []
            },
            textF: "",
            options: [],
            is_type: ""
        }
    },
    methods: {
        submit() {
            // 发布
            if (this.form.zn_receive_type == '') {
                this.$notify({
                    title: '警告',
                    message: '选择接收人',
                    type: 'warning'
                });
                return
            } 
            if (this.textF == '') {
                this.$notify({
                    title: '警告',
                    message: '发布信息不能为空',
                    type: 'warning'
                });
                return
            }
            if (this.form.zn_receive.length == 0) {
                this.$notify({
                    title: '警告',
                    message: '请选择列表',
                    type: 'warning'
                });
                return
            }
            store.add_notice.call(this)
        },
        receive_list() {
            store.receive_list.call(this)
        }
    },
    created() {

    },
    mounted() {

    },
    watch: {
        ['form.zn_receive_type'](val) {
            console.log(val)
            this.form.zn_receive = []
            this.receive_list();
        }
    },
    components: {
        quillEditor
    }
}
</script>
