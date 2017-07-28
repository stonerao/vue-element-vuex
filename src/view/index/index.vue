<template>
    <div class="kd-app-main">
        <titleItem :titleText="$route.name.substring(1)"></titleItem>
        <div class="kd-box">
            <!-- 内容区域 -->
            <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="24" :lg="16" class="kd-index-items">
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <router-link to="" class="kd-index-item kd-xt-school">
                                <div class="kd-index-item-title">
                                    <div>
                                        <span class="font-lg">50</span>个</div>
                                    <div>
                                        当前学校班级总数
                                    </div>
                                </div>
                            </router-link>
                        </el-col>
                        <el-col :span="8">
                            <router-link to="" class="kd-index-item kd-xt-rs">
                                <div class="kd-index-item-title">
                                    <div>
                                        <span class="font-lg">50</span>个</div>
                                    <div>
                                        当前学校学生总人数
                                    </div>
                                </div>
                            </router-link>
                        </el-col>
                        <el-col :span="8">
                            <router-link to="" class="kd-index-item kd-xt-js">
                                <div class="kd-index-item-title">
                                    <div>
                                        <span class="font-lg">50</span>个</div>
                                    <div>
                                        当前学校教职工总人数
                                    </div>
                                </div>
                            </router-link>
                        </el-col>
                        <el-col :span="8">
                            <router-link to="" class="kd-index-item kd-xt-sp">
                                <div class="kd-index-item-title">
                                    <div>
                                        <span class="font-lg">50</span>个</div>
                                    <div>
                                        当前待审批单
                                    </div>
                                </div>
                            </router-link>
                        </el-col>
                        <el-col :span="8">
                            <router-link to="" class="kd-index-item kd-xt-liu">
                                <div class="kd-index-item-title ">
                                    <div>
                                        <span class="font-lg">50</span>个</div>
                                    <div>
                                        空间已用流量
                                    </div>
                                </div>
                            </router-link>
                        </el-col>
                        <el-col :span="8">
                            <router-link to="" class="kd-index-item kd-xt-sy">
                                <div class="kd-index-item-title">
                                    <div>
                                        <span class="font-lg">50</span>个</div>
                                    <div>
                                        空间剩余流量
                                    </div>
                                </div>
                            </router-link>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="8" class="kd-index-time">
                    <div class="">2</div>
                </el-col>
            </el-row>
            <el-row :gutter="15" class="kd-list">
                <el-col :span="8" class="padding0 kd-list-box">
                    <div class="kd-list-items">
                        <div class="kd-list-items-title">
                            <span>
                                <img src="../../assets/index/icon-1.png" class="kd-list-icon" />公告/通知/消息</span>
                            <router-link to="" class="float-right font-xs">查看历史数据</router-link>
                        </div>
                        <div class="kd-list-item">
                            <ul>
                                <router-link to="" tag="li" v-for="item in 6">
                                    <span>
                                        2017年冬季放假时间安排
                                    </span>
                                    <span class="float-right">
                                        2017-7-28
                                    </span>
                                </router-link>
                            </ul>
                        </div>
                    </div>
                </el-col>
    
                <el-col :span="8">
                    <div class="kd-list-items">
                        <div class="kd-list-items-title">
                            <span>
                                <img src="../../assets/index/icon-1.png" class="kd-list-icon" />公告/通知/消息</span>
                            <router-link to="" class="float-right font-xs">查看历史数据</router-link>
                        </div>
                        <div class="kd-list-item">
                            <ul>
                                <router-link to="" tag="li" v-for="item in 6">
                                    <span>
                                        2017年冬季放假时间安排
                                    </span>
                                    <span class="float-right">
                                        2017-7-28
                                    </span>
                                </router-link>
                            </ul>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8" class="padding0">
                    <div class="kd-list-items" style="">
                        <div class="kd-list-items-title">
                            <span>
                                <img src="../../assets/index/icon-1.png" class="kd-list-icon" />公告/通知/消息</span>
                            <router-link to="" class="float-right font-xs">查看历史数据</router-link>
                        </div>
                        <div class="kd-list-item">
                            <ul>
                                <router-link to="" tag="li" v-for="item in 6">
                                    <span>
                                        2017年冬季放假时间安排
                                    </span>
                                    <span class="float-right">
                                        2017-7-28
                                    </span>
                                </router-link>
                            </ul>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="while kd-index-box">
                <div class="kd-list-items-title">
                    <span>
                        <img src="../../assets/index/icon-2.png" class="kd-list-icon" />控制面板</span>
                </div>
                <el-row :gutter="20" class="kd-index-mb">
                    <el-col :span="12">
    
                        <div class="kd-index-mb-box">
                            <div class="kd-index-mb-title">
                                康德教育平台客服
                            </div>
                            <div class="index-mb-box">
                                <el-col :span="16">
                                    <ul>
                                        <li v-for="item in 5">平台首页:
                                            <a href="http://baidu.com">http://baidu.com</a>
                                        </li>
                                    </ul>
                                </el-col>
                                <el-col :span="8" class="kd-index-erm">
                                    <img src="../../assets/index/2wm.png" />
                                </el-col>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="kd-index-mb-box">
                            <div class="kd-index-mb-title">
                                康德教育平台客服
                            </div>
                            <div class="index-mb-box">
                                <el-col :span="16">
                                    <ul>
                                        <li v-for="item in 5">平台首页:
                                            <a href="http://baidu.com">http://baidu.com</a>
                                        </li>
                                    </ul>
                                </el-col>
                                <el-col :span="8" class="kd-index-erm">
                                    <img src="../../assets/index/2wm.png" />
                                </el-col>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="while kd-index-box">
                <div class="kd-over"></div>
                <div class="kd-list-items-title">
                    <span>
                        <img src="../../assets/index/icon-2.png" class="kd-list-icon" />系统设置</span>
                </div>
                <el-row :gutter="20" class="kd-index-mb">
                    <ul class="kd-index-infos">
                        <li v-for="item in 20">
                            <div>安装日期：</div>
                            <div>2071-05-02</div>
                        </li>
                    </ul>
                </el-row>
            </div>
    
            <bottomItem style="position:relative"></bottomItem>
    
        </div>
    </div>
</template>

<script>
import titleItem from '@/components/main/title.vue'
import titleActive from '@/components/main/titleActive.vue'
import description from '@/components/main/description.vue'
import bottomItem from '@/components/bottom/bottom.vue'
import '@/utils/start'
export default {
    data() {
        return {
            titleItem: [
                { name: "科目管理", index: 0 },
                { name: "增加科目", index: 1 },
            ],
            prompts: [
                ` `,
                `侧边栏可以进行高级搜索`
            ],
            state: 0,
            promptsPad: true
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
        }
    }
}
</script>
 
<style scoped>

</style>
