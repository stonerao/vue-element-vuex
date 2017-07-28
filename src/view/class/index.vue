<template>
    <div class="kd-app-main">
        <titleItem :titleText="$route.name.substring(1)"></titleItem>
        <div class="kd-box">
            <div class="kd-app-box">
                <titleActive :titles="titleItem" @Transfer="emitTransfer" :state="state"></titleActive>
            </div>
            <div class="kd-box-content">
                <description :prompts="prompts" @PromPts="promptsTem"></description>
                
                <el-row :gutter="20" class="class-header">
                    <el-col :span="19" class="class-titles">
                        <img src="../../assets/index/shuaxin.png" class="icon-img-xs" />刷新-共287条记录
                    </el-col>
                    <el-col :span="5">
                        <el-input placeholder="请选择日期" icon="search" v-model="search" :on-icon-click="handleIconClick">
                        </el-input>
                    </el-col>
                </el-row>
                <div>
                    <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column label="日期" width="120">
                            <template scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" show-overflow-tooltip>
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
                                 <el-select v-model="search" placeholder="请选择"  size="small">
                                    <el-option v-for="item in tableData3" :key="item.name" :label="item.name" :value="item.date">
                                    </el-option>
                                </el-select> 
                            </el-col>
                            <el-col :span="12">
                                <el-pagination class="float-right"  :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="600">
                                </el-pagination>
                            </el-col>
                        </el-row>
    
                    </div>
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
import '@/utils/start'
export default {
    data() {
        return {
            titleItem: [
                { name: "科目管理", index: 0 },
                { name: "增加科目", index: 1 },
            ],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 0,
            promptsPad: true,
            search: '',
            currentPage4: 4,
            tableData3: [{
                date: '2016-05-03',
                name: '王小虎',
                address: ' 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: ' 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: ' 1518 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: ' 1518 弄'
            }, {
                date: '2016-05-08',
                name: '王小虎',
                address: ' 1518 弄'
            }, {
                date: '2016-05-06',
                name: '王小虎',
                address: ' 1518 弄'
            }, {
                date: '2016-05-07',
                name: '王小虎',
                address: ' 1518 弄'
            }, {
                date: '2016-05-07',
                name: '王小虎',
                address: ' 1518 弄'
            }, {
                date: '2016-05-07',
                name: '王小虎',
                address: ' 1518 弄'
            }, {
                date: '2016-05-07',
                name: '王小虎',
                address: ' 1518 弄'
            }, {
                date: '2016-05-07',
                name: '王小虎',
                address: ' 1518 弄'
            }, {
                date: '2016-05-07',
                name: '王小虎',
                address: ' 1518 弄'
            }],
            multipleSelection: []
        }
    },
    created() {
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
        handleIconClick() {
            // 搜索触发事件
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    }
}
</script>
 
<style scoped>

</style>
