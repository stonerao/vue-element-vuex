<template>
    <div>
        <!-- 创建素材 -->
        <div class="l_create_wrap">
            <el-row>
                <el-col :span="3">素材名称：</el-col>
                <el-col :span="21">
                    <el-col :span="5" style="margin-right: 20px;">
                        <el-input v-model="create.theme" placeholder="请输入主题"></el-input>
                    </el-col>
                    <el-col :span="5" class="someAdd">
                        <el-input v-model="create.themeAdd" placeholder="备注信息文字" disabled></el-input>
                    </el-col>   
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">素材分类：</el-col>
                <el-col :span="21">
                    <el-col :span="3" style="padding-right: 0px">
                        <el-select v-model="searchlist.Level1" placeholder="一级分类名称" style="width: 100%;">
                            <el-option v-for="item in Levelist.Levelist_1" :key="item.id" :label="item.category_name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1" style="max-width: 40px;text-align: center">-</el-col>
                    <el-col :span="3" style="padding-right: 0px">
                        <el-select v-model="searchlist.Level2" placeholder="二级分类名称" style="width: 100%;" clearable :disabled="manaDisable.cant2" @clear="floor2">
                            <el-option v-for="item in Levelist.Levelist_2" :key="item.id" :label="item.category_name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1" style="max-width: 40px;text-align: center">-</el-col>
                    <el-col :span="3" style="padding-right: 0px">
                        <el-select v-model="searchlist.Level3" placeholder="三级分类名称" style="width: 100%;" clearable :disabled="manaDisable.cant3" @clear="floor3">
                            <el-option v-for="item in Levelist.Levelist_3" :key="item.id" :label="item.category_name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1" style="max-width: 40px;text-align: center">-</el-col>
                    <el-col :span="3" style="padding-right: 0px">
                        <el-select v-model="searchlist.Level4" placeholder="四级分类名称" style="width: 100%;" clearable :disabled="manaDisable.cant4" @clear="floor4">
                            <el-option v-for="item in Levelist.Levelist_4" :key="item.id" :label="item.category_name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1" style="max-width: 40px;text-align: center">-</el-col>
                    <el-col :span="3" style="padding-right: 0px">
                        <el-select v-model="searchlist.Level5" placeholder="五级分类名称" style="width: 100%;" clearable :disabled="manaDisable.cant5" @clear="floor5">
                            <el-option v-for="item in Levelist.Levelist_5" :key="item.id" :label="item.category_name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">上传素材附件：</el-col>
                <el-col :span="21">
                    <el-upload class="upload-demo clearfloat" action="https://jsonplaceholder.typicode.com/posts/" :on-success="uploadSuccess" :on-remove="uploadRemove" :file-list="fileList">
                        <el-button size="small" icon="upload2" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">上传图片格式必须是gif,jpg,jpeg,png;图片大小在200kb以内</div>
                    </el-upload>
                </el-col>
            </el-row>
            <el-row v-if="this.teacherManageCenter">
                <el-col :span="3">是否共享：</el-col>
                <el-col :span="21">
                    <el-radio-group v-model="create.isShare">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">素材描述：</el-col>
                <el-col :span="21" class="confContent">
                    <el-col :span="10">
                        <textarea v-model="create.conferContent" style="width: 100%;max-width: 1000px;min-width: 1000px;max-height: 250px;min-height: 200px;max-height: 250px;"></textarea>
                    </el-col>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3" style="color: #f7f7f7;">保存操作</el-col>
                <el-col :span="21">
                    <el-button type="primary" @click.native="submit">上传素材</el-button>
                    <el-button type="primary" style="background: #e0e0e0;border-color: #e0e0e0;color: #5b5b5b" @click.native="cancelCreate">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import info from '@/utils/l_axios'
import titleItem from '@/components/main/title.vue'
import titleActive from '@/components/main/titleActive.vue'
import description from '@/components/main/description.vue'
import bottomItem from '@/components/bottom/bottom.vue'
import { quillEditor } from 'vue-quill-editor'

export default {
    props: ['schoolManageCenter','teacherManageCenter','materialEdit'],
    data() {
        return {
            create: {
                theme: '',
                themeAdd: '',
                conferContent: '',
                isShare: 1,
            },
            Levelist: {  //search初始数据列表获取
                Levelist_1: [],
                Levelist_2: [],
                Levelist_3: [],
                Levelist_4: [],
                Levelist_5: [],
            },
            searchlist:{ //搜索表单提交数据
                Level1: '',  
                Level2: '',
                Level3: '',
                Level4: '',
                Level5: '',
            },
            manaDisable: {
                cant2: true,
                cant3: true,
                cant4: true,
                cant5: true,
            },
            canNot_a: true,
            requestDiff: 1,
            firstSelect:{  //sc管理初始一级search框
                pid: 0,
                type: 2,
            },
            lastId: 0,
            fileList: [], //上传文件列表
        }
    },
    created() {
        if(this.materialEdit.status){   //素材库-素材管理-编辑
            info.materManaEdit_b_s.call(this,this.materialEdit.id);   //编辑初始数据获取
        }else{  //创建
            info.materManaType1_s.call(this,this.firstSelect);
        }
    },
    components: {
        titleItem, titleActive, description, bottomItem, quillEditor
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
        uploadSuccess(response, file, fileList){  //文件上传返回数据

        },
        uploadRemove(file, fileList){  //已上传文件删除

        },
        cancelCreate(){
            this.$emit("CANCEL");
        },
        submit(){
            if(this.materialEdit.status){  //编辑提交
                for(var i=5;i>=1;i--){
                    if(String(this.searchlist[`Level${i}`]).length != 0){
                        this.lastId = this.searchlist[`Level${i}`];
                        break;
                    }
                }
                info.materManaEdit_s.call(this,this.materialEdit.id,this.create,this.lastId); 
            }else{  //创建提交
                for(var i=5;i>=1;i--){
                    if(String(this.searchlist[`Level${i}`]).length != 0){
                        this.lastId = this.searchlist[`Level${i}`];
                        break;
                    }
                }
                info.materManadd_s.call(this,this.create,this.lastId);
            }
        },
        floorHelp(index){  //编辑初始赋值-层级数据获取
            info.materManaType0_s.call(this,this.firstSelect,index);
        },
        floor2(){
            this.Levelist.Levelist_2 = []; 
            this.Levelist.Levelist_3 = []; 
            this.Levelist.Levelist_4 = []; 
            this.Levelist.Levelist_5 = [];
            this.searchlist.Level2 = '';
            this.searchlist.Level3 = '';
            this.searchlist.Level4 = '';
            this.searchlist.Level5 = '';
            this.manaDisable.cant2 = true;
        },
        floor3(){
            this.Levelist.Levelist_3 = []; 
            this.Levelist.Levelist_4 = []; 
            this.Levelist.Levelist_5 = [];
            this.searchlist.Level3 = '';
            this.searchlist.Level4 = '';
            this.searchlist.Level5 = '';
            this.manaDisable.cant3 = true;
        },
        floor4(){
            this.Levelist.Levelist_4 = []; 
            this.Levelist.Levelist_5 = [];
            this.searchlist.Level4 = '';
            this.searchlist.Level5 = '';
            this.manaDisable.cant4 = true;
        },
        floor5(){
            this.Levelist.Levelist_5 = [];
            this.searchlist.Level5 = '';
            this.manaDisable.cant5 = true;
        },
    },
    watch:{
        ['searchlist.Level1'](val){
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
