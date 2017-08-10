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
                    <div v-if="stateObj.one">
                        <el-row :gutter="10" class="class-header">
                            <el-col :span="19" class="class-titles">
                                <el-button type="primary" icon="plus" size="small" @click="addDladogUser">添加成员</el-button>
                                <span>
                                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="studentRefresh" />刷新-共1条记录</span>
                                <span>当前总人数：
                                    <a class="red-color">1</a>人</span>
                                <span>男生：
                                    <a class="cheng-color">2</a>人</span>
                                <span>女生：
                                    <a class="cheng-color">3</a>人</span>
                            </el-col>
                            <el-col :span="5">
                                <el-input placeholder="输入名称" icon="search" size="small" v-model="obj.search" :on-icon-click="handleIconClick">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="4" style="position:relative">
                                <div class="kd-children">
                                    <div class="kd-children-title">
                                        <el-row>
                                            <el-col :span="12">
                                                <span>
                                                    部门结构
                                                </span>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-button type="primary" size="mini" style="" class=" float-right r-zz-ok" @click="departmentManagement">管理</el-button>
                                            </el-col>
                                        </el-row>
    
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
                                    <!-- <el-table-column label="学号" width="80" prop="id">
                                                                                                                                                    </el-table-column> -->
                                    <el-table-column prop="teacher_name" label="姓名" width="100" show-overflow-tooltip>
                                    </el-table-column>
                                    <!-- <el-table-column prop="t_name" label="用户名" show-overflow-tooltip>
                                                                                                                                                                </el-table-column> -->
                                    <el-table-column prop="username" label="用户名" width="100" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="position_name" label="职位" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column label="性别" show-overflow-tooltip>
                                        <template scope="scope">
                                            {{scope.row.teacher_sex=='1'?'保密':(scope.row.teacher_sex=='2'?'男':'女')}}
                                        </template>
                                    </el-table-column>
                                    <!--   <el-table-column prop="sex" label="性别" width="70" show-overflow-tooltip>
                                                                               </el-table-column>
                                                                                  <el-table-column prop="t_name" label="实体班" width="90" show-overflow-tooltip>
                                                                                   </el-table-column> -->
                                    <!-- <el-table-column prop="t_name" label="虚拟班" show-overflow-tooltip>
                                                                                  </el-table-column> -->
                                    <el-table-column prop="teacher_phone" label="电话" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="role_name" label="角色" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column label="操作" width="150" show-overflow-tooltip>
                                        <template scope="scope">
                                            <el-button size="mini" @click="setStu(scope.row)">编辑</el-button>
                                            <el-button size="mini" @click="selectStudent(scope.row.teacher_id)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
    
                                <div class="kd-page">
                                    <el-row>
                                        <el-col :span="12">
                                            <!-- <el-checkbox label="全选" style="margin-right:20px" v-model="checked"></el-checkbox> -->
                                            <!-- <el-select v-model="obj.name" placeholder="请选择" size="mini" class="margin-left">
                                                                                                                        <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
                                                                                                                        </el-option>
                                                                                                                    </el-select> -->
                                            <!-- <el-button type="primary" size="mini" @click="selectStudent('')">删除</el-button> -->
                                            <el-button type="primary" size="mini" @click="selectStudent">删除</el-button>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-pagination class="float-right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 15, 20, 25]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="1">
                                            </el-pagination>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div v-else>
                        <div v-if="oneStatus==1">
                            <el-row :gutter="10" class="class-header">
                                <el-col :span="19" class="class-titles">
                                    <el-button type="primary" icon="plus" size="small" @click="addClassOne(1)">增加分类</el-button>
                                    <span>
                                        <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="studentRefresh" />刷新-共1条记录</span>
                                    <span>当前总人数：
                                        <a class="red-color">1</a>人</span>
                                    <span>男生：
                                        <a class="cheng-color">2</a>人</span>
                                    <span>女生：
                                        <a class="cheng-color">3</a>人</span>
                                </el-col>
                                <el-col :span="5">
                                    <el-input placeholder="输入名称" icon="search" size="small" v-model="obj.search" :on-icon-click="handleIconClick">
                                    </el-input>
                                </el-col>
                            </el-row>
    
                            <el-table ref="multipleTable" :data="t_data" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" class="z-text-over">
                                <el-table-column type="selection" width="55">
                                </el-table-column>
                                <!-- <el-table-column label="学号" width="80" prop="id">
                                                                                                                                                    </el-table-column> -->
                                <el-table-column prop="teacher_name" label="姓名" width="100" show-overflow-tooltip>
                                </el-table-column>
                                <!-- <el-table-column prop="t_name" label="用户名" show-overflow-tooltip>
                                                                                                                                                                </el-table-column> -->
                                <el-table-column prop="username" label="用户名" width="100" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="position_name" label="职位" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column label="性别" show-overflow-tooltip>
                                    <template scope="scope">
                                        {{scope.row.teacher_sex=='1'?'保密':(scope.row.teacher_sex=='2'?'男':'女')}}
                                    </template>
                                </el-table-column>
                                <!--   <el-table-column prop="sex" label="性别" width="70" show-overflow-tooltip>
                                                                               </el-table-column>
                                                                                  <el-table-column prop="t_name" label="实体班" width="90" show-overflow-tooltip>
                                                                                   </el-table-column> -->
                                <!-- <el-table-column prop="t_name" label="虚拟班" show-overflow-tooltip>
                                                                                  </el-table-column> -->
                                <el-table-column prop="teacher_phone" label="电话" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="role_name" label="角色" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column label="操作" width="150" show-overflow-tooltip>
                                    <template scope="scope">
                                        <el-button size="mini" @click="setStu(scope.row)">编辑</el-button>
                                        <el-button size="mini" @click="selectStudent(scope.row.teacher_id)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
    
                            <div class="kd-page">
                                <el-row>
                                    <el-col :span="12">
                                        <!-- <el-checkbox label="全选" style="margin-right:20px" v-model="checked"></el-checkbox> -->
                                        <!-- <el-select v-model="obj.name" placeholder="请选择" size="mini" class="margin-left">
                                                                                                                        <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
                                                                                                                        </el-option>
                                                                                                                    </el-select> -->
                                        <!-- <el-button type="primary" size="mini" @click="selectStudent('')">删除</el-button> -->
                                        <el-button type="primary" size="mini" @click="selectStudent">删除</el-button>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-pagination class="float-right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 15, 20, 25]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="1">
                                        </el-pagination>
    
                                    </el-col>
                                </el-row>
    
                            </div>
                        </div>
                        <div v-if="oneStatus==2">
                            <architectureSet></architectureSet>
                        </div>
                    </div>
                </div>
                <div v-if="state==1">
                    <el-row :gutter="10" class="class-header">
                        <el-col :span="19" class="class-titles">
                            <span>
                                <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="studentRefresh" />刷新-共1条记录</span>
                            <span>当前总人数：
                                <a class="red-color">1</a>人</span>
    
                        </el-col>
                        <el-col :span="5">
                            <el-input placeholder="输入名称" icon="search" size="small" v-model="obj.search" :on-icon-click="handleIconClick">
                            </el-input>
                        </el-col>
                    </el-row>
    
                    <el-table ref="multipleTable" :data="t_data" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" class="z-text-over">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <!-- <el-table-column label="学号" width="80" prop="id">
                                                                                                                                                    </el-table-column> -->
                        <el-table-column prop="teacher_name" label="姓名" width="100" show-overflow-tooltip>
                        </el-table-column>
                        <!-- <el-table-column prop="t_name" label="用户名" show-overflow-tooltip>
                                                                                                                                                                </el-table-column> -->
                        <el-table-column prop="username" label="用户名" width="100" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="position_name" label="职位" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="性别" show-overflow-tooltip>
                            <template scope="scope">
                                {{scope.row.teacher_sex=='1'?'保密':(scope.row.teacher_sex=='2'?'男':'女')}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="teacher_phone" label="电话" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="role_name" label="角色" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="操作" width="150" show-overflow-tooltip>
                            <template scope="scope">
                                <el-button size="mini" @click="setStu(scope.row)">编辑</el-button>
                                <el-button size="mini" @click="selectStudent(scope.row.teacher_id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
    
                    <div class="kd-page">
                        <el-row>
                            <el-col :span="12">
                                <el-button type="primary" size="mini" @click="selectStudent">删除</el-button>
                            </el-col>
                            <el-col :span="12">
                                <el-pagination class="float-right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 15, 20, 25]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="1">
                                </el-pagination>
    
                            </el-col>
                        </el-row>
    
                    </div>
    
                </div>
                <div v-if="state==2">
                    <addSetUser></addSetUser>
                </div>
                <div v-if="state==3">
                    <el-row :gutter="10" class="class-header">
                        <el-col :span="19" class="class-titles">
                            <span>
                                <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="studentRefresh" />刷新-共1条记录</span>
                            <span>当前总人数：
                                <a class="red-color">1</a>人</span>
    
                        </el-col>
                        <el-col :span="5">
                            <el-input placeholder="输入名称" icon="search" size="small" v-model="obj.search" :on-icon-click="handleIconClick">
                            </el-input>
                        </el-col>
                    </el-row>
    
                    <el-table ref="multipleTable" :data="t_data" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" class="z-text-over">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
    
                        <el-table-column prop="position_name" label="职位" show-overflow-tooltip>
    
                        </el-table-column>
                        <el-table-column label="操作" width="150" show-overflow-tooltip>
                            <template scope="scope">
                                <el-button size="mini" @click="setStu(scope.row)">编辑</el-button>
                                <el-button size="mini" @click="selectStudent(scope.row.teacher_id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
    
                    <div class="kd-page">
                        <el-row>
                            <el-col :span="12">
                                <el-button type="primary" size="mini" @click="selectStudent">删除</el-button>
                            </el-col>
                            <el-col :span="12">
                                <el-pagination class="float-right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 15, 20, 25]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="1">
                                </el-pagination>
    
                            </el-col>
                        </el-row>
    
                    </div>
                </div>
                <div v-if="state==4">
                    <!--增加职位  -->
                    <section class="add-inp">
                        <div class="add-inp-items">
    
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    职位名称：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-input v-model="sex" placeholder=""></el-input>
                                </div>
                            </div>
    
                            <div class="add-inp-btn">
                                <div class="add-inp-item-name">
                                </div>
                                <el-button type="primary">保存</el-button>
                                <el-button>取消</el-button>
                            </div>
                        </div>
                    </section>
                </div>
                <div v-if="state==6">
                    <!--编辑组织架构 添加  -->
    
                </div>
            </div>
            <bottomItem></bottomItem>
        </div>
        <div class="r-dialog" v-if="is_dialog">
            <!--添加成员  -->
            <div class="r-dialog-box">
                <p class="r-dialog-head">
                    <span class="r-dialog-title">添加成员</span>
                </p>
                <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入城市拼音" v-model="value2" :data="data2">
                </el-transfer>
                <p class="r-dialog-btns">
                    <el-button type="primary" size="small" @click="dialog_ok">确定</el-button>
                    <el-button type="primary" size="small" @click="is_dialog=false">取消</el-button>
                </p>
            </div>
    
        </div>
    </div>
</template>

<script>
import titleItem from '@/components/main/title.vue'
import titleActive from '@/components/main/titleActive.vue'
import description from '@/components/main/description.vue'
import bottomItem from '@/components/bottom/bottom.vue'
import architectureSet from '@/components/architecture/set.vue'
import addSetUser from '@/components/architecture/addSetUser.vue'
import store from '@/utils/architecture'
export default {
    data() {
        return {
            titleItem: [
                { name: "部门管理", index: 0 },
                { name: "用户管理", index: 1 },
                { name: "增加用户", index: 2 },
                { name: "职位管理", index: 3 },
                { name: "增加职位", index: 4 },
            ],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 0,
            promptsPad: true,
            obj: {
                search: "",
                curpage: 1,
                department_id: '',
                pagesize: 10
            },
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            t_data: [],
            sdata: [],
            data2: [],
            value2: [],
            filterMethod(query, item) {
                // 弹框左右选择列表
                return item.teacher_name.indexOf(query) > -1;
            },
            is_dialog: false,//选择模态框 
            stateObj: {
                one: true,//部门管理
            },//管理子分类展示
            oneStatus: 1

        }
    },
    created() {
        // 组织架构管理
        store.department_list.call(this, this.sdata);
        this.dataAjax();
        this.Visible = true;
    },
    components: {
        titleItem, titleActive, description, bottomItem, architectureSet, addSetUser
    },
    methods: {
        emitTransfer(index) {
            if (this.state == index) {
                return
            }
            this.state = index;
            this.reset();
        },
        reset() {
            // 默认清除js设置
            this.stateObj.one = true;
            this.oneStatus = 1;
        },
        promptsTem(status) {
            console.log(status)
        },
        dataAjax() {
            store.department_index.call(this, this.obj, this.t_data)
        },
        addStudent() {
            // 添加成员
        },
        studentRefresh() {
            // 刷新
        },
        handleCurrentChange(val) {
            console.log(val)

        },
        handleSizeChange(val) {
            this.obj.pagesize = val;
            this.dataAjax()
        },
        handleSelectionChange(obj) {
            console.log(obj, 1)
        },
        handleNodeClick(obj) {
            // 左侧关系栏点击
            if (obj) {
                this.obj.department_id = obj.department_id;
                this.dataAjax()
            }
        },
        handleIconClick(obj) {
            this.dataAjax()
        },
        setStu() {
            // 编辑
            this.oneStatus = 1;
            this.stateObj.one = false;
        },
        selectStudent() {
            // 删除
        },
        addDladogUser() {
            // 添加成员
            this.is_dialog = true;
            store.addDladogUser.call(this, this.obj.department_id)
        },
        dialog_ok() {
            // 提交用户添加
            store.dladogUserPush.call(this, this.obj.department_id);
        },
        departmentManagement() {
            // 部门点击管理列表
            this.oneStatus = 1;
            this.stateObj.one = false;
        },
        addClassOne(state) {
            // 部门管理增加分类
            if (state == 1) {
                this.oneStatus = 2;
                this.stateObj.one = false;
            }
        }
    },
    watch: {
        value2(obj) {
            console.log(obj)
        }
    }
}
</script>
 
<style scoped>

</style>
