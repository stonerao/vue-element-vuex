<template>
    <div>
        <div>
            <el-table ref="multipleTable" :data="orderList" tooltip-effect="dark" style="width: 100%" @selection-change="SelectionChange">
                <el-table-column type="selection" width="50">
                </el-table-column>
                <el-table-column prop="pay_sn" label="订单编号" width="180">
                </el-table-column>
              <el-table-column label="图片" width="180">
                <template scope="scope">
                  <img :src="scope.row.paper_img" alt="" style="width: 100px;height: 120px;margin-top: 5px;">
                </template>
              </el-table-column>
                <el-table-column prop="paper_name" label="教材名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="教材大小" width="150">
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

        }
    },
    methods: {
        SelectionChange(val) {
          let id="";
          val.forEach(function(item){
            id +=`,${item.order_id}`
          });
          id=id.substr(1);//要删除的id
          this.$emit('delete',id)
        },
    },
    created() {

    },
    mounted() {

    },
    watch: {

    }
}
</script>
