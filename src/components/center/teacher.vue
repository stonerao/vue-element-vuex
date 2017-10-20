<template>
    <div class="t-impot">
        <p>
            <el-button size="small" type="primary" @click="fan">返回列表</el-button>
        </p>
        <div class="t-impot-box">
            <section class="t-impot-item">
                <div class="impot-item-title">
                    用csv方式导入
                </div>
                <ul class="impot-item-list">
                    <li>
                        使用csv文本作为模板文件，请注意格式要求，并且文件编码必须为UTF8
                    </li>
                    <li>
                        <a href="http://kd.evam.xin/Uploads/template/line_results.csv" download="模板.csv">下载使用csv格式模板 </a> 请下载模板，并按照格式填写，填写完成后，上传文件即可完成导入
                    </li>
                </ul>
                <ol class="impot-item-les">
                   
                    <li style="height:auto;padding-left:12px;background:#fff;padding-top:20px;padding-bottom:20px;">
                       
                        <el-upload class="upload-demo" action="Teacher/Examinationcenter/exportlinedown" :data='datas' :on-success="success" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </li>
                    <!-- <li class="impot-item-lis">
                                                                                <span class="impot-item-span">数据文件：</span>
                                                                                <div>
                                                                                    <input type="file" class="marginleft5" />
                                                                                </div> 
                                                                            </li> -->
                    <!-- <li class="impot-item-btns">
                                                                                <span class=" "></span>
                                                                                <span>
                                                                                    <el-button type="primary">提交</el-button>
                                                                                    <el-button>取消</el-button>
                                                                                </span>
                                                                            </li> -->
                </ol>
            </section>
        </div>
    </div>
</template>

<script>

import { getToken } from '@/utils/auth'
export default {
    props: ['id'],
    data() {
        return {
            value: '',
            fileList: [],
            datas: {
                token: getToken(),
                lex_id: ''
            }
        }
    },
    methods: {
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
        },
        handlePreview(file) {
        },
        success(res, file, fileList) {
            if (res.code == 200) {
                setTimeout(() => {
                    this.$emit("goods");
                }, 2000)
                this.$notify({
                    title: '成功',
                    message: res.data,
                    type: 'success'
                });
            } else {
                this.$notify.error({
                    title: '错误',
                    message: res.data.error
                });
            }
        },
        fan() {
            this.$emit("goods");
        }
    },
    watch: {
    },
    created() {
        this.datas.lex_id = this.id;
    }
}
</script> 
<style scoped>

</style>
