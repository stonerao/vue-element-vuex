<template>
    <div>
        <el-row>
            <el-col :span='15'>
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
        <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="id" width="80" show-overflow-tooltip>
                <template scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column prop="papersName" label="试卷名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="class" label="科目" width="80" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="试卷状态" show-overflow-tooltip>
                <template scope="scope">一批改</template>
            </el-table-column>
            <el-table-column prop="name" label="时间设定" show-overflow-tooltip>
                <template scope="scope">
                    <p>{{ scope.row.timeSet }}</p>
                    <p>{{ scope.row.timeSet2 }}</p>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="考试时长" show-overflow-tooltip>
                <template scope="scope">
                    {{ scope.row.time }} 分钟
                </template>
            </el-table-column>
            <el-table-column prop="fenz" label="考试耗时" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="fen" label="试卷得分" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="及格试卷/卷面总分"   width="160"  show-overflow-tooltip>
                <template scope="scope">
                    90/150
                </template>
            </el-table-column>
            <el-table-column prop="address" label="操作" show-overflow-tooltip>
                <template scope="scope">
                    <el-button size="mini" icon='edit'>进入考试</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row>
            <el-col :span="24">
                <!-- <el-pagination class="float-right" @size-change="SizeChange" @current-change="CurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="all_pagecount">
                    </el-pagination> -->
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            obj: {
                name: '',
                id: ""
            },
            seach: "",
            selectVal: '',
            tableData3: [{
                date: '2016-05-03',
                name: '王小虎',
                papersName: '2016年半期考试试卷，数学模拟考试',
                address: '上海市普陀区金沙江路 1518 弄',
                id: '231',
                class: "语文",
                timeSet: '2017-8-21 17:15:57',
                timeSet2: '2017-8-21 17:15:57',
                time: '10',
                fenz: '150',
                fen: '100',
                setName: '创建人',
                papersNameTime: '2017-8-21 17:18:58'
            },]

        }
    },
    methods: {
        resh() {
            // 刷新
        },
        seachClick() {
            // 搜索

        }, toggleSelection(rows) {
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
        }
    }
}
</script>

<style>

</style>
