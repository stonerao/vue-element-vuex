<template>
    <div class="kd-app-main">
        <titleItem :titleText="$route.name.substring(1)"></titleItem>
        <div class="kd-box">
            <div class="kd-app-box" v-if="isClassls==1">
                <titleActive :titles="titleItem" @Transfer="emitTransfer" :state="state"></titleActive>
            </div>
            <div class="kd-box-content">
                <description :prompts="prompts" @PromPts="promptsTem"></description>
                <!--模块开始  -->
                <div v-if="state==0">
                    <notice :state='isClassls'></notice>
                </div>
                <div  v-if="state==1">
                    <release></release>
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
import notice from '@/components/notice/index'
import release from '@/components/notice/release'
import { isClassLogin } from '@/utils/auth'
export default {
    data() {
        return {
            titleItem: [
                { name: "通知列表", index: 0 },
                { name: "发通知", index: 1 },
            ],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 0,
            isClassls:''
        }
    },
    created() {
        // 什么端口登录
        this.isClassls= parseInt(isClassLogin())
         
    },
    components: {
        titleItem, titleActive, description, bottomItem, notice,release
    },
    methods: {
        emitTransfer(index) {
            if (this.state == index) {
                return
            }
            this.state = index;
        },
        promptsTem(status) { 
        },

    }
}
</script>
 
<style scoped>

</style>
