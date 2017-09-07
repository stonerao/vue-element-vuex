<template>
    <el-row>
        <el-col :span='5' class="r-opertion-slist">
            <h3>
                作业要求目录
            </h3>
            <ul>
                <li>
                    <span>年/班级</span>
                    <span>20123</span>
                </li>
                <li>
                    <span>作业名称</span>
                    <span>20123</span>
                </li>
                <li>
                    <span>任务要求</span>
                    <span>20123</span>
                </li>
                <li>
                    <span>学生交作业时间:</span><br/>
                    <span>2017-9-6 16:23:17</span>
                </li>
            </ul>
            <el-row>
                <el-col :span="8">

                </el-col>
                <el-col :span="8">

                </el-col>
                <el-col :span="8">

                </el-col>
            </el-row>
        </el-col>
        <el-col :span='19'>

            <el-row>
                <el-col :span='7'>
                    <span class="line-height-36">
                        <el-button size="mini" type="primary">返回列表</el-button>
                        <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="resh" />刷新-共1 条记录
                    </span>
                </el-col>
                <el-col :span="17">
                    <div class="float-right">
                        <el-select v-model="form.state" placeholder="批改状态" class="width150 marginleft10">
                            <el-option v-for="item in studentState" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                        <el-input placeholder="请输入试卷名称" icon="search" v-model="seach" :on-icon-click="seachClick" class="width150 marginleft10">
                        </el-input>
                    </div>
                </el-col>
            </el-row>
            <el-table ref="multipleTable" :data="t_data" tooltip-effect="dark" style="width: 100%" @selection-change="selectOption">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="学生姓名" show-overflow-tooltip>
                    <template scope="scope">{{ scope.row.st_name }}</template>
                </el-table-column>

                <el-table-column label="完成时间" show-overflow-tooltip>
                    <template scope="scope">
                        <span class="index-color">{{scope.row.student_time}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="review_type" width="180" label="批改状态" show-overflow-tooltip>
                </el-table-column>

                <el-table-column width="180" label="操作" show-overflow-tooltip>
                    <template scope="scope">
                        <el-button size="mini" @click="getQues(scope.row)">查看</el-button>
                        <el-button size="mini" @click="setQues(scope.row)">编辑</el-button>
                        <el-button size="mini" @click="deleteData(scope.row.q_id,true)">删除</el-button>
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
        </el-col>
    </el-row>
</template>
<script>
import store from '@/utils/operation'
export default {
    props: ['status'],
    data() {
        return {
            seach: '',
            t_data: [],
            task_class: '',
            page: 1,
            curpage: 10,
            form: {
                state: ''
            },
            studentState: [
                { name: "未批改", id: 0 },
                { name: "已批改", id: 1 },
            ],
            page_total: 0
        }
    },
    methods: {
        seachClick() {
            this.ajax()
        },
        resh() {
            this.ajax()
        },
        selectOption() {

        },
        getQues() {

        },
        setQues() {

        },
        deleteData() {

        },
        ajax() {
            this.t_data = []
            store.teacher_tasklist.call(this)
        },
        CurrentChange(val) {
            this.page = val;
            this.ajax()
        },
        SizeChange(val) {

        }
    },
    created() {
        this.ajax();
    },
    mounted() {

    },
    watch: {
        ['form.state'](val) { 
            this.ajax()
        }
    }
}
</script>
