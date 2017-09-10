<template>
    <div class="r-alert">
        <div class="r-alert-quesbox">
            <div class="r-alert-title">
                试题预览
                <i class="float-right r-over" @click="over"></i>
            </div>
            <div class="r-alert-quesCent">
                <ul>
                    <li>
                        <div class="r-quesq-tittle">
                            试题类型：
                        </div>
                        <div class="r-quesq-box">
                            {{obj.q_class}}
                        </div>
                    </li>
                    <li>
                        <div class="r-quesq-tittle">
                            试题分类：
                        </div>
                        <div class="r-quesq-box">
                            {{obj.qc_id}}
                        </div>
                    </li>
                    <li class="back-hui r-margin-re">
                        <div class="r-quesq-tittle">
                            试题题干：
                        </div>
                        <div class="r-quesq-box" v-html="obj.q_title">
                        </div>
                    </li>
                    <li class="r-margin-re" v-if="obj.q_option">
                        <div class="r-quesq-tittle">
                            选项：
                        </div>
                        <div class="r-quesq-box">
                            <div v-for="(item,index) in obj.q_option" :key="index">
                                {{A_Z[index]}} : {{item.title}}
                            </div>
                        </div>
                    </li>
                    <li class="r-margin-re">
                        <div class="r-quesq-tittle">
                            试题答案：
                        </div>
                        <div class="r-quesq-box" v-if="obj.q_type_id!=3">
                            {{obj.answer}}
                        </div>
                        <div class="r-quesq-box" v-else>
                            {{obj.answer=='1'?'正确':'错误'}}
                        </div>
                    </li>

                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['obj', 'status'],
    data() {
        return {
            A_Z: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"],

        }
    },
    methods: {
        over() {
            this.$emit('CLICKOVER', false)
        }
    },
    mounted() {
        console.log(this.obj)
    }
}
</script>

<style>

</style>
