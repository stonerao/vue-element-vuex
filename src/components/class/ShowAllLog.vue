<template>
    <div>
        <!-- 停课列表 -->
        <div v-if="suspend_list">
            <div class="showLog_outer sus_header">
                <el-row :span="24">
                    <el-col :span="19">
                        <el-form ref="form" label-width="80px">
                            <el-form-item label="操作日期">
                                <el-col :span="5" style="max-width: 200px;">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="search_begin" style="width: 100%;"></el-date-picker>
                                </el-col>
                                <el-col class="line" :span="1" style="text-align: center">至</el-col>
                                <el-col :span="5" style="max-width: 200px;">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="search_end" style="width: 100%;" :picker-options="pickerOptions1" :disabled="canNot"></el-date-picker>
                                </el-col>
                                <el-col :span="2" style="text-align: right;padding-right: 12px;">类型</el-col>
                                <el-col :span="4" style="max-width: 200px;">
                                    <el-select v-model="search_type" clearable placeholder="请选择">
                                        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="2" style="text-align: left;margin-left: 25px">
                                    <el-button type="primary" size="small" @click="sus_filter">确定</el-button>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="5" style="text-align: right;">
                        <el-button type="primary" size="small" @click="add_suspend">返回</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="sus_table">
                <el-table :data="suspendData" style="width: 100%">
                    <el-table-column prop="type" label="类型"></el-table-column>
                    <el-table-column prop="why" label="原因"></el-table-column>
                    <el-table-column prop="who" label="操作人"></el-table-column>
                    <el-table-column prop="when" label="操作日期"></el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button type="primary" size="small" @click.native="showDetail(scope.row.record)">查看详情</el-button>
                            <el-button type="primary" size="small" v-if="scope.row.whether == 1" @click.native="sus_Cancel(scope.row.record)">取消</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="kd-page">
                    <el-row>
                        <el-col :span="24">
                            <el-pagination class="float-right" :current-page="pageParams.curpage" :page-sizes="[15, 20, 25, 30]" :page-size="pageParams.page_count" layout="total, sizes, prev, pager, next, jumper" :total="pageParams.total_num" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                            </el-pagination>
                        </el-col>
                    </el-row>
                </div>
                <div class="myDialog">
                    <div class="ownDailog" @click="Close_mask" v-if="Dailog">
                        <div class="close_btn">
                            <i class="el-icon-close"></i>
                        </div>
                        <div class="content">
                            <el-row>
                                <el-col :span="4">操作日期</el-col>
                                <el-col :span="1">：</el-col>
                                <el-col :span="19">{{dailogDetail.time}}</el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4">操作类型</el-col>
                                <el-col :span="1">：</el-col>
                                <el-col :span="19">{{dailogDetail.type}}</el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4">操作人</el-col>
                                <el-col :span="1">：</el-col>
                                <el-col :span="19">{{dailogDetail.people}}</el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4">原因</el-col>
                                <el-col :span="1">：</el-col>
                                <el-col :span="19">{{dailogDetail.reason}}</el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="dialog_mask" v-if="Dailog" @click="Close_mask"></div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import info from '@/utils/l_axios'

export default {
    props: ['ClassIdentity','GradeIdentity','IDCard'],
    data() {
        return {
            suspend_list: true,
            suspend_add: false,
            search_begin: '',
            search_end: '',
            search_type: '',
            canNot: true,
            canNotc: true,
            pickerOptions1: {},
            pickerOptions2: {},
            suspendData: [],   //表数据
            pageParams: {   //翻页
                hasmore: true,
                curpage: 1,//当前页数
                one_pagenum: 10,
                page_count: 1,//总页数
                total_num: 0
            },
            addStart: '',  //停课开始时间
            addEnd: '',  //结束时间
            susReason: '',  //原因
            typeList: [{  //类型
              value: '1',
              label: '调课'
            }, {
              value: '2',
              label: '停课'
            }, {
              value: '3',
              label: '代课'
            }],
            Dailog: false,   //查看详情弹窗
            dailogDetail: {  //详情数据
                time: '',
                type: '',
                people: '',
                reason: '',
            }
        }
    },
    created() {
        if(this.ClassIdentity){   //班级日志
            info.classGradeLog.call(this,this.IDCard,this.pageParams,this.search_begin,this.search_end,this.search_type);
        }else if(this.GradeIdentity){   //年级日志
            info.classGradeLog.call(this,this.IDCard,this.pageParams,this.search_begin,this.search_end,this.search_type);
        }
    },
    components: {
        
    },
    methods: {
        add_suspend(){  //新增停课
            this.$emit("SHOWLOGBACK");
        },
        susAdd(){  //保存
            info.suspendAdd.call(this,this.addStart,this.addEnd,this.susReason);
        },
        susCancel(){  //新增取消
            this.suspend_list = true;
            this.suspend_add = false;
        },
        formatAll(date){  //时间处理
            return info.formatYMDHMS.call(this,date);
        },
        sus_Cancel(rid){   //取消代课
            info.suspendCancel.call(this,rid);
        },
        sus_filter(){
           info.classGradeLog.call(this,this.IDCard,this.pageParams,this.search_begin,this.search_end,this.search_type);
        },
        showDetail(rid){   //弹窗+获取数据
            info.logDetail.call(this,rid);
        },
        Close_mask(){
            this.dailogDetail = {  //详情数据清空
                time: '',
                type: '',
                people: '',
                reason: ''
            };
            this.Dailog = false;
        },
        handleSizeChange(val) {
            this.pageParams.one_pagenum = val;
            info.classGradeLog.call(this,this.IDCard,this.pageParams,this.search_begin,this.search_end,this.search_type);
        },
        handleCurrentChange(val) {
            this.pageParams.curpage = val;
            info.classGradeLog.call(this,this.IDCard,this.pageParams,this.search_begin,this.search_end,this.search_type);
        },
    },
    watch:{
        search_begin(data){
            this.canNot = false;
            this.pickerOptions1 = {
                disabledDate(time) {
                    return time.getTime() < data.getTime() + 24*60*60*1000;
                }
            };
        },
        addStart(data){
            this.canNotc = false;
            this.pickerOptions2 = {
                disabledDate(time) {
                    return time.getTime() < data.getTime() + 24*60*60*1000;
                }
            };
        },
    }
}
</script>
 
<style scoped>

</style>
