<template>
    <div>
        <el-row>
            <el-col :span='15'>
                <el-button type="primary" @click="fan">返回列表</el-button>  
                <span class="line-height-36">
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="ajax" />刷新-共{{page_total}}条记录
                </span>
            </el-col>
            <el-col :span="9">
                <div class="float-right">
                    <el-input placeholder="请输入试卷名称" icon="search" v-model="seach" :on-icon-click="ajax" class="width150">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-table ref="multipleTable" :data="t_data" tooltip-effect="dark" style="width: 100%" @selection-change="selectOption">

            <el-table-column label="Id" prop="exam_id"  width="80" show-overflow-tooltip> 
            </el-table-column> 
            <el-table-column prop="finished_time"   label="完成" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="exam_grades"   label="总分" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="pm" width="130" label="排名" show-overflow-tooltip>
            </el-table-column>
            <el-table-column width="230" label="操作" show-overflow-tooltip>
                <template scope="scope"> 
                    <el-button size="mini" @click="getQues(scope.row,2)">查看答案</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row style="margin-top:10px">
            <el-col :span="12">
                &nbsp;
            </el-col>
            <el-col :span="12">
                <el-pagination class="float-right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[curpage]" :page-size="curpage" layout="total, sizes, prev, pager, next, jumper" :total="page_total">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import store from '@/utils/results'
export default {
    props:['id','obj'],
    data() {
        return {
            t_data: [],
            page: 1,
            curpage: 10,
            page_total: 10,
            seach: ""
        }
    },
    methods: {
        ajax() {
            
        },
        selectOption() {

        },
        handleSizeChange() {

        },
        handleCurrentChange(val) {
            this.page = val;
            this.ajax()
        },
        getQues(val){
            this.$emit("getAnswer",id,status)
        },
        fan(){
            this.$emit("fanhui",0)
        }
    },
    created() {
        this.ajax();
        console.log(this.obj)
        
    },
    mounted() {

    },
    watch: {

    }
}
</script>
