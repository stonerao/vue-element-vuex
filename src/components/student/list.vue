<template>
    <div>

        <el-row>
            <el-col :span="4">
                <div class="r-opertion-slist">
                    <h3>
                        虚拟班列表
                    </h3>
                    <ol class="r-viser-list">
                        <li v-for="(item,index) in virtual_list" :key="index" :class="department_id==item.department_id?'active':''" @click="liSelect(item.department_id)">{{item.department_info}}</li>
                    </ol>
                </div>
            </el-col>
            <el-col :span="20">
                <div style="overflow:hidden;margin-bottom:10px">
                    <div class="line-height-36 float-left">
                        <span>
                            <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="ajax" />刷新</span>
                        <span>当前总人数：
                            <a class="red-color">{{stundentCount.count}}</a>人</span>
                        <span>男生：
                            <a class="cheng-color">{{stundentCount.boycount}}</a>人</span>
                        <span>女生：
                            <a class="cheng-color">{{stundentCount.girlcount}}</a>人</span>
                    </div>
                    <div class="float-right line-height-36">
                        <el-select v-model="st_sex" placeholder="性别" class="width100">
                            <el-option value="1">保密</el-option>
                            <el-option value="2">男</el-option>
                            <el-option value="3">女</el-option>
                        </el-select>
                        <el-input v-model="st_certificates_number" placeholder="护照/身份证号" class="width150"></el-input>
                        <el-input v-model="st_phone" placeholder="联系电话" class="width150"></el-input>
                        <el-input v-model="st_name" placeholder="学生姓名" class="width150"></el-input>
                        <el-button @click="goods" type="primary">搜索</el-button>
                    </div>
                </div>
                <el-table ref="multipleTable" :data="t_data" tooltip-effect="dark" style="width: 100%" @selection-change="select" class="z-text-over">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="st_id" label="ID" width="100" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="st_name" label="姓名" width="100" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="st_certificates_number" label="证件号" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="st_phone" label="联系电话" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="status" label="状态" show-overflow-tooltip>
                        <template scope="scope">
                            {{scope.row.st_status=='1'?'在校':scope.row.st_status=='2'?'毕业':scope.row.st_status=='3'?'休学':scope.row.st_status=='4'?'休学':scope.row.st_status=='5'?'退学':scope.row.st_status=='6'?'转学':scope.row.st_status=='7'?'停学':''}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="st_sex" label="性别" show-overflow-tooltip>
                        <template scope="scope">
                            {{scope.row.st_sex=='1'?'保密':scope.row.st_sex=='2'?'男':'女'}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150" show-overflow-tooltip>
                        <template scope="scope">
                            <el-button size="mini" @click="setStu(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="kd-page">
                    <el-row>
                        <el-col :span="24">
                            <el-pagination class="float-right" @current-change="handleCurrentChange" :current-page="curpage" :page-sizes="[curpage]" :page-size="page" layout="total, sizes, prev, pager, next, jumper" :total="total">
                            </el-pagination>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

import store from '@/utils/teacher'
export default {
    props: ['state'],
    data() {
        return {
            virtual_list: [],
            t_data: [],
            arrId: [],
            department_id: '',
            st_name: '',
            st_sex: '',
            st_certificates_number: '',
            st_phone: '',
            page: 1,
            curpage: 10,
            total: 100,
            stundentCount: {

            }
        }
    },
    created() {
        store.virtual_class_list.call(this);
        this.ajax();
    },
    methods: {
        ajax() {
            this.t_data = [];
            store.virtual_class_studentlist.call(this);
        },
        select(obj) {
            this.arrId = [];
        },
        liSelect(id) {
            this.department_id = id;
            this.ajax();
        },
        goods() {
            store.virtual_class_studentlist.call(this, 2);
        },
        handleCurrentChange(page) {
            this.page = page;
        },
        setStu(obj) {
            this.$emit("setStu", obj)
        }
    }
}
</script>

<style>

</style>
