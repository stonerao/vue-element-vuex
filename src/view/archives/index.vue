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
                    <div class="l_archives_container">
                            <!-- 查询 -->
                        <div class="l_query_wrap" v-if="l_query">
                            <el-row style="margin-bottom: 20px;">
                                <el-col :span="2" class="item_l">身份证号：</el-col>
                                <el-col :span="18">
                                    <el-col :span="6">
                                        <el-input v-model="query.card" placeholder="请输入学生身份证"></el-input>
                                    </el-col>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="2" class="item_l display">提交操作：</el-col>
                                <el-col :span="18">
                                    <el-button type="primary" @click.native="queryNow">立即查询</el-button>
                                </el-col>
                            </el-row>
                        </div>
                            <!-- 查询结果 -->
                        <div v-if="!l_query">
                            <div v-if="l_query_result">
                                <el-row style="margin-bottom: 0px;">
                                    <el-col :span="3" class="item_l" style="padding: 10px 0px 10px 49px;">姓名：<span style="color: #1998e4">{{recordList[0].st_name}}</span></el-col>
                                    <el-col :span="17" style="padding: 10px 0px">身份证号：{{recordList[0].st_certificates_number}}</el-col>
                                    <el-col :span="4" class="item_l" style="text-align: right;"><el-button type="primary" @click.native="recordBack">返回</el-button></el-col>
                                </el-row>
                                <div class="record_tree">
                                    <div class="record">
                                        <h2 class="clock"></h2>
                                        <div class="blue_line"></div>
                                        <ul class="record_date clearfloat" v-for="item in recordList">
                                            <li class="date">
                                                <h3>{{item.start_school_time}}</h3>
                                                <h3>{{item.finish_school_time}}</h3>
                                            </li>
                                            <li class="info" :style="{width:`${InfoWidth}`}">
                                                <div class="info_wrapper">
                                                    {{item.finish_school_time}}: {{item.school_name}}
                                                </div>
                                                <div class="handleBtn">
                                                    <el-button v-if="item.show_cores_status" @click.native="CheckScore(recordList.st_id,recordList.school_identify)">查看成绩</el-button>
                                                    <el-button v-if="item.show_paper_status" @click.native="CheckBookshelf(recordList.st_id,recordList.school_identify)">查看书架</el-button>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div v-if="query_result_score">
                                
                            </div>
                            <div v-if="query_result_shelf">
                                
                            </div>
                        </div>
                    </div>
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
import info from '@/utils/archives'

export default {
    data() {
        return {
            titleItem: [
                { name: "档案查询", index: 0 },
            ],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 0, 
            l_query: true,
            query:{
                name: '',
                card: '',
            },
            InfoWidth: '',
            recordList: [],
            l_query_result: true,
            query_result_score: false,
            query_result_shelf: false,
        }
    },
    created() {
    },
    components: {
        titleItem, titleActive, description, bottomItem
    },
    methods: {
        emitTransfer(index) {
            if (this.state == index) {
                return
            }
            this.state = index;
        },
        promptsTem(status) {
            console.log(status)
        },
        queryNow(){
            info.recordCheck.call(this,this.query.card);
        },
        achivesAjax(code){
            info.recordResult.call(this,code);
        },
        recordBack(){
            this.l_query = true;
        },
        CheckScore(s_id,sc_ident){  //查看分数
            this.l_query_result = false;
            this.query_result_score = true;
        },
        CheckBookshelf(s_id,sc_ident){  //查看书架
            this.l_query_result = false;
            this.query_result_shelf = true;
        },
    }
}
</script>
 
<style scoped>

</style>
