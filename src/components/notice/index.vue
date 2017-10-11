<template>
    <div class="r-notice">
        <el-row>
            <el-col :span='15'>
                <span>
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="resh" />刷新-共{{page_total}}条记录
                </span>
            </el-col>
            <el-col :span="9">
                <div class="float-right">
                    <el-input placeholder="请输入试卷名称" icon="search" v-model="seach" :on-icon-click="seachClick" class="width150">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-table ref="multipleTable" :data="t_data" tooltip-effect="dark" style="width: 100%" @selection-change="selectOption">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="id" width="80" show-overflow-tooltip>
                <template scope="scope">{{ scope.row.zn_id }}</template>
            </el-table-column>
            <el-table-column prop="zn_title" label="标题" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="发布人" width="180" show-overflow-tooltip>
                <template scope="scope">
                    <span class="index-color">{{scope.row.zn_send}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="zn_time" width="220" label="时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="address" width="120" label="操作" show-overflow-tooltip>
                <template scope="scope">
                    <el-button size="mini" @click="get(scope.row.zn_id)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row style="margin-top:10px">
            <el-col :span="12">
                &nbsp;
            </el-col>
            <el-col :span="12">
                <el-pagination class="float-right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[curpage]" :page-size="curpage" layout="total, sizes, prev, pager, next, jumper" :total="page_total">
                </el-pagination>
            </el-col>
        </el-row>
        <views @CLICKOVER="isView=false" v-if="isView" :obj="dataObj"></views>
    </div>
</template>

<script> 
import store from '@/utils/notice'
import views from '@/components/notice/view'
export default {
    props: ['state'],
    data() {
        return {
            t_data: [{ id: '', title: '', name: '', date: '2017-8-22 09:13:08' }],
            seach: "",
            page: 1,
            curpage: 10,
            page_total: 0,
            isView: false,
            dataObj: {}
        }
    },
    methods: {
        selectOption() {
            // 选择
        },
        seachClick() {
            // 搜索
        },
        resh() {
            // 刷新

        },
        seachClick() {
            // 搜索
        },
        handleSizeChange() {

        },
        ajax() {
            store.AdminNotice_list.call(this, this.state);
        },
        handleCurrentChange(val) {
            this.page = val;
            this.ajax();
        },
        get(id) {
            store.show_notice.call(this, id)
        }
    },
    created() {
        this.ajax();
    },
    components: {
        views
    }
}
</script>

<style>

</style>
