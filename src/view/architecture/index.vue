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
                                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="studentRefresh" />刷新-共{{bm_page_count}}条记录</span>
    
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
                                    <el-table-column prop="teacher_name" label="姓名" width="100" show-overflow-tooltip>
                                    </el-table-column>
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
                                            <el-button size="mini" @click="delectTearcher(scope.row.teacher_id)">删除</el-button>
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
                            </el-col>
                        </el-row>
                    </div>
                    <div v-else>
                        <div v-if="oneStatus==1">
                            <addSetUser state="1" :dataObj="dataObj" @QUITQROUP="QUITQROUP"></addSetUser>
                        </div>
                        <div v-if="oneStatus==2">
                            <architectureSet :objData="sdata"></architectureSet>
                        </div>
                    </div>
                </div>
                <div v-if="state==1">
                    <el-row :gutter="10" class="class-header">
                        <el-col :span="19" class="class-titles">
                            <span>
                                <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="studentRefresh" />刷新-共1条记录</span>
                            <span>当前总人数：
                                <a class="red-color">{{userList.page_total}}</a>人</span>
    
                        </el-col>
                        <el-col :span="5">
                            <el-input placeholder="输入名称" icon="search" size="small" v-model="userList.search" :on-icon-click="userListIconClick">
                            </el-input>
                        </el-col>
                    </el-row>
    
                    <el-table ref="multipleTable" :data="userList.items" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" class="z-text-over">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column prop="teacher_name" label="姓名" width="100" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="member_name" label="用户名" width="100" show-overflow-tooltip>
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
                        <el-table-column prop="member_role_text" label="角色" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="操作" width="150" show-overflow-tooltip>
                            <template scope="scope">
                                <el-button size="mini" @click="setUserClick(scope.row)">编辑</el-button>
                                <el-button size="mini" @click="delectTearcher(scope.row.number_id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
    
                    <div class="kd-page">
                        <el-row>
                            <el-col :span="12">
                                <el-button type="primary" size="mini" @click="selectStudent">删除</el-button>
                            </el-col>
                            <el-col :span="12">
                                <el-pagination class="float-right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="userList.page" :page-sizes="[10, 15, 20, 25]" :page-size="userList.curpage" layout="total, sizes, prev, pager, next, jumper" :total="userList.page_total">
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
                                <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="positionRefresh" />刷新-共{{positionList.page_total}}条记录</span>
    
                        </el-col>
                        <el-col :span="5">
                            <el-input placeholder="输入名称" icon="search" size="small" v-model="positionList.search" :on-icon-click="positionListIconClick">
                            </el-input>
                        </el-col>
                    </el-row>
    
                    <el-table ref="multipleTable" :data="positionList.items" tooltip-effect="dark" style="width: 100%" @selection-change="positionSelectionChange" class="z-text-over">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
    
                        <el-table-column prop="position_name" label="职位" show-overflow-tooltip>
    
                        </el-table-column>
                        <el-table-column label="操作" width="150" show-overflow-tooltip>
                            <template scope="scope">
                                <el-button size="mini" @click="setPositionUser(scope.row)">编辑</el-button>
                                <el-button size="mini" @click="DeletePositionUser(scope.row.position_id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
    
                    <div class="kd-page">
                        <el-row>
                            <el-col :span="12">
                                <el-button type="primary" size="mini" @click="PositionSelectStudent">删除</el-button>
                            </el-col>
                            <el-col :span="12">
                                <el-pagination class="float-right" @size-change="handleSizeChange" @current-change="positionCurrentChange" :current-page="positionList.page" :page-sizes="[positionList.curpage]" :page-size="positionList.curpage" layout="total, sizes, prev, pager, next, jumper" :total="positionList.page_total">
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
                                    <el-input v-model="userPositionVal" placeholder=""></el-input>
                                </div>
                            </div>
    
                            <div class="add-inp-btn">
                                <div class="add-inp-item-name">
                                </div>
                                <el-button type="primary" @click="addUserPosition">保存</el-button>
                                <el-button @click="quitUserPosotion">取消</el-button>
                            </div>
                        </div>
                    </section>
                </div>
                <div v-if="state==6">
                    <!--编辑组织架构 编辑 -->
                    <addSetUser state="1" :dataObj="dataObj" @QUITQROUP="QUITQROUP"></addSetUser>
                </div>
                <div v-if="state==7">
                    <!--编辑职位  -->
                    <section class="add-inp">
                        <div class="add-inp-items">
    
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    职位名称：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-input v-model="setUserPositionVal" placeholder=""></el-input>
                                </div>
                            </div>
    
                            <div class="add-inp-btn">
                                <div class="add-inp-item-name">
                                </div>
                                <el-button type="primary" @click="setUserPosition">保存</el-button>
                                <el-button @click="quitUserPosition">取消</el-button>
                            </div>
                        </div>
                    </section>
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
                <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入查询关键字" v-model="value2" :data="data2">
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
            bm_page_count: '',//部门总条数
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
            oneStatus: 1,
            selectArr: [],//多选存储数组  
            dataObj: {},//编辑
            delecetArr: [],//点击选择数组 存储id
            userList: {
                search: "",
                curpage: 10,
                department_id: '',
                page: 1,
                page_total: 0,//总页数
                items: []
            },
            userPositionVal: "",//添加职位
            setUserPositionVal: '',//编辑职位
            position_id: "",//拿来存储职位Id
            positionList: {
                search: "",
                curpage: 10,
                department_id: '',
                page: 1,
                page_total: 0,//总数量
                items: [],
                all_pagecount: '',
                selectArr:[],//选择存储的数组
            }
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
            this.reset();
            this.state = index;
            if (index == 1) {
                // 点击用户管理
                store.organize_member_list.call(this)
            } else if (index == 3) {
                store.position_list.call(this, '', 1)
            }

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
            this.t_data = []
            this.dataAjax();
        },
        handleCurrentChange(val) {
            console.log(val)

        },
        handleSizeChange(val) {
            this.dataAjax()
            this.obj.pagesize = val;
        },
        handleSelectionChange(obj) {
            this.selectArr = [];
            this.delecetArr = [];
            obj.forEach((x) => {
                this.selectArr.push(x.teacher_id);
                this.delecetArr.push({
                    department_id: x.department_id,
                    teacher_id: x.teacher_id
                })
            })
            console.log(obj)
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
        setStu(obj) {
            // 编辑
            this.oneStatus = 1;
            this.stateObj.one = false;
            this.dataObj = obj;
        },
        selectStudent(id) {
            // 删除 
            let obj = {
                ids: JSON.stringify(this.delecetArr)
            }
            this.$confirm('此操作为删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                store.department_teacher_delete.call(this, obj)

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });


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
            this.oneStatus = 2;
            this.stateObj.one = false;
        },
        addClassOne(state) {
            // 部门管理增加分类
            if (state == 1) {
                this.oneStatus = 2;
                this.stateObj.one = false;
            }
        },
        deleteUser(id) {
            // 部门管理删除
            store.deleteUser.call(this, id)
        },
        QUITQROUP(val) {
            // 取消 
            this.state = 1;
            this.oneStatus = 1;
            this.stateObj.one = true;
        },
        userListIconClick() {
            // 用户管理搜索
            store.organize_member_list.call(this);
        },
        setUserClick(obj) {
            // 编辑用户
            console.log(obj)
            this.state = 6;
            this.dataObj = obj;
        },
        delectTearcher(id) {
            // 删除 老师 职位
            let obj = {
                ids: id
            }

            this.$confirm('此操作为删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                store.department_teacher_delete.call(this, obj, 1)

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        addUserPosition() {
            //添加职位
            store.position_add.call(this, this.userPositionVal)

        },
        quitUserPosotion() {
            // 清除input value
            this.userPositionVal = ""
        },
        setPositionUser(obj) {
            // 编辑职位
            this.state = 7;
            // 存储ID
            this.position_id = obj.position_id;
        },
        DeletePositionUser(id) {
            // 删除职位
            this.$confirm('此操为删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                store.position_delete.call(this, id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        setUserPosition(obj) {
            //编辑职位后保存 
            if (!this.position_id) {
                return
            }
            store.position_edit.call(this, this.position_id, this.setUserPositionVal);
        },
        quitUserPosition() {
            // 编辑后的取消
            this.setUserPositionVal = "";
            this.state = 3;

        },
        positionListIconClick() {
            // 职位列表搜索 
            let name = this.positionList.search;
            store.position_list.call(this, name, 1)
        },
        positionCurrentChange(num) {
            // 当前职位 跳转变换 
            this.positionList.page= num;
            
            store.position_list.call(this, this.positionList.search)
        },
        positionRefresh(){
            // 职位管理刷新
            this.positionList.items=[];
            store.position_list.call(this)
        },
        positionSelectionChange(obj){
            // 职位管理选择 
            let arr = [];
            obj.forEach((x)=>{
                arr.push(x.position_id)
            });
            console.log(arr)
            this.positionList.selectArr=arr;
            // this.DeletePositionUser(arr.join(","))
        },
        PositionSelectStudent(){
            //批量删除职位管理
            if(this.positionList.selectArr){
                
                this.DeletePositionUser(this.positionList.selectArr)
            }
        }
    },
    watch: {
        value2(obj) {
        }
    }
}
</script>
 
<style scoped>

</style>
