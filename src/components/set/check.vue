<template>
    <el-form ref="form" :model="form" label-width="120px" class="margintop20 width300">
        <el-form-item label="签到时间">
            <el-input v-model="input" placeholder="请输入时间（分钟）"></el-input>
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
            form: {}
        }
    },
    methods: {
        submit() {
            store.sign_setting.call(this)
        }
    },
    created() {
        store.sign_setting_info.call(this)
    },
    mounted() {

    },
    watch: {

    }
}
</script>
 