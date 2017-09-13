<template>
    <div class="armgintop20">
        <el-row :gutter="10" class="class-header">
            <el-col :span="12" class="class-titles">
                <el-button type="primary" @click="fan">返回列表</el-button> <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor  marginleft15" @click="ajax" />刷新-共 {{toal}} 条记录
            </el-col>
            <el-col :span="12">
                <el-input class="width150 float-right" placeholder="请输入搜索内容" icon="search" size="small" v-model="search" :on-icon-click="handleIconClick">
                </el-input>
            </el-col>
        </el-row>
        <el-table ref="multipleTable" :data="t_data" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" class="z-text-over">
            <el-table-column label="ID" width="80" prop="le_id"></el-table-column>
            <el-table-column prop="le_student_name" label="学生姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lex_name" label="考试名称" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="le_subject" label="科目" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="exam_grades" label="分数" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="add_time" label="录入时间" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="100">
                <template scope="scope">
                    <el-button size="mini" @click="deleteTeacher(scope.row.le_id,true)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="kd-page">
            <el-row>

                <el-col :span="24">
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
    props: ['state', 'id'],
    data() {
        return {
            toal: 0,
            search: "",
            t_data: [{}],
            page: 1,
            curpage: 10,
            arr: []
        }
    }, methods: {
        ajax() {
            this.t_data = [];

            store.line_gradeslist.call(this)
        },
        handleIconClick() {
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
        }, deleteTeacher(id, state) {

            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                store.del_line_gradeslist.call(this, id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        fan() {
            this.$emit("fanhui")
        }
    },
    created() {
        this.ajax()
    }
}
</script>

<style>

</style>
