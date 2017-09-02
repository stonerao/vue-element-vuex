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
                    <!--素材分类  -->
                    <div v-if="state==0">
                        <!-- <classifyMaterial :MATERIALCLASSIFY="MATERIALCLASSIFY"></classifyMaterial> -->
                        <div class="l_recursion">
                      		<TreeGrid :items='data' :columns='columns' @on-row-click='rowClick' @on-selection-change='selectionClick' @on-sort-change='sortClick'></TreeGrid>
                      	</div>
                    </div>
                    <!--素材管理  -->
                    <div v-if="state==1">
                        <div v-if="materMana_1">
                            <div class="l_mater_header">
                                <el-row :gutter="15">
                                    <el-col :span="6">
                                        <el-button type="primary" icon="plus" size="small" style="margin-right: 12px;" @click.native="createMaterial">上传素材</el-button>
                                        <img src="../../assets/index/shuaxin.png" class="icon-img-xs" />刷新-共{{materialParams.total_num}}条记录
                                    </el-col>
                                    <el-col :span="18" class="mater_search clearfloat">
                                        <el-col :span="6">
                                            <el-input placeholder="输入名称关键字搜索素材" style="" v-model="searchlist.inputData">
                                                <el-button slot="append" icon="search" @click.native="filterResult"></el-button>
                                            </el-input>
                                        </el-col>
                                        <el-col :span="3">
                                            <el-select v-model="searchlist.materType" clearable placeholder="素材类型">
                                                <el-option v-for="item in Levelist.materlist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :span="3">
                                            <el-select v-model="searchlist.Level5" clearable placeholder="五级分类" :disabled="manaDisable.cant5">
                                                <el-option v-for="item in Levelist.Levelist_5" :key="item.id" :label="item.category_name" :value="item.id"></el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :span="3">
                                            <el-select v-model="searchlist.Level4" clearable placeholder="四级分类" :disabled="manaDisable.cant4">
                                                <el-option v-for="item in Levelist.Levelist_4" :key="item.id" :label="item.category_name" :value="item.id"></el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :span="3">
                                            <el-select v-model="searchlist.Level3" clearable placeholder="三级分类" :disabled="manaDisable.cant3">
                                                <el-option v-for="item in Levelist.Levelist_3" :key="item.id" :label="item.category_name" :value="item.id"></el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :span="3">
                                            <el-select v-model="searchlist.Level2" clearable placeholder="二级分类" :disabled="manaDisable.cant2">
                                                <el-option v-for="item in Levelist.Levelist_2" :key="item.id" :label="item.category_name" :value="item.id"></el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :span="3">
                                            <el-select v-model="searchlist.Level1" clearable placeholder="一级分类">
                                                <el-option v-for="item in Levelist.Levelist_1" :key="item.id" :label="item.category_name" :value="item.id"></el-option>
                                            </el-select>
                                        </el-col>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="l_mater_table">
                                <el-table ref="multipleTable" :data="materManaList" tooltip-effect="dark" style="width: 100%" @selection-change="select_Change">
                                    <el-table-column type="selection" width="48"></el-table-column>
                                    <el-table-column label="ID" prop="id"></el-table-column>
                                    <el-table-column label="素材名称" prop="name"></el-table-column>
                                    <el-table-column label="大小" prop="size" v-if="!teacherManageCenter"></el-table-column>
                                    <el-table-column label="素材附件" v-if="!teacherManageCenter">
                                        <template scope="scope">
                                            <div v-if="scope.row.url">
                                                <!-- <router-link :to="scope.row.url">测试</router-link> -->
                                                <a :href="scope.row.url" class="encloImg"></a>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="创建时间" prop="time" v-if="teacherManageCenter"></el-table-column>
                                    <el-table-column label="发布时间" prop="time" v-else></el-table-column>
                                    <el-table-column label="创建人" prop="people" v-if="!teacherManageCenter"></el-table-column>
                                    <el-table-column label="是否共享" prop="share" v-if="teacherManageCenter">
                                        <template scope="scope">
                                            <el-switch v-model="scope.row.share" on-color="#13ce66" off-color="#ff4949" @change="whetherShare(scope.row.id,scope.row.share)"></el-switch>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作">
                                        <template scope="scope">
                                            <el-button type="primary" size="mini" v-if="teacherManageCenter" icon="view" @click.native="CheckDetail(scope.row.id)">查看</el-button>
                                            <el-button type="primary" size="mini" icon="edit" @click.native="edit(scope.row.id)">编辑</el-button>
                                            <el-button type="primary" size="mini" icon="delete" @click.native="my_delete(scope.row.id)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="l_mater_footer">
                                <el-row :span="24">
                                    <el-col :span="6">
                                        <div class="footer_search">
                                            <!-- <el-select v-model="Level5" size="small" placeholder="请选择" style="margin-right: 5px;max-width: 160px;">
                                                <el-option v-for="item in Levelist.Levelist_5" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select> -->
                                            <el-button type="primary" size="mini" @click.native="delete_select">删除</el-button>
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
                            <div class="myDialog" v-if="Dailog">
                                <div class="ownDailog" @click="Close_mask">
                                    <div class="close_btn">
                                        <i class="el-icon-close"></i>
                                    </div>
                                    <div class="content">
                                        <div style="width: 100%;height: 100%;">
                                            <el-row>
                                                <el-col :span="4" style="text-align: left;text-align-last: auto">素材名称：</el-col>
                                                <el-col :span="20" style="line-height: 23px;">{{merDetail.name}}</el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="4" style="text-align: left;text-align-last: auto">创建时间：</el-col>
                                                <el-col :span="20" style="line-height: 23px;">{{merDetail.time}}</el-col>
                                            </el-row> 
                                            <el-row>
                                                <el-col :span="4" style="text-align: left;text-align-last: auto">是否共享：</el-col>
                                                <el-col :span="20" style="line-height: 23px;">{{merDetail.share}}</el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="4" style="text-align: left;text-align-last: auto">素材描述：</el-col>
                                                <el-col :span="20" style="line-height: 23px;">{{merDetail.detail}}</el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>
                                <div class="dialog_mask" v-if="Dailog" @click="Close_mask"></div>
                            </div>
                        </div>
                        <!-- 上传素材 -->
                        <div v-if="materMana_2">
                            <createMaterial :schoolManageCenter="schoolManageCenter" :teacherManageCenter="teacherManageCenter" :materialEdit="materialEdit" @CANCEL="cancelCreate"></createMaterial>
                        </div>
                    </div>
                    <!--共享素材-->
                    <div v-if="state==2">
                        <commonMaterial></commonMaterial>
                    </div>
                </div>
            </div>
            <bottomItem></bottomItem>
        </div>
    </div>
