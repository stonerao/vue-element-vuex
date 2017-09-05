<template>
    <div>
        <!-- 老师考试列表 -->
        <el-row>
            <el-col :span='15'>
                <span class="line-height-36">
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5 " @click="resh" />刷新-共{{page_total}}条记录
                </span>
            </el-col>
            <el-col :span="9">
                <div class="float-right">
                    <el-select class="width200" v-model="e_class" placeholder="考试年纪">
                        <el-option :label="item.class_name" :value="item.department_id" v-for="item in ages.age" :key="item.department_id"></el-option>
                    </el-select>
                    <el-input placeholder="请输入试卷名称" icon="search" v-model="seach" :on-icon-click="seachClick" class="width150">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-table ref="multipleTable" :data="t_data" tooltip-effect="dark" style="width: 100%" @selection-change="selectOption">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="id" width="80" show-overflow-tooltip>
                <template scope="scope">{{ scope.row.e_id }}</template>
            </el-table-column>
            <el-table-column prop="e_title" label="题干" show-overflow-tooltip>
            </el-table-column>
            <el-table-column width="180" label="操作" show-overflow-tooltip>
                <template scope="scope">
                    <el-button size="mini" @click="setQues(scope.row)">编辑</el-button>
                    <el-button size="mini" @click="deleteData(scope.row.e_id,true)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row style="margin-top:10px">
            <el-col :span="12">
                <el-button size="mini" type="primary" @click="deleteData">删除</el-button>

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
    data() {
        return {
            seach: '',//搜索
            e_class: '',//考试班级
            page: 1,
            curpage: 10,
            ages: {
                age: []
            },
            t_data: [],
            page_total: 0,
            selectArr:[]
        }
    },
    methods: {
        seachClick() {
            this.ajax()
        },
        resh() {
            // 刷新
            this.ajax()
        },
        ajax() {
            store.examList.call(this);
        },
        selectOption(obj) {
            // 选择tab 
            obj.forEach((x)=>{
                selectArr.push(x.e_id)
            })
        },
        deleteData(id) {

        },
        setQues(obj) {
            // 编辑
            this.$emit("setQuestion",obj)
        },
        handleSizeChange() {

        },
        handleCurrentChange() {

        }
    },
    created() {
        this.ajax();
        store.grade_list.call(this);
    },
    mounted() {

    },
    watch: {
        e_class(val) {
            this.ajax()
        }
    }
}
</script>
