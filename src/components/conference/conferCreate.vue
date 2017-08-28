<template>
    <div>
        <!--会议管理-->
        <div v-if="state==0">
            <div class="l_mater_header">
                <el-row :gutter="15">
                    <el-col :span="6">
                        <img src="../../assets/index/shuaxin.png" class="icon-img-xs" />刷新-共{{materialParams.total_num}}条记录
                    </el-col>
                    <el-col :span="18" class="mater_search clearfloat">
                        <el-col :span="5">
                            <el-input placeholder="输入会议主题名称" style="" v-model="conferTheme">
                                <el-button slot="append" icon="search"></el-button>
                            </el-input>
                        </el-col>
                        <el-col :span="3">
                            <el-select v-model="conferStatus" placeholder="会议状态">
                                <el-option v-for="item in conferList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                        </el-col>
                    </el-col>
                </el-row>
            </div>
            <div class="l_mater_table">
                <el-table ref="multipleTable" :data="conferManaList" border tooltip-effect="dark" style="width: 100%" @selection-change="select_Change">
                    <el-table-column type="selection" width="48"></el-table-column>
                    <el-table-column label="ID" prop="id"></el-table-column>
                    <el-table-column label="会议主题" prop="theme"></el-table-column>
                    <el-table-column label="会议时间" prop="time"></el-table-column>
                    <el-table-column label="创建时间" prop="creTime"></el-table-column>
                    <el-table-column label="创始人" prop="people"></el-table-column>
                    <el-table-column label="操作" prop="handle">
                        <template scope="scope">
                            <el-button type="primary" size="mini" icon="view" @click.native="look_over">查看</el-button>
                            <el-button type="primary" size="mini" icon="edit" @click.native="edit">编辑</el-button>
                            <el-button type="primary" size="mini" icon="delete" @click.native="delete">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="l_mater_footer">
                <el-row :span="24">
                    <el-col :span="6">
                        <div class="footer_search">
                            <el-select v-model="footerVal" size="small" placeholder="请选择" style="margin-right: 5px;max-width: 160px;">
                                <el-option v-for="item in footerList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                            <el-button type="primary" size="mini">确定</el-button>
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
        </div>
    </div>
</template>

<script>
import titleItem from '@/components/main/title.vue'
import titleActive from '@/components/main/titleActive.vue'
import description from '@/components/main/description.vue'
import bottomItem from '@/components/bottom/bottom.vue'
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
            conferList: '',  //会议状态选择框数据初始
            conferStatus: '', //会议状态
            conferTheme: '',  //search会议主题
            footerList: '',
            footerVal: '',
            multiple: [],  //素材管理表选择值
            conferManaList: [{
                    theme: '会议',
                },
            ],   //素材管理表数据
        }
    },
    created() {
        if(this.schoolManageCenter){  //学校-创建会议

        }else if(this.teacherManageCenter){  //老师-创建会议

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
        handleSizeChange(val) {
            this.materialParams.one_pagenum = val;
            if(this.state == 1){
                // info.timeTable.call(this,this.materialParams,this.graClaId);
            }
        },
        handleCurrentChange(val) {
            this.materialParams.curpage = val;
            if(this.state == 1){
                // info.timeTable.call(this,this.materialParams,this.graClaId);
            }
        },
        select_Change(val){  //表格选择事件
            console.log(val);
            this.multiple = val;
        },
        look_over(){

        },
        edit(){

        },
        delete(){

        },
    }
}
</script>
 
<style scoped>

</style>
