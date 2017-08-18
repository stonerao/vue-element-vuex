<template>
    <div class="t-login admin-login t-login-b">
        <div class="t-login-main">
            <div class="t-login-logo">
                <img src="../../assets/login/logo.png">
            </div>
            <div class="t-login-box">
                <div class="login-title">
                    <a :class="typestate==false ? 'active':''" @click="typestate=false" href="javascript:void(0)">学生</a>/
                    <a :class="typestate==true ? 'active':''" @click="typestate=true" href="javascript:void(0)">老师</a>登录
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
                    <li class="r-login-switch">
                       <span class="float-right ">选择登录方式：<el-switch v-model="typestate" off-text="学生" on-text="老师 "  on-color="#13ce66" off-color="#ff4949">
                        </el-switch></span> 
                    </li>
                </ul>
            </div>
    
        </div>
        <l-bottom class="login-r-bottom"></l-bottom>
    
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
                username: '123456123456',
                password: '123456',
                school_identify: '001',
                verify: '1111'
            },
            codeSrc: '',
            typestate: 0,//选择学生登录或老师登录
        }
    },
    methods: {
        sub() {
            if (this.typestate) {
                store.login.call(this, this.form)
            } else {
                store.studentLogin.call(this)
            }
        },
        isLogin() {
            // 是否自动登录

        },
        codeSet() {
            // 更新code
            store.loginCode.call(this)
        }
    },
    created() {
        // 验证码
        this.codeSet();
    },
    components: {
        'l-bottom': bottom
    } 
}
</script>
<style type="text/less" lang="less">
.login-title {
    a {
        font-size: 18px;
        margin: 0 5px;
        &.active {
            color: #20a0ff;
        }
        &:hover {
            color: #20a0ff;
        }
    }
}

.login-r-bottom {
    position: absolute;
    bottom: 20px;
    text-align: center;
    color: #666;
    left: 50%;
    transform: translteX(-50%)
}
.r-login-switch{
    overflow: hidden;
    
}
</style>
