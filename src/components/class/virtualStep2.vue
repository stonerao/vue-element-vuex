<template>
    <div>
    	<div v-loading="loading">
	        <!-- 虚拟班初始编辑课表 -->
	        <div class="virStep2Header sche_list_header">
	            <ul class="clearfloat">
	                <li v-bind:class="{ active: isActive }">{{moduleName}}</li>
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
	                            <el-date-picker v-model="searchInline.startTime" type="date" format="yyyy-MM-dd" placeholder="年月日"></el-date-picker>
	                            <span class="middle-pad0">至</span>
	                            <el-date-picker v-model="searchInline.endTime" format="yyyy-MM-dd" placeholder="年月日"></el-date-picker>
	                        </el-form-item>
	                    </el-form>
	                </el-col>
	            </el-row>
	        </div>
	        <div class="virStep2Table sche_table">
	            <el-table :data="virtStep2Data" border style="width: 100%">
	                <el-table-column label="时段">
	                    <template scope="scope">
	                        <span v-if="scope.row.lesson == 1">早读</span>
	                        <span v-if="scope.row.lesson == 2">上午</span>
	                        <span v-if="scope.row.lesson == 3">下午</span>
	                        <span v-if="scope.row.lesson == 4">晚上</span>
	                    </template>
	                </el-table-column>
	                <el-table-column label="全年节次" v-if="studyType == 1">
	                    <template scope="scope">
	                   		<el-time-picker is-range v-model="scope.row.class_time" placeholder="选择时间" format="HH:mm" style="width: 100%;"></el-time-picker>
	                    </template>
	                </el-table-column>
	                <el-table-column label="夏令课时段" v-if="studyType == 2">
	                    <template scope="scope">
	                   		<el-time-picker is-range v-model="scope.row.class_timeS" placeholder="选择时间" format="HH:mm" style="width: 100%;"></el-time-picker>
	                    </template>
	                </el-table-column>
	                <el-table-column label="冬令课时段" v-if="studyType == 2">
	                    <template scope="scope">
	                   		<el-time-picker is-range v-model="scope.row.class_timeW" placeholder="选择时间" format="HH:mm" style="width: 100%;"></el-time-picker>
	                    </template>
	                </el-table-column>
	                <el-table-column label="星期一">
	                    <template scope="scope">
	                    	<div v-if="scope.row.timetable.day1">
	                    		<el-select v-model="scope.row.timetable.day1.s_id" placeholder="科目" @change="teacherOut(scope.row.timetable.day1.s_id)">
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
	                    	<div v-if="scope.row.timetable.day2">
	                    		<el-select v-model="scope.row.timetable.day2.s_id" placeholder="科目" @change="teacherOut(scope.row.timetable.day2.s_id)">
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
	                    	<div v-if="scope.row.timetable.day3">
	                    		<el-select v-model="scope.row.timetable.day3.s_id" placeholder="科目" @change="teacherOut(scope.row.timetable.day3.s_id)">
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
	                    	<div v-if="scope.row.timetable.day4">
	                    		<el-select v-model="scope.row.timetable.day4.s_id" placeholder="科目" @change="teacherOut(scope.row.timetable.day4.s_id)">
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
	                    	<div v-if="scope.row.timetable.day5">
	                    		<el-select v-model="scope.row.timetable.day5.s_id" placeholder="科目" @change="teacherOut(scope.row.timetable.day5.s_id)">
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
	                    	<div v-if="scope.row.timetable.day6">
	                    		<el-select v-model="scope.row.timetable.day6.s_id" placeholder="科目" @change="teacherOut(scope.row.timetable.day6.s_id)">
	                    			<el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
	                    		</el-select>
	                    		<el-select v-model="scope.row.timetable.day6.teacher_id" :disabled="scope.row.timetable.day6.s_id==''" placeholder="老师" @change="clearTeacher">
	                    			<el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
	                    		</el-select>
	                    	</div>
	                    </template>
	                </el-table-column>
	                <el-table-column label="星期天">
	                    <template scope="scope">
	                    	<div v-if="scope.row.timetable.day7">
	                    		<el-select v-model="scope.row.timetable.day7.s_id" placeholder="科目" @change="teacherOut(scope.row.timetable.day7.s_id)">
	                    			<el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
	                    		</el-select>
	                    		<el-select v-model="scope.row.timetable.day7.teacher_id" :disabled="scope.row.timetable.day7.s_id==''" placeholder="老师" @change="clearTeacher">
	                    			<el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
	                    		</el-select>
	                    	</div>
	                    </template>
	                </el-table-column>
	            </el-table>
	            <div class="virt_btn2 l_save">
	                <el-button @click.native="gobefore">上一步</el-button>
	                <el-button @click.native="goToNext">保存</el-button>
	                <el-button @click.native="cancelEdit">取消</el-button>
	            </div>
	        </div>
        </div>
    </div>
