<template>
    <div class="r_good">
        <div id="header">
            <HeadSide></HeadSide>
        </div>
        <div class="r_good_box">
            <div class="r_good_box_left">
                <ul>
                    <li v-for="item in items.length" :key="item" @click="tabQuestion(item)">
                        {{item}}
                    </li>
                </ul>
            </div>
            <div class="r_good_box_right">
                <h3 v-html="obj.e_title" class="r_center"></h3>
                <p class="r_center">第 {{index+1}} 题</p>
                <div v-html="items[index].q_title">

                </div>
                <div class="r_select_answer">
                    <div v-if="items[index].q_type_id=='1'">
                        <ul>
                            <li v-for="(item,indexs) in items[index].q_option" :key="indexs">
                                <label>
                                    <el-radio class="radio" v-model="items[index].answer" :label="item.index">{{item.index}} {{item.title}}</el-radio>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div v-else-if="items[index].q_type_id=='2'">
                        <el-checkbox-group v-model="items[index].answer">
                            <el-checkbox style="display:block;margin-top:10px;margin-left:0" v-for="(item,indexs) in items[index].q_option" :key="indexs" :label="item.index">{{item.index}} {{item.title}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div v-if="items[index].q_type_id=='3'">
                        <ul>
                            <li v-for="(item,indexs) in if_question" :key="indexs">
                                <label>
                                    <el-radio class="radio" v-model="items[index].answer" :label="item.index"> {{item.title}}</el-radio>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div v-if="items[index].q_type_id=='4'">
                        <!-- <ul>
                                <li v-for="(item,indexs) in items[index].q_option" :key="indexs">
                                    <el-input v-model="items[index].answer" placeholder="请输入内容"></el-input>
                                </li>
                            </ul> -->
                        <el-input type="textarea" :rows="4" placeholder="请输入答案" v-model="items[index].answer">
                        </el-input>
                    </div>
                    <div v-if="items[index].q_type_id=='5'">
                        <el-input type="textarea" :rows="4" placeholder="请输入答案" v-model="items[index].answer">
                        </el-input>
                    </div>
                    <div v-if="items[index].q_type_id=='6'">
                        <el-input type="textarea" :rows="4" placeholder="请输入答案" v-model="items[index].answer">
                        </el-input>
                    </div>
                </div>
                <el-row style="margin:25px 0">
                    <el-col :span="12">&nbsp;
                        <el-button size="mini" v-show="index>0" @click="curPage(1)">上一题</el-button>
                    </el-col>
                    <el-col :span="12">&nbsp;
                        <el-button class="float-right" size="mini" v-show="(index+1)<items.length" @click="curPage(2)">下一题</el-button>
                    </el-col>
                </el-row>
                <el-button type="primary" @click="submit">提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import store from '@/utils/examination'
import { HeadSide } from '@/view/layout/index.js'
export default {
    data() {
        return {
            e_id: this.$route.query.e_id,
            obj: {},
            index: 0,//当前题目索引
            items: [{ q_title: '' }],
            radio: '',
            if_question: [
                { title: "正确", index: '0' },
                { title: "错误", index: '1' },
            ],
        answer:[]
        }
    },
    methods: {
        tabQuestion(index) {
            this.index = (index - 1)
        },
        submit() {
            let arr = []
            // 如果当前没有做题
            this.items.forEach((x, index) => {
                if (x.answer == '') {
                    arr.push(index + 1)
                }
            })

            if (arr.length > 0) {
                console.log(arr.length)
                this.$notify({
                    title: '警告',
                    message: `第${arr.join(",")}没有答题`,
                    type: 'warning'
                }); return
            }
            this.answer = [];
            this.items.forEach((x,index)=>{
                if(x.q_type_id=='2'&&typeof x.answer=='object'){
                    x.answer=x.answer.join(",");
                }
                this.answer.push({
                    answer:x.answer,
                    q_type_id:x.q_type_id, 
                    q_id:x.q_id
                })
            })
            store.pushAnswer.call(this,this.answer)
        },
        curPage(state) {
            // 翻页
            if (state == 1) {
                if (this.index > 0) {
                    this.index--;
                }
            } else if (state == 2) {
                if ((this.index + 1) < this.items.length) {
                    this.index++;
                }
            }
        }
    },
    created() {
        store.examination_info.call(this);

    },
    mounted() {

    },
    watch: {
        radio(val) {

        }
    },
    components: {
        HeadSide
    }
}
</script>
