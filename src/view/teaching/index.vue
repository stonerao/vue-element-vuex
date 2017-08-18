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
                    <myTeaching></myTeaching>
                </div>
                <div v-if="state==1">
                    <!--我的书架  -->
                    <spaceBuy></spaceBuy>
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


export default {
    data() {
        return {
            titleItem: [
                { name: "我的书架", index: 0 },
                { name: "空间购买", index: 1 },
            ],
            prompts: [
                `历史考试`,
                `xxxxxxxx`
            ],
            state: 0,
        }
    },
    created() {
    },
    components: {
        titleItem, titleActive, description, bottomItem, myTeaching,spaceBuy
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
