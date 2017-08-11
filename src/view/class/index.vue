<template>
    <div class="kd-app-main">
        <titleItem :titleText="$route.name.substring(1)"></titleItem>
        <div class="kd-box">
            <div class="kd-app-box">
                <titleActive :titles="titleItem" @Transfer="emitTransfer" :state="state"></titleActive>
            </div>
            <div class="kd-box-content">
                <description :prompts="prompts" @PromPts="promptsTem"></description>
                <!-- 课程管理 -->
                <div class="l_layout_outer">
                    <div v-if="state===0" class="l_timetable_outer">
                        <div v-if="tabs0===1">
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
                        <div v-if="tabs1===1" class="l_schedule_outer">
                            <div class="sche_list_header">
                                <ul class="clearfloat">
                                    <li>初2017级年级1班课表1</li>
                                </ul>
                            </div>
                            <div class="l_search0">
                                <el-row :gutter="20" class="l_search_outer">
                                    <el-col :span="24" class="class-searchs">
                                        <el-form :inline="true" :model="searchInline1" id="search_form1">
                                            <el-form-item label="学期名称：">
                                                <el-input v-model="searchInline1.name" placeholder="2017-2018学年第一学期"></el-input>
                                            </el-form-item>
                                            <el-form-item label="课表有效期：">
                                                <el-date-picker v-model="searchInline1.startTime" type="date" :picker-options="pickerOptions0" placeholder="年月日"></el-date-picker>
                                                <span class="middle-pad0">至</span>
                                                <el-date-picker v-model="searchInline1.endTime" type="date" :picker-options="pickerOptions0" placeholder="年月日"></el-date-picker>
                                            </el-form-item>
                                        </el-form>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="sche_table">
                                <el-table :data="tableData" border style="width: 100%">
                                    <el-table-column prop="time" label="时段"></el-table-column>
                                    <el-table-column prop="inter" label="节次"></el-table-column>
                                    <el-table-column label="星期一（6月12日）">
                                        <template scope="scope">
                                            <div v-if="show_select">
                                                <el-select v-model="subject" placeholder="科目">
                                                    <el-option label="语文" value="sub1"></el-option>
                                                    <el-option label="数学" value="sub2"></el-option>
                                                </el-select>
                                                <el-select v-model="teacher" placeholder="老师">
                                                    <el-option label="张三" value="tea1"></el-option>
                                                    <el-option label="李四" value="tea2"></el-option>
                                                    <el-option label="王五" value="tea3"></el-option>
                                                </el-select>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="星期二（6月13日）">
                                        <template scope="scope">
                                            <div v-if="show_select">
                                                <el-select v-model="subject" placeholder="科目">
                                                    <el-option label="语文" value="sub1"></el-option>
                                                    <el-option label="数学" value="sub2"></el-option>
                                                </el-select>
                                                <el-select v-model="teacher" placeholder="老师">
                                                    <el-option label="张三" value="tea1"></el-option>
                                                    <el-option label="李四" value="tea2"></el-option>
                                                    <el-option label="王五" value="tea3"></el-option>
                                                </el-select>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="星期三（6月14日）">
                                        <template scope="scope">
                                            <div v-if="show_select">
                                                <el-select v-model="subject" placeholder="科目">
                                                    <el-option label="语文" value="sub1"></el-option>
                                                    <el-option label="数学" value="sub2"></el-option>
                                                </el-select>
                                                <el-select v-model="teacher" placeholder="老师">
                                                    <el-option label="张三" value="tea1"></el-option>
                                                    <el-option label="李四" value="tea2"></el-option>
                                                    <el-option label="王五" value="tea3"></el-option>
                                                </el-select>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="星期四（6月15日）">
                                        <template scope="scope">
                                            <div v-if="show_select">
                                                <el-select v-model="subject" placeholder="科目">
                                                    <el-option label="语文" value="sub1"></el-option>
                                                    <el-option label="数学" value="sub2"></el-option>
                                                </el-select>
                                                <el-select v-model="teacher" placeholder="老师">
                                                    <el-option label="张三" value="tea1"></el-option>
                                                    <el-option label="李四" value="tea2"></el-option>
                                                    <el-option label="王五" value="tea3"></el-option>
                                                </el-select>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="星期五（6月16日）">
                                        <template scope="scope">
                                            <div v-if="show_select">
                                                <el-select v-model="subject" placeholder="科目">
                                                    <el-option label="语文" value="sub1"></el-option>
                                                    <el-option label="数学" value="sub2"></el-option>
                                                </el-select>
                                                <el-select v-model="teacher" placeholder="老师">
                                                    <el-option label="张三" value="tea1"></el-option>
                                                    <el-option label="李四" value="tea2"></el-option>
                                                    <el-option label="王五" value="tea3"></el-option>
                                                </el-select>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="星期六（6月17日）">
                                        <template scope="scope">
                                            <div v-if="show_select">
                                                <el-select v-model="subject" placeholder="科目">
                                                    <el-option label="语文" value="sub1"></el-option>
                                                    <el-option label="数学" value="sub2"></el-option>
                                                </el-select>
                                                <el-select v-model="teacher" placeholder="老师">
                                                    <el-option label="张三" value="tea1"></el-option>
                                                    <el-option label="李四" value="tea2"></el-option>
                                                    <el-option label="王五" value="tea3"></el-option>
                                                </el-select>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="星期日（6月18日）">
                                        <template scope="scope">
                                            <div v-if="show_select">
                                                <el-select v-model="subject" placeholder="科目">
                                                    <el-option label="语文" value="sub1"></el-option>
                                                    <el-option label="数学" value="sub2"></el-option>
                                                </el-select>
                                                <el-select v-model="teacher" placeholder="老师">
                                                    <el-option label="张三" value="tea1"></el-option>
                                                    <el-option label="李四" value="tea2"></el-option>
                                                    <el-option label="王五" value="tea3"></el-option>
                                                </el-select>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="l_save">
                                <el-button type="primary">保存</el-button>
                                <el-button>取消</el-button>
                            </div>
                        </div>
                    </div>
                    <div v-if="state===1">
                        
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
            state: 0,  //tabs的header
            currentPage: 1,
            tabs0: 0, //总课表
            tabs1: 1, //总课表切换-排课
            subject: '', //科目
            teacher: '',  //老师
            searchInline: {  //按年级班级搜索
              grade: '',
              class: ''
            },
            searchInline1: {  //按年级班级搜索
              name: '',
              startTime: '',
              endTime: ''
            },
            pickerOptions0: {
              disabledDate(time) {
                // return time.getTime() < Date.now() - 8.64e7;
              }
            },
            show_select: true,  //某些时间段没有select选择项
            tableData: [{
              time: '早读',
              inter: '7:20-7:55',
              day:{
                class:'',
                teacher:''
              }
            },{
              time: '上午',
              inter: '8:00-8:45'
            },{
              time: '',
              inter: '8:55-9:40'
            },{
              time: '',
              inter: '10:00-10:45'
            },{
              time: '',
              inter: '10:55-11:40'
            },{
              time: '下午',
              inter: '13:20-14:05'
            },{
              time: '',
              inter: '14:15-15:00'
            },{
              time: '',
              inter: '15:20-16:05'
            },{
              time: '',
              inter: '16:15-17:00'
            },{
              time: '晚上',
              inter: '18:30-19:30'
            },{
              time: '',
              inter: '19:40-20:40'
            },]
        }
    },
    created() {
        // setTimeout(()=>{
        //     console.log(this.state)
        // },3000)
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
            this.tabs0 = 0;
            this.tabs1 = 1;
        },
    }
}
</script>
 
<style scoped>

</style>
