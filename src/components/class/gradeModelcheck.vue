<template>
	<div>
		<div v-loading="loading">
			<!-- 查看模板 -->
			<div v-if="gradeHandle_check">
				<div class="l_search1">
	                <el-row class="l_check_outer">
	                    <el-col :span="24" style="position: relative;">
	                    	<div class="virStep2Header sche_list_header">
								<ul class="clearfloat">
									<li v-bind:class="{ active: isActive }">{{moduleName}}</li>
								</ul>
							</div>
							<el-button-group style="position: absolute;right: 0px;bottom: 10px;">
								<el-button type="primary" icon="plus" size="small" @click="adjust"  v-if="whertherShow">调课</el-button>
								<el-button type="primary" icon="plus" size="small" @click="takestop"  v-if="whertherShow">停课</el-button>
								<el-button type="primary" icon="plus" size="small" @click.native="DeleteModel">删除</el-button>
								<el-button type="primary" icon="plus" size="small" @click="edit">编辑</el-button>
								<el-button type="primary" icon="plus" size="small" @click="back">返回</el-button>
							</el-button-group>
	                    </el-col>
	                </el-row>
	            </div>
				<div class="sche_table createCheckbox" style="padding: 0;margin-top: 20px;">
					<el-table :data="EditGradeData" border style="width: 100%">
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
								<!-- <el-time-picker is-range v-model="scope.row.class_time" placeholder="选择时间" format="HH:mm" style="width: 100%;max-width: 240px;" :disabled="whetherEdit"></el-time-picker> -->
								<span v-html="scope.row.year_time"></span>
							</template>
						</el-table-column>
						<el-table-column label="夏令课时段" v-if="studyType == 2"  style="max-width: 240px;">
							<template scope="scope">
								<span v-html="scope.row.sumber_time"></span>
							</template>
						</el-table-column>
						<el-table-column label="冬令课时段" v-if="studyType == 2"  style="max-width: 240px;">
							<template scope="scope">
								<span v-html="scope.row.winer_time"></span>
							</template>
						</el-table-column>
						<el-table-column label="星期一">
							<template scope="scope">
								<div v-if="scope.row.timetable.day1">
									<el-checkbox-group v-model="scope.row.timetable.day1.is_check" size="large" fill="#1997e4" text-color="#1997e4" style="width: 100%;height: 40px;">
								    	<el-checkbox :disabled="whetherEdit"></el-checkbox>
							  		</el-checkbox-group>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="星期二">
							<template scope="scope">
								<div v-if="scope.row.timetable.day2">
									<el-checkbox-group v-model="scope.row.timetable.day2.is_check" size="large" fill="#1997e4" text-color="#1997e4" style="width: 100%;height: 40px;">
								    	<el-checkbox :disabled="whetherEdit"></el-checkbox>
							  		</el-checkbox-group>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="星期三">
							<template scope="scope">
								<div v-if="scope.row.timetable.day3">
									<el-checkbox-group v-model="scope.row.timetable.day3.is_check" size="large" fill="#1997e4" text-color="#1997e4" style="width: 100%;height: 40px;">
								    	<el-checkbox :disabled="whetherEdit"></el-checkbox>
							  		</el-checkbox-group>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="星期四">
							<template scope="scope">
								<div v-if="scope.row.timetable.day4">
									<el-checkbox-group v-model="scope.row.timetable.day4.is_check" size="large" fill="#1997e4" text-color="#1997e4" style="width: 100%;height: 40px;">
								    	<el-checkbox :disabled="whetherEdit"></el-checkbox>
							  		</el-checkbox-group>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="星期五">
							<template scope="scope">
								<div v-if="scope.row.timetable.day5">
									<el-checkbox-group v-model="scope.row.timetable.day5.is_check" size="large" fill="#1997e4" text-color="#1997e4" style="width: 100%;height: 40px;">
								    	<el-checkbox :disabled="whetherEdit"></el-checkbox>
							  		</el-checkbox-group>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="星期六">
							<template scope="scope">
								<div v-if="scope.row.timetable.day6">
									<el-checkbox-group v-model="scope.row.timetable.day6.is_check" size="large" fill="#1997e4" text-color="#1997e4" style="width: 100%;height: 40px;">
								    	<el-checkbox :disabled="whetherEdit"></el-checkbox>
							  		</el-checkbox-group>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="星期天">
							<template scope="scope">
								<div v-if="scope.row.timetable.day7">
									<el-checkbox-group v-model="scope.row.timetable.day7.is_check" size="large" fill="#1997e4" text-color="#1997e4" style="width: 100%;height: 40px;">
								    	<el-checkbox :disabled="whetherEdit"></el-checkbox>
							  		</el-checkbox-group>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
			<!-- 编辑模板 -->
			<div v-if="gradeHandle_edit">
	        	<editModel :editDrade="editDrade" :EditModuleID="EditModuleID" @Cancel="gobefore" @BackDetail="backdetail"></editModel>
			</div>
			<!-- 模板停课 -->
			<div v-if="gradeHandle_stop">
	        	<bothModel :stopGrade="stopGrade" :BOTHDATA="BOTHDATA" @Cancel="stopGetBack"></bothModel>
			</div>
			<!-- 模板调课 -->
			<div v-if="gradeHandle_adjust">
	        	<bothModel :adjGrade="adjGrade" :BOTHDATA="BOTHDATA" @Cancel="stopGetBack2"></bothModel>
			</div>
		</div>
	</div>
