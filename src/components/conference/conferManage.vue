<template>
    <div>
        <!--会议管理-->
        <div v-if="state==0">
            <div v-if="conferManage_1">
                <div class="l_mater_header">
                    <el-row :gutter="15">
                        <el-col :span="6">
                            <img src="../../assets/index/shuaxin.png" class="icon-img-xs" />刷新-共{{materialParams.total_num}}条记录
                        </el-col>
                        <el-col :span="18" class="mater_search clearfloat">
                            <el-col :span="5">
                                <el-input placeholder="输入会议主题名称" style="" v-model="conferTheme">
                                    <el-button slot="append" icon="search" @click.native="conferSearch"></el-button>
                                </el-input>
                            </el-col>
                            <el-col :span="3">
                                <el-select v-model="conferStatus" clearable placeholder="会议状态">
                                    <el-option v-for="item in conferList" :key="item.id" :label="item.statu" :value="item.id">
                                </el-option>
                            </el-select>
                            </el-col>
                        </el-col>
                    </el-row>
                </div>
                <div class="l_confer_table l_mater_table">
                    <el-table ref="multipleTable" :data="conferManaList" border tooltip-effect="dark" style="width: 100%" @selection-change="select_Change">
                        <el-table-column type="selection" width="48" v-if="schoolManageCenter"></el-table-column>
                        <el-table-column label="ID" prop="id"></el-table-column>
                        <el-table-column label="会议主题" prop="theme"></el-table-column>
                        <el-table-column label="会议时间">
                             <template scope="scope">
                                 <div>{{scope.row.time_s}}</div>
                                 <div>{{scope.row.time_e}}</div>
                             </template>
                        </el-table-column>
                        <el-table-column label="创建时间" prop="creTime"></el-table-column>
                        <el-table-column label="创始人" prop="people"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button type="primary" size="mini" icon="view" @click.native="look_over(scope.row.id)" style="margin-left: 0px;margin: 3px 0px">查看</el-button>
                                <el-button type="primary" size="mini" icon="edit" @click.native="editConfer(scope.row.id)" style="margin-left: 0px;margin: 3px 0px" v-if="schoolManageCenter">编辑</el-button>
                                <el-button type="primary" size="mini" icon="edit" @click.native="beginConfer(scope.row.id)" style="margin-left: 0px;margin: 3px 0px" v-if="scope.row.status == 1 && schoolManageCenter">开始</el-button>
                                <el-button type="primary" size="mini" icon="edit" @click.native="endConfer(scope.row.channelId)" style="margin-left: 0px;margin: 3px 0px" v-if="scope.row.status == 2 && schoolManageCenter">结束</el-button>
                                <el-button type="primary" size="mini" icon="edit" @click.native="messageConfer(scope.row.id)" style="margin-left: 0px;margin: 3px 0px" v-if="scope.row.status == 1 && schoolManageCenter">通知</el-button>
                                <el-button type="primary" size="mini" icon="delete"  v-if="schoolManageCenter" @click.native="deleteOne(scope.row.id)" style="margin-left: 0px;margin: 3px 0px">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="l_mater_footer" v-if="schoolManageCenter">
                    <el-row :span="24">
                        <el-col :span="6">
                            <div class="footer_search">
                                <el-button type="primary" size="mini" @click.native="delete_all">删除</el-button>
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <div class="kd-page">
                                <el-row>
                                    <el-col :span="24">
                                        <el-pagination class="float-right" :current-page="materialParams.curpage" :page-sizes="[15, 20, 25, 30]" :page-size="materialParams.page_count" layout="total, sizes, prev, pager, next, jumper" :total="materialParams.total_num" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                                        </el-pagination>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="l_mater_footer" v-else>
                    <el-row :span="24">
                        <el-col :span="24">
                            <div class="kd-page">
                                <el-row>
                                    <el-col :span="24">
                                        <el-pagination class="float-right" :current-page="materialParams.curpage" :page-sizes="[15, 20, 25, 30]" :page-size="materialParams.page_count" layout="total, sizes, prev, pager, next, jumper" :total="materialParams.total_num" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                                        </el-pagination>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="myPopup" v-if="Dailog">
                    <div class="Popup">
                        <ul class="popHeader clearfloat">
                            <li>{{confDetail.name}}</li>
                            <li @click="Close_mask"><i class="el-icon-circle-close"></i></li>
                        </ul>
                        <div class="popContent">
                            <div style="width: 100%;height: 100%;overflow-y: scroll;">
                                <el-row>
                                    <el-col :span="3">会议名称：</el-col>
                                    <el-col :span="21">{{confDetail.name}}</el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">开始时间：</el-col>
                                    <el-col :span="21">{{confDetail.time_s}}</el-col>
                                </el-row> 
                                <el-row>
                                    <el-col :span="3">结束时间：</el-col>
                                    <el-col :span="21">{{confDetail.time_e}}</el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">状态：</el-col>
                                    <el-col :span="21">{{confDetail.status}}</el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">会议内容：</el-col>
                                    <el-col :span="21">{{confDetail.content}}</el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">会议附件：</el-col>
                                    <el-col :span="21">
                                        <ul class="clearfloat">
                                            <li class="enclosure"><i></i>遵义会议附件1.ppt</li>
                                            <li class="enclosure"><i></i>遵义会议附件2.ppt</li>
                                            <li class="enclosure"><i></i>遵义会议附件3.ppt</li>
                                        </ul>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3" style="color: #fff;">进直播间</el-col>
                                    <el-col :span="21">
                                        <el-button type="primary">
                                            <a :href="confDetail.url" style="display: block;color:#fff;cursor: point;">进入直播房间</a>
                                        </el-button>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                    <div class="dialog_mask" @click="Close_mask"></div>
                </div>
            </div>
            <div v-if="conferManage_2">
                <conferEdit :schoolManageCenter="schoolManageCenter" :teacherManageCenter="teacherManageCenter" :EDITCARD="EDITCARD" :CONFERID="CONFERID" @EDITBACK="EDITBACK"></conferEdit>
            </div>
        </div>
    </div>
