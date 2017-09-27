<template>
    <div class="r-notice">
        <el-row>
            <el-col :span='15'>
                <span class="line-height-36">
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="dataAjax" />刷新-共{{page_total}}条记录
                </span>
            </el-col>
            <el-col :span="9">
                <div class="float-right">
                    <el-input placeholder="请输入试卷名称" icon="search" v-model="seach" :on-icon-click="dataAjax" class="width150">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-table ref="multipleTable" :data="t_data" tooltip-effect="dark" style="width: 100%" @selection-change="selectOption">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="id" width="80" show-overflow-tooltip>
                <template scope="scope">{{ scope.row.q_id }}</template>
            </el-table-column>
            <el-table-column prop="q_title" label="题干" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="试题类型" width="120" show-overflow-tooltip>
                <template scope="scope">
                    <span class="index-color">{{scope.row.type_name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="q_add_time" width="180" label="创建时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column width="120" label="是否共享" show-overflow-tooltip>
                <template scope="scope">
                    <!-- <el-switch v-model="scope.row.is_share" on-color="#13ce66" off-color="" on-text="是" off-text="否" disabled>
                                                                                </el-switch> -->
                    {{scope.row.is_share?'是':'否'}}
                </template>
            </el-table-column>
            <el-table-column width="180" label="操作" show-overflow-tooltip v-if="stateList!=1">
                <template scope="scope">
                    <el-button size="mini" @click="deleteData(scope.row.q_id,true)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row style="margin-top:10px">
            <el-col :span="12">
                <el-button size="mini" type="primary" @click="deleteData" v-if="stateList!=1">删除</el-button>
            </el-col>
            <el-col :span="12">
                <el-pagination class="float-right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[curpage]" :page-size="curpage" layout="total, sizes, prev, pager, next, jumper" :total="page_total">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script> 
import store from '@/utils/questions'
export default {
    props: ['stateList', 'listSelectObj'],
    data() {
        return {
            t_data: [],
            seach: '',
            page: 1,//当前页数
            curpage: 10,//每页条数 
            page_total: 20,//总个数
            deletArr: [],//删除id
            previewBox: {},//试题预览
            isPrev: false,
            questionClass: '',//id class
            multipleTable: []
        }
    },
    methods: {
        selectOption(obj) {
            // 选择 
            this.deletArr = [];
            obj.forEach((x) => {
                this.deletArr.push(x.q_id)
            });

            // selectedQuestionList(this.deletArr)
        },
        seachClick() {
        },
        resh() {
            // 刷新
            this.dataAjax();
        },
        handleSizeChange(val) {
            this.dataAjax();
            console.log(getSelectedQuestionList())
        },
        handleCurrentChange(val) {
            this.page = parseInt(val);
            this.dataAjax()
        },
        dataAjax(seach) {
            this.t_data = [];
            store.AdminSchool_questionlist.call(this)
        },
        deleteData(id, status) {
            // 删除
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                store.AdminSchool_deletequestion.call(this, status ? id : this.deletArr.join(","));
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        isPrevClick(obj) {
            this.isPrev = !this.isPrev;
            this.previewBox = obj
        },
    },
    created() {
        this.dataAjax();



    },
    components: {
    }
}
</script>

<style>

</style>
