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
                        <div v-if="tab_0" v-loading="loading">
                            <el-row :gutter="20" class="l_search_header0 class-header">
                                <el-col :span="6" class="class-titles">
                                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs" />刷新-共{{gradeListParams.total_num}}条记录
                                </el-col>
                                <el-col :span="18" class="class-searchs">
                                    <el-form :inline="true" id="search_form0">
                                        <el-form-item label="年级/虚拟班：">
                                            <el-select v-model="gradeS" clearable placeholder="全部">
                                              <el-option v-for="item in grade_search" :key="item.department_id" :label="item.department_name" :value="item.department_id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="班级：">
                                            <el-select v-model="classS" clearable placeholder="全部">
                                              <el-option v-for="items in class_search" :key="items.department_id" :label="items.department_name" :value="items.department_id"></el-option>
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
                                <ul v-if="hasData" v-for="gra in gradeList">
                                    <li class="li_list">
                                        <div class="top-block">
                                            <div class="row t1">{{gra.p_name}}{{gra.department_name}}</div>
                                            <div class="row t2">班主任：<span class="blue_1">{{gra.head_teacher_name}}</span></div>
                                            <div class="row t3">学生人数：<span class="blue_1">{{gra.student_num}}</span>人</div>
                                        </div>
                                        <div class="bottom-block">
                                            <div class="button-group">
                                                <el-button size="small" :disabled="gra.add_status == 0" @click.native="schedule(gra.department_id,gra.special_tag)">排课</el-button>
                                                <el-button size="small" :disabled="gra.info_status == 0" @click.native="checkSchedule(gra.department_id,gra.special_tag)">查课</el-button>
                                                <el-button size="small" :disabled="gra.info_status == 0" @click.native="showClassLog(gra.department_id)">日志</el-button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <ul v-if="hasNoData">
                                    <li class="hasNoData">暂无数据</li>
                                </ul>
                            </div>
                            <div class="kd-page">
                                <el-row>
                                    <el-col :span="24">
                                        <el-pagination class="float-right" :current-page="gradeListParams.curpage" :page-sizes="[15, 20, 25, 30]" :page-size="gradeListParams.page_count" layout="total, sizes, prev, pager, next, jumper" :total="gradeListParams.total_num" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                                        </el-pagination>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>

                        <div v-if="tab_1" class="l_schedule_outer">
                            <!-- 实体班排课 -->
                            <div class="sche_list_header">
                                <ul class="clearfloat">
                                    <!-- <li>初2017级年级1班课表1</li> -->
                                    <li v-bind:class="{ active: isActive }">{{this.editData.scheTableOrder}}</li>
                                </ul>
                            </div>
                            <div class="l_search0">
                                <el-row :gutter="20" class="l_search_outer">
                                    <el-col :span="24" class="class-searchs">
                                        <el-form :inline="true" :model="searchInline" id="search_form1">
                                            <el-form-item label="学期名称：">
                                                <el-input v-model="searchInline.name" placeholder="2017-2018学年第一学期"></el-input>
                                            </el-form-item>
                                            <el-form-item label="课表有效期：">
                                                <el-date-picker v-model="searchInline.startTime" type="date" format="yyyy-MM-dd" :picker-options="pickerOptions0" placeholder="年月日"></el-date-picker>
                                                <span class="middle-pad0">至</span>
                                                <el-date-picker v-model="searchInline.endTime" format="yyyy-MM-dd" :picker-options="pickerOptions0" placeholder="年月日"></el-date-picker>
                                            </el-form-item>
                                        </el-form>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="sche_table">
                                <el-table :data="tableData" border style="width: 100%">
                                    <el-table-column prop="time" label="时段">
                                        <template scope="scope">
                                            <!-- 判断值: 1为早上 -->
                                            <span v-if="scope.row.lesson == 1">早读</span>
                                            <span v-if="scope.row.lesson == 2">上午</span>
                                            <span v-if="scope.row.lesson == 3">下午</span>
                                            <span v-if="scope.row.lesson == 4">晚上</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="school_time" label="节次"></el-table-column>

                                    <el-table-column label="星期一">
                                        <template scope="scope">
                                            <div v-if="show_select&&scope.row.timetable.day1">
                                                <el-select v-model="scope.row.timetable.day1.s_id" placeholder="科目" @change="teachLoad(scope.row.timetable.day1.s_id)">
                                                    <el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
                                                </el-select>
                                                <el-select v-model="scope.row.timetable.day1.teacher_id" :disabled="scope.row.timetable.day1.s_id==''" placeholder="老师" @change="clearTeacher">
                                                    <el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
                                                </el-select>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="星期二">
                                        <template scope="scope">
                                            <div v-if="show_select&&scope.row.timetable.day2">
                                                <el-select v-model="scope.row.timetable.day2.s_id" placeholder="科目" @change="teachLoad(scope.row.timetable.day2.s_id)">
                                                    <el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
                                                </el-select>
                                                <el-select v-model="scope.row.timetable.day2.teacher_id" :disabled="scope.row.timetable.day2.s_id==''" placeholder="老师" @change="clearTeacher">
                                                    <el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
                                                </el-select>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="星期三">
                                        <template scope="scope">
                                             <div v-if="show_select&&scope.row.timetable.day3">
                                               <el-select v-model="scope.row.timetable.day3.s_id" placeholder="科目" @change="teachLoad(scope.row.timetable.day3.s_id)">
                                                    <el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
                                                </el-select>
                                                <el-select v-model="scope.row.timetable.day3.teacher_id" :disabled="scope.row.timetable.day3.s_id==''" placeholder="老师" @change="clearTeacher">
                                                    <el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
                                                </el-select>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="星期四">
                                        <template scope="scope">
                                            <div v-if="show_select&&scope.row.timetable.day4">
                                                <el-select v-model="scope.row.timetable.day4.s_id" placeholder="科目" @change="teachLoad(scope.row.timetable.day4.s_id)">
                                                    <el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
                                                </el-select>
                                                <el-select v-model="scope.row.timetable.day4.teacher_id" :disabled="scope.row.timetable.day4.s_id==''" placeholder="老师" @change="clearTeacher">
                                                    <el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
                                                </el-select>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="星期五">
                                        <template scope="scope">
                                            <div v-if="show_select&&scope.row.timetable.day5">
                                               <el-select v-model="scope.row.timetable.day5.s_id" placeholder="科目" @change="teachLoad(scope.row.timetable.day5.s_id)">
                                                    <el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
                                                </el-select>
                                                <el-select v-model="scope.row.timetable.day5.teacher_id" :disabled="scope.row.timetable.day5.s_id==''" placeholder="老师" @change="clearTeacher">
                                                    <el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
                                                </el-select>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="星期六">
                                        <template scope="scope">
                                            <div v-if="show_select&&scope.row.timetable.day6">
                                                <el-select v-model="scope.row.timetable.day6.s_id" placeholder="科目" @change="teachLoad(scope.row.timetable.day6.s_id)">
                                                    <el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
                                                </el-select>
                                                <el-select v-model="scope.row.timetable.day6.teacher_id" :disabled="scope.row.timetable.day6.s_id==''" placeholder="老师" @change="clearTeacher">
                                                    <el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
                                                </el-select>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="星期日">
                                        <template scope="scope">
                                            <div v-if="show_select&&scope.row.timetable.day7">
                                                <el-select v-model="scope.row.timetable.day7.s_id" placeholder="科目" @change="teachLoad(scope.row.timetable.day7.s_id)">
                                                    <el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
                                                </el-select>
                                                <el-select v-model="scope.row.timetable.day7.teacher_id" :disabled="scope.row.timetable.day7.s_id==''" placeholder="老师" @change="clearTeacher">
                                                    <el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
                                                </el-select>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="l_save">
                                <el-button type="primary" @click="submit">保存</el-button>
                                <el-button @click.native="cancelEdit">取消</el-button>
                            </div>
                        </div>
                    
                        <div v-if="tab_x_1" class="l_schedule_outer">
                            <!-- 虚拟班排课 -->
                            <virtualclass :conpVirtual="conpVirtual" :derpartId="derpartId" @Cancel="Setback_v"></virtualclass>
                        </div>

                        <div v-if="tab_2" class="l_schedule_outer">
                            <!-- 查看课表 -->
                            <checkGradeSchedule :derpartId="derpartId" :classType="classType" :tabsStatus="tabsStatus" @BackCli="Setback"></checkGradeSchedule>
                        </div>

                        <div v-if="tab_3" class="l_schedule_outer">
                            <!-- 班级日志 -->
                            <ShowAllLog :IDCard="IDCard" :ClassIdentity="ClassIdentity" @SHOWLOGBACK="LogoBack"></ShowAllLog>
                        </div>
                    </div>
                    <div v-if="state===1" class="l_schedule_outer l_timetable_outer">
                        <gradeList :state="state"></gradeList>
                    </div>
                    <div v-if="state===2" class="l_schedule_outer">
                        <allSuspend :state="state"></allSuspend>
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
import checkGradeSchedule from '@/components/class/gradeSchedule'
import gradeList from '@/components/class/gradelist'
import virtualclass from '@/components/class/virtualclass'
import allSuspend from '@/components/class/allSuspend'
import ShowAllLog from '@/components/class/ShowAllLog'
import info from '@/utils/l_axios'

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
            tab_0: true, //总课表及排课切换
            tab_1: false, 
            tab_2: false, 
            tab_3: false, 
            tab_x_1: false,  //虚拟班排课
            conpVirtual: true,  //此处调用虚拟班排课组件状态判断
            gradeS: '',  //年级select的值
            classS: '', //班级select的值
            searchInline: {  //按年级班级搜索
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
            gradeListParams: {   //班级课表初始数据请求参数
                hasmore: true,
                curpage: 1,//当前页数
                one_pagenum: 10,
                page_count: 1,//总页数
                total_num: 0
            },
            gradeList: [],  //班级课表初始数据
            grade_search: [], //上面总课表的年级search数据初始
            class_search: [], //上面总课表的班级search数据初始
            graClaId:{    //初始化年级班级id
                p_id : 0,
                c_id : 0,
            },
            hasNoData: false,
            hasData: true,
            gradeModel:{
                departId: '',  //排课班级id
                classType: '',  //实体班，虚体班
            },
            editData: {
                scheTableOrder: 1,  //课表编号
                editAllData: '',  //课表编辑请求数据
            },
            tableData:[],  //表数据
            loading: false,
            subject: [],  //学习科目数据
            teacher: [], //老师数据 
            model:{},  //初始储存model_id,model_type,department_id三个属性
            taData: [],  //提交的json数据
            tabsStatus: false,
            derpartId: 0,
            classType: 0,
            isActive: true,
            ClassIdentity: true,
            IDCard: 0,
        }
    },
    created() {
        // setTimeout(()=>{
        //     console.log(this.state)
        // },3000)
        info.gradeSearch.call(this,this.graClaId)   //搜索框
        info.timeTable.call(this,this.gradeListParams,this.graClaId)   //总课表
    },
    components: {
        titleItem, titleActive, description, bottomItem, checkGradeSchedule, gradeList, virtualclass, allSuspend, ShowAllLog
    },
    methods: {
        emitTransfer(index) {
            if (this.state == index) {
                return
            }
            this.state = index;
            // console.log(index)
        },
        promptsTem(status) {
            // console.log(status);
        },
        handleSure() {
            // 搜索事件
            this.graClaId.c_id = this.classS;
            info.timeTable.call(this,this.gradeListParams,this.graClaId);   //总课表
        },
        handleCancel() {
            // 取消搜索事件
            this.gradeS = '';
            this.classS = '';
        },
        schedule(id,type) {
            // 切换到排课模块
            this.derpartId = id;
            if(this.loading != false){
                this.loading = false;
            }
            this.loading = true;
            this.gradeModel.departId = id;
            this.gradeModel.classType = type;
            info.scheduleBegin.call(this,this.gradeModel);
        },
        checkSchedule(id,type){
            this.derpartId = id;
            this.classType = type;
            this.tabsStatus = true;
            this.loading = true;
            this.tab_0 = false;
            this.tab_2 = true;
        },
        cancelEdit(){
            // 排课取消
            this.tab_1 = false;
            this.tab_0 = true;
            this.loading = false;
            setTimeout(function(){  //处理loading加载再次赋值为false后无效
                window.location.reload(true);
            },100)
        },
        submit(){
            // console.log(this.tableData);
            info.scheduleSave.call(this,this.model,this.searchInline)
        },
        ajax(){  //科目数据加载
            info.subjectData.call(this);
        },
        teachLoad(id){
            info.teacherData.call(this,id);
        },
        clearTeacher(){
            this.teacher = [];
        },
        Setback(val){   
            this.tab_2 = val;
            this.tab_0 = !val;
            this.loading = val;
        },
        Setback_v(){  //虚拟班排课返回
            this.tab_0 = true;
            this.tab_x_1 = false;
            this.loading = false;
        },
        showClassLog(id){   //班级日志（暂时不做）
            this.IDCard = id;
            this.tab_0 = false;
            this.tab_3 = true;
        },
        LogoBack(){
            this.tab_3 = false;
            this.tab_0 =true;
        },
        handleSizeChange(val) {
            this.gradeListParams.one_pagenum = val;
            info.timeTable.call(this,this.gradeListParams,this.graClaId);
        },
        handleCurrentChange(val) {
            this.gradeListParams.curpage = val;
            info.timeTable.call(this,this.gradeListParams,this.graClaId);
        },
    },
    watch:{
        gradeS(val){
            this.graClaId.p_id = val;
            this.classS = '';  //清空班级search的数据
            info.gradeSearch.call(this,this.graClaId);
        },
    }
}
</script>
 
<style scoped>

</style>
