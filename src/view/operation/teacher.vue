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
                    <teacer_list v-if="status.state==0"  @tablist="tab_list"></teacer_list>
                    <student_list @backList="backList" @toOperation="toOperation" :list_state="list_state" v-else-if="status.state==1"></student_list>
                    <get_student_operation @quit="taskQuit" :state="toStudentState" v-else-if="status.state==2"></get_student_operation>
                </div>
                <div v-if="state==1">
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
import teacer_list from '@/components/operation/teacer_list'
import release from '@/components/operation/release'
import student_list from '@/components/operation/student_list'
import get_student_operation from '@/components/operation/get_student_operation'
export default {
    data() {
        return {
            titleItem: [
                { name: "作业管理", index: 0 },
                { name: "布置作业", index: 1 },
            ],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 0, 
            status:{
                state:0
            },
            toStudentState:0,
            list_state:''
        }
    },
    created() {
    },
    components: {
        titleItem, titleActive, description, bottomItem,
        teacer_list,release,student_list,get_student_operation
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
        tab_list(obj){ 
            this.list_state = obj;
            this.status.state=1;
        },
        backList(val){
            // 列表返回
             this.status.state=0;
        },
        toOperation(val){ 
            this.toStudentState = val;
            this.status.state=2;
        },
        taskQuit(){
            // 评阅作业是返回
            this.status.state=1;
        }
    }
}
</script>
 
<style scoped>

</style>
