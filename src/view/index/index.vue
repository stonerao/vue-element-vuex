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
            <el-row :gutter="10" class="kd-list">
                <el-col :span="8" class="padding0 kd-list-box">
                    <div class="kd-list-items">
                        <div class="kd-list-items-title">
                            <span>
                                <img src="../../assets/index/icon-1.png" class="kd-list-icon"/>公告/通知/消息</span>
                            <router-link to="">查看历史数据</router-link>
                        </div>
                        <div class="kd-list-item">
                            <ul>
                                <router-link to="" tag="li"></router-link>
                            </ul>
                        </div>
                    </div>
                </el-col>
    
                <el-col :span="8" class="padding0">
                    <div class="">2</div>
                </el-col>
                <el-col :span="8" class="padding0">
                    <div class="">3</div>
                </el-col>
    
            </el-row>
    
            <bottomItem></bottomItem>
    
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
