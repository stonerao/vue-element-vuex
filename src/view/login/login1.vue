<template>
    <div class="t-login t-login-b">
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
                         <input type="text" placeholder="账号" class="t-inp t-inp-user t-inp-icon" v-model="form.user"/>
                    </li>
                    <li class="t-inp-label">
                        <input type="text" placeholder="密码" class="t-inp t-inp-pwd t-inp-icon" v-model="form.name"/>
                    </li>
                    <li>
                        <el-checkbox v-model="checked">自动登录</el-checkbox>
                        <span class="float-right"><router-link to="" style="color:red">忘记密码?</router-link></span>
                    </li>
                    <li>
                        <el-button type="danger" class="t-submit" @click="sub">登录</el-button>
                    </li>
                </ul>
            </div>
            <div class="t-login-copy">
                dsadasdasdasdsadas
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/utils/login'
 
export default { 
    data() {
        return {
            input: '',
            checked:'',
            form:{
                user:'',
                name:''
            }
        }
    },
    methods: {
        sub() { 
            store.login.call(this)
        },
        isLogin(){
            // 是否自动登录
             
        }
    },
    created(){
         
    } 
}
</script> 
<style scoped>

</style>
 