<template>
    <div class="r-alert" id="question">
        <div class=WordSection1>
            <p class=MsoNormal style='mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:19.5pt;border:none;mso-border-bottom-alt:solid #EDEDED 1.5pt; padding:0cm;mso-padding-alt:0cm 0cm 11.0pt 0cm'>
                <span style='font-size:16.5pt;color:#019CFF'>试卷名称：{{this.obj.t_title}}
                    <span lang=EN-US>

                    </span>
                </span>
            </p>
            <div id="for" v-for="(item,index) in t_data" :key="index">
                <p class="MsoNormal" style="line-height: 19.5pt; border: none; padding: 0cm;">
                    <b>第{{index+1}}题</b>
                </p>
                <div style='mso-element:para-border-div;border:none;border-bottom:solid #EDEDED 1.5pt;padding:0cm 0cm 11.0pt 0cm;margin-left:0cm;margin-right:24.0pt'>
                    <p class=MsoNormal style='mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:19.5pt;border:none;mso-border-bottom-alt:solid #EDEDED 1.5pt;padding:0cm;mso-padding-alt:0cm 0cm 11.0pt 0cm'>
                        <b>试题类型：</b>{{item.q_type_id=='1'?'单选题':item.q_type_id=='2'?'多选题':item.q_type_id=='3'?'判断题':item.q_type_id=='4'?'填空':item.q_type_id=='5'?'问题':item.q_type_id=='6'?'计算题':''}} </p>
                    <p class=MsoNormal style='mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:19.5pt;border:none;mso-border-bottom-alt:solid #EDEDED 1.5pt;padding:0cm;mso-padding-alt:0cm 0cm 11.0pt 0cm'>
                        <b>试题答案： </b>
                        <span lang=EN-US>{{item.q_type_id!='3'?item.answer:item.answer=='1'?'正确':'错误'}}
                            <b>

                            </b>
                        </span>
                    </p>
                    <div class=MsoNormal style='mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:19.5pt;background:gainsboro;border:none;mso-border-bottom-alt:solid #EDEDED 1.5pt;padding:0cm;mso-padding-alt:0cm 0cm 11.0pt 0cm'>
                        <b>试题题干： </b>
                        <span lang=EN-US>
                            <span v-html="item.q_title"></span>
                            <b>

                            </b>
                        </span>
                    </div>
                    <p v-if="item.q_option" class=MsoNormal style='mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:19.5pt;border:none;mso-border-bottom-alt:solid #EDEDED 1.5pt;padding:0cm;mso-padding-alt:0cm 0cm 11.0pt 0cm'>
                        <b>选项：
                            <span lang=EN-US>

                            </span>
                        </b>
                    </p>
                </div>
                <div v-if="item.q_option">
                    <div v-for="(i,x) in item.q_option" :key="x">
                        <div style='mso-element:para-border-div;border:none;border-bottom:solid #EDEDED 1.5pt;padding:0cm 0cm 11.0pt 0cm;margin-left:36.0pt;margin-right:0cm'>
                            <p class=MsoNormal style='mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:19.5pt;border:none;mso-border-bottom-alt:solid #EDEDED 1.5pt;padding:0cm;mso-padding-alt:0cm 0cm 11.0pt 0cm'>
                                <span lang=EN-US> {{A_Z[x]}} : {{i.title}} </span>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- <div class="r-alert-quesbox">
                        <div class="r-alert-title">
                            试题预览
                            <a download="htmlText" id="down" v-show="false">下载</a>
                            <i class="float-right r-over" @click="over"></i>
                        </div>
                        <div class="r-alert-quesCent">
                            <ul v-for="(item,index) in t_data" :key="index" style="margin-top:20px;border-bottom:2px solid #ededed;padding-bottom: 15px;list-style: none; ">
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
                                        试题答案：
                                    </div>
                                    <div class="r-quesq-box">
                                        {{item.answer}}
                                    </div>
                                </li>
                                <li class="back-hui r-margin-re">
                                    <div class="r-quesq-tittle">
                                        试题题干：
                                    </div>
                                    <div class="r-quesq-box" v-html="item.q_title">
                                    </div>
                                </li>
                                <li class="r-margin-re" v-if="item.q_option">
                                    <div class="r-quesq-tittle">
                                        选项：
                                    </div>
                                    <div class="r-quesq-box">
                                        <div v-for="(i,x) in item.q_option" :key="x">
                                            {{A_Z[x]}} : {{i.title}}
                                        </div>
                                    </div>
                                </li>
                                <li class="r-margin-re">
                                    <div class="r-quesq-tittle">
                                        试题答案：
                                    </div>
                                    <div class="r-quesq-box" v-if="item.q_type_id!=3">
                                        {{item.answer}}
                                    </div>
                                    <div class="r-quesq-box" v-else>
                                        {{item.answer=='1'?'正确':'错误'}}
                                    </div>
                                </li>

                            </ul>
                        </div> -->
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
        over() {
            this.$emit('CLICKOVER', false)
        },
        yl() {

            // htmlText
            let html = document.getElementById("question").innerHTML;
            let val = text.top + html + text.bottom;
            // '

            // var blob = new Blob([val]);
            // document.getElementById("down").href = URL.createObjectURL(blob);
            // document.getElementById("down").click();
            store.export_word.call(this, val)
            this.$emit('CLICKOVER', false)
        }
    },
    mounted() {
        if (!this.obj) {
            this.$emit('CLICKOVER', false)
            return
        }
        let datas = this.obj.question_list;
        for (var x in datas) {
            datas[x].map((i) => {
                this.t_data.push(i)
            })
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

}
</script>

<style>

</style>
