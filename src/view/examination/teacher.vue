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
                    <!-- 考试试卷 -->
                    <teacherQuestion></teacherQuestion>
                </div>
                <div v-if="state==1">
                    <createQuestion 
                    @list="listSelect" 
                    :selectQuestList="selectQuestList" 
                    @SELECTQUESTIONLISTEVENT="selectEvent" 
                    @newAddQuestion="new_add_question" 
                    :newAddObj="newAddObj" @createQuit='createQuit'
                    >
                </createQuestion>
                </div>
                <div v-if="state==3">
                    <createExamination></createExamination>
                </div>
                <div v-if="state==8">
                    <!-- 选择试题 -->
                    <setQuestion stateList='1' @getListData="getListData" :listSelectObj="listSelectObj"></setQuestion>
                </div>
                <div v-if="state==9">
                    <!-- 选择试题 -->
                    <addQuestion :newAddQuestion='newAddQuestion' @newAddwQuestOut="newAddwQuestOut"></addQuestion>
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
import teacherQuestion from '@/components/examination/teacherQuestion.vue'
import createQuestion from '@/components/examination/createQuestion.vue'
import setQuestion from '@/components/questions/questionList'
import addQuestion from '@/components/questions/addQuestion'
import createExamination from '@/components/examination/createExamination'

import { removeSelectQuestion } from '@/utils/auth'
import { removeCookie } from '@/utils/auth'
export default {
    data() {
        return {
            titleItem: [
                { name: "考试试卷", index: 0 },
                { name: "创建试卷", index: 1 },
                { name: "考试管理", index: 2 },
                { name: "创建考试", index: 3 },
                { name: "成绩管理", index: 4 },
                { name: "成绩上传", index: 5 },
            ],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 0,
            selectQuestList: [],
            listSelectObj: '',
            newAddQuestion:false,
            newAddObj:{}
        }
    },
    created() {
        removeSelectQuestion();
        removeCookie('NEWADDQUESTIONOUT');
    },
    components: {
        titleItem, titleActive, description, bottomItem,
        teacherQuestion, createQuestion, setQuestion,addQuestion,createExamination
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
        listSelect(val) {
            //选择试题
            this.state = 8;
        },
        getListData(arr) {
            this.selectQuestList = arr;
            this.state = 1;
        },
        selectEvent(val) {
            this.listSelectObj = val;
            this.listSelect();
        },
        new_add_question(){
            //创建试卷去题库增加题目
            this.newAddQuestion=true;
            this.state=9;
        },
        newAddwQuestOut(val,data){
            this.state=1;
            this.newAddObj = {
                state: val ,//1是加入 2是不加入老师
                items:data
            } 
        },
        createQuit(){
            // 创建试卷取消
            this.state=0;
        }
    }
}
</script>
 
<style scoped>

</style>
