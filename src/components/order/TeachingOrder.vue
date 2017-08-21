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
                  <el-date-picker v-model="time" @change="timeChange" type="daterange" placeholder="选择日期范围" class="rt"></el-date-picker>
                </div>
            </el-col>
        </el-row>
        <div>
            <el-table ref="multipleTable" :data="orderList" tooltip-effect="dark" style="width: 100%" @selection-change="SelectionChange">
                <el-table-column type="selection" width="50">
                </el-table-column>
                <el-table-column prop="pay_sn" label="订单编号" width="180">
                </el-table-column>
              <el-table-column label="图片" width="180">
                <template scope="scope">
                  <img :src="scope.row.paper_img" alt="">
                </template>
              </el-table-column>
                <el-table-column prop="paper_name" label="教材名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="教材大小" width="180">
                    <template scope="scope">
                        <span>￥{{scope.row.paper_size}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="价格" width="100">
                    <template scope="scope">
                        <span class="color-red">￥{{scope.row.paper_price}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="add_time" label="购买时间" width="200">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    props:['orderList'],
    data() {
        return {
            time:'',//选择日期
            date: {
                go: '',
                over: ''
            },

        }
    },
    methods: {
        dataAjax(val) {

        },
        SelectionChange() {

        },
        timeChange(val){
          this.$emit('timeChoose',val)
        }
    },
    created() {

    },
    mounted() {

    },
    watch: {

    }
}
</script>
