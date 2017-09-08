<template>
    <div>
        <el-row>
            <el-col :span='15'>
                <el-button type="primary" size="small" icon="plus">未开始</el-button>
                <el-button type="primary" size="small" icon="plus">进行中</el-button>
                <el-button type="primary" size="small" icon="plus">待阅卷</el-button>
                <el-button type="primary" size="small" icon="plus">已完成</el-button>
                <span>
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="resh" />刷新-共1条记录
                </span>
            </el-col>
            <el-col :span="9">
                <div class="float-right">
                    <el-select v-model="selectVal" placeholder="请选择试卷分类" class="width150">
                        <el-option v-for="item in obj" :key="item.name" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-input placeholder="请输入试卷名称" icon="search" v-model="seach" :on-icon-click="seachClick" class="width150">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-table ref="multipleTable" :data="t_data" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column label="id" width="80" show-overflow-tooltip>
                <template scope="scope">{{ scope.row.e_id }}</template>
            </el-table-column>
            <el-table-column prop="e_title" label="试卷名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="e_allsource" label="卷面总分" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="e_whenlong" label="考试时长" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="创建人" show-overflow-tooltip>
                <template scope="scope">
                    <p>{{ scope.row.teacher_name }}</p>
                    <p>{{ scope.row.e_time }}</p>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="操作" show-overflow-tooltip>
                <template scope="scope">
                    <el-button size="mini" icon='edit' @click="goExam(scope.row)">进入考试</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row>
            <el-col :span="24">
                <el-pagination class="float-right" @size-change="SizeChange" @current-change="CurrentChange" :current-page="page" :page-sizes="[curpage]" :page-size="curpage" layout="total, sizes, prev, pager, next, jumper" :total="all_pagecount">
                </el-pagination>
            </el-col>
        </el-row>
        <alertExam v-if="is_alert" @examgood="examgood" :obj="is_alert_obj" @is_over="is_over"></alertExam>

    </div>
</template>

<script>
import alertExam from '@/components/examination/alertExam'
import store from '@/utils/examination'
export default {
    data() {
        return {
            obj: {
                name: '',
                id: ""
            },
            seach: "",
            selectVal: '',
            page: 1,
            curpage: 10,
            all_pagecount: 0,
            t_data: [],
            is_alert: false,
            is_alert_obj: {}
        }
    },
    methods: {
        resh() {
            // 刷新
        },
        seachClick() {
            // 搜索
            this.ajax();
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        goExam(obj) {
            // 开始考试
            this.is_alert_obj = obj
            this.is_alert = true;
        },
        ajax() {
            this.t_data = []
            store.Studentexamination_list.call(this)
        },
        is_over() {
            // 关闭模态框
            this.is_alert = false;
        },
        CurrentChange(val) {
            // fanye 
            this.page = val;
            this.ajax();
        },
        SizeChange() {

        },
        examgood(state) {
            // 
            if (state == true) {

            }
        }

    },
    components: {
        alertExam
    },
    created() {
        this.ajax();

    }
}
</script>

<style>

</style>
