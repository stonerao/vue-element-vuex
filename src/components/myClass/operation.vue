<template>
    <div>
        <el-row class="class-header">
            <el-col :span="2">
                <el-button @click="returnList" type="primary" size="small">返回列表</el-button>
            </el-col>
            <el-col :span="3" class="class-titles">
                <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor" />刷新-共{{page_total}}条记录
            </el-col>

            <el-col :span="3">

            </el-col>
            <el-col :span="4" :offset="1" class="float-right">
                <el-input placeholder="关键字搜索" icon="search" size="small" v-model="task_title" :on-icon-click="handleIconClick">
                </el-input>
            </el-col>
        </el-row>
        <el-table :data="t_data">
            <template scope="scope">
                <el-table-column prop="task_id" label="ID" width="100">
                </el-table-column>
                <el-table-column prop="task_title" label="题目"  min-width="250" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="class_name" label="班级" min-width="150" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="teacher_name" label="老师"  show-overflow-tooltip>
                </el-table-column> 
            </template>
        </el-table>
        <div class="kd-page">
            <el-row>
                <el-col :span="24">
                    <el-pagination class="float-right" :current-page="page" :page-sizes="[10]" :page-size="curpage" layout="total, sizes, prev, pager, next, jumper" :total="page_total" @current-change="handleCurrentChange">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>

import store from '@/utils/myClass'
export default {
    props: ['id', 'obj'],
    data() {
        return {
            task_class: '',
            curpage: 10,
            page: 1,
            page_total: 0,
            t_data: [],
            task_title: ''
        }
    },
    created() {
        this.ajax()
        console.log(this.obj)
    },
    methods: {
        ajax() {
            this.t_data=[]
            store.ClassTask_list.call(this)
        },
        handleIconClick() { 
              this.ajax()
        },
        handleCurrentChange(val) {
            this.page=val;
            this.ajax()
        },
        returnList() {
            this.$emit('return_list', 0)
        }
    }
}
</script>
<style lang="less" type="text/less">

</style>