</template>

<script>
import info from '@/utils/l_axios'
import editModel from '@/components/class/gradeModel'
import bothModel from '@/components/class/gradeSchedule'

const dayOptions = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
const typeOptions = ['全年制', '冬夏分时制']
export default {
    props: ['ModuleID','creatGrade','departID'],
    data() {
        return {
            loading: false,
            isActive: true,
            weekList: dayOptions,
            restList: typeOptions,
            week_checkList: [],   //周一到周日可点模板区域
            week_checkList_string: "",   //周一到周日可点模板区域
            rest_checkList: [0],  //作息方式
            teachingsDay: '',
            allYeartime:'',
            summerYearTime: '',
            summerYearTime: '',
            summerYearTime: '',
            winerYearTime: '',
            studyType: 0,
            studyEach: {
            	mobefore :[0,1,2],
            	morning :[1,2,3,4,5],
            	afternoon :[1,2,3,4],
            	night :[0,1,2]
            },
            time: {
            	start: '',
            	end: '',
            	start_w: '',
            	end_w: ''
            },
            studyNum: {    //上课节数选择
            	morbefore: 1,
            	morning: 1,
            	afternoon: 1,
            	night: 1
            }, 
            studyNum_str:"",  //那些天初始可以排课
            moduleName: '',   //模板课表名称
            startTimeVal: '',
            endTimeVal:'',
            startTimeVal_W:'',
            endTimeVal_W:'',
	        pickerOptions1: {},
	        pickerOptions2: {},
	        canNot: true,
	        gradeModel_1: true,   //创建模板第一步
	        gradeModel_2: false,
	        EditGradeData: [],  //表格初始数据
	        EditSubmitData: [],  //表格提交数据
	        commonSubmit_a:{  //创建模板与编辑模板通用参数-第一步
	        	apiUrl: '',
	        	formData: ''
	        },
	        commonSubmit_b:{  //创建模板与编辑模板通用参数-第二步
	        	apiUrl: '',
	        	formData: ''
	        },
	        commonSubmit_A:{  //创建模板与编辑模板通用参数-第一步-保存
	        	apiUrl: '',
	        	formData: ''
	        },
	        commonSubmit_B:{  //创建模板与编辑模板通用参数-第二步-保存
	        	apiUrl: '',
	        	formData: ''
	        },
	        backModel_id: '', //第一步保存的回传的模板id
	        gradeHandle_check: true,  //查看模板  
	        gradeHandle_edit: false,  //编辑模板
	        gradeHandle_stop: false,  //年级停课
	        gradeHandle_adjust: false,  //年级调课
	        whertherShow: true,  //是否展示按钮
	        whetherEdit: true,   //禁止编辑 
	        EditModuleID: 0,
	        editDrade: true,   //编辑模板身份证
	        stopGrade: false,  //停课身份证
	        adjGrade: false,  //调课身份证
	        BOTHDATA: {   //停课调课共用
	        	MID: 0,
	        	TYPE: 2   //年级
 	        }, 
        }
    },
    created() {
    	this.loading = true;
      	this.EditModuleID = this.ModuleID;
      	info.gradeCheckModle.call(this,this.ModuleID);
      	info.whetherShowBtn.call(this,this.ModuleID);
    },
    components: {
        editModel,bothModel
    },
    methods: {
        DeleteModel(){   //删除模板
        	info.deleteGrade.call(this,this.ModuleID);
        },
        cancel(){
        	this.$emit("Cancel");
        },
        goNext(){  //下一步
        	if(this.creatGrade){
        		this.studyNum_str = this.studyNum.morbefore+","+this.studyNum.morning+","+this.studyNum.afternoon+","+this.studyNum.night;
        		info.creatGradeModelA.call(this,this.departID,this.week_checkList,this.studyNum_str,(parseInt(this.rest_checkList[0])+1),this.time);
        	}
        },
        creatStep_b(mid){ //第二步初始展示
        	info.creatGradeModelb.call(this,mid);
        },
        formatDate(date){
        	return info.formatDate.call(this,date);
        },
        formatMd(data){
        	return info.formatMD.call(this,data);
        },
        formatHourM(date){
        	return info.formatHM.call(this,date);
        },
        goToNext(){  //保存
        	// console.log(this.EditGradeData);
        	info.creatGradeModelB.call(this,this.backModel_id)
        },
        cancelEdit(){  //清空

        },
        gobefore(){  //上一步
        	this.gradeModel_2 = false;
            this.gradeModel_1 = true;
            this.week_checkList = [];
            this.rest_checkList = [0];
            this.canNot = true;
        },
        adjust(){  //调课
        	this.BOTHDATA.MID = this.ModuleID;
        	this.adjGrade = true;  //身份激活
        	this.gradeHandle_check = false;
        	this.gradeHandle_adjust = true;
        },
        takestop(){  //停课
        	this.BOTHDATA.MID = this.ModuleID;
        	this.stopGrade = true;  //身份激活
    		this.gradeHandle_check = false;
	        this.gradeHandle_stop = true;
        },
        edit(){
        	this.gradeHandle_check = false;
	        this.gradeHandle_edit = true;
        },
        back(){
        	this.$emit("Cancel");
        },
        backdetail(){
        	this.gradeHandle_check = true;
	        this.gradeHandle_edit = false;
        },
        stopGetBack(){   //停课取消
    		this.gradeHandle_check = true;
	        this.gradeHandle_stop = false;
        },
        stopGetBack2(){   //停课取消
    		this.gradeHandle_check = true;
	        this.gradeHandle_adjust = false;
        }
    },
    watch:{
       	startTimeVal(val){
       		this.time.start = val;
       		this.pickerOptions1 = {
         		disabledDate(time) {
	            	return time.getTime() < val.getTime() + 24*60*60*1000;
	          	}
	        }
       	},
      	endTimeVal(val){
       		this.time.end = val;
       	},
       	startTimeVal_W(val){
            this.time.start_w = val;
            this.pickerOptions2 = {
         		disabledDate(time) {
	            	return time.getTime() < val.getTime() + 24*60*60*1000;
	          	}
	        }
       	},
       	endTimeVal_W(val){
            this.time.end_w = val;
       	},
       	rest_checkList(val){
       		if(val == 0){
       			this.canNot = true;
       		}else{
       			this.canNot = false;
       		}
       	}
    }
}
</script>
 
<style scoped>
</style>