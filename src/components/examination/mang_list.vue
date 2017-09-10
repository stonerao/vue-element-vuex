<template>
    <div>
        <el-row>
            <el-col :span='15'>
                <span class="line-height-36">
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5 " @click="resh" />刷新-共{{page_total}}条记录
                </span>
            </el-col>
            <el-col :span="9">
                <!-- <div class="float-right">
                    <el-input placeholder="请输入试卷名称" icon="search" v-model="seach" :on-icon-click="seachClick" class="width150">
                    </el-input>
                </div> -->
            </el-col>
        </el-row>
        <el-table ref="multipleTable" :data="t_data" tooltip-effect="dark" style="width: 100%">
            <el-table-column label="id" width="80" show-overflow-tooltip>
                <template scope="scope">{{ scope.row.e_id }}</template>
            </el-table-column>
            <el-table-column prop="student_name" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="exam_grades" label="总分" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="finished_time" label="时间"  width="220"  show-overflow-tooltip>
            </el-table-column>
            <el-table-column width="180" label="操作" show-overflow-tooltip>
                <template scope="scope">
                    <el-button size="mini" @click="to_id(scope.row.exam_id)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
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

import store from '@/utils/examination'
export default {
    props: ['id'],
    data() {
        return {
            page_total: 0,
            curpage: 10,
            page: 1,
            seach:"",
            t_data:[]
        }
    },
    methods: {
        handleChange(val) {
            console.log(val)
        },
        handleSizeChange() {

        },
        handleCurrentChange(val) {
            this.curpage = val;
        },
        seachClick(){

        },
        resh(){

        },
        ajax(){
            store.mang_list.call(this);
        },
        to_id(id){
            this.$emit("toMangList",id);
        }
    },
    created() {
       this.ajax()
    },
    mounted() {

    },
    watch: {

    }
}
</script>
