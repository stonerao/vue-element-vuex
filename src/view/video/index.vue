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
          <videoNew></videoNew>
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
//        cataid:'',//第三方视频分类ID
//        writetoken:'',//用户的上传钥匙
//        classList:[],//班级列表
        classList:{},//视频上传列表
      }
    },
    created() {
      this.refresh()
    },
    components: {
      titleItem, titleActive, description, bottomItem,videoNew
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
      refresh(){
        if(this.state==1){
          video.first_class_list.call(this);
          video.video_add_show.call(this);
        }
      },
      //视频管理视频分类选择框
      underClassList(id,num){
        video.under_class_list.call(this,id,num);
      }
    }
  }
</script>

<style scoped>

</style>