</template>

<script>
import info from '@/utils/l_axios'

export default {
    props: ['modelId','backFirst','editStatus','editScheID','editModelID','editStepTwoA','editStepTwoB','derpartID'],
    data() {
        return {
        	searchInline: {  //按年级班级搜索
              name: '',
              startTime: '',
              endTime: ''
            },
            virtStep2Data: [],
            studyType: 0,
            isActive: true,
            moduleName: '',   //虚拟模板课表名字
            subject: [],  //学习科目数据
            teacher: [], //老师数据
            model:{  //初始储存model_id,department_id三个属性
            	id: '',
            	deparId: ''
            },  
            teachingsDay: '',  //那些天要上课
            default_day: '',
            allYeartime: '',
            summerYearTime: '',
            winerYearTime: '',
            virtDataTable: [],
            loading: false,
	        formDataA: {}, //表单提价数据
	        editVStakeover: false,  //区分排课第二步保存与编辑第二步保存
	        editVStake: false,   //编辑第二步保存区分
	        apiURL: '',
	        ApiUrlData: '',
	        editFormData: {},
	        ApUrlData: '',
        }
    },
    created() {
    	if(this.editStatus){    //编辑
			this.loading = true;
    		this.editVStakeover = true;
    		if(this.editStepTwoA){
    			// console.log("初始数据变更！")
    			info.EditVirtStep_b.call(this,this.editModelID,this.editScheID);  //初始获取数据
	       		info.subjectData.call(this);  //加载科目
    		}else if(this.editStepTwoB){
    			// console.log("初始数据未变更！")
    			this.editVStake = true;
    			info.EditVirtStep_b.call(this,this.editModelID,this.editScheID,this.derpartID);  //初始获取数据
	       		info.subjectEdit.call(this);  
    		}
    	}else{    //排课
    		this.loading = true;
	       	info.virtualArrangeC.call(this,this.modelId);
	       	info.subjectData.call(this);  //加载科目
    	}
    },
    components: {
        
    },
    methods: {
        teacherOut(id){
        	info.teacherData.call(this,id);
        },
        clearTeacher(){
        	this.teacher = [];
        },
        gobefore(){
        	this.$emit("backFirst");
        },
        goToNext(){
        	if(this.editStatus){ 
	    		if(this.editStepTwoA){   //编辑-初始数据改变-第二步保存
			       	this.model.id = this.editModelID;
		       		info.EditVirtStep_B1.call(this,this.model,this.searchInline,this.editScheID);
	    		}else if(this.editStepTwoB){
	    			this.model.id = this.editModelID;
		       		info.EditVirtStep_B1.call(this,this.model,this.searchInline,this.editScheID);
	    		}
	    	}else{ //排课
		       this.model.id = this.modelId;
		       info.virtualArrangeD.call(this,this.model,this.searchInline);
	       	}
	   	},
        cancelEdit(){
        	window.location.reload(true);
        },
        formatHourM(date){
        	return info.formatHM.call(this,date);
        },
        ajax(id){
        	info.teacherData.call(this,id);
        }
    },
    watch:{
        
    }
}
</script>
 
<style scoped>
	.el-time-panel{
       width: 100%!important; 
    }
</style>
