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
                
                <el-form ref="form" :model="form" label-width="150px" class="margintop40" >
                    <el-form-item label="原始密码">
                        <el-input   class="width300"></el-input>
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
                
            },
            status: false,
            obj: {}
        }
    },
    methods: {
        onSubmit() {
             
        },
        
    },
    created() {
       
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
