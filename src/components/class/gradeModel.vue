<template>
	<div>
		<div v-loading="loading">
			<!-- 创建模板第一步 -->
			<div v-if="gradeModel_1">
				<div class="l_virtual_wraper">
					<div class="form_group">
						<ul class="clearfloat">
							<li class="header">模板名称：</li>
							<li>{{moduleName}}</li>
						</ul>
					</div>
					<div class="form_group">
						<ul class="clearfloat">
							<li class="header">*授课日期：</li>
							<li>
								<el-checkbox-group v-model="week_checkList">
								    <el-checkbox v-for="(week,index) in weekList" :label="index" :key="week">{{week}}</el-checkbox>
							  	</el-checkbox-group>
							</li>
						</ul>
					</div>
					<div class="form_group">
						<ul class="clearfloat">
							<li class="header">*每天上课节数：</li>
							<li>
								<el-form :inline="true" :model="studyNum" class="demo-form-inline">
									<el-form-item label="早读">
										<el-select v-model="studyNum.morbefore" placeholder="选节">
											<el-option v-for="each in studyEach.mobefore" :label="each" :value="each"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="上午">
										<el-select v-model="studyNum.morning" placeholder="选节">
											<el-option v-for="each in studyEach.morning" :label="each" :value="each"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="下午">
										<el-select v-model="studyNum.afternoon" placeholder="选节">
											<el-option v-for="each in studyEach.afternoon" :label="each" :value="each"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="晚自习">
										<el-select v-model="studyNum.night" placeholder="选节">
											<el-option v-for="each in studyEach.night" :label="each" :value="each"></el-option>
										</el-select>
									</el-form-item>
								</el-form>
							</li>
						</ul>
					</div>
					<div class="form_group">
						<ul class="clearfloat">
							<li class="header">*作息方式：</li>
							<li>
								<el-checkbox-group v-model="rest_checkList" :max="1">
								    <el-checkbox v-for="(rest,index) in restList" :label="index" :key="rest">{{rest}}</el-checkbox>
							  	</el-checkbox-group>
							</li>
						</ul>
					</div>
					<div class="form_group">
						<ul class="clearfloat">
							<li class="header">夏令作息执行时间：</li>
							<li>
								<div class="inline-block">
									<el-date-picker v-model="startTimeVal" type="date" placeholder="选择日期" :disabled="canNot" format="MM-dd"></el-date-picker>
								</div>
								<div class="inline-block middle_zhi">至</div>
								<div class="inline-block">
									<el-date-picker v-model="endTimeVal" type="date" placeholder="选择日期" :picker-options="pickerOptions1" :disabled="canNot" format="MM-dd"></el-date-picker>
								</div>
							</li>
						</ul>
					</div>
					<div class="form_group">
						<ul class="clearfloat">
							<li class="header">冬令作息执行时间：</li>
							<li>
								<div class="inline-block">
									<el-date-picker v-model="startTimeVal_W" type="date" placeholder="选择日期" :disabled="canNot" format="MM-dd"></el-date-picker>
								</div>
								<div class="inline-block middle_zhi">至</div>
								<div class="inline-block">
									<el-date-picker v-model="endTimeVal_W" type="date" placeholder="选择日期" :picker-options="pickerOptions2" :disabled="canNot" format="MM-dd"></el-date-picker>
								</div>
							</li>
						</ul>
					</div>
					<div class="form_group">
						<ul class="clearfloat">
							<li class="header"></li>
							<li>
								<el-button type="primary" @click.native="goNext">下一步</el-button>
								<el-button @click.native="cancel">取消</el-button>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<!-- 创建模板第二步 -->
			<div v-if="gradeModel_2">
				<div class="virStep2Header sche_list_header">
					<ul class="clearfloat">
						<li v-bind:class="{ active: isActive }">{{moduleName}}</li>
					</ul>
				</div>
				<div class="sche_table createCheckbox" style="padding: 0;">
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
								<el-time-picker is-range v-model="scope.row.class_time" placeholder="选择时间" format="HH:mm" style="width: 100%;max-width: 240px;"></el-time-picker>
							</template>
						</el-table-column>
						<el-table-column label="夏令课时段" v-if="studyType == 2"  style="max-width: 240px;">
							<template scope="scope">
								<el-time-picker is-range v-model="scope.row.class_timeS" placeholder="选择时间" format="HH:mm" style="width: 100%;max-width: 240px;"></el-time-picker>
							</template>
						</el-table-column>
						<el-table-column label="冬令课时段" v-if="studyType == 2"  style="max-width: 240px;">
							<template scope="scope">
								<el-time-picker is-range v-model="scope.row.class_timeW" placeholder="选择时间" format="HH:mm" style="width: 100%;max-width: 240px;"></el-time-picker>
							</template>
						</el-table-column>
						<el-table-column label="星期一">
							<template scope="scope">
								<div v-if="scope.row.timetable.day1">
									<el-checkbox-group v-model="scope.row.timetable.day1.is_check" size="large" fill="#1997e4" text-color="#1997e4" style="width: 100%;height: 40px;">
								    	<el-checkbox></el-checkbox>
							  		</el-checkbox-group>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="星期二">
							<template scope="scope">
								<div v-if="scope.row.timetable.day2">
									<el-checkbox-group v-model="scope.row.timetable.day2.is_check" size="large" fill="#1997e4" text-color="#1997e4" style="width: 100%;height: 40px;">
								    	<el-checkbox></el-checkbox>
							  		</el-checkbox-group>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="星期三">
							<template scope="scope">
								<div v-if="scope.row.timetable.day3">
									<el-checkbox-group v-model="scope.row.timetable.day3.is_check" size="large" fill="#1997e4" text-color="#1997e4" style="width: 100%;height: 40px;">
								    	<el-checkbox></el-checkbox>
							  		</el-checkbox-group>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="星期四">
							<template scope="scope">
								<div v-if="scope.row.timetable.day4">
									<el-checkbox-group v-model="scope.row.timetable.day4.is_check" size="large" fill="#1997e4" text-color="#1997e4" style="width: 100%;height: 40px;">
								    	<el-checkbox></el-checkbox>
							  		</el-checkbox-group>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="星期五">
							<template scope="scope">
								<div v-if="scope.row.timetable.day5">
									<el-checkbox-group v-model="scope.row.timetable.day5.is_check" size="large" fill="#1997e4" text-color="#1997e4" style="width: 100%;height: 40px;">
								    	<el-checkbox></el-checkbox>
							  		</el-checkbox-group>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="星期六">
							<template scope="scope">
								<div v-if="scope.row.timetable.day6">
									<el-checkbox-group v-model="scope.row.timetable.day6.is_check" size="large" fill="#1997e4" text-color="#1997e4" style="width: 100%;height: 40px;">
								    	<el-checkbox></el-checkbox>
							  		</el-checkbox-group>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="星期天">
							<template scope="scope">
								<div v-if="scope.row.timetable.day7">
									<el-checkbox-group v-model="scope.row.timetable.day7.is_check" size="large" fill="#1997e4" text-color="#1997e4" style="width: 100%;height: 40px;">
								    	<el-checkbox></el-checkbox>
							  		</el-checkbox-group>
								</div>
							</template>
						</el-table-column>
					</el-table>
					<div class="l_save">
						<el-button @click.native="gobefore">上一步</el-button>
						<el-button @click.native="goToNext">保存</el-button>
						<el-button @click.native="cancelEdit">取消</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import info from '@/utils/l_axios'

