<template>
    <el-form ref="form" :model="form" label-width="180px" class="margintop20 ">
        <el-form-item label="是否开启锁屏设置">
            <el-radio class="radio" v-model="locak" label="1">开启</el-radio>
            <el-radio class="radio" v-model="locak" label="2">关闭</el-radio>
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
            form: {},
            locak: ''
        }
    },
    methods: {
        submit() {
            store.lock_setting.call(this)
        }
    },
    created() {
        store.lock_setting_info.call(this)
    },
    mounted() {

    },
    watch: {

    }
}
</script>
 