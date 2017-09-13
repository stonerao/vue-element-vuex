<template>
    <div class="armgintop20">
        <el-row :gutter="10" class="class-header">
            <el-col :span="12" class="class-titles">
                <el-button type="primary" @click="add(1)">添加考试</el-button> <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor  marginleft15" @click="ajax" />刷新-共 {{toal}} 条记录
            </el-col> 
            <el-col :span="12">
                <el-input class="width150 float-right" placeholder="请输入搜索内容" icon="search" size="small" v-model="search" :on-icon-click="handleIconClick">
                </el-input>
            </el-col>
        </el-row>
        <el-table ref="multipleTable" :data="t_data" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" class="z-text-over">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="ID" width="80" prop="lex_id"></el-table-column>
            <el-table-column prop="lex_name" label="考试名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="add_time" label="创建时间" width="220" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="360">
                <template scope="scope">
                    <el-button size="mini" @click="add(2,scope.row.lex_id)">编辑</el-button>
                    <el-button size="mini" @click="tGo(scope.row.lex_id)">导入</el-button>
                    <el-button size="mini" @click="results(scope.row.lex_id)">成绩列表</el-button>
                    <el-button size="mini" @click="results_list(scope.row.lex_id)">成绩统计</el-button>
                    <el-button size="mini" @click="deleteTeacher(scope.row.lex_id,true)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="kd-page">
            <el-row>
                <el-col :span="12">
                    <el-button size="small" @click="deleteTeacher">删除</el-button>
                </el-col>
                <el-col :span="12">
                    <el-pagination class="float-right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[curpage]" :page-size="curpage" layout="total, sizes, prev, pager, next, jumper" :total="toal">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>

import store from '@/utils/examination'
export default {
    data() {
        return {
            searchL: '',
            toal: 0,
            search: "",
            t_data: [{}],
            page: 1,
            curpage: 10,
            arr: []
        }
    },
    methods: {
        ajax() {
            this.t_data = []
            store.line_examlist.call(this)
        },
        handleIconClick() {
            // 搜索
            this.ajax()
        },
        handleSelectionChange(obj) {
            this.arr = [];
            obj.forEach((x) => {
                this.arr.push(x.lex_id)
            })
        },
        handleCurrentChange(val) {
            this.page = val
            this.ajax()
        },
        handleSizeChange() {
            this.ajax()
        },
        deleteTeacher(id, state) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                store.del_line_examination.call(this, id && state ? id : this.arr.join(","))
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        tGo(id) {
            this.$emit("TOGO", id)
        },
        setTeacher() {

        },
        add(state, id) {

            this.$prompt(` 请输入${state == 1 ? '添加' : '编辑'}考试名称`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                store.addline_examination.call(this, value, state, id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });

        },
        results(id){
            this.$emit("results",id)
        },
        results_list(id){
             this.$emit("results_list",id)
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
</script><style>
.el-button span {
    margin-left: 0
}
</style>