<template>
    <div class="kd-app-main">
        <titleItem :titleText="$route.name.substring(1)"></titleItem>
        <div class="kd-box">
            <div class="kd-app-box">
                <titleActive :titles="titleItem" @Transfer="emitTransfer" :state="state"></titleActive>
            </div>
            <div class="kd-box-content">
                <description :prompts="prompts" @PromPts="promptsTem"></description>
                <div class="l_layout_outer">
                    <!--会议管理-->
                    <div v-if="state==0">
                        <conferManage :schoolManageCenter="schoolManageCenter" :teacherManageCenter="teacherManageCenter"></conferManage>
                    </div>
                        <!--创建会议-->
                    <div v-if="state==1">
                        <conferCreate :schoolManageCenter="schoolManageCenter" :teacherManageCenter="teacherManageCenter" :creatStatus="creatStatus"></conferCreate>
                    </div>
                </div>
            </div>
            <div v-if="state==0">
                <bottomItem></bottomItem>
            </div>
        </div>
    </div>
</template>

<script>
import { getClass } from '@/utils/auth'
import titleItem from '@/components/main/title.vue'
import titleActive from '@/components/main/titleActive.vue'
import description from '@/components/main/description.vue'
import bottomItem from '@/components/bottom/bottom.vue'
import conferManage from '@/components/conference/conferManage.vue'
import conferCreate from '@/components/conference/conferCreate.vue'

export default {
    data() {
        return {
            state: 0,
            isClassLogin:1,//登录状态（1.管理员；2.老师；3.学生） 
            titleItem: [
                { name: "会议管理", index: 0 },
                { name: "创建会议", index: 1 },
            ],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            schoolManageCenter: false,  //学校管理中心身份证
            teacherManageCenter: false, //老师管理中心身份证
            state: 0,
            creatStatus: true, 
        }
    },
    created() {
        this.isClassLogin = getClass();
        if(this.isClassLogin == 1){  //激活学校管理系统身份
            this.schoolManageCenter = true;
            this.teacherManageCenter = false;
        }else if(this.isClassLogin == 2){ //激活老师管理系统身份
            this.titleItem=[{ name: "会议管理", index: 0 }];
            this.teacherManageCenter = true;
            this.schoolManageCenter = false; 
        }
    },
    components: {
        titleItem, titleActive, description, bottomItem, conferManage, conferCreate
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
    }
}
</script>
 
<style scoped>

</style>
