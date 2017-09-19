<template>
    <div class="kd-app-main ">
        <titleItem :titleText="$route.name.substring(1)"></titleItem>
        <div class="kd-box">
            <div class="kd-app-box">
                <titleActive :titles="titleItem" @Transfer="emitTransfer" :state="state"></titleActive> 
            </div>
            <div class="kd-box-content">　
                <check  v-if="state==0"></check>
                <mobile  v-if="state==1"></mobile>
                <l-screen  v-if="state==2"></l-screen>
                <bottomItem></bottomItem>
            </div>
        </div>
    </div>
</template>

<script>
import titleItem from '@/components/main/title.vue'
import titleActive from '@/components/main/titleActive.vue'
import description from '@/components/main/description.vue'
import bottomItem from '@/components/bottom/bottom.vue'
import check from '@/components/set/check'
import mobile from '@/components/set/mobile'
import screen from '@/components/set/screen'
import '@/utils/start'
export default {
    data() {
        return {
            titleItem: [
                { name: "签到设置", index: 0 },
                { name: "短信设置", index: 1 },
                { name: "锁屏设置", index: 2 },
            ],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 0,
            promptsPad: true
        }
    },
    created() {
    },
    components: {
        titleItem, titleActive, description,bottomItem,check,mobile,'l-screen':screen
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
        }
    }
}
</script>
 
<style scoped>

</style>
