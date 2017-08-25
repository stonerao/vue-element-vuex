<template>
    <div>
        <div v-if="lookover">
            <!-- 班级查看课表 -->
            <div class="check_schedule sche_list_header">
                <ul class="clearfloat">
                    <li v-for="(sche,index) in scheTableHeader" @click="scheduleTab(sche.schedule_id,index)" v-bind:class="{ active: isActive==index }">{{sche.schedule_name}}</li>
                </ul>
            </div>
            <div class="l_search1">
                <el-row class="l_check_outer">
                    <el-col  :gutter="20" :span="12" class="check_header">
                        <div class="term_name">学期名称：<span class="blue_1">{{scheHeader.name}}</span></div>
                        <div class="schedule_time">课表有效期：<span class="blue_1">{{scheHeader.start_time}}</span> 至 <span class="blue_1">{{scheHeader.end_time}}</span></div>
                    </el-col>
                    <el-col :span="12" class="check_handle">
                        <el-button-group>
                          <el-button type="primary" icon="plus" size="small" @click="takeover">代课</el-button>
                          <el-button type="primary" icon="plus" size="small" @click="takestop">停课</el-button>
                          <el-button type="primary" icon="plus" size="small" @click="adjust">调课</el-button>
                          <el-button type="primary" icon="plus" size="small" @click="delet" v-if="WhetherShowDel">删除</el-button>
                          <el-button type="primary" icon="plus" size="small" @click="edit">编辑</el-button>
                          <el-button type="primary" icon="plus" size="small" @click="back">返回</el-button>
                        </el-button-group>
                    </el-col>
                </el-row>
            </div>
            <div class="sche_table">
                <el-table :data="schedData" border style="width: 100%">
                    <el-table-column label="时段">
                        <template scope="scope">
                            <span v-if="scope.row.lesson == 1">早读</span>
                            <span v-if="scope.row.lesson == 2">上午</span>
                            <span v-if="scope.row.lesson == 3">下午</span>
                            <span v-if="scope.row.lesson == 4">晚上</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="sesson">
                        <template scope="scope">{{scope.row.school_time}}</template>
                    </el-table-column> 
                    <el-table-column label="星期一">
                        <template scope="scope">
                            <div v-if="scope.row.content.day1">
                               <!--  <span v-html="scope.row.content.day1.s_name"></span> - 
                                <span v-html="scope.row.content.day1.teacher_name"></span> -->
                                {{scope.row.content.day1.s_name}} - {{scope.row.content.day1.teacher_name}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="星期二">
                        <template scope="scope">
                           <div v-if="scope.row.content.day2">
                                {{scope.row.content.day2.s_name}} - {{scope.row.content.day2.teacher_name}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="星期三">
                        <template scope="scope">
                            <div v-if="scope.row.content.day3">
                                {{scope.row.content.day3.s_name}} - {{scope.row.content.day3.teacher_name}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="星期四">
                        <template scope="scope">
                            <div v-if="scope.row.content.day4">
                                {{scope.row.content.day4.s_name}} - {{scope.row.content.day4.teacher_name}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="星期五">
                        <template scope="scope">
                            <div v-if="scope.row.content.day5">
                                {{scope.row.content.day5.s_name}} - {{scope.row.content.day5.teacher_name}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="星期六">
                        <template scope="scope">
                            <div v-if="scope.row.content.day6">
                                {{scope.row.content.day6.s_name}} - {{scope.row.content.day6.teacher_name}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="星期日">
                        <template scope="scope">
                            <div v-if="scope.row.content.day7">
                                {{scope.row.content.day7.s_name}} - {{scope.row.content.day7.teacher_name}}
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div v-if="edit_substance">
            <!-- 编辑实体班 -->
            <editSubstance :derpartId="derpartId" :classType="classType" :scheduleId="scheduleId" @EDITBACK="subEditBack"></editSubstance>
        </div>
        <div v-if="edit_virtual">
            <!-- 编辑虚拟班 -->
            <editVirtual :derpartId="derpartId" :classType="classType" :scheduleId="scheduleId" :editVirtStatus="editVirtStatus" :ScheduID="ScheduID" @Cancel="Setback_v"></editVirtual>
        </div>
        <div v-if="class_takeover">
            <!-- 班级代课 -->
            <div class="l_virtual_wraper">
                <div class="form_group">
                    <ul class="clearfloat">
                        <li class="header">代课时间段：</li>
                        <li>
                            <div class="inline-block">
                                <el-date-picker v-model="takeStart" type="date" placeholder="选择日期"></el-date-picker>
                            </div>
                            <div class="inline-block middle_zhi">至</div>
                            <div class="inline-block">
                                <el-date-picker v-model="takeEnd" type="date" placeholder="选择日期" :picker-options="pickerOptions2" :disabled="cannot"></el-date-picker>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="form_group">
                    <ul class="clearfloat">
                        <li class="header">代课科目：</li>
                        <li>
                            <el-select v-model="subjectVal" placeholder="请选择科目">
                                <el-option v-for="item in subject" :key="item.subject_id" :label="item.subject_name" :value="item.subject_id"></el-option>
                            </el-select>
                        </li>
                    </ul>
                </div>
                <div class="form_group">
                    <ul class="clearfloat">
                        <li class="header">代课老师：</li>
                        <li>
                            <el-select v-model="teacherVal" placeholder="请选择老师">
                                <el-option v-for="item in teacher" :key="item.teacher_id" :label="item.teacher_name" :value="item.teacher_id"></el-option>
                            </el-select>
                        </li>
                    </ul>
                </div>
                <div class="form_group">
                    <ul class="clearfloat">
                        <li class="header">代课原因：</li>
                        <li style="width: 550px;height: auto;line-height: 23px;">
                           <el-input type="textarea" v-model="textareaVal"></el-input>
                        </li>
                    </ul>
                </div>
                <div class="form_group">
                    <ul class="clearfloat">
                        <li class="header"></li>
                        <li>
                            <el-button type="primary" @click.native="takeoverClass">保存</el-button>
                            <el-button @click.native="cancel">取消</el-button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-if="class_stop">
            <!-- 班级停课 -->
            <div class="l_virtual_wraper">
                <div class="form_group">
                    <ul class="clearfloat">
                        <li class="header">停课范围：</li>
                        <li>{{stopArea}}</li>
                    </ul>
                </div>
                <div class="form_group">
                    <ul class="clearfloat">
                        <li class="header">停课时间段：</li>
                        <li>
                            <div class="inline-block">
                                <el-date-picker v-model="stoPstart" type="datetime" placeholder="选择日期" :picker-options="pickerOptions1"></el-date-picker>
                            </div>
                            <div class="inline-block middle_zhi">至</div>
                            <div class="inline-block">
                                <el-date-picker v-model="stoPtime.end" type="datetime" placeholder="选择日期" :picker-options="pickerOptions3"></el-date-picker>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="form_group">
                    <ul class="clearfloat">
                        <li class="header">停课原因：</li>
                        <li style="width: 550px;height: auto;line-height: 23px;">
                           <el-input type="textarea" v-model="stopareaVal"></el-input>
                        </li>
                    </ul>
                </div>
                <div class="form_group">
                    <ul class="clearfloat">
                        <li class="header"></li>
                        <li>
                            <el-button type="primary" @click.native="stopSave">保存</el-button>
                            <el-button @click.native="stopCancel">取消</el-button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-if="class_adjust">
            <!-- 班级调课 -->
            <div v-if="adj_step1">
                <div class="l_virtual_wraper">
                    <div class="form_group">
                        <ul class="clearfloat">
                            <li class="header">调课范围：</li>
                            <li>{{adjArea}}</li>
                        </ul>
                    </div>
                    <div class="form_group">
                        <ul class="clearfloat">
                            <li class="header">调课方式：</li>
                            <li style="margin-right: 20px;">
                                <el-radio class="radio" v-model="radio" label="1">按天</el-radio>
                            </li>
                            <li>
                                <el-radio class="radio" v-model="radio" label="2">按课时</el-radio>
                            </li>
                        </ul>
                    </div>
                    <div class="form_group">
                        <ul class="clearfloat">
                            <li class="header">调课原因：</li>
                            <li style="width: 550px;height: auto;line-height: 23px;">
                               <el-input type="textarea" v-model="adjResson"></el-input>
                            </li>
                        </ul>
                    </div>
                    <div class="form_group">
                        <ul class="clearfloat">
                            <li class="header"></li>
                            <li>
                                <el-button type="primary" @click.native="adjNext">下一步</el-button>
                                <el-button @click.native="adjCancel">取消</el-button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-if="adj_step2_A">
                <div class="l_virtual_wraper">
                    <div class="form_group">
                        <ul class="clearfloat">
                            <li class="header">调换日期1：</li>
                            <li>
                                <div class="inline-block">
                                    <el-date-picker v-model="AdayOld" type="date" placeholder="选择日期"></el-date-picker>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="form_group">
                        <ul class="clearfloat">
                            <li class="header">调换日期2：</li>
                            <li>
                                <div class="inline-block">
                                    <el-date-picker v-model="AdayNew" type="date" placeholder="选择日期"></el-date-picker>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="form_group">
                        <ul class="clearfloat">
                            <li class="header"></li>
                            <li>
                                <el-button type="primary" @click.native="AadjGofirst">上一步</el-button>
                                <el-button @click.native="AadjSave">保存</el-button>
                                <el-button @click.native="AadjCancel">取消</el-button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-if="adj_step2_B">
                <div class="l_virtual_wraper">
                    <div class="form_group">
                        <ul class="clearfloat">
                            <li class="header">调换课时1：</li>
                            <li>
                                <div class="inline-block">
                                    <el-date-picker v-model="BdayOld" type="date" placeholder="选择日期"></el-date-picker>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="form_group">
                        <ul class="clearfloat">
                            <li class="header"></li>
                            <li v-for="time in timelineList" style="margin-right: 20px;">
                                <div class="inline-block">
                                    <el-radio class="radio" v-model="timeline1" :label="time.school_time">{{time.jieci}}</el-radio>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="form_group">
                        <ul class="clearfloat">
                            <li class="header">调换课时2：</li>
                            <li>
                                <div class="inline-block">
                                    <el-date-picker v-model="BdayNew" type="date" placeholder="选择日期"></el-date-picker>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="form_group">
                        <ul class="clearfloat">
                            <li class="header"></li>
                            <li v-for="time in timelineList" style="margin-right: 20px;">
                                <div class="inline-block">
                                    <el-radio class="radio" v-model="timeline2" :label="time.school_time">{{time.jieci}}</el-radio>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="form_group">
                        <ul class="clearfloat">
                            <li class="header"></li>
                            <li>
                                <el-button type="primary" @click.native="BadjGofirst">上一步</el-button>
                                <el-button @click.native="BadjSave">保存</el-button>
                                <el-button @click.native="BadjCancel">取消</el-button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import info from '@/utils/l_axios'
import editSubstance from '@/components/class/editSubstance'
import editVirtual from '@/components/class/virtualclass'

export default {
    props: ['tabsStatus', 'derpartId', 'classType', 'BOTHDATA', 'stopGrade', 'adjGrade'],
    data() {
        return {
            schedData: [],
            scheTableHeader: [],
            scheHeader: {
                name: '',
                start_time: '',
                end_time: '',
            },
            schedule_id: 0, //课表id
            isActive: 0,  //表头切换active效果
            sesson:'',
            lookover: true, //查看课程表
            edit_substance: false, //编辑实体班
            edit_virtual: false, //编辑虚拟班
            class_takeover: false,
            class_stop: false,
            scheduleId: 0,
            takeStart: '',  //开始时间段
            takeEnd: '',  //结束时间段
            stoPtime: {
                start: '',  //停课开始时间段
                end: '',  //结束时间段
            },
            stoPstart: '',
            pickerOptions2: {},
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            pickerOptions3: {},
            time: {
                start: '',
                end: '',
            },
            subject: [],  //科目数据
            teacher: [],  //老师数据
            subjectVal: '',
            teacherVal: '',
            textareaVal: '',
            cannot: true,
            stopArea: '',  //停课范围
            stopareaVal: '',  //停课原因
            class_adjust: false,  //调课
            adj_step1: false,
            adj_step2_A: false,
            adj_step2_B: false,
            adjArea: '',
            adjResson: '',
            radio: '1',
            recordId: 0,
            changetype: 1,   //按天  按课时
            AdayOld: '',
            AdayNew: '',
            BdayOld: '',
            BdayNew: '',
            adjTime1:{
                A: '',
                B: ''
            },
            adjTime2:{
                A: '',
                B: ''
            },
            timelineList: [],
            timeline1: '',
            timeline2: '',
            editVirtStatus: true,   //虚拟班编辑课课表组件区分内容判断
            ScheduID: 0,   //虚拟把编辑初步展示页面请求内容
            allFormData: {},
            WhetherShowDel: false,
        }
    },
    created() {
        if(this.tabsStatus){
            // 课表名称
            info.classSche.call(this,this.derpartId);
        }else if(this.stopGrade){  //年级停课
            // console.log(this.BOTHDATA)
            this.lookover = false;
            this.class_stop = true;
            info.classStopBegin.call(this,this.BOTHDATA);
        }else if(this.adjGrade){   //年级调课
            this.lookover = false;
            this.class_adjust = true;
            this.adj_step1 = true;
            info.adjustStepA.call(this,this.BOTHDATA.MID,this.BOTHDATA.TYPE);
        }
        // console.log(this.classType);
        // console.log(this.derpartId);
    },
    components: {
        editSubstance, editVirtual
    },
    methods: {
        delet(){
            info.deleteClass.call(this,this.schedule_id);
        },
        BadjSave(){
            info.adjustStepBs.call(this,this.recordId,this.adjTime1,this.adjTime2)
        },
        AadjSave(){
            info.adjustStepBs.call(this,this.recordId,this.adjTime1,this.adjTime2)
        },
        adjustAjax(rec){
            info.adjustStepB.call(this,rec);
        },
        adjNext(){
            if(this.adjGrade){
                info.adjustStepAs.call(this,this.BOTHDATA.MID,this.BOTHDATA.TYPE,this.radio,this.adjResson);
            }else{
                info.adjustStepAs.call(this,this.schedule_id,this.classType,this.radio,this.adjResson);
            }

        },
        adjust(){
            info.adjustStepA.call(this,this.schedule_id,this.classType);
        },
        stopSave(){
            info.classStopSave.call(this,this.classType,this.stoPtime,this.stopareaVal);
        },
        takestop(){  //停课
            info.classStopBegin.call(this,this.schedule_id);
        },
        takeoverClass(){
            info.takeoverSubmit.call(this,this.schedule_id,this.time,this.subjectVal);
        },
        scheduleTab(id,index){
            this.isActive = index;
            this.schedule_id = id;
            this.ScheduID = id;
            info.checkGradeSche.call(this,this.derpartId,this.schedule_id);
        },
        Ajax(schedule){
            // 课表数据
            info.checkGradeSche.call(this,this.derpartId,schedule);
        },
        back(){
           this.$emit("BackCli")
        },
        edit(){
            if(this.classType == 1){
                this.lookover = false;
                this.edit_substance = true;
            }else if(this.classType == 2){
                this.lookover = false;
                this.edit_virtual = true;
            }
        },
        subEditBack(){
            this.lookover = true;
            this.edit_substance = false;
        },
        takeover(){  //代课
            this.lookover = false;
            this.class_takeover = true;
        },
        cancel(){
            this.lookover = true;
            this.class_takeover = false;
        },
        stopCancel(){
            if(this.tabsStatus){
                this.lookover = true;
                this.class_stop = false;
            }else if(this.stopGrade){
                this.$emit("Cancel");
            }
        },
        adjCancel(){
            if(this.tabsStatus){
                this.lookover = true;
                this.adj_step1 = false;
                this.class_adjust = false;
            }else if(this.adjGrade){
                this.$emit("Cancel");
            }

        },
        BadjCancel(){
            if(this.tabsStatus){
                this.lookover = true;
                this.adj_step2_B = false;
            }else if(this.adjGrade){
                this.$emit("Cancel");
            }
        },
        AadjGofirst(){
            this.adj_step1 = true;
            this.adj_step2_A = false;
        },
        AadjCancel(){
            if(this.tabsStatus){
                this.lookover = true;
                this.adj_step2_A = false;
            }else if(this.adjGrade){
                this.$emit("Cancel");
            }
        },
        BadjGofirst(){
            this.adj_step1 = true;
            this.adj_step2_B = false;
        },
        Setback_v(){
            this.lookover = true;
            this.edit_virtual = false;
        }
    },
    watch:{
        takeStart(val){
            if(val!=''){
                this.time.start = val.getTime()/1000;
            }
            this.cannot = false;
            this.pickerOptions2 = {
                disabledDate(time) {
                    return time.getTime() < val.getTime() + 24*60*60*1000;
                }
            }
            if(this.time.start != ''&&this.time.end != ''){
                info.takeTiToSub.call(this,this.schedule_id,this.time);
            }
        },
        takeEnd(val){
            if(val!=''){
                this.time.end = val.getTime()/1000;
            }
            if(this.time.start != ''&&this.time.end != ''){
                info.takeTiToSub.call(this,this.schedule_id,this.time);
            }
        },
        subjectVal(val){
            info.takeSubToTeac.call(this,this.schedule_id,this.time,val);
        },
        stoPstart(val){
            this.stoPtime.start = val;
            this.pickerOptions3 = {
                disabledDate(time) {
                    return time.getTime() < val.getTime() + 24*60*60*1000;
                }
            }
        },
        AdayOld(val){
            this.adjTime1.A = val;
        },
        AdayNew(val){
            this.adjTime1.B = val;
        },
        BdayOld(val){
            this.adjTime1.A = val;
        },
        BdayNew(val){
            this.adjTime1.B = val;
        },
        timeline1(val){
            this.adjTime2.A = val;
        },
        timeline2(val){
            this.adjTime2.B = val;
        }
    }
}
</script>
 
<style scoped>
</style>
