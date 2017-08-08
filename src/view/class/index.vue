<template>
    <div class="kd-app-main">
        <titleItem :titleText="$route.name.substring(1)"></titleItem>
        <div class="kd-box">
            <div class="kd-app-box">
                <titleActive :titles="titleItem" @Transfer="emitTransfer" :state="state"></titleActive>
            </div>
            <div class="kd-box-content">
                <description :prompts="prompts" @PromPts="promptsTem"></description>
                <!-- 科目管理 -->
                <div class="l_layout_outer">
                    <div v-if="state===0" class="l_timetable_outer">
                        <el-row :gutter="20" class="l_search_header0 class-header">
                            <el-col :span="6" class="class-titles">
                                <img src="../../assets/index/shuaxin.png" class="icon-img-xs" />刷新-共287条记录
                            </el-col>
                            <el-col :span="18" class="class-searchs">
                                <el-form :inline="true" :model="searchInline" id="search_form0">
                                    <el-form-item label="年级/虚拟班：">
                                    <el-select v-model="searchInline.grade" placeholder="全部">
                                          <el-option label="年级一" value="grade1"></el-option>
                                          <el-option label="年级二" value="grade2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="班级：">
                                        <el-select v-model="searchInline.class" placeholder="全部">
                                          <el-option label="班级一" value="class1"></el-option>
                                          <el-option label="班级二" value="class2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" icon="plus" size="small" @click="handleSure">确定</el-button>
                                        <el-button type="primary" icon="plus" size="small" class="cancel" @click="handleCancel">取消</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
                        <div class="l_graCla_list clearfloat">
                            <ul>
                                <li class="li_list">
                                    <div class="top-block">
                                        <div class="row t1">高2017级1班</div>
                                        <div class="row t2">班主任：<span class="blue_1">张三</span></div>
                                        <div class="row t3">学生人数：<span class="blue_1">55</span>人</div>
                                    </div>
                                    <div class="bottom-block">
                                        <div class="button-group">
                                            <el-button size="small" @click="schedule()">排课</el-button>
                                            <el-button size="small">查课</el-button>
                                            <el-button size="small">日志</el-button>
                                        </div>
                                    </div>
                                </li>
                                <li class="li_list">
                                    <div class="top-block">
                                        <div class="row t1">高2017级1班</div>
                                        <div class="row t2">班主任：<span class="blue_1">张三</span></div>
                                        <div class="row t3">学生人数：<span class="blue_1">55</span>人</div>
                                    </div>
                                    <div class="bottom-block">
                                        <div class="button-group">
                                            <el-button size="small">排课</el-button>
                                            <el-button size="small">查课</el-button>
                                            <el-button size="small">日志</el-button>
                                        </div>
                                    </div>
                                </li>
                                <li class="li_list">
                                    <div class="top-block">
                                        <div class="row t1">高2017级1班</div>
                                        <div class="row t2">班主任：<span class="blue_1">张三</span></div>
                                        <div class="row t3">学生人数：<span class="blue_1">55</span>人</div>
                                    </div>
                                    <div class="bottom-block">
                                        <div class="button-group">
                                            <el-button size="small">排课</el-button>
                                            <el-button size="small">查课</el-button>
                                            <el-button size="small">日志</el-button>
                                        </div>
                                    </div>
                                </li>
                                <li class="li_list">
                                    <div class="top-block">
                                        <div class="row t1">高2017级1班</div>
                                        <div class="row t2">班主任：<span class="blue_1">张三</span></div>
                                        <div class="row t3">学生人数：<span class="blue_1">55</span>人</div>
                                    </div>
                                    <div class="bottom-block">
                                        <div class="button-group">
                                            <el-button size="small">排课</el-button>
                                            <el-button size="small">查课</el-button>
                                            <el-button size="small">日志</el-button>
                                        </div>
                                    </div>
                                </li>
                                <li class="li_list">
                                    <div class="top-block">
                                        <div class="row t1">高2017级1班</div>
                                        <div class="row t2">班主任：<span class="blue_1">张三</span></div>
                                        <div class="row t3">学生人数：<span class="blue_1">55</span>人</div>
                                    </div>
                                    <div class="bottom-block">
                                        <div class="button-group">
                                            <el-button size="small">排课</el-button>
                                            <el-button size="small">查课</el-button>
                                            <el-button size="small">日志</el-button>
                                        </div>
                                    </div>
                                </li>
                                <li class="li_list">
                                    <div class="top-block">
                                        <div class="row t1">高2017级1班</div>
                                        <div class="row t2">班主任：<span class="blue_1">张三</span></div>
                                        <div class="row t3">学生人数：<span class="blue_1">55</span>人</div>
                                    </div>
                                    <div class="bottom-block">
                                        <div class="button-group">
                                            <el-button size="small">排课</el-button>
                                            <el-button size="small">查课</el-button>
                                            <el-button size="small">日志</el-button>
                                        </div>
                                    </div>
                                </li>
                                <li class="li_list">
                                    <div class="top-block">
                                        <div class="row t1">高2017级1班</div>
                                        <div class="row t2">班主任：<span class="blue_1">张三</span></div>
                                        <div class="row t3">学生人数：<span class="blue_1">55</span>人</div>
                                    </div>
                                    <div class="bottom-block">
                                        <div class="button-group">
                                            <el-button size="small">排课</el-button>
                                            <el-button size="small">查课</el-button>
                                            <el-button size="small">日志</el-button>
                                        </div>
                                    </div>
                                </li>
                                <li class="li_list">
                                    <div class="top-block">
                                        <div class="row t1">高2017级1班</div>
                                        <div class="row t2">班主任：<span class="blue_1">张三</span></div>
                                        <div class="row t3">学生人数：<span class="blue_1">55</span>人</div>
                                    </div>
                                    <div class="bottom-block">
                                        <div class="button-group">
                                            <el-button size="small">排课</el-button>
                                            <el-button size="small">查课</el-button>
                                            <el-button size="small">日志</el-button>
                                        </div>
                                    </div>
                                </li>
                                <li class="li_list">
                                    <div class="top-block">
                                        <div class="row t1">高2017级1班</div>
                                        <div class="row t2">班主任：<span class="blue_1">张三</span></div>
                                        <div class="row t3">学生人数：<span class="blue_1">55</span>人</div>
                                    </div>
                                    <div class="bottom-block">
                                        <div class="button-group">
                                            <el-button size="small">排课</el-button>
                                            <el-button size="small">查课</el-button>
                                            <el-button size="small">日志</el-button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="kd-page">
                            <el-row>
                                <el-col :span="24">
                                    <el-pagination class="float-right" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="600">
                                    </el-pagination>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div v-if="tabs===1" class="l_schedule_outer">
                        <div class="sche_list_header">
                            <ul class="clearfloat">
                                <li>初2017级年级1班课表1</li>
                            </ul>
                        </div>
                        <el-row :gutter="20" class="l_search_outer">
                            <el-col :span="24" class="class-searchs">
                                <el-form :inline="true" :model="searchInline1" id="search_form1">
                                    <el-form-item label="学期名称：">
                                        <el-input v-model="searchInline1.name" placeholder="2017-2018学年第一学期"></el-input>
                                    </el-form-item>
                                    <el-form-item label="课表有效期：">
                                        <el-date-picker v-model="searchInline1.start" type="date" :picker-options="pickerOptions0" placeholder="选择周"></el-date-picker>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" icon="plus" size="small" @click="handleSure">确定</el-button>
                                        <el-button type="primary" icon="plus" size="small" class="cancel" @click="handleCancel">取消</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
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
export default {
    data() {
        return {
            titleItem: [
                { name: "总课表", index: 0 },
                { name: "年级排课", index: 1 },
                { name: "全校停课", index: 2 },
            ],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 1,
            currentPage: 1,
            tabs: 1, //总课表切换-排课
            searchInline: {  //按年级班级搜索
              grade: '',
              class: ''
            },
            searchInline1: {  //按年级班级搜索
              name: '',
              time: ''
            }
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
            console.log(index)
        },
        promptsTem(status) {
            console.log(status);
        },
        handleSure() {
            // 搜索事件
        },
        handleCancel() {
            // 取消搜索事件
        },
        schedule() {
            // 切换到排课模块
            this.state = 1;
            this.tabs = 1;
        },
    }
}
</script>
 
<style scoped>

</style>
