<template>
    <div>
        <!--会议管理-->
        <div v-if="state==1">
            <div class="l_create_wrap">
                <el-row>
                    <el-col :span="3">会议类型：</el-col>
                    <el-col :span="21">
                        <el-radio-group v-model="create.confType">
                            <el-radio :label="1">教研</el-radio>
                            <el-radio :label="2">备课</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">会议主题：</el-col>
                    <el-col :span="21">
                        <el-col :span="5" style="margin-right: 20px;">
                            <el-input v-model="create.theme" placeholder="请输入主题"></el-input>
                        </el-col>
                        <el-col :span="5" class="someAdd">
                            <el-input v-model="create.themeAdd" placeholder="备注信息文字"></el-input>
                        </el-col>   
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">会议地点：</el-col>
                    <el-col :span="21">
                        <el-col :span="5" style="margin-right: 20px;">
                            <el-input v-model="create.adress" placeholder="请输入地点"></el-input>
                        </el-col>
                        <el-col :span="5" class="someAdd">
                            <el-input v-model="create.adressAdd" placeholder="备注信息文字"></el-input>
                        </el-col>   
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">会议时间：</el-col>
                    <el-col :span="21" class="confTime">
                        <el-date-picker v-model="create.timeStart" type="date" placeholder="选择日期" style="margin-right: 10px;"></el-date-picker>
                        <el-date-picker v-model="create.timeEnd" type="date" placeholder="选择日期" :picker-options="pickerOptions1" :disabled="canNot_a"></el-date-picker>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">参会人员：</el-col>
                    <el-col :span="21">
                        <el-col :span="5">
                            <el-select v-model="create.confPeople" multiple placeholder="请选择" style="width: 100%;">
                                <el-option v-for="item in conferPeoList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">提前通知时间：</el-col>
                    <el-col :span="21" class="confTime">
                        <el-date-picker v-model="create.messageTime" type="date" placeholder="选择日期"></el-date-picker>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">会议内容：</el-col>
                    <el-col :span="21" class="confContent">
                        <quillEditor v-model="create.conferContent"></quillEditor>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">上传附件：</el-col>
                    <el-col :span="21">
                        <el-col :span="4">
                            <el-button type="primary" size="small" icon="upload2">上传文件</el-button>
                            <img src="">
                        </el-col>
                        <el-col :span="10">
                            <el-button type="primary" size="small">删除</el-button>
                            <span>上传图片格式必须是gif,jpg,jpeg,png;图片大小在200kb以内</span>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">会议直播间创建：</el-col>
                    <el-col :span="21">
                        <el-button type="primary" size="small">创建直播</el-button>
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
                        <el-button type="primary">保存</el-button>
                        <el-button type="primary" style="background: #e0e0e0;border-color: #e0e0e0;color: #5b5b5b">取消</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import titleItem from '@/components/main/title.vue'
import titleActive from '@/components/main/titleActive.vue'
import description from '@/components/main/description.vue'
import bottomItem from '@/components/bottom/bottom.vue'
import { quillEditor } from 'vue-quill-editor'

export default {
    props: ['schoolManageCenter','teacherManageCenter'],
    data() {
        return {
            state: 1, 
            create: {
                confType: 1,
                theme: '',
                themeAdd: '',
                adress: '',
                adressAdd: '',
                timeStart: '',
                timeEnd: '',
                confPeople: [],
                messageTime: '',
                conferContent: '',
                isShow: 1,
            },
            canNot_a: true,
            pickerOptions1:{},
            conferPeoList: [],   //参会人员列表
        }
    },
    created() {
        if(this.schoolManageCenter){  //学校-创建会议

        }else if(this.teacherManageCenter){  //老师-创建会议

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
    },
    watch:{
        ['create.timeStart'](val){    //监听对象的属性的值的变化--方法二
            if(String(val).length != 0){
                this.canNot_a = false;
                this.pickerOptions1 = {
                    disabledDate(time) {
                        return time.getTime() < val.getTime() + 24*60*60*1000;
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