</template>

<script>
import info from '@/utils/l_axios'
import titleItem from '@/components/main/title.vue'
import titleActive from '@/components/main/titleActive.vue'
import description from '@/components/main/description.vue'
import bottomItem from '@/components/bottom/bottom.vue'
import conferEdit from '@/components/conference/conferCreate.vue'

export default {
    props: ['schoolManageCenter','teacherManageCenter'],
    data() {
        return {
            state: 0,
            materialParams: {   //翻页
                hasmore: true,
                curpage: 1,//当前页数
                one_pagenum: 10,
                page_count: 1,//总页数
                total_num: 0
            },
            conferStatus: '',  //会议状态选择框数据初始
            conferList: [
                {
                    statu: '未开始',
                    id: 1,
                },{
                    statu: '进行中',
                    id: 2,
                },{
                    statu: '已结束',
                    id: 3,
                },
            ], //会议状态
            conferTheme: '',  //search会议主题
            Dailog: false,
            multiple: [],  //素材管理表选择值
            conferManaList: [],   //素材管理表数据
            IDString: [],
            delStatus: false,
            confDetail: {
                name: '',
                time_s: '',
                time_e: '',
                status: '',
                content: '',
                adress: '',
                url: '',
                eclo: [],
            },
            conferManage_1: true,
            conferManage_2: false,
            EDITCARD: false,  //编辑身份证
            CONFERID: 0,
        }
    },
    created() {
        if(this.schoolManageCenter){  //学校-会议管理
            info.conferMeetList_s.call(this,this.materialParams,this.conferStatus,this.conferTheme);
        }else if(this.teacherManageCenter){  //老师-会议管理
            info.conferMeetList_s.call(this,this.materialParams,this.conferStatus,this.conferTheme);
        }
    },
    components: {
        titleItem, titleActive, description, bottomItem, conferEdit
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
        handleSizeChange(val) {
            this.materialParams.one_pagenum = val;
            info.conferMeetList_s.call(this,this.materialParams,this.conferStatus,this.conferTheme);
        },
        handleCurrentChange(val) {
            this.materialParams.curpage = val;
            info.conferMeetList_s.call(this,this.materialParams,this.conferStatus,this.conferTheme);
        },
        beginConfer(id){  //开始会议
            info.conferBegin_s.call(this,id);
        },
        endConfer(chid){  //结束会议
            info.conferClose_s.call(this,chid);
        },
        messageConfer(id){   //通知消息
            info.conferMessage_s.call(this,id);
        },
        select_Change(val){  //表格选择事件
            this.multiple = val;
        },
        look_over(id){
            this.confDetail = {
                name: '',
                time_s: '',
                time_e: '',
                status: '',
                content: '',
                adress: '',
                url: '',
                eclo: [],
            };
            info.conferMeetDetail_s.call(this,id);
        },
        editConfer(id){  //编辑会议
            this.CONFERID = id;
            this.EDITCARD = true;
            this.conferManage_1 = false;
            this.conferManage_2 = true;
        },
        delete_all(){
            this.delStatus = true;
            info.conferMeetdel_s.call(this,this.multiple);
        },
        deleteOne(id){
            info.conferMeetdel_s.call(this,id);
        },
        Close_mask(){
            this.Dailog = false;
        },
        EDITBACK(){
            this.EDITCARD = false;
            this.conferManage_1 = true;
            this.conferManage_2 = false;
        },
        conferSearch(){  //搜索显示
            info.conferMeetList_s.call(this,this.materialParams,this.conferStatus,this.conferTheme);
        }
    },
    watch: {

    }
}
</script>
 
<style>

</style>
