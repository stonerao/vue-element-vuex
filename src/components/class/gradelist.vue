<template>
	<div>
		<div class="l_grade_table" v-loading="loading">
			<div v-if="switch_0">
		        <el-row :gutter="20" class="l_search_header0 class-header">
		            <el-col :span="24" class="class-titles">
		                <img src="../../assets/index/shuaxin.png" class="icon-img-xs"/>刷新-共{{gradeParams.total_num}}条记录
		            </el-col>
		        </el-row>
		        <div class="l_graCla_list clearfloat">
		            <ul v-if="hasData" v-for="gra in gradList">
		                <li class="li_list">
		                    <div class="top-block">
		                        <div class="row t1">{{gra.department_name}}</div>
		                        <div class="row t2">班级数：<span class="blue_1">{{gra.class_num}}</span></div>
		                        <div class="row t3">学生人数：<span class="blue_1">{{gra.student_num}}</span>人</div>
		                    </div>
		                    <div class="bottom-block">
		                        <div class="button-group">
		                            <el-button size="small" @click.native="checkModel(gra.model_id)">查看模板</el-button>
		                            <el-button size="small">日志</el-button>
		                        </div>
		                    </div>
		                </li>
		            </ul>
		            <ul v-if="!hasData">
		                <li class="hasNoData">暂无数据</li>
		            </ul>
		        </div>
		        <div class="kd-page">
		            <el-row>
		                <el-col :span="24">
		                    <el-pagination class="float-right" :current-page="gradeParams.curpage" :page-sizes="[15, 20, 25, 30]" :page-size="gradeParams.page_count" layout="total, sizes, prev, pager, next, jumper" :total="gradeParams.total_num">
		                    </el-pagination>
		                </el-col>
		            </el-row>
		        </div>
	        </div>
			<div v-if="switch_1">
				<div class="l_checkdetail_outer">
					<el-row class="l_checkdetail">
						<el-col :span="12">
							<div class="l_grade_detail_title">
								<ul class="clearfloat">
									<li class="active">课表1</li>
								</ul>
							</div>
						</el-col>
						<el-col :span="12" class="l_grade_detail_handle">
							<el-button-group>
								<el-button type="primary" icon="plus" size="small">调课</el-button>
								<el-button type="primary" icon="plus" size="small">调休</el-button>
								<el-button type="primary" icon="plus" size="small">编辑</el-button>
								<el-button type="primary" icon="plus" size="small" @click.native="back">返回</el-button>
							</el-button-group>
						</el-col>
					</el-row>
					<div class="sche_table">
						<el-table :data="gradeDetailData" border style="width: 100%">
							<el-table-column prop="time" label="时段">
								<template scope="scope">
									<!-- 判断值: 1为早上 -->
									<span v-if="scope.row.timetable.day1.lesson == 1">早读</span>
									<span v-if="scope.row.timetable.day1.lesson == 2">上午</span>
									<span v-if="scope.row.timetable.day1.lesson == 3">下午</span>
									<span v-if="scope.row.timetable.day1.lesson == 4">晚上</span>
								</template>
							</el-table-column>
							<el-table-column prop="school_time" label="节次"></el-table-column>
							<el-table-column label="星期一">
								<template scope="scope">
									<div v-if="show_select&&scope.row.timetable.day1">
										<el-select v-model="scope.row.timetable.day1.s_id" placeholder="科目" @change="teachLoad(scope.row.timetable.day1.s_id)">
											<el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
										</el-select>
										<el-select v-model="scope.row.timetable.day1.teacher_id" :disabled="scope.row.timetable.day1.s_id==''" placeholder="老师" @click.native="teacClear">
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
										<el-select v-model="scope.row.timetable.day2.teacher_id" :disabled="scope.row.timetable.day2.s_id==''" placeholder="老师">
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
										<el-select v-model="scope.row.timetable.day3.teacher_id" :disabled="scope.row.timetable.day3.s_id==''" placeholder="老师">
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
										<el-select v-model="scope.row.timetable.day4.teacher_id" :disabled="scope.row.timetable.day4.s_id==''" placeholder="老师">
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
										<el-select v-model="scope.row.timetable.day5.teacher_id" :disabled="scope.row.timetable.day5.s_id==''" placeholder="老师">
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
										<el-select v-model="scope.row.timetable.day6.teacher_id" :disabled="scope.row.timetable.day6.s_id==''" placeholder="老师">
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
										<el-select v-model="scope.row.timetable.day7.teacher_id" :disabled="scope.row.timetable.day7.s_id==''" placeholder="老师">
											<el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
										</el-select>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</div>
                </div>
	        </div>
	        <div v-if="switch_2">
	        	
	        </div>
	    </div>
	</div>
</template>

<script>
import info from '@/utils/l_axios'
export default {
    props: ['state'],
    data() {
        return {
            gradeParams: {
            	hasmore: true,
                curpage: 1,//当前页数
                one_pagenum: 10,
                page_count: 1,//总页数
                total_num: 0
            },
            gradList: [],
            loading: false,
            hasData: true,
            switch_0: true,
            switch_1: false, //年级查看模板
            switch_1: false, //年级创建模板
            gradeDetailData: [],
        }
    },
    created() {
    	if(this.state == 1){
    		info.gradeAllList.call(this,this.gradeParams)
    	}
    },
    components: {
        
    },
    methods: {
        checkModel(modelId){
        	this.loading = true;
          	info.gradeCheckModle.call(this,modelId);
        },
        back(){
        	this.switch_1 = false;
        	this.switch_0 = true;
        }
    },
    watch:{
       
    }
}
</script>
 
<style scoped>
</style>