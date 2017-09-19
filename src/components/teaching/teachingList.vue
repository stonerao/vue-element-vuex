<template>
    <div>
        <el-row :gutter="10" class="class-header">
            <el-col :span="4" class="class-titles">
                <span>
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="ajaxData" />刷新-共{{all_pagecount}}条记录
                </span>
            </el-col>
            <el-col :span="20">
                <div class="float-right">
                    <el-date-picker class="width200" v-model="time1" type="date" placeholder="选择起始日期"></el-date-picker>
                    <el-date-picker class="width200" v-model="time2" type="date" placeholder="选择结束日期"></el-date-picker>
                    </el-date-picker>
                    <el-input placeholder="搜索" icon="search" v-model="seach" :on-icon-click="ajaxData" class="width125">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <div>
            <ul class="r-my-teaching">
                <router-link tag="li" :to="{path:'../shoping',query:{id:item.paper_id}}" v-for="item in items" :key="item.paper_id">
                    <div class="text-center">
                        <img src="../../assets/index/fenm.jpg" />
                    </div>
                    <div class="text-center r-my-teaching-title">{{item.paper_name}}</div>
                </router-link>
            </ul>
        </div>
        <div class="kd-page">
            <el-row>
                <el-col :span="0" style="padding-left:15px">
                    <!-- <el-button type="primary" size="mini">删除</el-button> -->
                </el-col>
                <el-col :span="24">
                    <el-pagination class="float-right" @current-change="CurrentChange" :current-page="page" :page-sizes="[curpage]" :page-size="page" layout="total, sizes, prev, pager, next, jumper" :total="all_pagecount">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>

import store from '@/utils/teaching'
export default {
    data() {
        return {
            page: 1,
            curpage: 10,
            seach: "",
            items: [],
            all_pagecount: 0,
            time1: '',
            time2: '',
        }
    },
    created() {
        this.ajaxData()
    },
    methods: {
        ajaxData() {
            store.teaching_interface.call(this);
        },
        CurrentChange(val) {
            this.page = val;
            this.ajaxData()

        }
    }
}
</script>

<style>

</style>
