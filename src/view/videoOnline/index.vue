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
          <onlineList v-if="addOnline==0" :total="total" @searchList="searchList" :videoList="videoList" @addShow="addShow" @liveCancel="liveCancel" @detailLive="detailLive" :showDetail="showDetail" :detail="detail" @liveDelete="liveDelete" @liveEdit="liveEdit" @liveClose="liveClose"></onlineList>
          <onlineAdd v-else :addShowList_1="addShowList" @liveSubmit="liveSubmit" @cancelAdd="cancelAdd"></onlineAdd>
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
import { getToken, getClass } from '@/utils/auth'
export default {
  data() {
    return {
      titleItem: [
        { name: "直播管理", index: 0 },
      ],
      prompts: [
        `该页面展示管理员的操作日志，可进行删除。`,
        `侧边栏可以进行高级搜索`
      ],
      state: 1,
      total: 0,//总条数
      currentPage: 1,//当前页
      pageSize: 10,//每页显示数量
      searchTxt: '',//搜索关键字
      checkType: '',//选中的状态
      videoList: [],//直播列表
      addOnline: 0,//创建直播间状态
      addShowList: [],//直播展示页面列表
      showDetail: 0,//直播间详情展示页面
      detail: [],//直播间详情
    }
  },
  created() {
  
    this.refreshList();
  },
  components: {
    titleItem, titleActive, description, bottomItem, onlineList, onlineAdd
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
    refreshList() {
      if (this.state == 1) {
        video.video_list.call(this);
        video.live_add.call(this)
      }
    },
    //每页条数变化
    handleSizeChange(val) {
      this.pageSize = val;
      this.refreshList();
    },
    //点击翻页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.refreshList();
    },
    //搜索视频
    searchList(type, text) {
      this.searchTxt = text;
      this.checkType = type;
      this.refreshList();
    },
    //创建直播间页面显示
    addShow() {
      this.addOnline = 1;
    },
    //创建直播间
    liveSubmit(data, id) {
      if (id) {
        data.live_id = id;
        video.live_edit_submit.call(this, data)
      } else {
        video.live_add_submit.call(this, data)
      }
    },
    //取消创建直播间
    cancelAdd() {
      this.addOnline = 0;
    },
    //禁用直播
    liveCancel(id, status) {
      this.$confirm('确定禁用直播吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        video.live_cancel.call(this, id, status)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    //直播间详情
    detailLive(id) {
      if (id) {
        video.live_info.call(this, id)
      } else {
        this.showDetail = 0;
      }
    },
    //删除直播
    liveDelete(id) {
      this.$confirm('确定删除直播吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        video.delete_live.call(this, id);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    //编辑直播
    liveEdit(id) {
      video.edit_live.call(this, id)
    },
    //关闭直播
    liveClose(id) {
      this.$confirm('确定关闭直播吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        video.close_live.call(this, id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }
  },
  watch: {
    state() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.total = 0;
      this.searchTxt = '';
      this.checkType = '';
      this.refreshList();
    }
  }
}
</script> 

<style scoped>

</style>
