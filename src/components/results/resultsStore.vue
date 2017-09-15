<template>
    <div>
        <el-row>
            <el-col :span='15'>
                <el-button type="primary" @click="fan">返回列表</el-button>  
                <span class="line-height-36">
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="ajax" />刷新-共{{page_total}}条记录
                </span>
            </el-col>
            <el-col :span="9">
                <div class="float-right">
                    <el-input placeholder="请输入试卷名称" icon="search" v-model="seach" :on-icon-click="ajax" class="width150">
                    </el-input>
                </div>
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
        <el-row style="margin-top:10px">
            <el-col :span="12">
                &nbsp;
            </el-col>
            <el-col :span="12">
                <el-pagination class="float-right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[curpage]" :page-size="curpage" layout="total, sizes, prev, pager, next, jumper" :total="page_total">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import store from '@/utils/results'
export default {
    props:['id'],
    data() {
        return {
            t_data: [],
            page: 1,
            curpage: 10,
            page_total: 10,
            seach: ""
        }
    },
    methods: {
        ajax() {
            this.t_data = [];
            store.Studentline_grades_static.call(this)
        },
        selectOption() {

        },
        handleSizeChange() {

        },
        handleCurrentChange(val) {
            this.page = val;
            this.ajax()
        },
        getQues(id,status){
            this.$emit("getLexId",id,status)
        },
        fan(){
            this.$emit("fanhui",0)
        }
    },
    created() {
        this.ajax();
    },
    mounted() {

    },
    watch: {

    }
}
</script>
