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
                    <el-row :gutter="20" class="class-header">
                        <el-col :span="19" class="class-titles">
                            <img src="../../assets/index/shuaxin.png" class="icon-img-xs" />刷新-共287条记录
                        </el-col>
                        <el-col :span="5">
                            <el-input placeholder="请选择日期" icon="search" v-model="search" :on-icon-click="handleIconClick">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-table ref="multipleTable" :data="t_data" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column label="ID" width="120">
                            <template scope="scope">{{ scope.row .id }}</template>
                        </el-table-column>
                        <el-table-column prop="t_name" label="科目名称" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="操作" width="150">
                            <template scope="scope">
                                <el-button size="small">编辑</el-button>
                                <el-button size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="kd-page">
                        <el-row>
                            <el-col :span="12" style="padding-left:15px">
                                <el-checkbox label="全选"></el-checkbox>
                                <el-select v-model="search" placeholder="请选择" size="small" class="margin-left">
                                    <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="12">
                                <el-pagination class="float-right" :current-page="curpage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="600">
                                </el-pagination>
                            </el-col>
                        </el-row>
    
                    </div>
                </div>
                <div v-if="state==1">
                    <!-- 增加老师 -->
                    <section class="add-inp">
                        <div class="add-inp-items">
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    用户名
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-input v-model="t_input" placeholder=""></el-input>
                                </div>
                                <div class="add-inp-item-addname margin-left">登录用户名账号</div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    姓名
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-input v-model="t_input" placeholder=""></el-input>
                                </div>
                                <div class="add-inp-item-addname margin-left">填写真实姓名，以便联系称呼</div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    性别
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-radio class="radio" v-model="sex" label="1">男</el-radio>
                                    <el-radio class="radio" v-model="sex" label="2">女</el-radio>
                                </div>
                                <div class="add-inp-item-addname margin-left"> </div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    密码
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-input v-model="t_input" type="password"></el-input>
                                </div>
                                <div class="add-inp-item-addname margin-left">登录密码</div>
                            </div>
    
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    联系电话
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-input v-model="t_input" type="number"></el-input>
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    老师简介：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-input v-model="t_input" type="textarea"></el-input>
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
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
                <div v-if="state==2">
                    <excelImport></excelImport>
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
import excelImport from '@/components/center/excelImport.vue'
import { data } from '@/api/data'
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
            t_data: data.teacher,
            search: '',
            curpage: 1,//当前页数
            t_input: '',
            sex: '1'
        }
    },
    created() {
    },
    components: {
        titleItem, titleActive, description, bottomItem,excelImport
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
            console.log(val)
            this.multipleSelection = val;
        },
    }
}
</script>
 
<style scoped>

</style>
