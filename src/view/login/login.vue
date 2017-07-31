<template>
    <div class="t-login admin-login t-login-b">
        <div class="t-login-main">
            <div class="t-login-logo">
                <img src="../../assets/login/logo.png">
            </div>
            <div class="t-login-box">
                <div class="login-title">
                    学生/老师登录
                </div>
                <ul class="login-items">
                    <li class="t-inp-label">
                        <input type="text" placeholder="账号" class="t-inp t-inp-user t-inp-icon" v-model="form.username" />
                    </li>
                    <li class="t-inp-label">
                        <input type="password" placeholder="密码" class="t-inp t-inp-pwd t-inp-icon" v-model="form.password" />
                    </li>
                    <li class="t-inp-label">
                        <input type="text" placeholder="标识符" class="t-inp t-inp-pwd t-inp-icon" v-model="form.school_identify" />
                    </li>
                    <li class="t-inp-label">
                        <input type="text" placeholder="图形验证码" class="t-inp t-inp-pwd t-inp-icon" v-model="form.verify" />
                        <img :src="codeSrc" class="login-code" @click="codeSet">
                    </li>
                    <li>
                        <el-checkbox v-model="checked">自动登录</el-checkbox>
                        <span class="float-right">你还没有账号，
                            <router-link to="" style="color:red">立即入住</router-link>
                        </span>
                    </li>
                    <li>
                        <el-button type="primary" class="t-submit" @click="sub">登录</el-button>
                    </li>
                </ul>
            </div>
    
        </div>
         <div class="admin-login-copy">
            dsadasdasdasdsadas
        </div> 
         
    </div>
</template>

<script>
import store from '@/utils/login'
import bottom from '@/components/bottom/bottom'
export default {
    data() {
        return {
            input: '',
            checked: false,
            form: {
                username: 'tang123',
                password: '123456',
                school_identify: '001',
                verify: '1111'
            },
            codeSrc: ''
        }
    },
    methods: {
        sub() {
            store.login.call(this,this.form)
        },
        isLogin() {
            // 是否自动登录

        },
        codeSet(){
            // 更新code
            store.loginCode.call(this)
        }
    },
    created() {
        // 验证码
        this.codeSet();
    },
    components:{
        'l-bottom':bottom
    }
    
}
</script> 
<style scoped>

</style>
 