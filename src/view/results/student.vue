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
                    <r-bottom @getLexId="getLexId"></r-bottom>
                </div>

                <r-gradeslist :id="lex_id" v-if="state==5" @fanhui="fanhui" @getLeId="getLeId"></r-gradeslist>
                <r-resultsStore v-if="state==6" :id="lex_id" @fanhui="fanhui"></r-resultsStore>

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
import list from '@/components/results/bottomlist.vue'
import gradeslist from '@/components/results/gradeslist.vue'
import resultsStore from '@/components/results/resultsStore.vue'
export default {
    data() {
        return {
            titleItem: [
                { name: "线下考试列表", index: 0 }, 
            ],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 0,
            lex_id: "",
            le_id: ''
        }
    },
    created() {
    },
    components: {
        titleItem, titleActive, description, bottomItem,
        'r-bottom': list, 'r-gradeslist': gradeslist,
        'r-resultsStore': resultsStore
    },
    methods: {
        emitTransfer(index) {
            if (this.state == index) {
                return
            }
            this.lex_id = null;
            this.state = index;
        },
        promptsTem(status) {
            console.log(status)
        },
        getLexId(id, status) {
            this.lex_id = id;
            if (status == 1) {
 
                this.state = 5;
            } else if (status == 2) {
                this.state = 6
            }
        },
        getLeId(id) {
            this.le_id = id;
            this.state = 6;
        },
        fanhui(val) {
            this.state = val;
        }
    }
}
</script>
 
<style scoped>

</style>
