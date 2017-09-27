<template>
    <div class="kd-app-main">
        <titleItem :titleText="$route.name.substring(1)"></titleItem>
        <div class="kd-box">
            <div class="kd-app-box">
                <titleActive :titles="titleItem" @Transfer="emitTransfer" :state="state"></titleActive>
            </div>
            <div class="kd-box-content">
                <description :prompts="prompts" @PromPts="promptsTem"></description>
                <!--模块开始  -->
                <div v-if="state==0">
                    <adminQuestion></adminQuestion>
                </div>
                <div v-if="state==1">
                    <question_class :obj="list_obj"></question_class>
                </div>
                <div v-if="state==2">
                    <list_class @setInfo='setInfo'></list_class>
                </div>

            </div>
            <bottomItem></bottomItem>
        </div>
    </div>
</template>

<script>
import titleItem from '@/components/main/title.vue'
import titleActive from '@/components/main/titleActive.vue'
import description from '@/components/main/description.vue'
import bottomItem from '@/components/bottom/bottom.vue'
import question_class from '@/components/questions/question_class'
import list_class from '@/components/questions/list_class'
import adminQuestion from '@/components/questions/adminQuestion'
export default {
    data() {
        return {
            titleItem: [
                { name: "共享题库", index: 0 },
                { name: "添加/编辑分类", index: 1 },
                { name: "分类列表", index: 2 },
            ],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 0,
            list_obj: {},
        }
    },
    created() {
    },
    components: {
        titleItem, titleActive, description, bottomItem,
        question_class, list_class,adminQuestion
    },
    methods: {
        emitTransfer(index) {
            if (this.state == index) {
                return
            }
            this.state = index;
        },
        promptsTem(status) {
            console.log(status)
        },
        setInfo(obj) {
            this.state = 1;
            this.list_obj = obj; 
        }
    }
}
</script>
 
<style scoped>

</style>
