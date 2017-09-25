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
                            <el-row>
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
                            <div class="record_tree">
                                <div class="record">
                                    <h2 class="clock"></h2>
                                    <div class="blue_line"></div>
                                    <ul class="record_date clearfloat">
                                        <li class="date">
                                            <h3>2015年9月1日</h3>
                                            <h3>2015年9月1日</h3>
                                        </li>
                                        <li class="info" :style="{width:`${InfoWidth}`}">
                                            <div class="info_wrapper">
                                                阿萨德撒大
                                            </div>
                                            <div class="handleBtn">
                                                <el-button>查看成绩</el-button>
                                                <el-button>查看书架</el-button>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul class="record_date clearfloat">
                                        <li class="date">
                                            <h3>2015年9月1日</h3>
                                            <h3>2015年9月1日</h3>
                                        </li>
                                        <li class="info" :style="{width:`${InfoWidth}`}">
                                            <div class="info_wrapper">
                                                侧飒飒所所
                                            </div>
                                            <div class="handleBtn">
                                                <el-button>查看成绩</el-button>
                                                <el-button>查看书架</el-button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
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
            l_query: false,
            query:{
                name: '',
                card: '',
            },
            InfoWidth: '',
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
    }
}
</script>
 
<style scoped>

</style>
