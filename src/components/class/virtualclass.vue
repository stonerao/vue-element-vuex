<template>
	<div>
		<div>
			<div v-if="virtual_1">
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
			<div v-if="virtual_2">
				<virtualStep2 :modelId="modelId" :editStatus="editStatus" :derpartID="derpartID" :editScheID="editScheID" :editModelID="editModelID" :editStepTwoA="editStepTwoA" :editStepTwoB="editStepTwoB" @backFirst="backfirst"></virtualStep2>
			</div>
		</div>
	</div>
</template>

<script>
import info from '@/utils/l_axios'
import virtualStep2 from '@/components/class/virtualStep2'

const dayOptions = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
const typeOptions = ['全年制', '冬夏分时制']
export default {
    props: ['derpartId','conpVirtual','conpGrade','editVirtStatus','ScheduID'],
    data() {
        return {
            loading: false,
            weekList: dayOptions,
            restList: typeOptions,
            week_checkList: [],   //周一到周日可点模板区域
            week_checkList_string: "",   //周一到周日可点模板区域
            rest_checkList: [0],  //作息方式
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
            studyNum_str:"",
            moduleName: '',   //模板课表名称
            startTimeVal: '',
            endTimeVal:'',
            startTimeVal_W:'',
            endTimeVal_W:'',
	        pickerOptions1: {},
	        pickerOptions2: {},
	        canNot: true,
	        virtual_1: true,   //虚拟班编排第一步
	        virtual_2: false,   //虚拟班编排第二步
	        modelId: 0,   //虚拟班编排第二步初始传值modelId
	        classId: 0,   //虚拟班编排第二步初始传值班级id
	        editVirBeginData: {},   //虚拟班初始数据保存
	        urlData: '',  //区分编辑及排课的url地址
	        distinguish: false,  //虚拟班第一步区分排课操作及编辑操作
	        formData: {}, //表单提价数据
	        editModelID: 0,
	        editScheID: 0,
	        editStatus: false,
	        editStepTwoA: false, //第一步数据改变-第二步表单提交状态
	        editStepTwoB: false, //第一步数据未改变-第二步表单提交状态
	        derpartID: 0,
	        timeHandle: [],
	        backFirst: false,
        }
    },
    created() {
    	if(this.conpVirtual){
    		this.distinguish = true;
    		info.virtualArrangeA.call(this,this.derpartId);
    		// console.log('这是虚拟班排课组件！');
    	}else if(this.conpGrade){
    		// console.log('这是年级排课组件！');
    	} else if(this.editVirtStatus){
    		this.rest_checkList = [];
    		info.EditVirtStep_a.call(this,this.ScheduID);
    		// console.log('这是虚拟班编辑第一步！');
    	}
    },
    components: {
       virtualStep2 
    },
    methods: {
        cancel(){
        	this.$emit("Cancel");
        },
        goNext(){
        	this.studyNum_str = this.studyNum.morbefore+","+this.studyNum.morning+","+this.studyNum.afternoon+","+this.studyNum.night;
        	info.virtualArrangeB.call(this,this.derpartId,this.week_checkList,this.studyNum_str,(parseInt(this.rest_checkList[0])+1),this.time)
        },
        formatDate(date){
        	return info.formatDate.call(this,date);
        },
        backfirst(){
        	if(this.conpVirtual){
	        	this.virtual_1=true; 
		        this.virtual_2=false;
		        this.week_checkList = [];
	            this.rest_checkList = [0];
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
        	}else if(this.editVirtStatus){
	    		this.virtual_1=true; 
		        this.virtual_2=false;
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
	    		info.EditVirtStep_a.call(this,this.ScheduID);
	    	}
        },
        formatMd(data){
        	return info.formatMD.call(this,data);
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