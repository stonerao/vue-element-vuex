<template>
    <div>
         <el-row :gutter="10" class="class-header">
                        <el-col :span="19" class="class-titles">
                            <span>
                                <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="studentRefresh1" />刷新-共{{userList.page_total}}条记录</span>
                            <span>当前总人数：
                                <a class="red-color">{{userList.page_total}}</a>人
                            </span>
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
                                <el-pagination class="float-right" @size-change="handleSizeChange" @current-change="handleCurrentChange1" :current-page="userList.page" :page-sizes="[userList.curpage]" :page-size="userList.curpage" layout="total, sizes, prev, pager, next, jumper" :total="userList.page_total">
                                </el-pagination>
                            </el-col>
                        </el-row>
                    </div>
    </div>
</template>
<script>
import store from '@/utils/architecture'
export default{
    data(){
        return{

        }
    },
    methods:{

    },
    created(){

    },
    mounted(){

    },
    watch:{
        
    }
}
</script>
