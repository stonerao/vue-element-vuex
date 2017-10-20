<template>
    <div class="t-impot">
        <section class="t-impot-head">
            <!-- <el-button type="primary" icon="plus" size="small">增加{{title}}</el-button>
                                        <el-button type="primary" icon="plus" size="small">批量导入</el-button> -->
        </section>
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
                        <a :href="state==2?'http://kd.evam.xin/Uploads/template/line_results.csv':'http://kd.evam.xin/Uploads/template/teacher_import.csv'" download="模板.csv">下载使用{{isClassLogin=='2'?'老师':'学生'}}模板 </a> 请下载模板，并按照格式填写，填写完成后，上传文件即可完成导入
                    </li>
                </ul>
                <ol class="impot-item-les">
                    <li style="height:auto;padding-left:50px;background:#fff;padding-top:20px;padding-bottom:20px;">
                        <el-upload class="upload-demo" :action="url" :data='datas' :on-success="success" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                       
                    </li>
                </ol>
            </section>
        </div>
    </div>
</template>

<script>
import { isClassLogin } from '@/utils/auth'
import { getToken } from '@/utils/auth'
export default {
    props: ['state'],
    data() {
        return {
            options: [],
            value: '',
            title: '',
            fileList: [],
            datas: {
                token: getToken(),
                lex_id: ''
            },
            url: '',
            isClassLogin: isClassLogin()
        }
    },
    watch: {
        state(val) {

        },

    },
    methods: {
        handlePreview(file) {
            console.log(file)
        },
        handleRemove(file, fileList) {
            console.log(file)
        },
        success(res, file, fileList) {
            console.log(res)
            if (res.code == 200) {

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
    },
    created() {
        let val = this.state;
        if (val == '1') {
            this.title = '老师';
            this.url = "Admin/teacher/exportteacher";
        } else if (val == '2') {
            this.title = '学生'
            this.url = "Admin/teacher/exportstudent"
        }
    }
}
</script> 
<style scoped>

</style>
