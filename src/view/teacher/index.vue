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
                    <el-row :gutter="10" class="class-header">
                        <el-col :span="12" class="class-titles">
                            <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor" @click="storeAjax" />刷新-共 {{tracherList.total_num}} 条记录
                        </el-col>
                        <el-col :span="4">
                            <el-select v-model="tracherList.teach_subject" placeholder="请选择科目" size="small" class="margin-left">
                                <el-option v-for="item in teacher_kemu.items" :key="item.name" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-select v-model="tracherList.teacher_sex" placeholder="请选择性别" size="small" class="margin-left">
                                <el-option v-for="item in sexList" :key="item.name" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-input placeholder="请输入老师姓名" icon="search" size="small" v-model="tracherList.teacher_name" :on-icon-click="handleIconClick">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-table ref="multipleTable" :data="t_data" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" class="z-text-over">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column label="ID" width="80" prop="teacher_id"></el-table-column>
                        <el-table-column prop="teacher_name" label="老师姓名" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="teacher_name" label="用户名" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="teacher_sex" label="性别" width="80"></el-table-column>
                        <el-table-column prop="teacher_phone" label="联系电话" width="200"></el-table-column>
                        <el-table-column prop="teach_subject_name" label="教学科目" show-overflow-tooltip></el-table-column>
                        <el-table-column label="操作" width="150">
                            <template scope="scope">
                                <el-button size="small" @click="setTeacher(scope.row)">编辑</el-button>
                                <el-button size="small" @click="deleteTeacher(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="kd-page">
                        <el-row>
                            <el-col :span="0">
                                <!-- style="padding-left:15px"  -->
                                <!-- <el-checkbox label="全选"></el-checkbox> -->
                                <!-- <el-select v-model="search" placeholder="请选择" size="small" class="margin-left">
                                                                                <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
                                                                                </el-option>
                                                                            </el-select> -->
                            </el-col>
                            <el-col :span="24">
                                <el-pagination class="float-right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tracherList.curpage" :page-sizes="[10, 15, 20, 25]" :page-size="tracherList.page_count" layout="total, sizes, prev, pager, next, jumper" :total="tracherList.total_num">
                                </el-pagination>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div v-if="state==1">
                    <!-- 增加老师 -->
                    <settracher @TeacherInfos="addTeacherTab" :kemu="kemu" state="1"></settracher>
                </div>
                <div v-if="state==2">
                    <excelImport></excelImport>
                </div>
                <div v-if="state==3">
                    <settracher @TeacherSet="SetTeacherTab" state="2" :kemu="kemu" :obj="teacherObj" @QUIT="quitTeacherSet"></settracher>
                </div>
            </div>/
            
    
            <bottomItem></bottomItem>
        </div>
    </div>
</template>

<script>
import titleItem from '@/components/main/title.vue'
import titleActive from '@/components/main/titleActive.vue'
import description from '@/components/main/description.vue'
import bottomItem from '@/components/bottom/bottom.vue'
import settracher from '@/components/teacher/set'
import excelImport from '@/components/center/excelImport.vue'
import store from '@/utils/teacher'
export default {
    data() {
        return {
            titleItem: [
                { name: "老师管理", index: 0 },
                { name: "增加老师", index: 1 },
                { name: "批量导入老师", index: 2 },
            ],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 0,
            promptsPad: true,
            t_data: [],
            search: '',
            t_input: '',
            curpage: 1,//当前页数
            sex: '1',
            tracherList: {
                hasmore: true,
                curpage: 1,//当前页数
                teacher_sex: '',
                teacher_name: '',
                one_pagenum: 10,
                page_count: 1,//总页数
                teach_subject: '',
                total_num: 0
            },
            sexList: [
                // 性别列表
                { name: '全部', id: '' },
                { name: '保密', id: 1 },
                { name: '男', id: 2 },
                { name: '女', id: 3 },
            ],
            teacher_kemu: {
                // 科目列表
                items: [{
                    name: '全部',
                    id: '',
                    time: '',
                    school_identify: ''
                }],
                value: ""
            },
            addInfo: {
                member_name: "",//用户名
                password: "",//密码
                teacher_name: "",//姓名
                teacher_sex: "",//性别 1:保密，2:男,3:女，必填
                teacher_phone: "",//联系电话
                teach_subject: "",//教学科目
                teacher_desc: "",//老师简介 
            },
            kemu: [],
            teacherObj: {}
        }
    },
    created() {
        // 当前列表数据
        this.storeAjax();
        // 选择科目列表
        store.subjectlist.call(this);
    },
    components: {
        titleItem, titleActive, description, bottomItem, excelImport, settracher
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
            console.log(this.tracherList.teacher_name);
            this.storeAjax();
        },
        handleSelectionChange(val) {
            // 选择发生改变
            console.log(val)
            this.multipleSelection = val;
        },
        storeAjax() {
            console.log(1)
            store.teacher_list.call(this);
        },
        handleSizeChange(val) {
            //一页数量
            console.log(val)
            this.tracherList.one_pagenum = val;
            this.storeAjax();
        },
        handleCurrentChange(val) {
            // 当前页数
            this.tracherList.curpage = val;
            this.storeAjax();
        },
        teacher_add() {
            // 添加老师
            store.addTeacher.call(this);
        },
        addTeacherTab(form) {
            // 增加老师 
            store.addTeacher.call(this, form)
        },
        deleteTeacher(obj) {
            // 删除
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                store.deleteTeacher.call(this, obj.teacher_id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        setTeacher(obj) {
            this.state = 3;
            this.teacherObj = obj;
        },
        SetTeacherTab(obj, id) {
            // 设置老师传回来事件
            console.log(obj)
            obj.number_id = id;
            store.setTeacher.call(this, obj)
        },
        quitTeacherSet(num) {
            this.state = num;
        }
    }
}
</script>
 
<style scoped>

</style>
