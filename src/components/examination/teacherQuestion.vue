<template>
    <div>
        <el-row>
            <el-col :span='15'>
                <span class="line-height-36">
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5 " @click="resh" />刷新-共1条记录
                </span>
            </el-col>
            <el-col :span="9">
                <div class="float-right">

                    <el-input placeholder="请输入试卷名称" icon="search" v-model="seach" :on-icon-click="seachClick" class="width150">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <!--考试试卷  -->
        <el-table ref="multipleTable" :data="t_data" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="id" width="60" show-overflow-tooltip>
                <template scope="scope">{{ scope.row.t_id }}</template>
            </el-table-column>
            <el-table-column prop="t_title" label="考试名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="t_time" label="创建时间" width="180" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" width="300" show-overflow-tooltip>
                <template scope="scope">
                    <el-button size="mini">查看</el-button>
                    <el-button size="mini">编辑</el-button>
                    <el-button size="mini">配置</el-button>
                    <el-button size="mini" @click="deleted(scope.row.t_id)">删除</el-button>
                    <el-button size="mini">导出试卷</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row>
            <el-col :span="12" class="line-height-36">
                <el-button size="mini" type="primary" @click="deleted">删除</el-button>
            </el-col>
            <el-col :span="12">
                <el-pagination class="float-right" @size-change="SizeChange" @current-change="CurrentChange" :current-page="1" :page-sizes="[curpage]" :page-size="curpage" layout="total, sizes, prev, pager, next, jumper" :total="all_pagecount">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import store from '@/utils/questions'
export default {
    data() {
        return {
            t_data: [],
            seach: "",
            all_pagecount: 1,
            page: 1,
            curpage: 10,
            deleteArr: []
        }
    },
    methods: {
        resh() {
            // 刷新
        },
        seachClick() {
            // 搜索

        },
        handleSelectionChange(val) {
            this.deleteArr = [];
            val.forEach((x) => {
                this.deleteArr.push(x.t_id)
            }) 
        },
        SizeChange() {

        },
        CurrentChange() {

        },
        testpaper_delete(id) {
            // 删除
            if (typeof id == 'object') {
                id = id.join(",")
            }
            store.testpaper_delete.call(this, id);
        },
        deleted(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(this.deleteArr)
                this.testpaper_delete(typeof id == 'string' ? id : this.deleteArr)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        }
    },
    created() {
        store.TeacherQuestionList.call(this);
    },
    mounted() {

    },
    watch: {

    }
}
</script>
