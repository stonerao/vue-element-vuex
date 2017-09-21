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
                			<div v-if="!T_DETAIL">
	                			<div class="Station_header">
			                        <el-row>
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
                			<div v-if="T_DETAIL">
                				<el-button type="primary" size="small" icon="arrow-left" @click.native="T_SkinBack">返回</el-button>
                			</div>
                		</div>
                		<!-- 学生中心 -->
                		<div v-if="DISTINGUISH == 3">
                			
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
            DataTotal: 0,  // 数据总条数
            StypeList: [{  //搜索引擎，站内站外搜索
            	value: 1,
            	label: '站内'
            },{
            	value: 2,
            	label: '站外'
            }],
            T_DETAIL: false,  //老师中心-查看详情
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

        	}else{

        	}
        },
        T_SinDetail(){ //老师详情查看
        	this.T_DETAIL = true;
        },
        T_SkinBack(){ //老师详情返回
        	this.T_DETAIL = false;
        }
    }
}
</script>
 
<style scoped>

</style>
