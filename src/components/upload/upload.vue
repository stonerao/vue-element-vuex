<template>
    <div>
        <!-- 创建素材 -->
        <div class="l_create_wrap">
            <el-row>
                <el-col :span="3">上传会议附件：</el-col>
                <el-col :span="21">
                    <el-upload class="upload-demo" ref="upload" :auto-upload="true" action="http://oss-base.oss-cn-zhangjiakou.aliyuncs.com" :data='ossData' :on-success="uploadSuccess" :on-remove="uploadRemove" :before-upload="beforeAvatarUpload" :on-change="uploadLoading" :file-list="fileList">
                        <el-button size="small" icon="upload2" type="primary">上传文件</el-button>
                        <div slot="tip" class="el-upload__tip">上传图片格式必须是gif,jpg,jpeg,png,图片大小在200kb以内;上传视频必须小于50M</div>
                    </el-upload>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3" style="color: #f7f7f7;">保存操作</el-col>
                <el-col :span="21">
                    <el-button type="primary" @click.native="up_save">保存</el-button>
                    <el-button type="primary" style="background: #e0e0e0;border-color: #e0e0e0;color: #5b5b5b" @click.native="up_cancel">取消</el-button>
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
    props: ['UPLOADRECORD'],
    data() {
        return {
            fileList: [], //上传文件列表
            ossData: {}, //签名
            oldname: '',
            rightType: 0,  //文件类型
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
        }
    },
    created() {
        this.getAutograph();
    },
    components: {
        
    },
    methods: {
        getAutograph(){  //三秒请求一次签名
            let now = Date.parse(new Date()) / 1000; 
            if (this.expire < now + 3){
                info.OSS_ID.call(this,this.fileName);
            }
        },
        beforeAvatarUpload(file){
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
        },
        uploadSuccess(response, file, fileList){  //文件上传返回数据
            this.fileInfo = fileList;
            this.$notify.success({
                message: '上传成功!',
                duration: 1000
            });
        },
        uploadRemove(file, fileList){  //已上传文件删除
            if(file){
                let _name = this.dirName + file.name;
                info.materFileDel.call(this,_name);
            }
        },
        up_save(){
            info.T_upload_save.call(this,this.UPLOADRECORD,this.fileInfo);
        }, 
        up_cancel(){
            this.$emit('Tupback');
        },
    },
    watch:{
        
    }
}
</script>
 
<style scoped>

</style>
