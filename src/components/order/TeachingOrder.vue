<template>
    <div>
        <el-row :gutter="10" class="class-header">
            <el-col :span="14" class="class-titles">
                <span>
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" />刷新-共1条记录
                </span>
            </el-col>
            <el-col :span="10">
                <div class="float-right">
                    <el-date-picker v-model="dateGo" type="date" placeholder="年/月/日" size="samll">
                    </el-date-picker>
                    -
                    <el-date-picker v-model="dataOver" type="date" placeholder="年/月/日" size="samll">
                    </el-date-picker>
                </div>
            </el-col>
        </el-row>
        <div>
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="SelectionChange">
                <el-table-column type="selection" width="50">
                </el-table-column>
                <el-table-column prop="date" label="订单编号" width="180">
                </el-table-column>
                <el-table-column prop="address" label="教材名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="教材大小" width="180">
                    <template scope="scope">
                        <span>￥{{scope.row.price}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="数量" width="180">
                    <template scope="scope">
                        <span >￥{{scope.row.price}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="价格" width="100">
                    <template scope="scope">
                        <span class="color-red">￥{{scope.row.price}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="购买时间" width="200">
                </el-table-column>
            </el-table>
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
            dateGo: '',
            dataOver: '',
            date: {
                go: '',
                over: ''
            },
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                price: '213'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄',
                price: '213'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                price: '213'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
                price: '213'
            }]
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
