<template>
    <div>
        <section class="kd-title-items" v-if="titles.length>0">
            <span class="kd-title-item" :class="state==item.index?'active':''" @click="emitTransfer(item.index,state)" v-for="(item,index) in titles">{{item.name}}</span>
        </section>
        
    </div>
</template>

<script> 
export default {
    data() {
        return { 
            isShow:true
        }
    },
    props: ["titles", "state"],
    created() {  
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
