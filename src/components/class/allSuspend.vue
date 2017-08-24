<template>
    <div>
        <!-- 停课列表 -->
        <div v-if="suspend_list">
            <div class="sus_header">
                <el-row :span="24">
                    <el-col :span="13">
                        <el-form ref="form" label-width="80px">
                            <el-form-item label="操作日期">
                                <el-col :span="5">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="search_begin" style="width: 100%;"></el-date-picker>
                                </el-col>
                                <el-col class="line" :span="1" style="text-align: center">至</el-col>
                                <el-col :span="5">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="search_end" style="width: 100%;" :picker-options="pickerOptions1" :disabled="canNot"></el-date-picker>
                                </el-col>
                                <el-col :span="2" style="text-align: right;">
                                    <el-button type="primary" size="small" @click="sus_filter">确定</el-button>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="11" style="text-align: right;">
                        <el-button type="primary" size="small" @click="add_suspend">新增停课</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="sus_table">
                <el-table :data="suspendData" style="width: 100%">
                    <el-table-column prop="start" label="开始时间"></el-table-column>
                    <el-table-column prop="end" label="结束时间"></el-table-column>
                    <el-table-column prop="why" label="停课原因"></el-table-column>
                    <el-table-column prop="who" label="操作人"></el-table-column>
                    <el-table-column prop="when" label="操作日期"></el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
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
            </div>
        </div>

        <!-- 新增停课 -->
        <div v-if="suspend_add">
            <div class="l_virtual_wraper">
                <div class="form_group">
                    <ul class="clearfloat">
                        <li class="header">停课范围：</li>
                        <li>全校</li>
                    </ul>
                </div>
                <div class="form_group">
                    <ul class="clearfloat">
                        <li class="header">停课时间：</li>
                        <li>
                            <div class="inline-block">
                                <el-date-picker v-model="addStart" type="datetime" placeholder="选择日期"></el-date-picker>
                            </div>
                            <div class="inline-block middle_zhi">至</div>
                            <div class="inline-block">
                                <el-date-picker v-model="addEnd" type="datetime" placeholder="选择日期" :picker-options="pickerOptions2" :disabled="canNotc"></el-date-picker>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="form_group">
                    <ul class="clearfloat">
                        <li class="header">停课原因：</li>
                        <li style="width: 550px;height: auto;line-height: 23px;">
                           <el-input type="textarea" v-model="susReason"></el-input>
                        </li>
                    </ul>
                </div>
                <div class="form_group">
                    <ul class="clearfloat">
                        <li class="header"></li>
                        <li>
                            <el-button type="primary" @click.native="susAdd">保存</el-button>
                            <el-button @click.native="susCancel">取消</el-button>
                        </li>
                    </ul>
                </div>
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
            suspend_list: true,
            suspend_add: false,
            search_begin: '',
            search_end: '',
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
        }
    },
    created() {
        if(this.state == 2){
            info.suspendLog.call(this,this.pageParams,this.search_begin,this.search_end);
        }
    },
    components: {
        
    },
    methods: {
        add_suspend(){  //新增停课
            this.suspend_list = false;
            this.suspend_add = true;
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
        sus_Cancel(rid){   //取消停课
            info.suspendCancel.call(this,rid);
        },
        sus_filter(){
            info.suspendLog.call(this,this.pageParams,this.search_begin,this.search_end);
        },
        handleSizeChange(val) {
            this.pageParams.one_pagenum = val;
            info.suspendLog.call(this,this.pageParams,this.search_begin,this.search_end);
        },
        handleCurrentChange(val) {
            this.pageParams.curpage = val;
            info.suspendLog.call(this,this.pageParams,this.search_begin,this.search_end);
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
