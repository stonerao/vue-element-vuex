<template>
    <div>
        <el-row :gutter="10" class="class-header">
            <el-col :span="5" class="class-titles">
                <el-button size="mini" type="primary" @click="fanhui" style="text-indent:0">返回</el-button>
                <span>
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="ajaxData" />刷新-共{{page_total}}条记录
                </span>
            </el-col>
            <el-col :span="19">
                <div class="float-right">
                    <el-input placeholder="搜索" icon="search" v-model="title" :on-icon-click="ajaxData" class="width150">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-table ref="multipleTable" :data="t_data" tooltip-effect="dark" style="width: 100%" class="z-text-over">

            <el-table-column label="id" width="60" show-overflow-tooltip>
                <template scope="scope">{{ scope.row.e_id }}</template>
            </el-table-column>
            <el-table-column prop="student_name" label="学生姓名" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="pm" label="排名" width="380" show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <el-row style="margin-top:10px">
            <el-col :span="12">
                &nbsp;
            </el-col>
            <el-col :span="12">
                <el-pagination class="float-right" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[curpage]" :page-size="curpage" layout="total, sizes, prev, pager, next, jumper" :total="page_total">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script> 
import store from '@/utils/questions'
export default {
    props: ['id'],
    data() {
        return {
            title: '',
            page_total: 1,
            t_data: [],
            curpage: 10,
            page: 1
        }
    },
    methods: {
        ajaxData() {
            this.t_data = [];
            store.online_grades_static.call(this, this.id)
        },
        fanhui() {
            this.$emit("fanhui")
        },
        handleCurrentChange(val){
            this.page = val;
            this.ajaxData()

        }
    },
    created() {
        this.ajaxData();
    }
}
</script>

<style>
.el-button--mini>span {
    margin-left: 0
}
</style>
