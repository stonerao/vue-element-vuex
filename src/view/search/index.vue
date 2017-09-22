<template>
    <div class="kd-app-main">
        <titleItem :titleText="$route.name.substring(1)"></titleItem>
        <div class="kd-box">
            <div class="kd-app-box">
                <titleActive :titles="titleItem" @Transfer="emitTransfer" :state="state"></titleActive>
            </div>
            <div class="kd-box-content">
                <description :prompts="prompts" @PromPts="promptsTem"></description>
                <div v-if="state==0">
                	<div class="l_SearchStation">
                		<!-- 老师中心 -->
                		<div v-if="DISTINGUISH == 2">
                			<div v-if="L_DETAIL">
	                			<div class="Station_header">
			                        <el-row style="padding-top: 5px;">
			                            <el-col :span="6">
			                                <img src="../../assets/index/shuaxin.png" class="icon-img-xs" />刷新-共{{DataTotal}}条记录
			                            </el-col>
			                        </el-row>
			                        <el-row class="clearfloat">
		                                <el-col :span="5" style="float: right">
		                                    <el-input placeholder="输入搜索关键词" v-model="SearchVal">
		                                        <el-button slot="append" icon="search" @click.native="SearchStation"></el-button>
		                                    </el-input>
		                                </el-col>
		                                <el-col :span="2" style="float: right">
		                                	<el-select v-model="SearchType" placeholder="请选择" disabled>
											    <el-option v-for="item in StypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
											</el-select>
		                                </el-col>
			                        </el-row>	
	                			</div>
	                			<div class="Station_body">
	                				<ul>
	                					<li></li>
	                				</ul>
	                			</div>
                			</div>
                			<!-- 查看详情 -->
                			<div v-if="L_DETAIL">
                				<el-button type="primary" size="small" icon="arrow-left" @click.native="L_SkinBack">返回</el-button>
                			</div>
                		</div>
                		<!-- 学生中心 -->
                		<div v-if="DISTINGUISH == 3">
                			<div v-if="L_DETAIL">
                                <div class="Station_header">
                                    <el-row style="padding-top: 5px;">
                                        <el-col :span="6">
                                            <img src="../../assets/index/shuaxin.png" class="icon-img-xs"/>刷新-共{{materialParams.total_num}}条记录
                                        </el-col>
                                    </el-row>
                                    <el-row class="clearfloat">
                                        <el-col :span="5" style="float: right">
                                            <el-input placeholder="输入搜索关键词" v-model="SearchVal">
                                                <el-button slot="append" icon="search" @click.native="SearchStation"></el-button>
                                            </el-input>
                                        </el-col>
                                        <el-col :span="2" style="float: right">
                                            <el-select v-model="SearchType" placeholder="请选择" disabled>
                                                <el-option v-for="item in StypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </el-col>
                                    </el-row>   
                                </div>
                                <div class="Station_body">
                                    <el-table :data="S_SData" border style="width: 100%">
                                        <el-table-column prop="title" label="名称"></el-table-column> 
                                        <el-table-column prop="type_name" label="类型"></el-table-column>
                                        <el-table-column label="操作">
                                            <template scope="scope">
                                                <el-button type="primary" size="mini" icon="view" @click.native="L_SinDetail(scope.row.id,scope.row.type)">查看</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <el-row>
                                        <el-col :span="24">
                                            <el-pagination class="float-right" :current-page="materialParams.curpage" :page-sizes="[15, 20, 25, 30]" :page-size="materialParams.page_count" layout="total, sizes, prev, pager, next, jumper" :total="materialParams.total_num" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                                            </el-pagination>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                            <!-- 查看详情-直播 -->
                            <div class="myPopup" v-if="S_Type == 1">
                                <div class="Popup" style="width: 30%;">
                                    <ul class="popHeader clearfloat">
                                        <li>会议文件下载</li>
                                        <li @click="L_SkinBack"><i class="el-icon-circle-close"></i></li>
                                    </ul>
                                    <div class="popContent" style="height: auto">
                                        <div style="width: 100%;height: 100%;">
                                            <el-row>
                                                <el-col :span="3">直播名称：</el-col>
                                                <el-col :span="21">

                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">开始时间：</el-col>
                                                <el-col :span="21">

                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">结束时间：</el-col>
                                                <el-col :span="21">

                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">状态：</el-col>
                                                <el-col :span="21">

                                                </el-col>
                                            </el-row><el-row>
                                                <el-col :span="3">详情：</el-col>
                                                <el-col :span="21">

                                                </el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>
                                <div class="dialog_mask" @click="L_SkinBack"></div>
                            </div>
                            <!-- 查看详情-视频 -->
                            <div class="myPopup" v-if="S_Type == 2">
                                <div class="Popup" style="width: 30%;">
                                    <ul class="popHeader clearfloat">
                                        <li>会议文件下载</li>
                                        <li @click="L_SkinBack"><i class="el-icon-circle-close"></i></li>
                                    </ul>
                                    <div class="popContent" style="height: auto">
                                        <div style="width: 100%;height: 100%;">
                                            <el-row>
                                                <el-col :span="3">直播名称：</el-col>
                                                <el-col :span="21">

                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">开始时间：</el-col>
                                                <el-col :span="21">

                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">结束时间：</el-col>
                                                <el-col :span="21">

                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">状态：</el-col>
                                                <el-col :span="21">

                                                </el-col>
                                            </el-row><el-row>
                                                <el-col :span="3">详情：</el-col>
                                                <el-col :span="21">

                                                </el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>
                                <div class="dialog_mask" @click="L_SkinBack"></div>
                            </div>
                            <!-- 查看详情-教材 -->
                            <div class="myPopup" v-if="S_Type == 3">
                                <div class="Popup" style="width: 30%;">
                                    <ul class="popHeader clearfloat">
                                        <li>会议文件下载</li>
                                        <li @click="L_SkinBack"><i class="el-icon-circle-close"></i></li>
                                    </ul>
                                    <div class="popContent" style="height: auto">
                                        <div style="width: 100%;height: 100%;">
                                            <el-row>
                                                <el-col :span="3">直播名称：</el-col>
                                                <el-col :span="21">

                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">开始时间：</el-col>
                                                <el-col :span="21">

                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">结束时间：</el-col>
                                                <el-col :span="21">

                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">状态：</el-col>
                                                <el-col :span="21">

                                                </el-col>
                                            </el-row><el-row>
                                                <el-col :span="3">详情：</el-col>
                                                <el-col :span="21">

                                                </el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>
                                <div class="dialog_mask" @click="L_SkinBack"></div>
                            </div>
        		        </div>
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
import { getClass } from '@/utils/auth'
import Info from '@/utils/l_axios1'

