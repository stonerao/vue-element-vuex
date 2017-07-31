<template>
    <div>
        <section class="add-inp">
            <div class="add-inp-items">
                <div class="add-inp-item">
                    <div class="add-inp-item-name">
                        科目名称：
                    </div>
                    <div class="add-inp-item-inp">
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </div>
                    <div class="add-inp-item-addname margin-left">{{className?className:'科目'}}</div>
                </div>
                <div class="add-inp-btn"> 
                    <div class="add-inp-item-name"> 
                    </div>
                    <el-button type="primary" @click="sub">保存</el-button>
                </div>
            </div>
    </section>
    </div>
</template>

<script>
export default {
    props: ['className'],
    data(){
        return{
            input:''
        }
    },
    methods:{
        sub(){ 
            this.$emit('submitInp',this.input);
        }
    }
}
</script> 
<style scoped>

</style>
 