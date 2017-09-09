<template>
    <div class="kd-app-main">
        <titleItem :titleText="$route.name.substring(1)"></titleItem>
        <div class="kd-box">
            <div class="kd-app-box">
                <titleActive :titles="titleItem" @Transfer="emitTransfer" :state="state"></titleActive>
            </div>
            <div class="kd-box-content">
                <description :prompts="prompts" @PromPts="promptsTem"></description>
                <!--模块开始  -->
                <div v-if="state==0">
                    <div v-if="subject_1">
                        <div class="l_mater_header">
                            <el-row :gutter="15">
                                <el-col :span="6">
                                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs" />刷新-共{{materialParams.total_num}}条记录
                                </el-col>
                                <el-col :span="18" class="mater_search clearfloat" style="margin-bottom: 10px;">
                                    <el-col :span="5" style="float: right;">
                                        <el-input placeholder="输入科目名称" v-model="subjectName">
                                            <el-button slot="append" icon="search" @click.native="subjectSearch"></el-button>
                                        </el-input>
                                    </el-col>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="l_confer_table l_mater_table">
                            <el-table ref="multipleTable" :data="subjectManaList" border tooltip-effect="dark" style="width: 100%" @selection-change="select_Change">
                                <el-table-column type="selection" width="48"></el-table-column>
                                <el-table-column label="ID" prop="id"></el-table-column>
                                <el-table-column label="科目名称" prop="name"></el-table-column>
                                <el-table-column label="操作">
                                    <template scope="scope">
                                        <el-button type="primary" size="mini" icon="edit" @click.native="editSubject(scope.row.id)">编辑</el-button>
                                        <el-button type="primary" size="mini" icon="delete" @click.native="deleteRow(scope.row.id)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="l_mater_footer" style="margin-top: 8px;">
                            <el-row :span="24">
                                <el-col :span="6">
                                    <div class="footer_search">
                                        <el-button type="primary" size="mini" @click.native="deleteRow">删除</el-button>
                                    </div>
                                </el-col>
                                <el-col :span="18">
                                    <div class="kd-page">
                                        <el-row>
                                            <el-col :span="24">
                                                <el-pagination class="float-right" :current-page="materialParams.curpage" :page-sizes="[15, 20, 25, 30]" :page-size="materialParams.page_count" layout="total, sizes, prev, pager, next, jumper" :total="materialParams.total_num" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                                                </el-pagination>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
                <div v-if="state==1">
                    
                </div>
    
            </div>
            <bottomItem></bottomItem>
        </div>
    </div>
</template>

<script>
import { getClass } from '@/utils/auth'
import rec from '@/utils/l_axios1'
import titleItem from '@/components/main/title.vue'
import titleActive from '@/components/main/titleActive.vue'
import description from '@/components/main/description.vue'
import bottomItem from '@/components/bottom/bottom.vue'
export default {
    data() {
        return {
            titleItem: [
                { name: "科目管理", index: 0 },
                { name: "增加科目", index: 1 },
            ],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 0,
            materialParams: {   //翻页
                hasmore: true,
                curpage: 1,//当前页数
                one_pagenum: 10,
                page_count: 1,//总页数
                total_num: 0
            },
            subject_1: true,
            subject_2: false,
            isClassLogin: getClass(), 
            subjectName: '',
            subjectManaList: [],
        }
    },
    created() {
        if(this.isClassLogin == 1){ //学校管理系统
            rec.subjectList_s.call(this,this.materialParams,this.subjectName);
        }
    },
    components: {
        titleItem, titleActive, description, bottomItem
    },
    methods: {
        emitTransfer(index) {
            if (this.state == index) {
                return
            }
            this.state = index;
        },
        promptsTem(status) {
            console.log(status)
        },
        subjectSearch(){
            rec.subjectList_s.call(this,this.materialParams,this.subjectName);
        },
        select_Change(val){
            console.log(val)
        },
        editSubject(id){

        },
        deleteRow(id){

        },
        handleSizeChange(val) {
            this.materialParams.one_pagenum = val;
            rec.subjectList_s.call(this,this.materialParams,this.subjectName);
        },
        handleCurrentChange(val) {
            console.log(val)
            this.materialParams.curpage = val;
            rec.subjectList_s.call(this,this.materialParams,this.subjectName);
        },
    }
}
</script>
 
<style scoped>

</style>
