<template>
    <div>
        <div id="header">
            <HeadSide></HeadSide>
        </div>
        <div class="r_setpwd">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>修改密码</el-breadcrumb-item>
            </el-breadcrumb>
            <div style="width:450px;margin:0 auto" class="margintop40">
                <el-form ref="form" :model="form" label-width="150px" class="margintop40" v-if='status==3'>
                    <el-form-item label="学生姓名">
                        <el-input v-model="form.name" class="width300"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.pwd" class="width300"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input v-model="form.pwd1" class="width300"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="form.phone" class="width200"></el-input>
                        <el-button @click='getcode'>获取短信</el-button>
                    </el-form-item>
                    <el-form-item label="短信">
                        <el-input v-model="form.code" class="width300"></el-input>
                    </el-form-item>
                    <el-form-item label=" ">
                        <el-button type="primary" @click="onSubmit">立即修改</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="form" label-width="150px" class="margintop40" v-else-if="status==1||status==2">
                    <el-form-item label="原始密码">
                        <el-input v-model="form.pwd" class="width300"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input v-model="form.new_pwd" class="width300"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码">
                        <el-input v-model="form.new_pwd1" class="width300"></el-input>
                    </el-form-item>
                    <el-form-item label=" ">
                        <el-button type="primary" @click="onSubmit">立即修改</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import { isClassLogin } from '@/utils/auth'
import { HeadSide } from '@/view/layout/index.js'
import store from '@/utils/login'
export default {
    data() {
        return {
            form: {
                pwd: '',
                pwd1: '',
                new_pwd: '',
                new_pwd1: '',
                name: "",
                phone: "",
                code: ""
            },
            status: false,
            obj: {}
        }
    },
    methods: {
        onSubmit() {
            if (this.status == 1 || this.status == 2) {
                this.obj = {
                    token: getToken(),
                    passwordold: this.form.pwd,
                    password1: this.form.new_pwd,
                    password2: this.form.new_pwd1,
                }
                store.teacherPwd.call(this, this.obj)
            } else if (this.status == 3) {
                if (this.form.pwd1 != this.form.pwd) {
                    this.$notify({
                        title: '警告',
                        message: `两次密码不相同`,
                        type: 'warning'
                    });
                    return
                } else if (this.form.pwd == '') {
                    this.$notify({
                        title: '警告',
                        message: `密码不能为空`,
                        type: 'warning'
                    });
                    return
                }
                this.obj = {
                    token: getToken(),
                    name: this.form.name,
                    password: this.form.pwd,
                    msgCode: this.form.code,
                }
                store.editpassword.call(this)
            }
        },
        getcode() {
            if (!(/^1[3|4|5|6|7|8|9][0-9]\d{4,11}$/.test(this.form.phone)) || this.form.phone.length != 11) {
                this.$notify({
                    title: '警告',
                    message: `手机号码有误`,
                    type: 'warning'
                });
                return
            }
            store.getcode.call(this)
        }
    },
    created() {
        this.status = isClassLogin();
    },
    mounted() {

    },
    watch: {

    },
    components: {
        HeadSide
    }
}
</script>
