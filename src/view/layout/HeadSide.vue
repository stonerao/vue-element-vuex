<template>
    <header class="kd-header">
        <el-row>
            <el-col :span="5">
                <section class="kd-header-logo marginleft15">
                  康德课堂{{name}}中心
                </section>
            </el-col>
            <el-col :span="19">
                <ul class="kd-header-list">
                    <router-link tag="li" :to="`${isClassLogin=='1'?'/one/index':isClassLogin=='2'?'/teacherindex':'/students'}`" class="kd-header-user active">
                        <section class="kd-header-tou float-left">
                            <img :src="obj.manager_avatar" />
                        </section>
                        <section>
                            <p>您好 </p>
                            <p>学校{{name}}：
                                <span v-html="obj.member_name"></span>
                            </p>
                        </section>
                    </router-link>
                    <router-link tag="li" to="/setPwd" class="kd-header-icon">
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

                    <li class="kd-header-icon">
                        <p class="kd-header-icons">
                            <i class="el-icon-menu"></i>
                        </p>
                        <p>回首页</p>
                    </li>
                </ul>
            </el-col>
        </el-row>

    </header>
</template>
<script>
import store from '@/utils/commos'
import { api } from '@/api/layout'
import { getToken } from '@/utils/auth'
import { isClassLogin } from '@/utils/auth'
import { removeToken } from '@/utils/auth'
export default {
    data() {
        return {
            obj: {
                manager_avatar: '',
                manager_name: ''
            },
            name: "",
            isClassLogin: isClassLogin()
        }
    },
    created() {
        const key = getToken()
        this.$http({
            url: api.headers,
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
        switch (parseInt(isClassLogin())) {
            case 1:
                this.name = '学校管理'
                break;
            case 2:
                this.name = '老师个人'
                break;
            case 3:
                this.name = '学生个人'
                break;
        }
    },
    methods: {
        quit() {
            //推出登陆
            store.quitLogin.call(this, this.isClassLogin)
        }
    }
}
</script>
