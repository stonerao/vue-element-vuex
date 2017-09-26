<template>
    <div class="kd-app-main">
        <titleItem :titleText="$route.name.substring(1)"></titleItem>
        <div class="kd-box">
            <div class="kd-app-box">
                <titleActive :titles="titleItem" @Transfer="emitTransfer" :state="state"></titleActive>
            </div>
            <div class="kd-box-content">
                <description :prompts="prompts" @PromPts="promptsTem"></description>
                <div class="l_layout_outer">
                    <div v-if="state==0">
                        <div v-if="subject_1">
                            <div class="l_mater_header">
                                <el-row :gutter="15">
                                    <el-col :span="6" class="class-titles">
                                        <img src="../../assets/index/shuaxin.png" class="icon-img-xs" @click="L_refresh3"/>刷新-共{{materialParams.total_num}}条记录
                                    </el-col>
                                    <el-col :span="18" class="mater_search clearfloat" style="margin-bottom: 10px;"> 
                                            <el-input placeholder="输入科目名称" v-model="subjectName" class="width200 float-right" style="margin-right:10px">
                                                <el-button slot="append" icon="search" @click.native="subjectSearch"></el-button>
                                            </el-input>
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
                                            <el-button type="primary" size="mini" icon="view" @click.native="checkSubject(scope.row.id)">查看</el-button>
                                            <el-button type="primary" size="mini" icon="edit" @click.native="editSubject(scope.row.id,scope.row.name)">编辑</el-button>
                                            <el-button type="primary" size="mini" icon="delete" @click.native="deleteRow(scope.row.id)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="l_mater_footer" style="margin-top: 8px;">
                                <el-row :span="24">
                                    <el-col :span="6">
                                        <div class="footer_search">
                                            <el-button type="primary" size="mini" @click.native="deleteRow(deleteID)">删除</el-button>
                                        </div>
                                    </el-col>
                                    <el-col :span="18">
                                        <div class="kd-page">
                                            <el-row>
                                                <el-col :span="24">
                                                    <el-pagination class="float-right" :current-page="materialParams.curpage" :page-sizes="[10]" :page-size="materialParams.page_count" layout="total, sizes, prev, pager, next, jumper" :total="materialParams.total_num" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                                                    </el-pagination>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <div v-if="subject_2">
                            <createSubject :whetherEdit="whetherEdit" :ROWDATA="rowData" @COMEBACK="comeBack"></createSubject>
                        </div>
                    </div>
                    <div v-if="state==1">
                        <createSubject :whetherEdit="whetherEdit"></createSubject>
                    </div>

                    <div class="myPopup" v-if="Dailog">
                        <div class="Popup" style="width:30%">
                            <ul class="popHeader clearfloat">
                                <li>科目信息一览</li>
                                <li @click="CloseMask"><i class="el-icon-circle-close"></i></li>
                            </ul>
                            <div class="popContent" style="height: auto;padding: 35px;">
                                <div style="width: 100%;height: 100%;">
                                    <el-row>
                                        <el-col :span="3">科目名称：</el-col>
                                        <el-col :span="21">{{subjectInfo.sname}}</el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="3">老师人数：</el-col>
                                        <el-col :span="21"><span style="color: #1997e4">{{subjectInfo.tnum}}</span>人</el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="3">科目老师：</el-col>
                                        <el-col :span="21">
                                            <ul class="clearfloat">
                                                <li style="float: left;margin-right: 5px;" v-for="teacher in subjectInfo.tlist">{{teacher}}</li>
                                            </ul>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                        <div class="dialog_mask" @click="CloseMask"></div>
                    </div>

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
import createSubject from '@/components/subject/createSubject.vue'
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
            deleteID: [],  //删除数据的ID
            whetherEdit: false,  //区分编辑及创建科目
            rowData: {},
            Dailog: false,
            subjectInfo: {},
        }
    },
    created() {
        if(this.isClassLogin == 1){ //学校管理系统
            rec.subjectList_s.call(this,this.materialParams,this.subjectName);
        }
    },
    components: {
        titleItem, titleActive, description, bottomItem, createSubject
    },
    methods: {
        CloseMask(){
            this.subjectInfo = {};
            this.Dailog = !this.Dailog;
        },
        checkSubject(id){  //查看信息
            rec.subject_Detail.call(this,id);
        },
        L_refresh3(){
            this.materialParams = {   //翻页
                hasmore: true,
                curpage: 1,//当前页数
                one_pagenum: 10,
                page_count: 1,//总页数
                total_num: 0
            };
            this.subjectManaList = [];
            rec.subjectList_s.call(this,this.materialParams,this.subjectName);
        },
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
            this.materialParams.hasmore = true;
            rec.subjectList_s.call(this,this.materialParams,this.subjectName);
        },
        select_Change(val){
            this.deleteID = val;
        },
        editSubject(id,name){
            this.whetherEdit = true;
            this.rowData = {
                id: id,
                name: name,
            }
            this.subject_1 = false;
            this.subject_2 = true;
        },
        comeBack(){
            this.whetherEdit = false;
            this.subject_1 = true;
            this.subject_2 = false;
        },
        deleteRow(id){
            rec.subjectListDel_s.call(this,id);
            // console.log(id);
        },
        handleSizeChange(val) {
            this.materialParams.one_pagenum = val;
            this.materialParams.hasmore = true;
            rec.subjectList_s.call(this,this.materialParams,this.subjectName);
        },
        handleCurrentChange(val) {
            this.materialParams.curpage = val;
            this.materialParams.hasmore = true;
            rec.subjectList_s.call(this,this.materialParams,this.subjectName);
        },
    }
}
</script>
 
<style scoped>

</style>
