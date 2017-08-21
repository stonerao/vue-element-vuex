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
                    <teachingOrder @timeChoose="chooseTime" :orderList="orderList"></teachingOrder>
                </div>
                <div v-if="state==1">
                    <!--空间购买  -->
                    <spaceBuy></spaceBuy>
                </div>
              <div class="kd-page">
                <el-row>
                  <el-col :span="12" style="padding-left:15px">
                    <el-button type="primary" size="mini">删除</el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-pagination class="float-right" :current-page="5" :page-sizes="[10, 15, 20, 25]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
      chooseTime(val){
          let arr=val.split(' ');
          this.sTime=arr[0];
          this.eTime=arr[2];
          console.log(this.sTime,this.eTime)
      }
    }
}
</script>

<style scoped>

</style>
