<template>
    <!--创建考试 -->
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="考试名称">
            <el-input v-model="form.name" class="width200"></el-input>
        </el-form-item>

        <el-form-item label="开始时间">
            <el-col :span="24">
                <el-date-picker v-model="form.date1" type="datetime" :picker-options="pickerOptions0" placeholder="选择日期时间">
                </el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="结束时间">
            <el-col :span="24">
                <el-date-picker v-model="form.date1" type="datetime" :picker-options="pickerOptions0" placeholder="选择日期时间">
                </el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="考试班级">
            <el-select class="width200" v-model="form.region" multiple placeholder="考试班级">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="考试总分">
            <el-input v-model="form.name" class="width150"></el-input>
        </el-form-item>
        <el-form-item label=" ">
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    data() {
        return {
            form: {
                name: '',
                region: [],
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    },
    created() {

    },
    mounted() {

    },
    watch: {

    }
}
</script>
