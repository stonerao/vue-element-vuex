<template>
    <div class="">
        <titleItem :titleText="name" ></titleItem>
        <div class="kd-box">
            <titleActive :titles="titleItem" @Transfer="emitTransfer" :state="state" :prompts="prompts"></titleActive>
        </div>
    </div>
</template>

<script>
import titleItem from '@/components/main/title.vue'
import titleActive from '@/components/main/titleActive.vue'
export default { 
    data() {
        return {
            name: "首页",
            titleItem: [
                { name: "科目管理", index: 0},
                { name: "增加科目", index: 1 },
            ],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 0
        }
    },
    created() {  
    },
    components: {
        titleItem, titleActive
    },
    methods: {
        emitTransfer(index) { 
            if(this.state == index){
                return
            }
            this.state = index; 
        }
    }
}
</script>
 
<style scoped>

</style>
