<template>
    <div class="kd-app-main">
        <titleItem :titleText="$route.name.substring(1)"></titleItem>
        <div class="kd-box">
            <div class="kd-app-box">
                <titleActive :titles="titleItem" @Transfer="emitTransfer" :state="state"></titleActive>
            </div>
            <div class="kd-box-content">
              <description :prompts="prompts" @PromPts="promptsTem"></description>
              <div v-if="state==0">

              </div>
              <div v-if="state==1">
                <onlineList v-if="addOnline==0" :total="total" @searchList="searchList" :videoList="videoList" @addShow="addShow"></onlineList>
                <onlineAdd v-else :addShowList="addShowList" @liveSubmit="liveSubmit" @cancelAdd="cancelAdd"></onlineAdd>
              </div>
              <div class="kd-page" v-if="addOnline==0">
                <el-row>
                  <el-col :span="24">
                    <el-pagination class="float-right" :current-page="currentPage" :page-sizes="[10, 15, 20, 25]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
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
import onlineList from '@/components/videoOnline/onlineList'
import onlineAdd from '@/components/videoOnline/onlineAdd'
import video from '@/utils/videoOnline'
export default {
    data() {
        return {
            titleItem: [
                { name: "直播分类", index: 0 },
                { name: "直播管理", index: 1 },
            ],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 1,
            total:0,//总条数
            currentPage:1,//当前页
            pageSize:10,//每页显示数量
            searchTxt:'',//搜索关键字
            checkType:'',//选中的状态
            videoList:[],//直播列表
            addOnline:0,//创建直播间状态
            addShowList:[],//直播展示页面列表
        }
    },
    created() {
      this.refreshList()
    },
    components: {
        titleItem, titleActive, description, bottomItem,onlineList,onlineAdd
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
      //更新列表
        refreshList(){
          if(this.state==1){
            video.video_list.call(this);
            video.live_add.call(this)
          }
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
      //搜索视频
      searchList(type,text){
        this.searchTxt=text;
        this.checkType=type;
        this.refreshList();
      },
      //创建直播间页面显示
      addShow(){
        this.addOnline=1;
      },
      //创建直播间
      liveSubmit(data){
        video.live_add_submit.call(this,data)
      },
      //取消创建直播间
      cancelAdd(){
        this.addOnline=0;
      },
    },
  watch:{
      state(){
        this.currentPage=1;
        this.pageSize=10;
        this.total=0;
        this.searchTxt='';
        this.checkType='';
      }
  }
}
</script>

<style scoped>

</style>
