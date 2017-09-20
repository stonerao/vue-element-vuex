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
                    <!--我的书架  -->
                    <myTeaching :state="isLoginState"></myTeaching>
                </div>
                <div v-if="state==1">
                    <!--我的书架  -->
                    <spaceBuy></spaceBuy>
                </div>
                <div v-if="state==2">
                    <!--我的教材列表  -->
                    <teachingList :state="isLoginState"></teachingList>
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
import myTeaching from '@/components/teaching/myTeaching.vue'
import spaceBuy from '@/components/teaching/spaceBuy.vue'
import teachingList from '@/components/teaching/teachingList.vue'
import { isClassLogin } from '@/utils/auth'
export default {
    data() {
        return {
            titleItem: [
                { name: "教材列表", index: 0 },
                { name: "空间购买", index: 1 },
                { name: "我的书架", index: 2 },
            ],
            prompts: [
                `教材列表`, 
            ],
            state: 0,
            isLoginState:isClassLogin()
        }
    },
    created() { 
    },
    components: {
        titleItem, titleActive, description, bottomItem, myTeaching,spaceBuy,teachingList
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
