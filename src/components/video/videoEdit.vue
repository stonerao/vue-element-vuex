<template>
  <div>
    <!--视频分类-->
    <videoType :firstClassList="firstClassList" @underListChoose="underListChoose" :underList="underList" :showList="showList" :total="total" @showUp="upShow" @searchList="listSearch"></videoType>
    <el-table :data="classList" style="width: 100%" @selection-change="selectOption">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="视频名称" show-overflow-tooltip>
        <template scope="scope">
          <div class="clear">
            <img :src="scope.row.first_image" alt="" style="width: 160px;height: 120px;float:left">
            <span style="float:left;line-height: 120px;margin-left: 10px">{{scope.row.title}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="filesize" label="大小" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="add_time" label="发布时间" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="280">
        <template scope="scope">
          <div>
            <el-button type="primary" size="small" icon="search" @click="playVideo(scope.row.id)">查看</el-button>
            <el-button size="small" icon="edit" @click="editVideo(scope.row.id)">编辑</el-button>
            <el-button size="small" icon="delete" @click="deleteVideo(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="kd-page">
      <el-row>
        <el-col :span="6">
          <el-button size="small" type="primary" @click="deleteVideo('delete')">删除</el-button>
        </el-col>
        <el-col :span="18">
          <el-pagination class="float-right" :page-sizes="[10]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
    <!--视频播放-->
    <videoPlay v-if="playShow==1" @closePlay="closePlay" :videoId="vid"></videoPlay>
  </div>
</template>
<script>
import videoType from '@/components/video/videoType'
import videoPlay from '@/components/video/videoPlay'
import { set } from '@/assets/icon'

export default {
  props: ['firstClassList', 'underList', 'showList', 'total', 'classList', 'videoId'],
  data() {
    return {
      testList: [
        { id: 1, title: '王二小', filesize: '1024', add_time: '2017/08/21', first_image: set }
      ],
      vid: '',//视频id
      playShow: 0,//显示播放页面 
      arr: []
    }
  },
  created() {
    console.log(this.total)
  },
  components: {
    videoType, videoPlay
  },
  methods: {
    selectOption(id) {
      this.arr = [];
      id.forEach((x) => {
        this.arr.push(x.id)
      })
      console.log(this.arr)
    },
    upload() {

    },
    underListChoose(id, num) {
      this.$emit('underClassList', id, num)
    },
    upShow(val, num) {
      this.$emit('showUp', 1, 0)
    },
    listSearch(id, text) {
      this.$emit('searchList', id, text);
    },
    //删除视频
    deleteVideo(id) {
      this.vid = id; 
      this.$emit('videoDelete', id !== 'delete' ? this.vid : this.arr.join(",")) 
    },
    //播放视频
    playVideo(id) {
      this.playShow = 1;
      this.vid = id;
    },
    //关闭视频
    closePlay(val) {
      this.playShow = val;
    },
    //编辑视频
    editVideo(id) {
      this.$emit('videoEdit', 1, id, 1)
    },
    handleCurrentChange() {

    },
    handleSizeChange() {

    },
    currentPage() {

    }
  },
  watch: {

  }
}
</script>
<style lang="less" type="text/less">

</style>
