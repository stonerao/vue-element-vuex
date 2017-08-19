<template>
    <div>
        <div v-loading="vloading">
            <div class="l_schedule_outer">

                <!-- <div class="check_schedule sche_list_header">
                    <ul class="clearfloat">
                        <li v-for="(sche,index) in scheTableHeader" @click="scheduleTab(sche.schedule_id,index)" v-bind:class="{ active: isActive==index }">{{sche.schedule_name}}</li>
                    </ul>
                </div>
                <div class="l_search1">
                    <el-row class="l_check_outer">
                        <el-col  :gutter="20" :span="24" class="check_header">
                            <div class="term_name">学期名称：<span class="blue_1">{{scheHeader.name}}</span></div>
                            <div class="schedule_time">课表有效期：<span class="blue_1">{{scheHeader.start_time}}</span> 至 <span class="blue_1">{{scheHeader.end_time}}</span></div>
                        </el-col>
                    </el-row>
                </div> -->

                <!-- <div class="sche_list_header">
                    <ul class="clearfloat">
                        <li v-bind:class="{ active: isActive }">{{editData.scheTableOrder}}</li>
                    </ul>
                </div> -->
                <div class="l_search0">
                    <el-row :gutter="20" class="l_search_outer">
                        <el-col :span="24" class="class-searchs">
                            <el-form :inline="true" :model="searchInlin" id="search_form1">
                                <el-form-item label="学期名称：">
                                    <el-input v-model="searchInlin.name" placeholder="2017-2018学年第一学期"></el-input>
                                </el-form-item>
                                <el-form-item label="课表有效期：">
                                    <el-date-picker v-model="searchInlin.startTime" type="date" format="yyyy-MM-dd" placeholder="年月日"></el-date-picker>
                                    <span class="middle-pad0">至</span>
                                    <el-date-picker v-model="searchInlin.endTime" format="yyyy-MM-dd" placeholder="年月日"></el-date-picker>
                                </el-form-item>
                            </el-form>
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
                <div class="l_save">
                    <el-button type="primary" @click.native="editSave">保存</el-button>
                    <el-button @click.native="goLookover">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import info from '@/utils/l_axios'

export default {
    props: ['derpartId', 'classType', 'scheduleId'],
    data() {
        return {
            isActive: true,
            vloading: true,
            gradeS: '',  //年级select的值
            classS: '', //班级select的值
            searchInlin: {  //按年级班级搜索
              name: '',
              startTime: '',
              endTime: ''
            },
            gradeList: [],  //班级课表初始数据
            graClaId:{    //初始化年级班级id
                p_id : 0,
                c_id : 0,
            },
            gradeModel:{
                departId: '',  //排课班级id
                classType: '',  //实体班，虚体班
            },
            editData: {
                scheTableOrder: 1,  //课表编号
                editAllData: '',  //课表编辑请求数据
            },
            schedData:[],  //表数据
            subject: [],  //学习科目数据
            teacher: [], //老师数据 
            model:{},  //初始储存model_id,model_type,department_id三个属性
            taData: [],  //提交的json数据
            sesson: '',
        }
    },
    created() {
        // console.log(this.derpartId)
        // console.log(this.classType)
        // console.log(this.scheduleId)
        info.checkGradeSche.call(this,this.derpartId,this.scheduleId);
    },
    components: {
        
    },
    methods: {
        editSave(){

        },
        goLookover(){
            this.$emit("EDITBACK");
        }
    },
    watch:{

    }
}
</script>
 
<style scoped>

</style>
