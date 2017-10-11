<template>
    <div class="r-alert" id="question" @click="allOVer">
        <div class="r-alert-quesbox">
            <div class="r-alert-title">
                试题预览
                <a download="htmlText" id="down" v-show="false">下载</a>
                <i class="float-right r-over" @click="over"></i>
            </div>
            <div class="r-alert-quesCent">
                <ul v-for="(item,index) in t_data" :key="index" style="margin-top:20px;border-bottom:2px solid #ededed;padding-bottom: 15px;list-style: none; ">
                    <li class="back-hui r-margin-re">
                        <div class="r-quesq-tittle">
                            试题题干：
                        </div>
                        <div class="r-quesq-box" v-html="item.question_title">
                        </div>
                    </li>
                    <li>
                        <div class="r-quesq-tittle">
                            试题类型：
                        </div>
                        <div class="r-quesq-box">
                            {{item.q_type_id=='1'?'单选题':item.q_type_id=='2'?'多选题':item.q_type_id=='3'?'判断题':item.q_type_id=='4'?'填空':item.q_type_id=='5'?'问题':item.q_type_id=='6'?'计算题':''}}
                        </div>
                    </li>
                    <li>
                        <div class="r-quesq-tittle">
                             学生答案：
                        </div>
                        <div class="r-quesq-box">
                            {{item.answer}} <span class="marginleft15">{{item.is_answer_true==1?'正确':'错误'}}</span> 
                        </div>
                    </li>
                       <li class=" " >
                        <div class="r-quesq-tittle">
                            得分：
                        </div>
                        <div class="r-quesq-box">
                           {{item.core}} 分
                        </div>
                    </li>
                    <li>
                        <div class="r-quesq-tittle">
                           试题答案：
                        </div>
                        <div class="r-quesq-box">
                            {{item.question_answer}}
                        </div>
                    </li>
                    
                    <!-- <li class="r-margin-re" v-if="item.q_option">
                        <div class="r-quesq-tittle">
                            选项：
                        </div>
                        <div class="r-quesq-box">
                            <div v-for="(i,x) in item.q_option" :key="x">
                                {{A_Z[x]}} : {{i.title}}
                            </div>
                        </div>
                    </li>  -->
                 
                    

                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import text from '@/utils/document'
import store from '@/utils/questions'
export default {
    props: ['obj', 'status', 'title'],
    data() {
        return {
            A_Z: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"],
            t_data: [],
            htmlText: ""
        }
    },
    methods: {
        over(val) {
            this.$emit('CLICKOVER', false)
        },
        allOVer(val) {
            if (val.target.id == 'question') {
                this.$emit('CLICKOVER', false)
            }
        },
        yl() {
            let html = document.getElementById("question").innerHTML;
            let val = text.top + html + text.bottom;
            store.export_word.call(this, val)
            this.$emit('CLICKOVER', false)
        }
    },
    mounted() {

        //    this.t_data= this.obj 
        if (!this.obj) {
            this.$emit('CLICKOVER', false)
            return
        }
        let datas = this.obj;
        for (var x in datas) { 
            this.t_data.push(datas[x]) 
        }
        datas = null; 
        setTimeout(() => {
            // document.getElementById("down").download = `${this.obj.t_title}.html`;
            this.status == 10 ? this.yl() : '';
        }, 300)

    },
    watch: {
        status(val) {

        }
    },
    created() {
        setTimeout(() => { 
        }, 3000)
    }

}
</script>

<style>

</style>
