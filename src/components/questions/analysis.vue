<template>
    <div>
        <el-row :gutter="10" class="class-header">
            <el-col :span="14" class="class-titles">
                <span>
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs" @click="ajax" />刷新-共{{t_data.length}}条记录
                </span>
            </el-col>

        </el-row>
        <el-table ref="multipleTable" :data="t_data" tooltip-effect="dark" style="width: 100%" class="z-text-over">

            <el-table-column label="ID" width="60" show-overflow-tooltip>
                <template scope="scope">{{ scope.row.q_id }}</template>
            </el-table-column>
            <el-table-column prop="q_title" label="题干" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="q_type_name" label="类型" width="280" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="q_add_time" label="创建时间" width="280" show-overflow-tooltip>
            </el-table-column>

        </el-table>
    </div>
</template>

<script> 
import store from '@/utils/questions'
export default {
    data() {
        return {
            t_data: []
        }
    },
    methods: {
        ajax() {
            this.t_data = []
            store.question_statice.call(this)
        }
    },
    created() {
        this.ajax()
    }
}
</script>

<style>

</style>
