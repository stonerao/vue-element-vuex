<template>
    <div>
        <!--会议创建-->
        <div class="l_create_wrap">
            <!-- <el-row>
                <el-col :span="3">会议类型：</el-col>
                <el-col :span="21">
                    <el-radio-group v-model="create.confType">
                        <el-radio :label="1">教研</el-radio>
                        <el-radio :label="2">备课</el-radio>
                    </el-radio-group>
                </el-col>
            </el-row> -->
            <el-row>
                <el-col :span="3">会议主题：</el-col>
                <el-col :span="21">
                    <el-col :span="5" style="margin-right: 20px;">
                        <el-input v-model="create.theme" placeholder="请输入主题"></el-input>
                    </el-col>
                    <el-col :span="5" class="someAdd">
                        <el-input v-model="create.themeAdd" placeholder="备注信息文字" disabled></el-input>
                    </el-col>   
                </el-col>
            </el-row>
            <!-- <el-row>
                <el-col :span="3">会议地点：</el-col>
                <el-col :span="21">
                    <el-col :span="5" style="margin-right: 20px;">
                        <el-input v-model="create.adress" placeholder="请输入地点"></el-input>
                    </el-col>
                    <el-col :span="5" class="someAdd">
                        <el-input v-model="create.adressAdd" placeholder="备注信息文字"></el-input>
                    </el-col>   
                </el-col>
            </el-row> -->
            <el-row>
                <el-col :span="3">会议时间：</el-col>
                <el-col :span="21" class="confTime">
                    <el-date-picker v-model="create.timeStart" type="datetime" placeholder="选择日期" style="margin-right: 10px;"></el-date-picker>
                    <el-date-picker v-model="create.timeEnd" type="datetime" placeholder="选择日期" :picker-options="pickerOptions1" :disabled="canNot_a"></el-date-picker>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">参会人员：</el-col>
                <el-col :span="21">
                    <el-col :span="5">
                        <el-select multiple v-model="create.confPeople" placeholder="请选择" style="width: 100%;">
                            <el-option v-for="item in conferPeoList" :key="item.number_id" :label="item.teacher_name" :value="item.number_id"></el-option>
                        </el-select>
                    </el-col>
                </el-col>
            </el-row>
            <!-- <el-row>
                <el-col :span="3">提前通知时间：</el-col>
                <el-col :span="21" class="confTime">
                    <el-date-picker v-model="create.messageTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-col>
            </el-row> -->
            <el-row>
                <el-col :span="3">会议内容：</el-col>
                <el-col :span="21" class="confContent">
                    <el-col :span="10">
                        <textarea v-model="create.conferContent" style="width: 100%;max-width: 1000px;min-width: 1000px;max-height: 250px;min-height: 200px;max-height: 250px;"></textarea>
                    </el-col>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">上传附件：</el-col>
                <el-col :span="21">
                    <!-- <el-col :span="4">
                        <el-button type="primary" size="small" icon="upload2">上传文件</el-button>
                        <img src="">
                    </el-col>
                    <el-col :span="10">
                        <el-button type="primary" size="small">删除</el-button>
                        <span>上传图片格式必须是gif,jpg,jpeg,png;图片大小在200kb以内</span>
                    </el-col> -->
                    <el-upload class="upload-demo" ref="upload" :auto-upload="true" action="http://oss-base.oss-cn-zhangjiakou.aliyuncs.com" :data='ossData' :on-success="uploadSuccess" :on-remove="uploadRemove" :before-upload="beforeAvatarUpload" :on-change="uploadLoading" :file-list="fileList">
                        <el-button size="small" icon="upload2" type="primary" :disabled="uploadOne">上传文件</el-button>
                        <div slot="tip" class="el-upload__tip">上传图片格式必须是gif,jpg,jpeg,png,图片大小在200kb以内;上传视频必须小于50M</div>
                    </el-upload>
                </el-col>
            </el-row>
            <el-row v-if="!EDITCARD">
                <el-col :span="3">会议直播间创建：</el-col>
                <el-col :span="21">
                    <el-button type="primary" size="small" @click="createVideo">创建直播</el-button>
                </el-col>
            </el-row>
            <el-row v-else>
                <el-col :span="3">会议直播间名字：</el-col>
                <el-col :span="21">
                    <span>{{channelName}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">是否显示：</el-col>
                <el-col :span="21">
                    <el-radio-group v-model="create.isShow">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3" style="color: #f7f7f7;">保存操作</el-col>
                <el-col :span="21">
                    <el-button type="primary" @click="submit">保存</el-button>
                    <el-button type="primary" style="background: #e0e0e0;border-color: #e0e0e0;color: #5b5b5b" @click="clearData" v-if="creatStatus">清空</el-button> 
                    <el-button type="primary" style="background: #e0e0e0;border-color: #e0e0e0;color: #5b5b5b" @click="clearData" v-else>取消</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="myDialog">
            <div class="ownDailog" v-if="Dailog" style="width:500px;">
                <div class="close_btn" @click="Close_mask">
                    <i class="el-icon-close"></i>
                </div>
                <div class="content">
                    <el-row>
                        <el-col :span="5" style="line-height: 36px;text-align-last: auto;text-align: left">直播间名称：</el-col>
                        <el-col :span="19">
                            <el-input v-model="dailogDetail.name" placeholder="请输入名称"></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5" style="line-height: 36px;text-align-last: auto;text-align: left">直播间密码：</el-col>
                        <el-col :span="19">
                            <el-input v-model="dailogDetail.code" placeholder="请输入密码" type="password"></el-input>
                        </el-col>
                    </el-row>
                    <el-row style="text-align: center">
                        <el-button type="primary" size="small" @click="videoSure">确定</el-button>
                        <el-button size="small" @click="Close_mask">取消</el-button>
                    </el-row>
                </div>
            </div>
            <div class="dialog_mask" v-if="Dailog" @click="Close_mask"></div>
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
    props: ['schoolManageCenter','teacherManageCenter','creatStatus','EDITCARD','CONFERID'],
    data() {
        return {
            create: {
                theme: '',
                themeAdd: '',
                timeStart: '',
                timeEnd: '',
                confPeople: [],
                conferContent: '',
                isShow: 1,
            },
            canNot_a: true,
            pickerOptions1:{},
            conferPeoList: [],   //参会人员列表
            channelID: '',
            channelName: '',
            Dailog: false,
            dailogDetail:{
                name: '',
                code: '',
            },
            fileList: [], //上传文件列表
            ossData: {}, //签名
            oldname: '',
            rightType: 0,  //文件类型
            uploadOne: false,  //只能传输一个
            fileInfo:{
                name: '',
                size: 0,
            },
            fileName: '',
            dirName: '',
            upStatus: false,
        }
    },
    created() {
        if(this.schoolManageCenter){  //学校-创建会议
            if(this.creatStatus){   //会议创建
                this.upStatus = false;
                this.getAutograph();
                info.conferMeetTeacher_s.call(this);
            }else if(this.EDITCARD){  //会议编辑
                this.upStatus = false;
                this.getAutograph();
                info.conferMeetTeacher_s.call(this);
                info.conferMeetDetail_s.call(this,this.CONFERID);
            }
        }else if(this.teacherManageCenter){  //老师-会议编辑
            if(this.EDITCARD){  //会议编辑
                info.conferMeetTeacher_s.call(this);
                info.conferMeetDetail_s.call(this,this.CONFERID);
            }
        }
    },
    components: {
        titleItem, titleActive, description, bottomItem
    },
    methods: {
        getAutograph(){  //三秒请求一次签名
            let now = Date.parse(new Date()) / 1000; 
            if (this.expire < now + 3){
                info.OSS_ID.call(this,this.fileName);
            }
        },
        beforeAvatarUpload(file){
            this.upStatus = false;
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
            this.fileInfo = {
                name: file.name,
                size: file.size
            }
            this.uploadOne = true;
            this.$notify.success({
                message: '上传成功!',
                duration: 1000
            });
        },
        uploadRemove(file, fileList){  //已上传文件删除
            this.upStatus = false;
            if(file){
                let _name = this.dirName + file.name;
                info.materFileDel.call(this,_name);
            }
        },
        submit(){
            // if(this.creatStatus){ 
            //     info.conferMeetCreate_s.call(this,this.create,this.channelID)
            // }
            info.conferMeetCreate_s.call(this,this.create,this.channelID,this.fileInfo)
        },
        clearData(){
            if(this.EDITCARD){
               this.upStatus = false;
               this.$emit('EDITBACK');
            }else{  //创建会议取消
                 this.create = {
                    theme: '',
                    themeAdd: '',
                    timeStart: '',
                    timeEnd: '',
                    confPeople: [],
                    conferContent: '',
                    isShow: 1,
                };
                this.canNot_a = true;
                this.channelID = '';
            }
        },
        formatAll(date){  //时间处理
            return info.formatYMDHMS.call(this,date);
        },
        createVideo(){
            this.Dailog = true;
        },
        Close_mask(){
            this.Dailog = false;
        },
        videoSure(){
            info.conferVideoCreate_s.call(this,this.dailogDetail);
        },
    },
    watch:{
        ['create.timeStart'](val){    //监听对象的属性的值的变化--方法二
            if(String(val).length != 0){
                this.canNot_a = false;
                this.pickerOptions1 = {
                    disabledDate(time) {
                        return time.getTime() < val.getTime() - 24*60*60*1000;
                    }
                }
            }else{  //如果日期表一清空，则表二也要清空
                this.create.timeEnd = '';
                this.canNot_a = true;
            }
        },
    }
}
</script>
 
<style scoped>

</style>
