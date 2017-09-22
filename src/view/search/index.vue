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
                	<div class="l_SearchStation l_layout_outer">
                		<!-- 老师中心 -->
                		<div v-if="DISTINGUISH == 2">
                            <div v-if="L_DETAIL">
                                <div class="Station_header">
                                    <el-row style="padding-top: 5px;">
                                        <el-col :span="6">
                                            <img src="../../assets/index/shuaxin.png" class="icon-img-xs" @click="SearchStation"/>刷新-共{{materialParams.total_num}}条记录
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
                                        <li>直播详情展示</li>
                                        <li @click="L_SkinBack"><i class="el-icon-circle-close"></i></li>
                                    </ul>
                                    <div class="popContent" style="height: auto;padding: 35px;">
                                        <div style="width: 100%;height: 100%;">
                                            <el-row>
                                                <el-col :span="3">直播名称：</el-col>
                                                <el-col :span="21">{{S_Detail.ZhiBo.live_title}}</el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">开始时间：</el-col>
                                                <el-col :span="21">{{S_Detail.ZhiBo.live_stime}}</el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">结束时间：</el-col>
                                                <el-col :span="21">{{S_Detail.ZhiBo.live_etime}}</el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">状态：</el-col>
                                                <el-col :span="21">{{S_Detail.ZhiBo.state}}</el-col>
                                            </el-row><el-row>
                                                <el-col :span="3">详情：</el-col>
                                                <el-col :span="21">{{S_Detail.ZhiBo.live_desc}}</el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>
                                <div class="dialog_mask" @click="L_SkinBack"></div>
                            </div>
                            <!-- 查看详情-会议 -->
                            <div class="myPopup" v-if="S_Type == 2">
                                <div class="Popup" style="width: 30%;">
                                    <ul class="popHeader clearfloat">
                                        <li>会议详情展示</li>
                                        <li @click="L_SkinBack"><i class="el-icon-circle-close"></i></li>
                                    </ul>
                                    <div class="popContent" style="height: auto;padding: 35px;">
                                        <div style="width: 100%;height: 100%;">
                                            <el-row>
                                                <el-col :span="3">会议名称：</el-col>
                                                <el-col :span="21">{{T_Detail.HuiYi.title}}</el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">开始时间：</el-col>
                                                <el-col :span="21">{{T_Detail.HuiYi.start_time}}</el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">结束时间：</el-col>
                                                <el-col :span="21">{{T_Detail.HuiYi.end_time}}</el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">状态：</el-col>
                                                <el-col :span="21">{{T_Detail.HuiYi.status}}</el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">会议内容：</el-col>
                                                <el-col :span="21">{{T_Detail.HuiYi.content}}</el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>
                                <div class="dialog_mask" @click="L_SkinBack"></div>
                            </div>
                            <!-- 查看详情-素材 -->
                            <div class="myPopup" v-if="S_Type == 3">
                                <div class="Popup" style="width: 30%;">
                                    <ul class="popHeader clearfloat">
                                        <li>素材详情展示</li>
                                        <li @click="L_SkinBack"><i class="el-icon-circle-close"></i></li>
                                    </ul>
                                    <div class="popContent" style="height: auto;padding: 35px;">
                                        <div style="width: 100%;height: 100%;">
                                            <el-row>
                                                <el-col :span="3">素材名称：</el-col>
                                                <el-col :span="21">{{T_Detail.ShuCai.title}}</el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">创建时间：</el-col>
                                                <el-col :span="21">{{T_Detail.ShuCai.add_time}}</el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">是否共享：</el-col>
                                                <el-col :span="21">{{T_Detail.ShuCai.is_share}}</el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">素材描述：</el-col>
                                                <el-col :span="21">{{T_Detail.ShuCai.content}}</el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>
                                <div class="dialog_mask" @click="L_SkinBack"></div>
                            </div>
                		</div>
                		<!-- 学生中心 -->
                		<div v-if="DISTINGUISH == 3">
                			<div v-if="L_DETAIL">
                                <div class="Station_header">
                                    <el-row style="padding-top: 5px;">
                                        <el-col :span="6">
                                            <img src="../../assets/index/shuaxin.png" class="icon-img-xs" @click="SearchStation"/>刷新-共{{materialParams.total_num}}条记录
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
                                        <li>直播详情展示</li>
                                        <li @click="L_SkinBack"><i class="el-icon-circle-close"></i></li>
                                    </ul>
                                    <div class="popContent" style="height: auto;padding: 35px;">
                                        <div style="width: 100%;height: 100%;">
                                            <el-row>
                                                <el-col :span="3">直播名称：</el-col>
                                                <el-col :span="21">{{S_Detail.ZhiBo.live_title}}</el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">开始时间：</el-col>
                                                <el-col :span="21">{{S_Detail.ZhiBo.live_stime}}</el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">结束时间：</el-col>
                                                <el-col :span="21">{{S_Detail.ZhiBo.live_etime}}</el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">状态：</el-col>
                                                <el-col :span="21">{{S_Detail.ZhiBo.state}}</el-col>
                                            </el-row><el-row>
                                                <el-col :span="3">详情：</el-col>
                                                <el-col :span="21">{{S_Detail.ZhiBo.live_desc}}</el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>
                                <div class="dialog_mask" @click="L_SkinBack"></div>
                            </div>
                            <!-- 查看详情-视频 -->
                            <div class="myPopup" v-if="S_Type == 2">
                                <videoPlay @closePlay="L_SkinBack" :videoId="SvideoId"></videoPlay>
                            </div>
                            <!-- 查看详情-书籍 -->

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
import videoPlay from '@/components/video/videoPlay'
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
            S_Detail: {
                ZhiBo: {},
                ShiPing: {},
                JiaoCai: {},
            },
            T_Detail: {
                ZhiBo: {},
                HuiYi: {},
                ShuCai: {},
                ShuJi: {},
            },
            SvideoId: 0,  // 学生直播ID
        }
    },
    created() {
        if(this.DISTINGUISH == 2){ //激活老师管理系统身份
        	
        }else if(this.DISTINGUISH == 3){ //学生

        }
    },
    components: {
        titleItem, titleActive, description, bottomItem, videoPlay
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
            this.materialParams = {   //翻页
                hasmore: true,
                curpage: 1,//当前页数
                one_pagenum: 10,
                page_count: 1,//总页数
                total_num: 0
            };
        	if(this.SearchType == 1){  //站内搜索
                Info.S_Search_List.call(this,this.materialParams,this.SearchVal);
        	}else{

        	}
        },
        L_SinDetail(did,type){ //老师详情查看
            this.S_Type = type;
            if(this.DISTINGUISH == 3){
                if(type ==1){  //直播
                    Info.S_Search_Detail.call(this,did,type);
                }else if(type == 2){  //视屏
                    this.SvideoId = did;
                }else if(type == 3){  //书籍
                    this.$router.push({ path: '../shoping', query: { id: did } });
                }
            }else if(this.DISTINGUISH == 2){
                if(type == 4){  //书籍
                    this.$router.push({ path: '../shoping', query: { id: did } });
                }else{
                    Info.S_Search_Detail.call(this,did,type);
                }
            }
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
        add0(m){
            return m<10?'0'+m:m 
        },
        Searchformat(needTime) {  
            //needTime是整数，否则要parseInt转换  
            var time = new Date(needTime);  
            var y = time.getFullYear();  
            var m = time.getMonth()+1;  
            var d = time.getDate();  
            var h = time.getHours();  
            var mm = time.getMinutes();  
            var s = time.getSeconds();  
            return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);  
        }  
    }
}
</script>
 
<style scoped>

</style>
