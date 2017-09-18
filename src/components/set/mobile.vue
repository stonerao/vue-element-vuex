<template>
    <el-form ref="form" :model="form" label-width="120px" class="margintop20 width300">
        <el-form-item label="短信服务商名称">
            <el-input v-model="form.mobile_host" placeholder="短信服务商名称"></el-input>
        </el-form-item>
        <el-form-item label="短信平台账号">
            <el-input v-model="form.mobile_username" placeholder="短信平台账号"></el-input>
        </el-form-item>
        <el-form-item label="短信平台密码">
            <el-input v-model="form.mobile_pwd" placeholder="短信平台密码"></el-input>
        </el-form-item>　
        <el-form-item label=" ">
            <el-button type="primary" @click="submit">保存</el-button>
        </el-form-item>

    </el-form>
</template>
<script> 
import store from '@/utils/set'
export default {
    data() {
        return {
            time: 0,
            input: '',
            form: {
                mobile_host: '',
                mobile_username: '',
                mobile_pwd: "",　
            }
        }
    },
    methods: {
        submit() {
            let form = this.form;
            if (form.mobile_pwd == '') {
                this.$notify.error({
                    title: '错误',
                    message: `请输入密码`
                });
                return
            } 
            store.mobile_setting.call(this)
        }
    },
    created() {
        store.mobile_setting_info.call(this)
    },
    mounted() {

    },
    watch: {

    }
}
</script>
 