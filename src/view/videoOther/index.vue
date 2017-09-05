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
                  <videoLive :total="total" :videoList="videoList" :showDetail="showDetail" :detail="detail" @searchList="searchList" @detailLive="detailLive"></videoLive>
                </div>
                <div v-if="state==1">
                  <videoList :total="total" :videoList="videoList" @searchVideo="searchVideo"></videoList>
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
import { getToken ,getClass} from '@/utils/auth'
import video from '@/utils/videoOther'
import videoLive from '@/components/videoOther/liveList'
import videoList from '@/components/videoOther/videoList'
export default {
    data() {
        return {
            titleItem: [],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 0,
            isClass:getClass(),
          total:0,//总条数
          currentPage:1,//当前页
          pageSize:10,//每页显示数量
          searchTxt:'',//搜索关键字
          checkType:'',//选中的状态
          videoList:[],//直播/视频列表
          showDetail:0,//直播间详情展示页面
          detail:[],//直播间详情

        }
    },
    created() {
      if(this.isClass==3){
        this.titleItem=[{ name: "直播", index: 0 },{ name: "视频库", index: 1 }]
      }else{
        this.titleItem=[{ name: "直播", index: 0 }]
      }
      this.refreshList();
    },
    components: {
        titleItem, titleActive, description, bottomItem,videoLive,videoList
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
          if(this.state===0){
            video.live_list.call(this)
          }else{
            video.stu_video_list.call(this)
          }
      },
      //搜索直播视频
      searchList(type,text){
        this.searchTxt=text;
        this.checkType=type;
        this.refreshList();
      },
      //直播间详情
      detailLive(id){
        if(id){
          video.live_info.call(this,id)
        }else{
          this.showDetail=0;
        }
      },
      //搜索学生视频列表
      searchVideo(text){
        this.searchTxt=text;
        video.stu_video_list.call(this)
      }
    },
    watch:{
      state(){
        this.currentPage=1;
        this.pageSize=10;
        this.total=0;
        this.searchTxt='';
        this.checkType='';
        this.refreshList();
      }
    }
}
</script>

<style scoped>

</style>
