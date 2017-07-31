<template>
    <div>
        <section class="kd-description" v-if="prompts&&isShow">
            <p class="">
                <img :src="prompt" class="icon-propmpt icon-img" style="width: 25px;"/>
                <span>操作提示</span>
            </p>
            <ul class="kd-description-list">
                <li v-for="item in prompts">
                    <i class="el-icon-caret-left"></i>{{item}}</li>
            </ul>
            <div class="kd-description-dele" @click="show">
                <i class="el-icon-minus"></i>
            </div>
        </section>
    </div>
</template>

<script>
import { dpimg } from '@/assets/icon'
export default {
    data() {
        return {
            prompt: dpimg,
            isShow:true
        }
    },
    props:["prompts"],
    created() {  
    },
    methods: {
        // 关闭提示
        show() {
            this.isShow = false;
            this.$emit("PromPts",this.isShow)
        }
    } 
}
</script> 
<style scoped>

</style>
