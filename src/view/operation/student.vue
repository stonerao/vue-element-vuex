<template>
    <div class="kd-app-main">
        <titleItem :titleText="$route.name.substring(1)"></titleItem>
        <div class="kd-box">

            <div class="kd-box-content">
                <description :prompts="prompts" @PromPts="promptsTem"></description>
                <!--模块开始  -->

                <s_list v-if="state==0" @myOperation="myOperation" @tablist="tab_list" @Mangtheater="Mangtheater"></s_list>
                <get_operation v-else-if="state==1" :status="status_id" ></get_operation>
                <stundentMangList v-else-if="state==2" :id="at_id" @quit="mangQuit"></stundentMangList>  
            </div>
            <bottomItem></bottomItem>
        </div>
    </div>
</template>

<script>
import titleItem from '@/components/main/title.vue'
import description from '@/components/main/description.vue'
import bottomItem from '@/components/bottom/bottom.vue'
import s_list from '@/components/operation/s_list'
import get_operation from '@/components/operation/get_operation'
import stundentMangList from '@/components/operation/stundentMangList'
export default {
    data() {
        return {
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 0,
            status: {
                state: 0
            },
            status_id:"",
            at_id:''
        }
    },
    created() {
    },
    components: {
        titleItem, description, bottomItem,
        s_list, get_operation,stundentMangList
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
        tab_list() {
            this.status.state = 1;
        },
        myOperation(val) {
            this.state = 1;
            this.status_id=val
        },
        Mangtheater(id){ 
            this.at_id=id;
            this.state=2
        },
        mangQuit(){
            //评阅取消
            this.state=0
        }
    }
}
</script>
 
<style scoped>

</style>
