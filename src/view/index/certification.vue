<template>
    <div>
        <div id="header">
            <HeadSide></HeadSide>
        </div>
        <div class="r_setpwd">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>档案认证</el-breadcrumb-item>
            </el-breadcrumb>
            <div style="width:450px;margin:0 auto" class="margintop40">

                <el-form ref="form" :model="form" label-width="150px" class="margintop40">
                    <el-form-item label="学生姓名">
                        <el-input class="width300" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="证件号码">
                        <el-input class="width300" v-model="form.cardnumber"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <el-input class="width300" v-model="form.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="档案查询密码">
                        <el-input class="width300" v-model="form.archives_password"></el-input>
                    </el-form-item> 
                    <el-form-item label=" ">
                        <el-button class="width300" @click="submit">确定</el-button>
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
                name: '',
                cardnumber: '',
                mobile: '',
                archives_password: '',
                token: getToken(),
            },
            status: false, 
        }
    },
    methods: {
        submit() {
            store.bind_archives.call(this)
        },

    },
    created() {
        if(isClassLogin()!=3){
            this.$router.push('/')
        }
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
