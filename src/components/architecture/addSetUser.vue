<template>
    <section class="add-inp">
        <div class="add-inp-items">
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    部门名称：
                </div>
                <div class="add-inp-item-inp">
                    <el-input v-model="t_input" placeholder=""></el-input>
                </div>
                <div class="add-inp-item-addname margin-left">备注信息文字 </div>
            </div>
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    特殊部门标记：
                </div>
                <div class="add-inp-item-inp">
                    <el-radio class="radio" v-model="sex" label="1">无</el-radio>
                    <el-radio class="radio" v-model="sex" label="2">无</el-radio>
                </div>
                <div class="add-inp-item-addname margin-left"> </div>
            </div>
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    部门介绍：
                </div>
                <div class="add-inp-item-inp">
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入内容" v-model="textarea3">
                    </el-input>
                </div>
                <div class="add-inp-item-addname margin-left"> </div>
            </div>
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    状态：
                </div>
                <div class="add-inp-item-inp">
                    <el-radio class="radio" v-model="sex" label="1">无</el-radio>
                    <el-radio class="radio" v-model="sex" label="2">无</el-radio>
                </div>
                <div class="add-inp-item-addname margin-left"> </div>
            </div>
            <div class="add-inp-btn">
                <div class="add-inp-item-name">
                </div>
                <el-button type="primary">保存</el-button>
                <el-button>取消</el-button>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            search: '',
            sex: '',
            t_input: ''
        }
    }
}
</script>
