<template>
    <div class="kd-app-main student">
        <titleItem :titleText="$route.name.substring(1)"></titleItem>
        <div class="kd-box">
            <div class="kd-app-box">
                <titleActive :titles="titleItem" @Transfer="emitTransfer" :state="state"></titleActive>
            </div>
            <div class="kd-box-content">
                <description :prompts="prompts" @PromPts="promptsTem"></description>
                <div v-if="state==0">
                    <el-row :gutter="10" class="class-header">
                        <el-col :span="19" class="class-titles">
                            <el-button type="primary" icon="plus" size="small">增加学生</el-button>
                            <el-button type="primary" icon="plus" size="small">批量导入</el-button>
                            <span>
                                <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" />刷新-共287条记录</span>
                            <span>当前总人数：
                                <a class="red-color">654654</a>人</span>
                            <span>男生：
                                <a class="cheng-color">654654</a>人</span>
                            <span>女生：
                                <a class="cheng-color">654654</a>人</span>
                        </el-col>
                        <el-col :span="5">
                            <el-input placeholder="输入名称" icon="search" size="small" v-model="search" :on-icon-click="handleIconClick">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="4" style="position:relative">
                            <div class="kd-children">
                                <div class="kd-children-title">
                                    <span>
                                        部门结构
                                    </span>
                                </div>
                                <div class="kd-children-box">
                                    <el-tree :data="sdata" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="20">
                            <el-table ref="multipleTable" :data="t_data" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" class="z-text-over">
                                <el-table-column type="selection" width="55">
                                </el-table-column>
                                <el-table-column label="学号" width="80" prop="id">
                                </el-table-column>
                                <el-table-column prop="st_name" label="姓名" width="80" show-overflow-tooltip>
                                </el-table-column>
                                <!-- <el-table-column prop="t_name" label="用户名" show-overflow-tooltip>
                                        </el-table-column> -->
                                <el-table-column prop="cer" label="证件类型" width="100" show-overflow-tooltip>
                                </el-table-column> -->
                                <el-table-column prop="st_certificates_number" label="证件号" show-overflow-tooltip>
                                </el-table-column>
                                <!--   <el-table-column prop="sex" label="性别" width="70" show-overflow-tooltip>
        
                                    </el-table-column>
                                      <el-table-column prop="t_name" label="实体班" width="90" show-overflow-tooltip>
                                        </el-table-column> -->
                                <!-- <el-table-column prop="t_name" label="虚拟班" show-overflow-tooltip>
                                    </el-table-column> -->
                                <el-table-column prop="st_phone" label="电话" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="status" label="状态号码" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column label="操作" width="150" show-overflow-tooltip>
                                    <template scope="scope">
                                        <el-button size="small" @click="setStu(scope.row)">编辑</el-button>
                                        <el-button size="small">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="kd-page">
                                <el-row>
                                    <el-col :span="12" style="padding-left:15px">
                                        <el-checkbox label="全选" style="margin-right:20px" v-model="checked"></el-checkbox>
                                        <!-- <el-select v-model="search" placeholder="请选择" size="small" class="margin-left">
                                                <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
                                                </el-option>
                                            </el-select> -->
                                        <el-button type="primary" size="mini">删除</el-button>
                                        <el-button type="primary" size="mini">激活</el-button>
                                        <el-button type="primary" size="mini">毕业</el-button>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-pagination class="float-right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="studentList.curpage" :page-sizes="[10, 15, 20, 25]" :page-size="studentList.page_count" layout="total, sizes, prev, pager, next, jumper" :total="studentList.total_num">
                                        </el-pagination>
    
                                    </el-col>
                                </el-row>
    
                            </div>
                        </el-col>
    
                    </el-row>
    
                </div>
                <div v-if="state==1">
    
                </div>
                <div v-if="state==2"></div>
                <div v-if="state==3">
    
                </div>
                <div v-if="state==5">
                    <!-- 编辑学生  -->
                    <studentSetVue :state="setState" :dataObj="setObj"></studentSetVue>
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
import studentSetVue from '@/components/student/set'
import store from '@/utils/l_axios' 
export default {
    data() {
        return {
            titleItem: [
                { name: "在校学生", index: 0 },
                { name: "虚拟班", index: 1 },
                { name: "离校学生", index: 2 },
                { name: "档案查询", index: 3 },
            ],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 0,
            promptsPad: true,
            t_data: [],
            search: '',
            curpage: 1,//当前页数
            t_input: '',
            sex: '1',
            value1: '',//日期
            checked: '',
            studentList: {
                hasmore: true,
                curpage: 1,//当前页数
                st_sex: '',
                st_name: '',
                one_pagenum: 10,
                page_count: 1,//总页数
                teach_subject: '',
                total_num: 0,
                st_status: ''
            },
            sdata: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            setState: 0,//1添加学生信息。 2是编辑,
            setObj: {}
        }
    },
    created() {
        // 总课表初始加载数据
        store.timetable_list.call(this)
    },
    components: {
        titleItem, titleActive, description, bottomItem, studentSetVue
    },
    mounted(){
 
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
        handleIconClick(val) {
            // 搜索触发事件
            // console.log(val)
        },
        handleSelectionChange(val) {
            // 选择发生改变
            let arr = [];
            val.forEach((x) => {
                arr.push(x.st_id)
            })
            console.log(arr)
            // this.multipleSelection = val;
        },
        handleRemove(file, fileList) {
            // 上传图片
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            // 上传图片
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        studentlist() {
            store.studentlist.call(this)
        },
        handleNodeClick(data) {
            // 展开页面
            console.log(data);
        },
        studentAjax() {
            store.studentlist.call(this);
        },
        handleSizeChange(val) {
            //一页数量
            console.log(val)
            this.studentList.one_pagenum = val;
            this.studentAjax();
        },
        handleCurrentChange(val) {
            // 当前页数
            this.studentList.curpage = val;
            this.studentAjax();
        },
        setStu(obj) {
            // 编辑学生 
            this.setObj = obj;
            this.state = 5;
        }
    },
    watch: {
        checked(val) {
            if (val) {
                console.log(this.t_data)
                this.t_data.forEach((x) => {
                    this.$refs.multipleTable.toggleRowSelection(x)
                })

            } else {
                this.$refs.multipleTable.clearSelection();
            }
        }
    }
}
</script>
 
<style scoped>

</style>