export default {
    data() {
        return {
            titleItem: [
                { name: "信息筛选", index: 0 },
            ],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 0,
            DISTINGUISH: getClass(),   //区分老师和学生
            SearchVal: '',   // 搜索值
            SearchType: 1,  // 搜索类型
            StypeList: [{  //搜索引擎，站内站外搜索
            	value: 1,
            	label: '站内'
            },{
            	value: 2,
            	label: '站外'
            }],
            L_DETAIL: true,  //老师中心-查看详情
            S_SData: [],  //学生中心data
            S_Type: 0,
            materialParams: {   //翻页
                hasmore: true,
                curpage: 1,//当前页数
                one_pagenum: 10,
                page_count: 1,//总页数
                total_num: 0
            },
        }
    },
    created() {
        if(this.DISTINGUISH == 2){ //激活老师管理系统身份
        	
        }else if(this.DISTINGUISH == 3){ //学生

        }
    },
    components: {
        titleItem, titleActive, description, bottomItem
    },
    methods: {
        emitTransfer(index) {
            if (this.state == index) {
                return
            }
            this.state = index;
        },
        promptsTem(status) {
            console.log(status)
        },
        SearchStation(){   //搜索请求接口
        	if(this.SearchType == 1){  //站内搜索
                if(this.DISTINGUISH == 3){
                    Info.S_Search_List.call(this,this.materialParams,this.SearchVal);
                }else if(this.DISTINGUISH == 2){

                }
        	}else{

        	}
        },
        L_SinDetail(id,type){ //老师详情查看
            this.S_Type = type;
        },
        L_SkinBack(){ //老师详情返回
        	this.S_Type = 0;
        },
        handleSizeChange(val) {
            this.materialParams.one_pagenum = val;
            this.SearchStation();
        },
        handleCurrentChange(val) {
            this.materialParams.curpage = val;
            this.SearchStation();
        },
    }
}
</script>
 
<style scoped>

</style>
