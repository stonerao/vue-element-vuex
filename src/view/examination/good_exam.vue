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
                </div>
                <el-row>
                    <el-col :span="12">&nbsp;<el-button size="mini" v-if="index>0">上一题</el-button></el-col>{{index}}{{items.length}}
                    <el-col :span="12"><el-button class="float-right" size="mini" v-if="(index+1)<=items.length">下一题</el-button></el-col>
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
            radio: ''
        }
    },
    methods: {
        tabQuestion(index) {
            this.index = (index - 1)
        },
        submit() {
            let arr = []
            this.items.forEach((x, index) => {
                if (x.answer == '') {
                    arr.push(index + 1) 
                }
            })
            this.$notify({
                        title: '警告',
                        message: `第${arr.join(",")}没有答题`,
                        type: 'warning'
                    });
            console.log(this.items)
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
