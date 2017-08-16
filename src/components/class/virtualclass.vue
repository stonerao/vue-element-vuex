<template>
	<div class="l_virtual_wraper">
		<div class="form_group">
			<ul class="clearfloat">
				<li class="header">模板名称：</li>
				<li>虚拟1班课表</li>
			</ul>
		</div>
		<div class="form_group">
			<ul class="clearfloat">
				<li class="header">*授课日期：</li>
				<li>
					<el-checkbox-group v-model="week_checkList">
					    <el-checkbox v-for="week in weekList" :label="week" :key="week"></el-checkbox>
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
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="上午">
							<el-select v-model="studyNum.morning" placeholder="选节">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="下午">
							<el-select v-model="studyNum.afternoon" placeholder="选节">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="晚自习">
							<el-select v-model="studyNum.night" placeholder="选节">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
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
					<el-checkbox-group v-model="rest_checkList">
					    <el-checkbox v-for="rest in restList" :label="rest" :key="rest"></el-checkbox>
				  	</el-checkbox-group>
				</li>
			</ul>
		</div>
		<div class="form_group">
			<ul class="clearfloat">
				<li class="header">夏令作息执行时间：</li>
				<li>
					<div class="inline-block">
						<el-date-picker v-model="time.start" type="date" placeholder="选择日期"></el-date-picker>
					</div>
					<div class="inline-block middle_zhi">至</div>
					<div class="inline-block">
						<el-date-picker v-model="time.end" type="date" placeholder="选择日期"></el-date-picker>
					</div>
				</li>
			</ul>
		</div>
		<div class="form_group">
			<ul class="clearfloat">
				<li class="header">冬令作息执行时间：</li>
				<li>
					<div class="inline-block">
						<el-date-picker v-model="time.start_w" type="date" placeholder="选择日期"></el-date-picker>
					</div>
					<div class="inline-block middle_zhi">至</div>
					<div class="inline-block">
						<el-date-picker v-model="time.end_w" type="date" placeholder="选择日期"></el-date-picker>
					</div>
				</li>
			</ul>
		</div>
		<div class="form_group">
			<ul class="clearfloat">
				<li class="header"></li>
				<li>
					<el-button type="primary">下一步</el-button>
					<el-button @click.native="cancel">取消</el-button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import info from '@/utils/l_axios'
export default {
    props: ['derpartIdV'],
    data() {
        return {
            loading: false,
            weekList: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
            restList: ['全年制', '冬夏分时制'],
            week_checkList: [],
            rest_checkList: [],
            time: {
            	start: '',
            	end: '',
            	start_w: '',
            	end_w: ''
            },
            studyNum: {
            	morbefore: '',
            	morning: '',
            	afternoon: '',
            	night: ''
            },
        }
    },
    created() {
    	console.log(this.derpartId);
    	// info.virtualArrangeA.call(this,this.derpartId);
    },
    components: {
        
    },
    methods: {
        cancel(){
        	this.$emit("Cancel");
        }
    },
    watch:{
       
    }
}
</script>
 
<style scoped>
</style>