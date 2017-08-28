<template>
    <div>
        <el-row>
            <el-col :span='15'>
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
        <!--考试试卷  -->
        <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="id" width="60" show-overflow-tooltip>
                <template scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column prop="papersName" label="考试名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="class" label="试卷类型" width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="年纪/班级/科目" width="130" show-overflow-tooltip>
                <template scope="scope">一批改</template>
            </el-table-column> 
            <el-table-column prop="name" label="卷面总分" width="100">
                <template scope="scope">
                    {{ scope.row.time }} 分钟
                </template>
            </el-table-column>
            <el-table-column prop="fenz" label="创建时间" width="100" show-overflow-tooltip>
            </el-table-column> 
            <el-table-column prop="address" label="操作" width="300" show-overflow-tooltip>
                <template scope="scope">
                    <el-button size="mini" >查看</el-button>
                    <el-button size="mini" >编辑</el-button>
                    <el-button size="mini" >配置</el-button>
                    <el-button size="mini" >删除</el-button>
                    <el-button size="mini" >导出试卷</el-button>
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
import store from '@/utils/questions'
export default {
    data() {
        return {
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
            },],
            obj: {
                name: '',
                id: ""
            },
            seach: "",
            selectVal: '',
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
    },
    created() {
    },
    mounted() {

    },
    watch: {

    }
}
</script>
