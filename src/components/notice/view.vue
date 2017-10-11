<template>
    <div class="r-alert" id='question' @click="allOVer">
        <div class="r-alert-quesbox">
            <div class="r-alert-title">
                通知
                <i class="float-right r-over" @click="over"></i>
            </div>
            <div class="r-alert-quesCent">

                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="通知标题">
                       {{obj.zn_title}}
                    </el-form-item>
                    <el-form-item label="时间">
                       {{obj.zn_time}}
                    </el-form-item>
                    <el-form-item label="发送人">
                       {{obj.zn_time}}
                    </el-form-item>
                    <el-form-item label="内容">
                
                       <div v-html="obj.zn_desc"></div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import text from '@/utils/document'
import store from '@/utils/questions'
export default {
    props: ['obj'],
    data() {
        return {

        }
    },
    methods: {

        allOVer(val) {
            if (val.target.id == 'question') {
                this.over()
            }
        },
        over() {
            this.$emit('CLICKOVER', false)
        }

    },
    mounted() {
        console.log(this.obj)
    },
    watch: {

    },
    created() {

    }

}
</script>

<style>

</style>
