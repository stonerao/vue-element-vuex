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
                    <el-upload class="upload-demo" ref="upload" :auto-upload="true" action="http://oss-base.oss-cn-zhangjiakou.aliyuncs.com" :data='ossData' :on-success="uploadSuccess" :on-remove="uploadRemove" :before-upload="beforeAvatarUpload" :on-change="uploadLoading" :file-list="fileList">
                        <el-button size="small" icon="upload2" type="primary" :disabled="uploadOne">上传文件</el-button>
                        <div slot="tip" class="el-upload__tip">上传图片格式必须是gif,jpg,jpeg,png,图片大小在200kb以内;上传视频必须小于50M</div>
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
                    <el-button type="primary" @click.native="submit" :disabled="forbiden">上传素材</el-button>
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
            ossData: {}, //签名
            oldname: '',
            rightType: 0,  //文件类型
            uploadOne: false,  //只能传输一个
            fileInfo:{
                name: '',
                size: 0,
            },
            fileName: '', //上传文件名
            dirName: '',  //签名的dir路劲
            upStatus: false,
            editFileHandle:{
                name: '',
                kdName: '',
                url: '',
            },
            expire: 0,
            forbiden: false,
        }
    },
    created() {
        if(this.materialEdit.status){   //素材库-素材管理-编辑
            this.getAutograph();
            info.materManaEdit_b_s.call(this,this.materialEdit.id);   //编辑初始数据获取
        }else{  //创建
            info.materManaType1_s.call(this,this.firstSelect);
            this.upStatus = false;
            this.getAutograph();
        }
    },
    components: {
        titleItem, titleActive, description, bottomItem, 
    },
    methods: {
        getAutograph(){  //三秒请求一次签名
            let now = Date.parse(new Date()) / 1000; 
            if (this.expire < now + 3){
                info.OSS_ID.call(this,this.fileName);
            }
            // let _inter = setInterval((x)=>{
            //     if(this.upStatus){
            //         clearInterval(_inter);
            //     }else{
            //         info.OSS_ID.call(this,this.fileName);
            //     }
            // },3000)
        },
        beforeAvatarUpload(file){
            this.upStatus = false;
            this.forbiden = true;
            this.getAutograph();
            const _ok = info.fileType.call(this,String(file.name).split('.')[1]);
            if(Boolean(_ok)){  //格式符合
                if(this.oldname != file.name){  //不同名
                    this.oldname = file.name;
                    this.fileName = file.name;
                    this.ossData = Object.assign({}, this.ossData, {
                        "name": file.name         
                    });
                }
            }else{
                this.$notify.error({
                    message: '文件格式不符!'
                });
            }
            this.upStatus = Boolean(_ok);
            return Boolean(_ok);
        },
        uploadLoading(file){
            this.ossData.name = file.name;
            this.ossData.key = this.dirName + file.name;
            // console.log(this.ossData)
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
        uploadSuccess(response, file, fileList){  //文件上传返回数据
            this.upStatus = true;
            this.forbiden = false;
            this.fileInfo = {
                name: this.ossData.key,
                size: file.size
            }
            this.uploadOne = true;
            this.$notify.success({
                message: '上传成功!',
                duration: 1000
            });
            console.log(file);
            console.log(fileList);
        },
        uploadRemove(file, fileList){  //已上传文件删除
            if(file){
                let _name = this.dirName + file.name;
                info.materFileDel.call(this,_name);
            }
        },
        cancelCreate(){
            this.upStatus = true;
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
                info.materManaEdit_s.call(this,this.materialEdit.id,this.create,this.lastId,this.fileInfo); 
            }else{  //创建提交
                for(var i=5;i>=1;i--){
                    if(String(this.searchlist[`Level${i}`]).length != 0){
                        this.lastId = this.searchlist[`Level${i}`];
                        break;
                    }
                }
                info.materManadd_s.call(this,this.create,this.lastId,this.fileInfo);
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
        },
    }
}
</script>
 
<style scoped>

</style>
