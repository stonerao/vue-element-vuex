<template>
    <div>
        <el-row>
            <el-col :span='15'>
                <span class="line-height-36">
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5 " @click="resh" />刷新-共{{all_pagecount}}条记录
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
            <el-table-column type="selection" width="55" v-if="!state">
            </el-table-column>
            <el-table-column label="id" width="60" show-overflow-tooltip>
                <template scope="scope">{{ scope.row.t_id }}</template>
            </el-table-column>
            <el-table-column prop="t_title" label="考试名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="t_time" label="创建时间" width="180" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" width="230" show-overflow-tooltip>
                <template scope="scope">
                    <div v-if="!state">
                        <!-- <el-button size="mini">查看</el-button> -->
                        <!-- <el-button size="mini">编辑</el-button> -->
                        <!-- <el-button size="mini">配置</el-button> -->
                        <el-button size="mini" @click="deleted(scope.row.t_id)">删除</el-button>
                        <el-button size="mini" @click="setQuestion(scope.row)">查看</el-button>
                        <el-button size="mini" @click="GOTO(scope.row)">导出</el-button>
                        <el-button size="mini" @click="statistics(scope.row.t_id)">统计</el-button>
                        <!-- <el-button size="mini">导出试卷</el-button> -->
                    </div>
                    <div v-else>
                        <el-button size="mini" @click="seleceQuestion(scope.row)">选择</el-button>
                    </div>
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
        <r-view v-if="isView" v-show="isShowView" :status="viewStatus" :obj="obj" @CLICKOVER='isView=false'></r-view>
    </div>
</template>
<script>
import store from '@/utils/questions'
import views from '@/components/examination/view'
export default {
    props: ['state'],//如果为真是创建考试过来
    data() {
        return {
            t_data: [],
            seach: "",
            all_pagecount: 1,
            page: 1,
            curpage: 10,
            deleteArr: [],
            isView: false,
            obj: {},
            isShowView: true,
            viewStatus: 0
        }
    },
    methods: {
        resh() {
            // 刷新
            this.ajax()
        },
        seachClick() {
            // 搜索
            this.ajax()
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
                this.testpaper_delete(typeof id == 'string' ? id : this.deleteArr)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        seleceQuestion(obj) {
            this.$emit("selectNative", obj)
        },
        ajax() {
            this.t_data = []
            store.TeacherQuestionList.call(this);
        },
        GOTO(obj) {
            // // 导出试卷

            this.obj = obj;
            this.isView = !this.isView
            this.isShowView = false;
            this.viewStatus = 10;
        },
        setQuestion(obj) {
            // 查看试卷
            this.viewStatus = 0;
            this.obj = obj;
            this.isShowView = true;
            this.isView = !this.isView;
        },
        statistics(id){
            this.$emit('statistics',id)
        }
    },
    created() {
        this.ajax()
    },
    mounted() {

    },
    watch: {

    },
    components: {
        'r-view': views,
    }
}
</script>
