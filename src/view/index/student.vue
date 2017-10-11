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
                                        <span class="font-lg">{{obj.school_name}}</span>
                                    </div>
                                    <div>
                                        所在学校
                                    </div>
                                </div>
                            </router-link>
                        </el-col>
                        <el-col :span="8">
                            <router-link to="" class="kd-index-item kd-xt-rs">
                                <div class="kd-index-item-title">
                                    <div>
                                        <span class="font-lg">{{obj.student_num}}</span>人</div>
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
                                        <span class="font-lg">{{obj.teacher}}</span>个</div>
                                    <div>
                                        班主任老师
                                    </div>
                                </div>
                            </router-link>
                        </el-col>
                        <el-col :span="8">
                            <router-link to=" " class="kd-index-item kd-xt-sp">
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

            <div class="while kd-index-box">
                <div class="kd-list-items-title">
                    <span>
                        <img src="../../assets/index/icon-2.png" class="kd-list-icon" />课表</span>
                    <el-date-picker v-model="value3" type="week" format="yyyy 第 WW 周" placeholder="选择周" size="samll" class="float-right">
                    </el-date-picker>
                </div>

                <table style="width:100%" class="r-index-ke">
                    <thead>
                        <tr>
                            <th class="r-index-ke-title">
                                <span class="r-index-ke-time">时间</span>
                                <span class="r-index-ke-day">日期</span>
                            </th>
                            <th style="width:12.5%" v-for="index in 7" :key="index">
                                {{days[index-1]}}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in t_data" :key="index">
                            <td style="width:12.5%">
                                <span v-html="item.school_time"></span>
                            </td>
                            <!-- <td class="r_td_sc" v-for="box in item.content">
                                                        <p>{{box.teacher_name}} </p> 
                                                        <p>{{box.s_name}}</p>
                                                    </td>  -->
                            <td class="r_td_sc">
                                <p>{{item.content.day1.teacher_name}} </p>
                                <p>{{item.content.day1.s_name}}
                                    <span class="r-tab-check" @click="check(item.content.day1.contents_id)" v-if="item.content.day1.class_type=='0'">签到</span>
                                </p>

                            </td>
                            <td class="r_td_sc">
                                <p>{{item.content.day2.teacher_name}} </p>
                                <p>{{item.content.day2.s_name}}
                                    <span class="r-tab-check" @click="check(item.content.day1.contents_id)" v-if="item.content.day2.class_type=='0'">签到</span>
                                </p>
                            </td>
                            <td class="r_td_sc">
                                <p>{{item.content.day3.teacher_name}} </p>
                                <p>{{item.content.day3.s_name}}
                                    <span class="r-tab-check" @click="check(item.content.day1.contents_id)" v-if="item.content.day3.class_type=='0'">签到</span>
                                </p>
                            </td>
                            <td class="r_td_sc">
                                <p>{{item.content.day4.teacher_name}} </p>
                                <p>{{item.content.day4.s_name}}
                                    <span class="r-tab-check" @click="check(item.content.day1.contents_id)" v-if="item.content.day4.class_type=='0'">签到</span>
                                </p>
                            </td>
                            <td class="r_td_sc">
                                <p>{{item.content.day5.teacher_name}} </p>
                                <p>{{item.content.day5.s_name}}
                                    <span class="r-tab-check" @click="check(item.content.day1.contents_id)" v-if="item.content.day5.class_type=='0'">签到</span>
                                </p>
                            </td>
                            <td class="r_td_sc" v-if="item.content.day6">
                                <p>{{item.content.day6.teacher_name}} </p>
                                <p>{{item.content.day6.s_name}}
                                    <span class="r-tab-check" @click="check(item.content.day1.contents_id)" v-if="item.content.day6.class_type=='0'">签到</span>
                                </p>
                            </td>
                            <td class="r_td_sc" v-if="item.content.day7">
                                <p>{{item.content.day7.teacher_name}} </p>
                                <p>{{item.content.day7.s_name}}
                                    <span class="r-tab-check" @click="check(item.content.day1.contents_id)" v-if="item.content.day7.class_type=='0'">签到</span>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- <div class="while kd-index-box">
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
            </div> -->

            <bottomItem style="position:relative"></bottomItem>

        </div>
    </div>
</template>

<script>
import titleItem from '@/components/main/title.vue'
import bottomItem from '@/components/bottom/bottom.vue'
import store from '@/utils/home'
import '@/utils/start'
export default {
    data() {
        return {
            t_data: [],
            days: [
                '星期一',
                '星期二',
                '星期三',
                '星期四',
                '星期五',
                '星期六',
                '星期七',
            ],
            obj: {
            },
            value3: '',
            department_id: ""
        }
    },
    created() {
        // 课表数据
        store.studentclass_info.call(this)
        //首页数据
        store.studentIndexHome.call(this);

    },
    components: {
        titleItem, bottomItem
    },
    methods: {
        check(id) {
            store.student_sign.call(this, id, this.department_id)
        }

    },
    watch:{
        value3(val){ 
             store.studentclass_info.call(this,Date.parse(val))
        }
    }
}
</script>
 
<style scoped>

</style>
