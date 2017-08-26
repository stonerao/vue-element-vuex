<template>
    <div>
        <el-row :gutter="10" class="class-header">
            <el-col :span="19" class="class-titles">
                <span>
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" />刷新-共{{page_total}}条记录
                </span>
                <span class="index-color">空间已用流量：
                    <span class="red-color font-sm">{{used}}</span>
                </span>
                <span class="index-color">空间剩余流量：
                    <span class="cheng-color font-sm">{{unused}}</span>
                </span>
            </el-col>
            <el-col :span="5">
                <div class="float-right">
                    <el-input placeholder="请搜索关键字" icon="search" v-model="seach" :on-icon-click="handleIconClick">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <div>
            <ul class="r-my-space">
                <li v-for="item in t_data" :key="item.id">
                    <div class="r-my-space-title">{{item.space_size}}{{item.space_unit}}</div>
                    <div>
                        <div class="r-my-space-pre">
                            {{item.space_name}}
                        </div>
                        <p class="r-my-space-p">
                            <span class="red-color font-md">{{item.space_price}}</span>
                            <button class="r-my-space-btn" @click="payShoping(item.id)">立即购买</button>
                        </p>
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
                    <el-pagination class="float-right" @size-change="SizeChange" @current-change="CurrentChange" :current-page="1" :page-sizes="[curpage]" :page-size="curpage" layout="total, sizes, prev, pager, next, jumper" :total="page_total">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import store from '@/utils/teaching'
import { getClass } from '@/utils/auth'
import { api } from '@/api/index'
export default {
    data() {
        return {
            value: '',
            seach: '',
            page: 1,
            curpage: 10,
            page_total: 0,
            t_data: [],
            getClass: 0,
            listUrl:'',
            space_pay:'',
            used:'',//已使用
            unused:'',//未使用
        }
    },
    methods: {
        dataAjax(val) {
            store.space_list.call(this)
        },
        SizeChange() {

        },
        CurrentChange() {

        },
        SelectionChange() {

        },
        handleIconClick() {
            //搜索
            this.t_data = [];
            this.dataAjax();
        },
        payShoping(id) {
            this.$confirm('是否购买?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                store.space_pay.call(this, id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        }
    },
    created() {
        let classa = getClass();
        if (classa == '2') {
            // 老师
            this.listUrl = api.space_list; 
            this.space_pay = api.space_pay; 
        } else if (classa == '3') {
            // 学生
            this.listUrl = api.StudentSpace_list; 
            this.space_pay = api.Studentspace_pay; 
        }
       
        this.dataAjax()
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
