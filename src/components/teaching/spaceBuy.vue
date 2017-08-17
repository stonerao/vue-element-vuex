<template>
    <div>
        <el-row :gutter="10" class="class-header">
            <el-col :span="19" class="class-titles">
                <span>
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" />刷新-共1条记录
                </span>
                <span>空间已用流量：
                    <span>12312MBN</span>
                </span>
                <span>空间剩余流量：
                    <span>12312MBN</span>
                </span>
            </el-col>
            <el-col :span="5">
                <div class="float-right">
                    <el-input placeholder="请选择日期" icon="search" v-model="seach" :on-icon-click="handleIconClick"  >
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <div>
            <ul class="r-my-space">
                <li v-for="item in 12" :key="item">
                    <div class="r-my-space-title">{{item*10}}G</div>
                    <div>
                        <div class="r-my-space-pre">
                            我是资费我是说明我是资费我是 我是 资费我是说明我是资费我是说明我是资费我是说明我是资费我是说明
                        </div>
                        <p  class="r-my-space-p"><span>{{item*122}}/年</span><button class="r-my-space-btn">立即购买</button></p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="kd-page">
            <el-row>
                <el-col :span="12" style="padding-left:15px">
                    &nbsp;
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
        handleIconClick(){

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
