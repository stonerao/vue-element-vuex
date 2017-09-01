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

        </div>
        <div v-if="state==1">
          <videoEdit v-if="showUp==0" :firstClassList="firstClassList" :underList="underList" :showList="showList" @underClassList="underClassList" :total="total" @showUp="upShow" @searchList="listSearch" :classList="classList" @videoDelete="deleteVideo" @videoPlay="playVideo" :videoId="videoId" @videoEdit="videoEdit"></videoEdit>
          <videoNew v-if="showUp==1" @hiddenUp="hiddenUp" :videoId="videoId" :upType="upType"></videoNew>
        </div>
        <div class="kd-page" v-if="showUp==0">
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
  import video from '@/utils/video'
  import videoEdit from '@/components/video/videoEdit'
  import videoNew from '@/components/video/videoNew'

  export default {
    data() {
      return {
        titleItem: [
          { name: "视频分类", index: 0 },
          { name: "视频管理", index: 1 },
        ],
        prompts: [
          `该页面展示管理员的操作日志，可进行删除。`,
          `侧边栏可以进行高级搜索`
        ],
        state: 1,
        firstClassList:[],//一级分类列表
        underList:{
          secondList:[],//二级分类
          thirdList:[],//三级分类
          fourList:[],//四级分类
          fiveList:[],//五级分类
        },
        showList:1,//显示几级分类
        total:0,//总条数
        currentPage:1,//当前页
        pageSize:10,//每页显示数量
        showUp:0,//显示上传页面
        upType:0,//0为从上传视频进入，1为从编辑视频进入
        searchTxt:'',//搜索关键字
        classId:'',//分类ID
        classList:[],//视频管理列表
        videoId:'',//播放/编辑的视频id
      }
    },
    created() {
      this.refreshList()
    },
    components: {
      titleItem, titleActive, description, bottomItem,videoEdit,videoNew
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
        if(this.state==1){
          video.first_class_list.call(this);
          video.video_list.call(this);
        }
      },
      //视频管理视频分类选择框
      underClassList(id,num){
        video.under_class_list.call(this,id,num);
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
      //显示上传视频页面
      upShow(val,num){
        this.showUp=val;
        this.upType=num;
      },
      //隐藏上传视频页面
      hiddenUp(val){
        this.showUp=val;
      },
      //搜索视频
      listSearch(id,text){
        this.searchTxt=text;
        this.classId=id;
        video.video_list.call(this);
      },
      //学校中心删除视频
      deleteVideo(id){
        this.$confirm('确定删除视频吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          video.video_delete.call(this,id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //播放视频
      playVideo(id){
        video.video_info.call(this,id)
      },
      //编辑视频
      videoEdit(val,id,num){
        this.showUp=val;
        this.videoId=id;
        this.upType=num;
      }
    },
    watch:{
      state(){
        this.currentPage=1;
        this.pageSize=10;
        this.total=0;
        this.showUp=0;
        this.searchTxt='';
        this.classId='';
        this.videoId='';
        this.refreshList();
      }
    }
  }
</script>

<style scoped>

</style>
