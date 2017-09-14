<template>
    <el-form ref="form" :model="form" label-width="150px" class="margintop20">
        <el-form-item :label="`${!state?'添加名称':'编辑分类'}`">
            <el-input v-model="form.name" class="width200"></el-input>
            <span class="hui-color marginleft15">默认为一级分类</span>
        </el-form-item>
        <el-form-item label="选择一级分类">
            <el-select v-model="value_1" placeholder="请选择" class="width200">
                <el-option v-for="item in class_1" :key="item.qc_id" :label="item.qc_name" :value="item.qc_id">
                </el-option>
            </el-select>
            <el-button type="success" v-if="value_1" class="marginleft15" @click="deletes(1)">删除</el-button>
            <span class="hui-color marginleft15">选择为父级分类</span>
        </el-form-item>
        <el-form-item label="选择二级分类" v-if="value_1">
            <el-select v-model="value_2" placeholder="请选择" class="width200">
                <el-option v-for="item in class_2" :key="item.qc_id" :label="item.qc_name" :value="item.qc_id">
                </el-option>
            </el-select>
            <el-button type="success" v-if="value_2" class="marginleft15" @click="deletes(2)">删除</el-button>
            <span class="hui-color marginleft15">选择为父级分类</span>
        </el-form-item>
        <el-form-item label=" ">
            <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import store from '@/utils/questions'
export default {
    props: ['obj'],
    data() {
        return {
            form: {
                name: "",
                id: ''
            },
            class_1: [],
            value_1: '',
            class_2: [],
            value_2: '',
            state: false
        }
    },
    methods: {
        submit() {
            if (!this.state) {
                store.question_classadd.call(this);
            } else {

            }
        },
        deletes(status) {
            if (status == 1) {
                this.value_1 = '';
            } else {
                this.value_2 = '';
            }
        },
        ajax_data() {
            store.question_classlist_select.call(this, '', 1);
        }
    },
    created() {
        this.ajax_data();
        if (this.obj) {
            this.state = true;
            this.form.name = this.obj.qc_name;
        }
    },
    mounted() {

    },
    watch: {
        value_1(val) {
            if (val != '') {
                store.question_classlist_select.call(this, val, 2)
            } else {
                this.value_2 = '';
            }
        }
    }
}
</script>
