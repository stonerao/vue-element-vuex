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
                        <el-select v-model="create.level1" placeholder="一级分类名称" style="width: 100%;">
                            <el-option v-for="item in selectlist.s1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1" style="max-width: 40px;text-align: center">-</el-col>
                    <el-col :span="3" style="padding-right: 0px">
                        <el-select v-model="create.level2" placeholder="二级分类名称" style="width: 100%;" :disabled="canNot_a">
                            <el-option v-for="item in selectlist.s2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">上传素材附件：</el-col>
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
                    <quillEditor v-model="create.conferContent"></quillEditor>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3" style="color: #f7f7f7;">保存操作</el-col>
                <el-col :span="21">
                    <el-button type="primary">上传素材</el-button>
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
    props: ['schoolManageCenter','teacherManageCenter'],
    data() {
        return {
            create: {
                theme: '',
                themeAdd: '',
                conferContent: '',
                isShare: 1,
                level1: '',
                level2: '',
            },
            selectlist:{
                s1: [],
                s2: [],
            },
            canNot_a: true,
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
        cancelCreate(){
            if(this.schoolManageCenter){ 
                this.$emit("CANCEL");
            }else if(this.teacherManageCenter){ 

            }
        }
    },
    watch:{
        
    }
}
</script>
 
<style scoped>

</style>
