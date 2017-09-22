<template>
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="通知标题">
            <el-input v-model="form.title" class="width200"></el-input>
        </el-form-item>
        <el-form-item label="接受班级列表">
            <el-select v-model="ids" multiple placeholder="请选择" class="width300">
                <el-option v-for="item in t_data" :key="item.department_id" :label="item.department_name" :value="item.department_id">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="发布信息">
            <!-- <quillEditor ></quillEditor> -->
            <!-- <input type="text" v-model="textF"> -->
            <!-- <el-input type="textarea" class="width300" :rows="2" placeholder="请输入内容" v-model="textF">
                            </el-input> -->
            <vue-html5-editor :content="content" :height="300" @change="editor"></vue-html5-editor>
        </el-form-item>
        <el-form-item label=" ">
            <el-button type="primary" @click="submit">确认发布</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import store from '@/utils/notice'
export default {
    data() {
        return {
            form: {
                title: ""
            },
            ids: [],
            t_data: [],
            textF: '',
            content: ''

        }
    },
    methods: {
        submit() {
            store.send_znotice.call(this);
        },
        editor(val) {
            this.textF = val;
        }
    },
    created() {
        store.Teacherclass_list.call(this)
    },
    mounted() {

    },
    watch: {

    },
    components: {
    }
}
</script>
