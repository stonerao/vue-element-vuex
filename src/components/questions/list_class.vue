<template>
    <div class="r-question-class">
        <div class="r-question-classleft">
            <el-select v-model="value_1" placeholder="请选择" class="width175">
                <el-option v-for="item in class_1" :key="item.qc_id" :label="item.qc_name" :value="item.qc_id">
                </el-option>
            </el-select>

            <el-select v-model="value_2" v-if="value_1" placeholder="请选择" class="width175 margintop20">
                <el-option v-for="item in class_2" :key="item.qc_id" :label="item.qc_name" :value="item.qc_id">
                </el-option>
            </el-select>
            <el-button type="success" v-if="value_1||value_2" class="margintop20" @click="deletes">清空</el-button>
        </div>
        <div class="r-question-classright">
            <el-table :data="t_data" style="width: 100%" @selection-change="selectOption">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="qc_id" label="id" width="180">
                </el-table-column>
                <el-table-column prop="qc_name" label="分类名" show-overflow-tooltip>
                </el-table-column>
                <el-table-column width="180" label="操作" show-overflow-tooltip>
                    <template scope="scope">
                        <el-button size="mini" @click="setQues(scope.row)">编辑</el-button>
                        <el-button size="mini" @click="deleteData(1,scope.row.qc_id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <p class="margintop20">
                <el-button size="mini" @click="deleteData">删除</el-button>
            </p>
        </div>
    </div>
</template>

<script> 
import store from '@/utils/questions'
export default {
    data() {
        return {
            class_1: [],
            value_1: '',
            class_2: [],
            value_2: '',
            t_data: [],
            arr: []
        }
    },
    methods: {
        ajaxdata(id, status) {
            this.t_data = [];
            store.question_classlist_list.call(this, id, status);
        },
        selectOption(obj) {
            var arr = [];
            obj.forEach((x) => {
                arr.push(x.qc_id)
            })
            this.arr = arr.join(",");
        },
        deleteData(status,id) { 
            let ids;
            if(status==1){
                ids = id
            }else{
                ids = this.arr;
            }
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                store.delete_questionclass.call(this,ids);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        setQues(obj) { 
            this.$emit("setInfo",obj)
        },
        deletes() {
            this.value_1 = '';
            this.value_2 = '';
            this.ajaxdata("", 1);
        }
    },
    created() {
        this.ajaxdata("", 1);
    },
    watch: {
        value_1(val) {
            if (val != '') {
                this.ajaxdata(val, 2)
            } else {
                this.value_2 = '';
            }
        },
        value_2(val) {
            if (val != '') {
                this.ajaxdata(val, 3)
            } else {
                this.value_3 = '';
            }
        },
    }
}
</script>

<style>

</style>
 