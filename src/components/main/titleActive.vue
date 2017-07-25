<template>
    <div>
        <section class="kd-title-items">
            <span class="kd-title-item" :class="state==item.index?'active':''" @click="emitTransfer(item.index,state)" v-for="(item,index) in titles">{{item.name}}</span>
        </section>
        <section class="kd-description" v-if="prompts&&isShow">
            <p class="">
                <img :src="prompt" class="icon-propmpt icon-img" />
                <span>操作提示</span>
            </p>
            <ul class="kd-description-list">
                <li v-for="item in prompts">
                    <i class="el-icon-caret-left"></i>{{item}}</li>
                <!-- <li><i class="el-icon-caret-left"></i>侧边栏可以进行高级搜索</li> -->
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
    props: ["titles", "prompts","state"],
    created() { 
    console.log(this.state)
    },
    methods: {
        // 关闭提示
        show() {
            this.isShow = false;
        },
        emitTransfer(index,state){
            // 像父组件传递参数\  
            this.$emit("Transfer",index)
        }
    } 
}
</script> 
<style scoped>

</style>
