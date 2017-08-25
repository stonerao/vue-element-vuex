<template>
    <!--试题库 -->
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
                    <setQuestion @SETQUESTION="setQuestion"></setQuestion>
                </div>
                <div v-if="state==1">
                    <addQuestion :setQuestionObj="setQuestionObj" :isSetQues="isSetQues" @quits="quitSet"></addQuestion>
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
import setQuestion from '@/components/questions/questionList'
import addQuestion from '@/components/questions/addQuestion'
export default {
    data() {
        return {
            titleItem: [
                { name: "试题管理", index: 0 },
                { name: "增加试题", index: 1 },
            ],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 0,
            setQuestionObj:{},
            isSetQues:false
        }
    },
    created() {
    },
    components: {
        titleItem, titleActive, description, bottomItem, setQuestion, addQuestion
    },
    methods: {
        emitTransfer(index) {
            if (this.state == index) {
                return
            }
            this.titleItem = [
                { name: "试题管理", index: 0 },
                { name: "增加试题", index: 1 },
            ]
            this.setQuestionObj=null;
            this.isSetQues = false;
            this.state = index;
        },
        promptsTem(status) {
            console.log(status)
        },
        setQuestion(obj) {
            // 编辑试题 
            this.setQuestionObj = obj;
            this.isSetQues = true;
            this.titleItem.forEach((x) => {
                if (x.index == 1) {
                    x.name = "编辑试题"
                }
            })
            this.state = 1;
        },
        quitSet(val){
            //编辑试题取消 
            this.setQuestionObj=null;
            this.isSetQues = false;
            this.state = 0;
        }
    }
    
}
</script>
 
<style scoped>

</style>
