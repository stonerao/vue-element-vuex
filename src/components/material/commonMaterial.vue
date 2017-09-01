<template>
    <div>
        <div class="l_mater_header">
            <el-row :gutter="15">
                <el-col :span="6">
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
            <el-table :data="materManaList" tooltip-effect="dark" style="width: 100%">
                <el-table-column label="ID" prop="id"></el-table-column>
                <el-table-column label="素材名称" prop="name"></el-table-column>
                <el-table-column label="创建时间" prop="time"></el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="primary" size="mini" v-if="teacherManageCenter" icon="view" @click.native="CheckDetail(scope.row.id)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="l_mater_footer">
            <el-row :span="24">
                <el-col :span="24">
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
</template>

<script>
import { getClass } from '@/utils/auth'
import info from '@/utils/l_axios'

export default {
    data() {
        return {
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
            materManaList: [],   //素材管理-列表数据
            IDString: [],
            Dailog: false,
            merDetail: {
                name: '',
                time: '',
                share: '',
                detail: '',
            },
            mertailDetail: false,
            commonMaterial: true,
        }
    },
    created() {
        this.isClassLogin = getClass();
        if(this.isClassLogin == 2){ //激活老师管理系统身份
            this.schoolManageCenter = false;
            this.teacherManageCenter = true;
        }
        info.materManaList_s.call(this,this.materialParams,this.lastId,this.searchlist.inputData);
        info.materManaType1_s.call(this,this.firstSelect);
    },
    components: {
        
    },
    methods: {
        handleSizeChange(val) {
            this.materialParams.one_pagenum = val;
            info.materManaList_s.call(this,this.materialParams,this.lastId,this.searchlist.inputData);
        },
        handleCurrentChange(val) {
            this.materialParams.curpage = val;
            info.materManaList_s.call(this,this.materialParams,this.lastId,this.searchlist.inputData);
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
            info.materAllDetail_t.call(this,id);
        },
        Close_mask(){
            this.Dailog = false;
            this.merDetail={
                name: '',
                time: '',
                share: '',
                detail: '',
            }
        }
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
