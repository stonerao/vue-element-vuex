<template>
    <div>
        <el-row :gutter="10" class="class-header">
            <el-col :span="4" class="class-titles">
                <span>
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="resh"/>刷新-共{{all_pagecount}}条记录
                </span>
            </el-col>
            <el-col :span="20">
                <div class="float-right"> 
                    <el-input placeholder="搜索" icon="search" v-model="seach" :on-icon-click="handleIconClick" class="width125">
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
                    <el-pagination class="float-right" @size-change="SizeChange" @current-change="CurrentChange" :current-page="currentPage" :page-sizes="[pageSize]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="all_pagecount">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import store from '@/utils/teaching'
export default {
    props:['state'],
    data() {
        return {  
            seach: '',
            currentPage: 1,//当前页数
            pageSize: 10,//当前页面数量 
            all_pagecount:5, 
            items:[],
            classId:0,
        }
    },
    methods: {
        dataAjax(id) {
            this.items = [];
            store.student_teaching_list.call(this);
        }, 
        SizeChange(num) { 
            this.pageSize = num;
            this.dataAjax();
        },
        CurrentChange(val) {
            this.currentPage = val;
            this.dataAjax();//翻页更新数据 
        },
        SelectionChange() {

        },
        onIconClick() {

        },
        handleIconClick() {
             
        },
        resh(){
            // 刷新
            this.dataAjax()
        }
    },
    created() { 
        this.dataAjax()
    },
    mounted() {
        console.log(this.state)
    },
    watch: {
        dateGo(val) {
            let date = Date.parse(val);
            this.date.go = date;
        },
        dataOver(val) {
            let date = Date.parse(val);
            this.date.over = date;
        },
         
    }
}
</script>
<style>
.margin-reset.el-button--default {
    margin-left: 0
}
</style>
