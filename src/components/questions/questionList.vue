<template>
    <div class="r-notice">
        <el-row>
            <el-col :span='15'>
                <span class="line-height-36">
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="resh" />刷新-共1条记录
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
                <template scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column prop="title" label="题干" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="试题类型" width="120" show-overflow-tooltip>
                <template scope="scope">
                    <span class="index-color">{{scope.row.select}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="date" width="180" label="创建时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column width="120" label="是否共享" show-overflow-tooltip>
                <template scope="scope">
                    <el-switch v-model="scope.row.selectVal" on-color="#13ce66" off-color="" on-text="是" off-text="否">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column width="180" label="操作" show-overflow-tooltip>
                <template scope="scope">
                    <el-button size="mini">查看</el-button>
                    <el-button size="mini">编辑</el-button>
                    <el-button size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            t_data: [
                { id: '001', title: 'sdakhdahdjsa', select: '多选', date: '2017-8-22 09:13:08',selectVal:'' }
            ],
            seach: ''
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

        }
    }
}
</script>

<style>

</style>
