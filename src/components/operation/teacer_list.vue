<template>
    <div>
        <el-row>
            <el-col :span='15'>
                <span class="line-height-36">
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="resh" />刷新-共{{page_total}} 条记录
                </span>
    <span  @click="getQues"></span>
            </el-col>
            <el-col :span="9">
                <div class="float-right">
                    <el-input placeholder="请输入试卷名称" icon="search" v-model="seach" :on-icon-click="seachClick" class="width150">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-table ref="multipleTable" :data="t_data" tooltip-effect="dark" style="width: 100%">
            <!-- <el-table-column type="selection" width="55">
                </el-table-column> -->
            <el-table-column label="id" width="80" show-overflow-tooltip>
                <template scope="scope">{{ scope.row.task_id }}</template>
            </el-table-column>
            <el-table-column prop="task_title" label="题干" show-overflow-tooltip>
            </el-table-column>
            <!-- <el-table-column label="试题类型" width="120" show-overflow-tooltip>
                    <template scope="scope">
                        <span class="index-color">{{scope.row.type_name}}</span>
                    </template>
                </el-table-column> -->
            <el-table-column prop="task_time" width="180" label="时间" show-overflow-tooltip>
                 </el-table-column> 
            <el-table-column prop="class_name" width="180" label="作业班级" show-overflow-tooltip>
            </el-table-column> 
            <el-table-column width="180" label="操作" show-overflow-tooltip>
                <template scope="scope">
                    <el-button size="mini" @click="getQues(scope.row)">查看</el-button>
                    <el-button size="mini" @click="setQues(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="kd-page">
            <el-row>
                <el-col :span="12" style="padding-left:15px">
                    &nbsp;
                </el-col>
                <el-col :span="12">
                    <el-pagination class="float-right" @size-change="SizeChange" @current-change="CurrentChange" :current-page="1" :page-sizes="[curpage]" :page-size="curpage" layout="total, sizes, prev, pager, next, jumper" :total="page_total">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import store from '@/utils/operation'
export default {
    data() {
        return {
            seach: '',
            t_data: [],
            task_class: '',
            page: 1,
            curpage: 10,
            page_total: 0
        }
    },
    methods: {
        seachClick() {
            this.seach=''
             this.ajax()
        },
        resh() {
            this.ajax()
        },
        getQues(obj) {
            this.$emit("tablist", obj)
        },
        setQues() {

        },
        deleteData() {

        },
        ajax() {
            this.t_data=[]
            store.task_list.call(this)
        },
        SizeChange() {

        },
        CurrentChange(val) {
            this.page = val
            this.ajax()
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
