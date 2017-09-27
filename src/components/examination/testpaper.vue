<template>
    <div>
        <el-row :gutter="10" class="class-header">
            <el-col :span="4" class="class-titles">
                <span>
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="ajaxData" />刷新-共{{page_total}}条记录
                </span>
            </el-col>
            <el-col :span="20">
                <div class="float-right">
                    <el-input placeholder="搜索" icon="search" v-model="title" :on-icon-click="ajaxData" class="width150">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-table ref="multipleTable" :data="t_data" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" class="z-text-over">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="id" width="60" show-overflow-tooltip>
                <template scope="scope">{{ scope.row.t_id }}</template>
            </el-table-column>
            <el-table-column prop="t_title" label="考试名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="t_time" label="创建时间" width="180" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" width="150" show-overflow-tooltip>
                <template scope="scope">
                    <el-button size="mini" @click="btns(scope.row.t_id)">分享自己</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="kd-page">
            <el-row>
                <el-col :span="0" style="padding-left:15px">
                   
                </el-col>
                <el-col :span="24">
                    <el-pagination class="float-right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curpage" :page-sizes="[curpage]" :page-size="page" layout="total, sizes, prev, pager, next, jumper" :total="page_total">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script> 
import store from '@/utils/questions'
export default {
    data() {
        return {
            title: '',
            page_total: 10,
            t_data: [],
            curpage: 10,
            page: 1
        }
    },
    methods: {
        ajaxData() {
            this.t_data = [];
            store.teacher_testpaper.call(this)
        },
        handleSizeChange() {

        },
        handleCurrentChange(val) {
            this.page = val;
            this.ajaxData()
        },
        handleSelectionChange(val) {

        },
        btns(id) {
            this.$confirm('是否分享成为自己的试卷', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                store.edit_sharetestpaper.call(this, id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        }
    },
    created() {
        this.ajaxData();
    }
}
</script>

<style>

</style>
