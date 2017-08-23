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
              <el-row :gutter="10" class="class-header">
                <el-col :span="14" class="class-titles">
                <span>
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" />刷新-共{{total}}条记录
                </span>
                </el-col>
                <el-col :span="10">
                  <div class="float-right">
                    <el-date-picker v-model="time" @change="timeChange" type="daterange" placeholder="选择日期范围" class="rt"></el-date-picker>
                  </div>
                </el-col>
              </el-row>
                <div v-if="state==0">
                    <!--教材订单  -->
                    <teachingOrder @delete="deleteId" :orderList="orderList"></teachingOrder>
                </div>
                <div v-if="state==1">
                    <!--空间购买  -->
                    <spaceBuy :spaceList="spaceList"  @delete="deleteId" @deleteMore="deleteMore" @buy="buyId"></spaceBuy>
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
            state: 1,
            total:0,//总条数
            currentPage:1,//当前页
            pageSize:10,//每页显示数量
            time:'',//选择日期
            sTime:'',//开始日期
            eTime:'',//结束日期
            orderList:[],//教材订单列表
            orderId:'',//删除教材订单id
            spaceList:[],//空间订单列表

        }
    },
    created() {
      this.refreshList();
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
          if(this.state==0){
            order.order_list.call(this);
          }else{
            order.space_list.call(this);
          }
      },
      //选择日期范围
      timeChange(val){
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
        if(this.state==1){
          this.deleteList();
        }
      },
      deleteMore(val){
        this.orderId=val;
      },
      deleteList(){
        if(this.orderId!=""){
          this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if(this.state==0){
              order.t_delete.call(this)
            }else{
              order.space_list_delete.call(this)
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      //空间购买
      buyId(id){
        this.orderId=id;
        if(this.orderId!=""){
          this.$confirm('是否确定购买此空间?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            order.space_list_buy.call(this)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消购买'
            });
          });
        }
      }
    },
  watch:{
      state(){
        this.total=0;//总条数
        this.currentPage=1;//当前页
        this.pageSize=10;//每页显示数量
        this.refreshList();
      }
  }
}
</script>

<style scoped>

</style>
