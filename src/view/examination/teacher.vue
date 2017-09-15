<template>
    <div class="kd-app-main">
        <titleItem :titleText="$route.name.substring(1)"></titleItem>
        <div class="kd-box">
            <div class="kd-app-box">
                <titleActive :titles="titleItem" @Transfer="emitTransfer" :state="state"></titleActive>
            </div>
            <div class="kd-box-content">
                <description :prompts="prompts" @PromPts="promptsTem" v-if="!mangSate"></description>
                <!--模块开始  -->
                <div v-if="state==0">
                    <!-- 考试试卷 -->
                    <teacherQuestion @statistics='statistics' @selectNative="selectQuestion" :state="selectExamstate"></teacherQuestion>
                </div>
                <div v-if="state==1">
                    <createQuestion @list="listSelect" :selectQuestList="selectQuestList" @SELECTQUESTIONLISTEVENT="selectEvent" @newAddQuestion="new_add_question" :newAddObj="newAddObj" @createQuit='createQuit'>
                    </createQuestion>
                </div>
                <div v-if="state==2">
                    <examinationList @setQuestion="setQuestionList"></examinationList>
                </div>
                <div v-if="state==3">
                    <createExamination @quit="examQuit" @setExamOk="setExamOk" :set_e_id="set_e_id" :selectObjs="examstateQuestion" @selectExam="selectExam"></createExamination>
                </div>
                <div v-if="state==4">
                    <management @mang_id="mang_id"></management>
                </div>
                <div v-if="state==6">
                    <teacherCenterList @TOGO="TOGO" v-if="isListBottom" @results="results" @results_list="resultsa"></teacherCenterList>
                    <teacherCenter v-else-if="!isListBottom" :id='isListBottomId' @goods='isListBottom=true'></teacherCenter>
                </div>
                <div v-if="state==8">
                    <!-- 选择试题 -->
                    <setQuestion stateList='1' @getListData="getListData" :listSelectObj="listSelectObj"></setQuestion>
                </div>
                <div v-if="state==9">
                    <!-- 选择试题 -->
                    <addQuestion :newAddQuestion='newAddQuestion' @newAddwQuestOut="newAddwQuestOut"></addQuestion>
                </div>
                <div v-if="state==10">
                    <mang_list :id="mang_state_id" @toMangList="toMangList"></mang_list>
                </div>
                <div v-if="state==11">
                    <eqMangListTe :id="e_id" @greadeQuit="greadeQuit"></eqMangListTe>
                </div>
                <div v-if="state==12">
                    <results :state="resultsState" :id="isListBottomId" @fanhui="state=6"></results>
                </div>
                <div v-if="state==13">
                    <results_center :id="isListBottomId" @fanhui="state=6"></results_center>
                </div>
                <div v-if="state==14">
                    <statistics :id="t_id" @fanhui="state=0"></statistics>
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
import examinationList from '@/components/examination/examinationList'
import management from '@/components/examination/management'
import mang_list from '@/components/examination/mang_list'
import eqMangListTe from '@/components/examination/eqMangList'
import teacherCenter from '@/components/center/teacher'
import teacherCenterList from '@/components/center/teacherCenterList'
import results from '@/components/center/results'
import results_center from '@/components/center/results_center'
import statistics from '@/components/examination/statistics'

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
                { name: "线下成绩", index: 6 },
            ],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 0,
            selectQuestList: [],
            listSelectObj: '',
            newAddQuestion: false,
            newAddObj: {},
            selectExamstate: false,//true是创建试卷过去
            examstateQuestion: {},//存储考试试卷的选择
            set_e_id: '',
            mangSate: false,
            mang_id_state: "",
            mang_state_id: "",
            e_id: "",
            isListBottom: true,
            isListBottomId: '',
            resultsState: 1,
            t_id: ""
        }
    },
    created() {
        removeSelectQuestion();
        removeCookie('NEWADDQUESTIONOUT');

    },
    components: {
        titleItem, titleActive, description, bottomItem,
        teacherQuestion, createQuestion, setQuestion, addQuestion, createExamination, examinationList,
        management, mang_list, eqMangListTe, teacherCenter, teacherCenterList, results, results_center,
        statistics
    },
    methods: {
        emitTransfer(index) {
            if (index == 3) {
                removeCookie("CREATEDEXAM")
            }
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
        new_add_question() {
            //创建试卷去题库增加题目
            this.newAddQuestion = true;
            this.state = 9;
        },
        newAddwQuestOut(val, data) {
            this.state = 1;
            this.newAddObj = {
                state: val,//1是加入 2是不加入老师
                items: data
            }
        },
        createQuit() {
            // 创建试卷取消
            this.state = 0;
        },
        selectExam() {
            //创建试卷过来 考试试卷
            this.state = 0
            this.selectExamstate = true;
        },
        selectQuestion(obj) {
            //考试试卷选择到创建考试去
            this.state = 3;
            this.examstateQuestion = obj

        },
        setQuestionList(obj) {
            // 编辑创建考试
            this.set_e_id = obj;
            this.titleItem.forEach((x) => {
                x.index == 3 ? x.name = '编辑考试' : '';
            })
            this.state = 3;
        },
        examQuit(obj) {
            this.titleItem.forEach((x) => {
                x.index == 3 ? x.name = '创建考试' : '';
            })
            this.state = 2;
        },
        setExamOk() {
            // 编辑成功
            this.examQuit()
        },
        mang_id(val) {
            // 成绩管理
            this.mangSate = true;
            this.state = 10;
            this.mang_state_id = val;
        },
        toMangList(val) {
            // 选中查看某个学生做的题目
            this.e_id = val;
            this.state = 11;
        },
        greadeQuit() {
            //  判断答案取消
            this.state = 10;
        },
        TOGO(val) {
            this.isListBottomId = val;
            this.isListBottom = !this.isListBottom

        },
        results(val) {
            this.isListBottomId = val;
            this.state = 12;
        },
        resultsa(val) {
            this.isListBottomId = val;
            this.state = 13;
        },
        statistics(id) {
            this.t_id = id;
            this.state = 14; 
        }
    }
}
</script>
 
<style scoped>

</style>