</template>

<script>
import { getClass } from '@/utils/auth'
import info from '@/utils/l_axios'
import titleItem from '@/components/main/title.vue'
import titleActive from '@/components/main/titleActive.vue'
import description from '@/components/main/description.vue'
import bottomItem from '@/components/bottom/bottom.vue'
import createMaterial from '@/components/material/createMaterial.vue'
import commonMaterial from '@/components/material/commonMaterial.vue'
import classifyMaterial from '@/components/material/classifyMaterial.vue'
import TreeGrid from '@/components/material/TreeGrid.vue'

export default {
    data() {
        return {
            titleItem: [
                { name: "素材分类", index: 0 },
                { name: "素材管理", index: 1 },
            ],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 0, 
            isClassLogin: 1,
            schoolManageCenter: false,  //学校中心身份证
            teacherManageCenter: false,  //学校中心身份证
            materialParams: {   //翻页
                hasmore: true,
                curpage: 1,//当前页数
                one_pagenum: 10,
                page_count: 1,//总页数
                total_num: 0
            },
            Levelist: {  //search初始数据列表获取
                Levelist_1: [],
                Levelist_2: [],
                Levelist_3: [],
                Levelist_4: [],
                Levelist_5: [],
                materlist: [],  
            },
            searchlist:{ //搜索表单提交数据
                Level1: '',  
                Level2: '',
                Level3: '',
                Level4: '',
                Level5: '',
                materType: '',
                inputData: '',
            },
            manaDisable: {
                cant2: true,
                cant3: true,
                cant4: true,
                cant5: true,
            },
            lastId: 0,  //素材管理-搜索最底级ID
            firstSelect:{  //sc管理初始一级search框
                pid: 0,
                type: 2,
            },
            requestDiff: 1, //区别多级分类请求
            multiple: [],  //素材管理-选中的表行
            materManaList: [],   //素材管理-列表数据
            materMana_1: true,
            materMana_2: false,
            materialEdit: {  //素材管理-编辑身份证
                status: false,
                id: 0
            },
            delStatus: false,   //区分单删除及多删除
            IDString: [],
            Dailog: false,
            merDetail: {
                name: '',
                time: '',
                share: '',
                detail: '',
            },
            mertailDetail: false,
            MATERIALCLASSIFY: false,  //素材分类身份证
            columns: [{
                    type: 'selection'
                }, {
                    title: '排序',
                    key: 'code',
                    sortable: true
                }, {
                    title: '分类名称',
                    key: 'name'
                }, {
                    title: '是否显示',
                    key: 'status'
                },{
                    title: '操作',
                    type: 'action',
                    actions: [{
                        type: 'primary',
                        text: '编辑'
                    },{
                        type: 'default',
                        text: '删除'
                    }]
                }],
                data: [{
                    id: '1',
                    code: '0001',
                    name: '测试数据1',
                    status: '启用',
                }, {
                    id: '2',
                    code: '0002',
                    name: '测试数据2',
                    status: '启用',
                    children: [{
                        id: '2-01',
                        code: '00001',
                        name: '测试数据01',
                        status: '启用',
                        children: [{
	                        id: '2-1-01',
	                        code: '000001',
	                        name: '测试数据001',
	                        status: '启用',
	                    }]
                    }, {
                        id: '2-02',
                        code: '00002',
                        name: '测试数据02',
                        status: '启用',
                    }]
                }, {
                    id: '3',
                    code: '0003',
                    name: '测试数据3',
                    status: '启用',
                }, {
                    id: '4',
                    code: '0004',
                    name: '测试数据4',
                    status: '启用',
                }]
        }
    },
    created() {
        this.isClassLogin = getClass();
        if(this.isClassLogin == 2){ //激活老师管理系统身份
            this.schoolManageCenter = false;
            this.teacherManageCenter = true;
            this.state = 1;
            this.titleItem=[{ name: "素材管理", index: 1 },{ name: "共享素材", index: 2 }];
            if(this.state == 1){
                info.materManaList_s.call(this,this.materialParams,this.lastId,this.searchlist.inputData);
                info.materManaType1_s.call(this,this.firstSelect);
            }
        }else if(this.isClassLogin == 1){
            if(this.state == 0){  //素材分类---学校中心
                this.MATERIALCLASSIFY = true;
            }
        }
    },
    components: {
        titleItem, titleActive, description, bottomItem, createMaterial, commonMaterial, classifyMaterial, TreeGrid
    },
    methods: {
        emitTransfer(index) {
            if (this.state == index) {
                return
            }
            this.state = index;
            if(this.isClassLogin == 1){
                if(this.state == 1){  //素材管理
                    info.materManaList_s.call(this,this.materialParams,this.lastId,this.searchlist.inputData);
                    info.materManaType1_s.call(this,this.firstSelect);
                }
            }
        },
        promptsTem(status) {
            console.log(status)
        },
        handleSizeChange(val) {
            this.materialParams.one_pagenum = val;
            if(this.state == 1){
                info.materManaList_s.call(this,this.materialParams,this.lastId,this.searchlist.inputData);
            }
        },
        handleCurrentChange(val) {
            this.materialParams.curpage = val;
            if(this.state == 1){
               info.materManaList_s.call(this,this.materialParams,this.lastId,this.searchlist.inputData);
            }
        },
        select_Change(val){  //表格选择事件
            console.log(val);
            this.multiple = val;
        },
        delete_select(){
            this.delStatus = true;
            info.materManadel_s.call(this,this.multiple);
        },
        createMaterial(){  //创建素材
            this.materialEdit.status = false;
            this.materMana_1 = false;
            this.materMana_2 = true;
        },
        cancelCreate(){
            this.materMana_1 = true;
            this.materMana_2 = false;
        },
        edit(id){
            this.materialEdit = {   //编辑身份证
                status: true,
                id: id,
            } 
            this.materMana_1 = false;
            this.materMana_2 = true;
        },
        my_delete(id){
            info.materManadel_s.call(this,id);
        },
        filterResult(){
            if(String(this.searchlist.Level1).length == 0 && String(this.searchlist.Level2).length == 0 && String(this.searchlist.Level3).length == 0 && String(this.searchlist.Level4).length == 0 && String(this.searchlist.Level5).length == 0){
                this.lastId = 0;
            }else{
                this.lastId = this.firstSelect.pid;
            }
            info.materManaList_s.call(this,this.materialParams,this.lastId,this.searchlist.inputData);
        },
        CheckDetail(id){   //查看详情
            this.mertailDetail = true;
            info.materManaEdit_b_s.call(this,id);
        },
        whetherShare(id,share){
            info.materManaShare_t.call(this,id,share);
        },
        Close_mask(){
            this.Dailog = false;
            this.merDetail={
                name: '',
                time: '',
                share: '',
                detail: '',
            }
        },
        rowClick(data, index, event) {   //素材分类操作开始！
                console.log('当前行数据:' + data)
                console.log('点击行号:' + index)
                console.log('点击事件:' + event)
            },
        selectionClick(arr) {
            console.log('选中数据id数组:' + arr)
        },
        sortClick(key, type) {
            console.log('排序字段:' + key)
            console.log('排序规则:' + type)
        },
    },
    watch: {
        ['searchlist.Level1'](val){
            this.Levelist.Levelist_2 = []; 
            this.Levelist.Levelist_3 = []; 
            this.Levelist.Levelist_4 = []; 
            this.Levelist.Levelist_5 = [];
            this.searchlist.Level2 = '';
            this.searchlist.Level3 = '';
            this.searchlist.Level4 = '';
            this.searchlist.Level5 = '';
            if(val){
                this.requestDiff = 2;  //请求二级分类
                this.firstSelect.pid = val;
                info.materManaType1_s.call(this,this.firstSelect);
            }else{
                this.manaDisable = {
                    cant2: true,
                    cant3: true,
                    cant4: true,
                    cant5: true,
                }
            }
        },
        ['searchlist.Level2'](val){
            this.searchlist.Level3 = '';
            this.searchlist.Level4 = '';
            this.searchlist.Level5 = '';
            this.Levelist.Levelist_3 = []; 
            this.Levelist.Levelist_4 = []; 
            this.Levelist.Levelist_5 = [];
            if(val){
                this.requestDiff = 3;  //请求三级分类
                this.firstSelect.pid = val;
                info.materManaType1_s.call(this,this.firstSelect);
            }else{
                this.manaDisable = {
                    cant3: true,
                    cant4: true,
                    cant5: true,
                }
            }
        },
        ['searchlist.Level3'](val){
            this.searchlist.Level4 = '';
            this.searchlist.Level5 = '';
            this.Levelist.Levelist_4 = []; 
            this.Levelist.Levelist_5 = [];
            if(val){
                this.requestDiff = 4;  //请求四级分类
                this.firstSelect.pid = val;
                info.materManaType1_s.call(this,this.firstSelect);
            }else{
                this.manaDisable = {
                    cant4: true,
                    cant5: true,
                }
            }
        },
        ['searchlist.Level4'](val){
           this.searchlist.Level5 = '';
           this.Levelist.Levelist_5 = [];
            if(val){
                this.requestDiff = 5;  //请求五级分类
                this.firstSelect.pid = val;
                info.materManaType1_s.call(this,this.firstSelect);
            }else{
                this.manaDisable = {
                    cant5: true,
                }
            }
        }
    }
}
</script>
 
<style scoped>

</style>