const dayOptions = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
const typeOptions = ['全年制', '冬夏分时制']
export default {
    props: ['creatGrade','departID','EditModuleID','editDrade'],
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
	        EditBeginData: {}, //编辑第一步储存初始数据
	        EditStatus: false,  //编辑第一步数据改变否
	        backFirst: false,  //返回上一步辅助
        }
    },
    created() {
    	if(this.creatGrade){  //创建模板身份认证
    		if(this.gradeModel_1){
    			info.creatGradeModela.call(this,this.departID);
    		}
    	}else if(this.editDrade){  //编辑模板身份证
    		this.rest_checkList = [];
    		info.creatGradeModela.call(this);
    	}
    },
    components: {
        
    },
    methods: {
        cancel(){
        	if(this.creatGrade){
        		this.$emit("Cancel");
        	}else if(this.editDrade){ 
        		this.$emit("BackDetail");
    		}
        },
        goNext(){  //下一步
    		this.studyNum_str = this.studyNum.morbefore+","+this.studyNum.morning+","+this.studyNum.afternoon+","+this.studyNum.night;
    		info.creatGradeModelA.call(this,this.departID,this.week_checkList,this.studyNum_str,(parseInt(this.rest_checkList[0])+1),this.time);
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
        	if(this.creatGrade){  //创建模板身份认证
        		info.creatGradeModelB.call(this,this.backModel_id);
    		}else if(this.editDrade){
        		info.creatGradeModelB.call(this,this.EditModuleID);
    		}
        },
        cancelEdit(){  //清空
        	if(this.creatGrade){

        	}
        },
        gobefore(){  //上一步
        	this.gradeModel_2 = false;
            this.gradeModel_1 = true;
            this.week_checkList = [];
            this.rest_checkList = [];
            this.studyNum = {   //虚拟班初始初始科目数
                morbefore: 1,
                morning: 1,
                afternoon: 1,
                night: 1
            };
            this.time = {
            	start: '',
            	end: '',
            	start_w: '',
            	end_w: ''
            };
            this.backFirst = true;
    		info.creatGradeModela.call(this,this.departID);
        },
        editStepTwo(mid){  
        	info.creatGradeModelb.call(this,mid);
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
            if(this.editDrade){
	        	this._Status = true;
	        }
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