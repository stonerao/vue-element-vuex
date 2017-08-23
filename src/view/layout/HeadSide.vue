<template>
    <header class="kd-header">
        <el-row>
            <el-col :span="5">
                <section class="kd-header-logo">
                    XXX学校管理系统
                </section>
            </el-col>
            <el-col :span="19">
                <ul class="kd-header-list">
                    <router-link tag="li" to="/one/index" class="kd-header-user active">
                        <section class="kd-header-tou float-left">
                            <img :src="obj.manager_avatar" />
                        </section>
                        <section>
                            <p>您好</p>
                            <p>学校管理员：
                                <span v-html="obj.manager_name"></span>
                            </p>
                        </section>
    
                    </router-link>
                    <router-link tag="li" to="setMsg" class="kd-header-icon">
                        <p class="kd-header-icons">
                            <i class="el-icon-message"></i>
                        </p>
                        <p>系统消息</p>
                    </router-link>
                    <router-link tag="li" to="setPwd" class="kd-header-icon">
                        <p class="kd-header-icons">
                            <i class="el-icon-edit"></i>
                        </p>
                        <p>修改密码</p>
                    </router-link>
                    <li @click="quit" class="kd-header-icon">
                        <p class="kd-header-icons">
                            <i class="el-icon-upload2"></i>
                        </p>
                        <p>退出</p>
                    </li>
                    <router-link tag="li" to="/" class="kd-header-icon">
                        <p class="kd-header-icons">
                            <i class="el-icon-menu"></i>
                        </p>
                        <p>回首页</p>
                    </router-link>
                </ul>
            </el-col>
        </el-row>
    
    </header>
</template>
<script>
import store from '@/utils/commos'
import { api } from '@/api/layout'
import { getToken } from '@/utils/auth'
export default {
    data() {
        return {
            obj: {
                manager_avatar: '',
                manager_name: ''
            }
        }
    },
    created() {
        const key = getToken()
        this.$http({
            url: api.header,
            method: 'post',
            data: {
                token: key
            }
        }).then((res) => {
            if (res.data.status == 'true') {
                this.obj = res.data.member
                // console.log(this.obj)
            }
        })
    },
    methods:{
        quit(){
            //推出登陆
            store.quitLogin.call(this)
        }
    }
}
</script>
