<template>
    <div>
        <el-row :gutter="10" class="class-header">
            <el-col :span="4" class="class-titles">
                <span>
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" />刷新-共1条记录
                </span>
            </el-col>
            <el-col :span="20">
                <div class="float-right">
                    <el-select v-model="value" placeholder="一级分类" class="width125">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="value" placeholder="二级分类" class="width125">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="value" placeholder="三级分类" class="width125">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="value" placeholder="四级分类" class="width125">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="value" placeholder="五级分类" class="width125">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input placeholder="请选择日期" icon="search" v-model="seach" :on-icon-click="handleIconClick" class="width125">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <div>
            <ul class="r-my-teaching">
                <router-link tag="li" to="../shoping" v-for="item in 12" :key="item" >
                    <div class="text-center">
                        <img src="../../assets/index/fenm.jpg" />
                    </div>
                    <div class="text-center r-my-teaching-title">中学教材</div>
                </router-link>
            </ul>
        </div>
        <div class="kd-page">
            <el-row>
                <el-col :span="12" style="padding-left:15px">
                    <el-button type="primary" size="mini">删除</el-button>
                </el-col>
                <el-col :span="12">
                    <el-pagination class="float-right" @size-change="SizeChange" @current-change="CurrentChange" :current-page="5" :page-sizes="[1, 15, 20, 25]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="5">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: '',
            seach: '',
            handleIconClick: ""
        }
    },
    methods: {
        dataAjax(val) {

        },
        SizeChange() {

        },
        CurrentChange() {

        },
        SelectionChange() {

        },
        onIconClick(){

        }
    },
    created() {

    },
    mounted() {

    },
    watch: {
        dateGo(val) {
            let date = Date.parse(val);
            this.date.go = date;
            console.log(date)
        },
        dataOver(val) {
            let date = Date.parse(val);
            this.date.over = date;
            console.log(date)
        },
    }
}
</script>
<<style>
.margin-reset.el-button--default{
    margin-left:0
}
</style>
