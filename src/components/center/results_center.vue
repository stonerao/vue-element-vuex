<template>
    <div class="armgintop20">
        <el-row :gutter="10" class="class-header">
            <el-col :span="12" class="class-titles">
                <el-button type="primary" @click="fan">返回列表</el-button>  
            </el-col>
            <el-col :span="12">

            </el-col>
        </el-row>
        <table border="0" class="r_center_table">
            <thead>
                <tr>
                    <th v-for="(item,index)  in t_data[0]" :key="index">{{index=='all_zgrades'?'总分':index=='le_student_id'?'ID':index=='le_student_name'?'学生姓名':index=='pm'?'排名':index}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in t_data" :key="index">
                    <td v-for="(box,i) in item" :key="i">
                        {{box}}
                    </td>
                </tr>
            </tbody>
        </table>

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
            arr: [], 
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
