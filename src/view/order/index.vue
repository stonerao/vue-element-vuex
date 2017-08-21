<template>
    <div class="kd-app-main">
        <titleItem :titleText="$route.name.substring(1)"></titleItem>
        <div class="kd-box">
            <div class="kd-app-box">
                <titleActive :titles="titleItem" @Transfer="emitTransfer" :state="state"></titleActive>
            </div>
            <div class="kd-box-content">
                <description :prompts="prompts" @PromPts="promptsTem"></description>
                <!--模块开始  -->
                <div v-if="state==0">
                    <!--教材订单  -->
                    <teachingOrder @delete="deleteId" @timeChoose="chooseTime" :orderList="orderList" :total="total"></teachingOrder>
                </div>
                <div v-if="state==1">
                    <!--空间购买  -->
                    <spaceBuy></spaceBuy>
                </div>
              <div class="kd-page">
                <el-row>
                  <el-col :span="12" style="padding-left:15px">
                    <el-button @click="deleteList" type="primary" size="mini">删除</el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-pagination class="float-right" :current-page="5" :page-sizes="[10, 15, 20, 25]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                    </el-pagination>
                  </el-col>
                </el-row>
              </div>
            </div>
            <bottomItem></bottomItem>
        </div>
    </div>
</template>

<script>
import titleItem from '@/components/main/title.vue'
import titleActive from '@/components/main/titleActive.vue'
import description from '@/components/main/description.vue'
import bottomItem from '@/components/bottom/bottom.vue'
import spaceBuy from '@/components/order/spaceBuy' ;//教材订单
import teachingOrder from '@/components/order/TeachingOrder'; //教材订单
import order from '@/utils/order'


export default {
    data() {
        return {
            titleItem: [
                { name: "教材订单", index: 0 },
                { name: "空间购买", index: 1 },
            ],
            prompts: [
                `历史考试`,
                `xxxxxxxx`
            ],
            state: 0,
            total:0,//总条数
            currentPage:1,//当前页
            pageSize:10,//每页显示数量
            sTime:'',//开始日期
            eTime:'',//结束日期
            orderList:[],//订单列表
            orderId:'',//删除订单id
        }
    },
    created() {
      order.order_list.call(this)
    },
    components: {
        titleItem, titleActive, description, bottomItem,teachingOrder,spaceBuy
    },
    methods: {
        emitTransfer(index) {
            if (this.state == index) {
                return
            }
            this.state = index;
        },
        promptsTem(status) {
            console.log(status)
        },
      //刷新列表
      refreshList(){
        order.order_list.call(this)
      },
      //选择日期范围
      chooseTime(val){
          let arr=val.split(' ');
          this.sTime=arr[0];
          this.eTime=arr[2];
        this.refreshList();
      },
      //每页条数变化
      handleSizeChange(val) {
        this.pageSize=val;
        this.refreshList();
      },
      //点击翻页
      handleCurrentChange(val) {
        this.currentPage=val;
        this.refreshList();
      },
      //删除订单
      deleteId(val){
        this.orderId=val;
      },
      deleteList(){
        if(this.orderId!=""){
          this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            order.t_delete.call(this)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      }
    }
}
</script>

<style scoped>

</style>
