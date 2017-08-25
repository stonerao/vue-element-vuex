<template>
	<div>
		<!-- 年级系列 -->
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
		                            <el-button size="small" v-if="gra.have_model_status == 1" @click.native="checkModel(gra.model_id)">查看模板</el-button>
		                            <el-button size="small" v-if="gra.have_model_status == 2" @click.native="buildModel(gra.department_id)">创建模板</el-button>
		                            <el-button size="small" @click.native="showClassLog(gra.department_id)">日志</el-button> 
                                    <!-- <el-button size="small" :disabled="gra.have_model_status == 2" @click.native="showClassLog(gra.department_id)">日志</el-button> -->
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
		                    <el-pagination class="float-right" :current-page="gradeParams.curpage" :page-sizes="[15, 20, 25, 30]" :page-size="gradeParams.page_count" layout="total, sizes, prev, pager, next, jumper" :total="gradeParams.total_num" @size-change="handleSizeChange" @current-change="handleCurrentChange">
		                    </el-pagination>
		                </el-col>
		            </el-row>
		        </div>
	        </div>
	        <!-- 查看模板 -->
			<div v-if="switch_1">
				<checkModel :ModuleID="ModuleID" @Cancel="back"></checkModel>
	        </div>
	        <!-- 创建模板第一步 -->
	        <div v-if="switch_2">
	        	<buildModel :creatGrade="creatGrade" :departID="departID" @Cancel="gobefore"></buildModel>
	        </div>
            <!-- 查看日志 -->
            <div v-if="switch_3">
                <ShowAllLog :IDCard="IDCard" :GradeIdentity="GradeIdentity" @SHOWLOGBACK="LogoBack"></ShowAllLog>
            </div>
                
	    </div>
	</div>
</template>

<script>
import info from '@/utils/l_axios'
import buildModel from '@/components/class/gradeModel'
import checkModel from '@/components/class/gradeModelcheck'
import ShowAllLog from '@/components/class/ShowAllLog'

export default {
    props: ['state'],
    data() {
        return {
        	creatGrade: true, //这是年级模板排课调用组件排课的身份确定证书，以便区别组件内函数的执行
            gradeParams: {
            	hasmore: true,
                curpage: 1,//当前页数
                one_pagenum: 10,
                page_count: 1,//总页数
                total_num: 0
            },
            gradList: [],
            gradeBtnTab: "",
            loading: false,
            hasData: true,
            switch_0: true,
            switch_1: false, //年级查看模板
            switch_2: false, //年级创建模板
            switch_3: false,
            gradeDetailData: [],
            departID: 0,
           	ModuleID: 0, //查看模板id 
            GradeIdentity: true,
        }
    },
    created() {
    	if(this.state == 1){   //年级列表
    		info.gradeAllList.call(this,this.gradeParams)
    	}
    },
    components: {
        buildModel,checkModel,ShowAllLog
    },
    methods: {
        checkModel(modelId){  //查看模版
        	// console.log(modelId);
        	this.ModuleID = modelId;
        	this.switch_0 = false;
        	this.switch_1 = true;
        },
        back(){   //查看模板-返回
        	this.switch_1 = false;
        	this.switch_0 = true;
        },
        buildModel(id){   //创建模板
            this.departID = id;
        	this.switch_0 = false;
        	this.switch_2 = true;
        },
        gobefore(){  //创建模板第一步返回
        	this.switch_0 = true;
        	this.switch_2 = false;
        },
        showClassLog(id){   //班级日志（暂时不做）
            this.IDCard = id;
            this.switch_0 = false;
            this.switch_3 = true;
        },
        LogoBack(){
            this.switch_0 = true;
            this.switch_3 = false;
        },
        handleSizeChange(val) {
            this.gradeParams.one_pagenum = val;
            info.gradeAllList.call(this,this.gradeParams)
        },
        handleCurrentChange(val) {
            this.gradeParams.curpage = val;
            info.gradeAllList.call(this,this.gradeParams)
        },
    },
    watch:{
       
    }
}
</script>
 
<style scoped>
</style>