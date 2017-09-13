<template>
    <div class="armgintop20">
        <el-row :gutter="10" class="class-header">
            <el-col :span="12" class="class-titles">
                <el-button type="primary" @click="fan">返回列表</el-button> <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor  marginleft15" @click="ajax" />刷新-共 {{toal}} 条记录
            </el-col>
            <el-col :span="12">

            </el-col>
        </el-row>
        <el-table ref="multipleTable" :data="t_data" tooltip-effect="dark" @selection-change="handleSelectionChange" style="width: 100%" class="z-text-over">
            <el-table-column label="ID" width="80" prop="le_id"></el-table-column>
            <el-table-column prop="le_student_name" label="学生姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lex_name" label="考试名称" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="le_subject" label="科目" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="exam_grades" label="分数" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="add_time" label="录入时间" width="180" show-overflow-tooltip></el-table-column>

        </el-table>

    </div>
</template>

<script>
import store from '@/utils/examination'
export default {
    props: ['id'],
    data() {
        return {
            toal: 0,
            search: "",
            t_data: [],
            page: 1,
            curpage: 10,
            arr: []
        }
    },
    methods: {
        ajax() {
            this.t_data = [];
            store.line_grades_static.call(this)
        },
        fan() {
            this.$emit("fanhui")
        },
        handleSelectionChange() {

        }
    },
    created() {
        this.ajax()
        console.log(this.id)
    }
}
</script>

<style>

</style>
