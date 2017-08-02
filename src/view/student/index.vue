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
                    <el-row :gutter="20" class="class-header">
                        <el-col :span="19" class="class-titles">
                            <el-button type="primary" icon="plus" size="small">增加学生</el-button>
                            <el-button type="primary" icon="plus" size="small">批量导入</el-button>
                            <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" />刷新-共287条记录
                        </el-col>
                        <el-col :span="5">
                            <el-input placeholder="请选择日期" icon="search" v-model="search" :on-icon-click="handleIconClick">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-table ref="multipleTable" :data="t_data" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" class="z-text-over">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column label="学号" width="90" prop="id">
                        </el-table-column>
                        <el-table-column prop="t_name" label="姓名" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="t_name" label="用户名" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="class" label="证件类型" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="code" label="证件号" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="sex" label="性别" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="t_name" label="实体班" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="t_name" label="虚拟班" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="t_name" label="电话" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="t_name" label="状态号码" show-overflow-tooltip>
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
                    <div>
                        <el-button type="primary" icon="plus" size="small">增加学生</el-button>
                        <el-button type="primary" icon="plus" size="small">批量导入</el-button>
                    </div>
                    <section class="add-inp">
                        <div class="add-inp-items">
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    姓名：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-input v-model="t_input" placeholder=""></el-input>
                                </div>
                                <div class="add-inp-item-addname margin-left">填写真实姓名，以便联系称呼</div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    性别：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-radio class="radio" v-model="sex" label="1">男</el-radio>
                                    <el-radio class="radio" v-model="sex" label="2">女</el-radio>
                                </div>
                                <div class="add-inp-item-addname margin-left"> </div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    出生年月日：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-date-picker v-model="value1" type="date" placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                                <div class="add-inp-item-addname margin-left">登录密码</div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    户口所在地（贯籍）:
                                </div>
                                <div class="add-inp-item-inp add-inp-time">
                                    <div>
                                        <el-select v-model="search" placeholder="请选择">
                                            <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div>
                                        <el-select v-model="search" placeholder="请选择">
                                            <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div>
                                        <el-select v-model="search" placeholder="请选择">
                                            <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </div>
    
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    家庭住址：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-input v-model="t_input" type="text"></el-input>
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    民族：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-input v-model="t_input" type="text"></el-input>
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    政治面貌：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-input v-model="t_input" type="text"></el-input>
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    家长列表：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-table :data="tableData" style="width: 100%">
                                        <el-table-column prop="date" label="日期">
                                        </el-table-column>
                                        <el-table-column prop="name" label="姓名">
                                        </el-table-column>
                                        <el-table-column prop="address" label="地址">
                                        </el-table-column>
                                    </el-table>
                                    <!-- <div style="width:100%;margin-top:10px;">
                                        <el-button>默认按钮</el-button>
                                    </div> -->
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
    
                            <!--  -->
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    用户名：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-input v-model="t_input" type="text"></el-input>
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    密码：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-input v-model="t_input" type="password"></el-input>
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
                            <div class="add-inp-item ">
                                <div class="add-inp-item-name">
                                    证件类型：
                                </div>
                                <div class="add-inp-item-inp add-inp-time">
                                    <div>
                                        <el-select v-model="search" placeholder="请选择">
                                            <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    证件号：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-input v-model="t_input" type="password"></el-input>
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
                            <!--  -->
                            <div class="add-inp-item ">
                                <div class="add-inp-item-name">
                                    年纪：
                                </div>
                                <div class="add-inp-item-inp add-inp-time">
                                    <div>
                                        <el-select v-model="search" placeholder="请选择">
                                            <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
                            <div class="add-inp-item ">
                                <div class="add-inp-item-name">
                                    班级：
                                </div>
                                <div class="add-inp-item-inp add-inp-time">
                                    <div>
                                        <el-select v-model="search" placeholder="请选择">
                                            <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
                            <div class="add-inp-item ">
                                <div class="add-inp-item-name">
                                    虚拟班：
                                </div>
                                <div class="add-inp-item-inp add-inp-time">
                                    <div>
                                        <el-select v-model="search" placeholder="请选择">
                                            <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
                            <div class="add-inp-item ">
                                <div class="add-inp-item-name">
                                    学生照片：
                                </div>
                                <div class="add-inp-item-inp add-inp-time">
                                    <div>
                                        <el-select v-model="search" placeholder="请选择">
                                            <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
    
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    学生简介：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-input v-model="t_input" type="textarea"></el-input>
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    学生照片：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    账号状态：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-radio class="radio" v-model="sex" label="1">冻结</el-radio>
                                    <el-radio class="radio" v-model="sex" label="1">冻结</el-radio>
                                    <el-radio class="radio" v-model="sex" label="1">冻结</el-radio>
                                    <el-radio class="radio" v-model="sex" label="2">女</el-radio>
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
                <div v-if="state==2"></div>
                <div v-if="state==3"></div>
    
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
import { data } from '@/api/data'
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
            t_data: data.teacher,
            search: '',
            curpage: 1,//当前页数
            t_input: '',
            sex: '1',
            value1: '',//日期
            tableData: [{
                date: '201 02',
                name: '王小虎',
                address: '上 金  弄'
            }, {
                date: '2 05-04',
                name: '王小虎',
                address: ' 普 陀区金 '
            }, {
                date: ' -05-01',
                name: '王小虎',
                address: ' 19 弄'
            }, {
                date: 's05-03',
                name: '王小虎',
                address: ' '
            }]
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
        handleIconClick(val) {
            // 搜索触发事件
            // console.log(val)
        },
        handleSelectionChange(val) {
            // 选择发生改变
            console.log(val)
            this.multipleSelection = val;
        },
        handleRemove(file, fileList) {
            // 上传图片
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            // 上传图片
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    }
}
</script>
 
<style scoped>

</style>
