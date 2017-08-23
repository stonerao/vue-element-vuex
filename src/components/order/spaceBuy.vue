<template>
    <div>
        <div>
            <el-table ref="multipleTable" :data="spaceList" tooltip-effect="dark" style="width: 100%" @selection-change="SelectionChange">
                <el-table-column type="selection" width="50">
                </el-table-column>
                <el-table-column prop="pay_sn" label="订单编号" width="180">
                </el-table-column>
                <el-table-column prop="space_name" label="空间名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="add_time" label="下单时间">
                </el-table-column>
                <el-table-column label="空间大小" width="100" show-overflow-tooltip>
                    <template scope="scope">
                        <span >￥{{scope.row.space_size}}{{scope.row.space_unit}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="价格(元)" width="100">
                    <template scope="scope">
                        <span class="color-red">￥{{scope.row.space_price}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" >
                    <template scope="scope">
                        <el-button @click="delete_id(scope.row.id)" class="margin-reset" size="mini" icon="delete">删除</el-button>
                        <el-button @click="buy_id(scope.row.id)" v-if="scope.row.order_state=='待支付'" class="margin-reset" size="mini" icon="circle-check">支付</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    props:['spaceList'],
    data() {
        return {}
    },
    methods: {
        //批量删除
        SelectionChange(val) {
          let id="";
          val.forEach(function(item){
            id +=`,${item.id}`
          });
          id=id.substr(1);//要删除的id
          this.$emit('deleteMore',id)
        },
        //删除
      delete_id(id){
          this.$emit('delete',id);
        },
        //购买
        buy_id(id){
            this.$emit('buy',id);
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
<<style>
.margin-reset.el-button--default{
    margin-left:0
}
</style>
