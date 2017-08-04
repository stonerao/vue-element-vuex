<template>
    <section class="add-inp">
        <div class="add-inp-items">
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    用户名：
                </div>
                <div class="add-inp-item-inp">
                    <el-input v-model="addInfo.member_name" placeholder=""></el-input>
                </div>
                <div class="add-inp-item-addname margin-left">登录用户名账号</div>
            </div>
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    姓名：
                </div>
                <div class="add-inp-item-inp">
                    <el-input v-model="addInfo.teacher_name" placeholder=""></el-input>
                </div>
                <div class="add-inp-item-addname margin-left">填写真实姓名，以便联系称呼</div>
            </div>
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    性别：
                </div>
                <div class="add-inp-item-inp">
                    <el-radio class="radio" v-model="addInfo.teacher_sex" label="1">保密</el-radio>
                    <el-radio class="radio" v-model="addInfo.teacher_sex" label="2">男</el-radio>
                    <el-radio class="radio" v-model="addInfo.teacher_sex" label="3">女</el-radio>
                </div>
                <div class="add-inp-item-addname margin-left"> </div>
            </div>
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    密码：
                </div>
                <div class="add-inp-item-inp">
                    <el-input v-model="addInfo.password" type="password"></el-input>
                </div>
                <div class="add-inp-item-addname margin-left">登录密码</div>
            </div>
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    教学科目：
                </div>
                <div class="add-inp-item-inp">
                    <el-select v-model="addInfo.teach_subject" multiple placeholder="请选择">
                        <el-option v-for="item in kemu" :key="item.name" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="add-inp-item-addname margin-left">例如：语文，一个老师可以对应多个教学科目</div>
            </div>
    
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    联系电话：
                </div>
                <div class="add-inp-item-inp">
                    <el-input v-model="addInfo.teacher_phone" type="number"></el-input>
                </div>
                <div class="add-inp-item-addname margin-left">如：13800000000</div>
            </div>
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    老师简介：
                </div>
                <div class="add-inp-item-inp">
                    <el-input v-model="addInfo.teacher_desc" type="textarea"></el-input>
                </div>
                <div class="add-inp-item-addname margin-left"></div>
            </div>
    
            <div class="add-inp-btn">
                <div class="add-inp-item-name">
                </div>
                <el-button type="primary" @click="addTeacherTab">保存</el-button>
                <el-button @click='quit'>取消</el-button>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props: ['kemu', 'state', 'obj'],
    data() {
        return {
            addInfo: {
                member_name: "",//用户名
                password: "",//密码
                teacher_name: "",//姓名
                teacher_sex: "",//性别 1:保密，2:男,3:女，必填
                teacher_phone: "",//联系电话
                teach_subject: "",//教学科目
                teacher_desc: "",//老师简介 
            },
        }
    },
    methods: {
        addTeacherTab() {
            if (this.state == '1') {
                this.$emit("TeacherInfos", this.addInfo)
            } else if (this.state == '2') {
                this.addInfo.teacher_desc ? '' : this.addInfo.teacher_desc = "";
                this.$emit("TeacherSet", this.addInfo, this.obj.teacher_id)
            }

        },
        quit() {
            if (this.state == '1') {
                this.addInfo = {
                    member_name: "",//用户名
                    password: "",//密码
                    teacher_name: "",//姓名
                    teacher_sex: "",//性别 1:保密，2:男,3:女，必填
                    teacher_phone: "",//联系电话
                    teach_subject: "",//教学科目
                    teacher_desc: "",//老师简介 
                }
            } else {
                this.$emit("QUIT",0)
            }

        }
    },
    mounted() {
        // state == 1 增加 ==2 编辑
        if (this.state == '1') {

        } else if (this.state == '2') {
            let obj = this.obj;
            this.addInfo.member_name = obj.member_name;
            this.addInfo.teacher_name = obj.teacher_name;
            this.addInfo.teacher_sex = obj.sex;
            this.addInfo.teacher_phone = obj.teacher_phone;
            this.addInfo.teacher_desc = obj.teacher_desc;
            this.addInfo.teach_subject = obj.teach_subject != "" ? obj.teach_subject.split(",") : [];

        }
    }
}
</script>