<template>
    <!-- 添加试题 -->
    <div class="add-inp">
        <div style="padding:30px 20px">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="试题类型">
                    <el-select v-model="questionClass" placeholder="主观题" class="width110">
                        <el-option :label="item.type_name" :value="item.type_id" v-for="(item,index) in obj.questionClass" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属分类">
                    <el-select v-model="form.region" placeholder="请选择题库分类" class="width125" style="font-size:14px">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年/班级、科目">
                    <el-select v-model="form.region" placeholder="年纪" class="width125">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                    <el-select v-model="form.region" placeholder="班级" class="width125">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                    <el-select v-model="form.region" placeholder="科目" class="width125">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="试题来源：">
                    <div style="display: inline-block;">
                        <span>
                            <el-select v-model="form.region" placeholder="科目" class="width100">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </span>
                        <span>
                            <a class="marginleft15">试题难度：</a>
                            <el-select v-model="form.region" placeholder="科目" class="width100">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </span>
                        <span>
                            <a class="marginleft15">试题状态：</a>
                            <el-select v-model="form.region" placeholder="科目" class="width100">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                            <a class="hui-color">学生自测可见</a>
                        </span>
                    </div>
                </el-form-item>
                <el-form-item label="试题题干">
                    <el-input type="textarea" :rows="3" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="相关相片附件">
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog v-model="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <div v-if="questionClass==1">
                    <el-form-item label="选项设置">
                        <p>
                            <el-button type="info" @click="pushRadio">增加选项</el-button>
                        </p>
                        <div class="r-question-radio" v-if="radioItems.length>0">
                            <el-row v-for="(item,index) in radioItems" :key="index">
                                <el-col :span="2">
                                    <label>
                                        <span class="marginright5">选项{{fileNum(index)}}</span>
                                        <input type="radio" class="r-question-radio-select" v-model="radio" :value="index" />
                                    </label>
                                </el-col>
                                <el-col :span="14">
                                    <el-input type="textarea" :rows="2" v-model="item.title" placeholder="请输入相应题目" style="inline-block"></el-input>
                                </el-col>
                                <el-col :span="2">
                                    <i class="el-icon-circle-close r-ques-delet" @click="delectRadio(index)"></i>
                                </el-col>
                            </el-row> 
                        </div>
                    </el-form-item>
                    <el-form-item label="试题解析" v-if="radioItems.length>0">
                        <el-input type="textarea" :rows="3" v-model="form.desc"></el-input>
                    </el-form-item>
                </div>
                <div v-if="questionClass==5">
                    <el-form-item label="答案设置">
                        <el-input type="textarea" :rows="3" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="参考答案">
                        <el-input type="textarea" :rows="3" v-model="form.desc"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label=" ">
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button type="success">预览试题</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import store from '@/utils/questions'
export default {
    data() {
        return {
            form: {
                questionClass: '1',//试题分类
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
            },
            dialogImageUrl: '',
            dialogVisible: false,
            obj: {
                questionClass: [],//试题分类
            },
            questionClass: '1',//试题分类
            A_Z: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"],
            radio: '',//单选
            radioItems: [],//单选题目 
            fileNum: (num) => {
                num = parseInt(num);
                if (num != NaN) {
                    return this.A_Z[num]
                }
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
            console.log(this.radioItems)
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        pushRadio() {
            // 单选题增加选项
            const num = 6; //选择题最大条数
            if (this.radioItems.length >= num) {
                this.$notify({
                    message: `添加选项不能超过${num}条`,
                    type: 'warning'
                });
                return
            }
            this.radioItems.push({ title: '', name: '' })
        },
        delectRadio(index) {
            // 删除单选框
            this.radioItems.splice(index, 1)
        }
    },
    created() {
        // 获取题干类型
        store.question_type.call(this)
    },
    mounted() {

    },
    watch: {
        questionClass(val) {
            // change question class
            this.form.questionClass = val;
        }
    }
}
</script>
