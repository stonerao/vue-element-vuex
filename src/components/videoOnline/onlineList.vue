<template>
  <div>
    <el-row class="class-header">
      <el-col :span="3" class="class-titles">
        <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"  @click="resh"/>刷新-共{{total}}条记录
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="addOnline">
          <b>+</b>创建直播</el-button>
      </el-col>
      <el-col :span="12">
        <div class="float-right">
          <el-select v-model="typeText1" @change="selectChange" placeholder="请选择直播状态" size="small" class=" width200 ">
            <el-option v-for="(item,index) in checkTypeList" :label="item.name" :value="item.value" :key="index">
            </el-option>
          </el-select>
          <el-input placeholder="请输入关键字" icon="search" v-model="searchTxt" class="width200" :on-icon-click="handleIconClick" size="small"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-table :data="videoList" style="width: 100%">
      <el-table-column prop="live_id" label="ID" width="60"></el-table-column>
      <el-table-column prop="live_title" label="直播名称" show-overflow-tooltip></el-table-column>
      <el-table-column label="直播时间" width="170" show-overflow-tooltip>
        <template scope="scope">
          <p>{{scope.row.live_stime}}</p>
          <p>{{scope.row.live_etime}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="channelid" label="房间" width="80" show-overflow-tooltip></el-table-column>
      <el-table-column prop="creater_name" label="创建人" width="80" show-overflow-tooltip></el-table-column>
      <el-table-column label="状态" width="100">
        <template scope="scope">
          <span v-if="scope.row.state==2" class="blue">未开始</span>
          <span v-else-if="scope.row.state==3" class="warning">已结束</span>
          <span v-else-if="scope.row.state==4" class="warning">已禁播</span>
          <span v-else class="danger">进行中</span>
        </template>
      </el-table-column>
      <el-table-column label="禁播" width="150">
        <template scope="scope"> 
          <el-switch v-model="scope.row.cancel_state" v-if="scope.row.is_show_cancel==2" on-color="#13ce66" off-color="#1998e4" @change="chooseBan(scope.row.live_id,scope.row.cancel_state,scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280">
        <template scope="scope">
          <div>
            <el-button type="primary" size="small" @click="liveDetail(scope.row.live_id)">查看</el-button>
            <el-button size="small" v-if="scope.row.show_status==1" @click="editLive(scope.row.live_id)">编辑</el-button>
            <el-button size="small" v-if="scope.row.show_status==1" @click="deleteLive(scope.row.live_id)">删除</el-button>
            <el-button size="small" v-if="scope.row.is_show_close==1" @click="closeLive(scope.row.live_id)">关闭</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="live_detail" v-if="showDetail==1">
      <div>
        <a href="javascript:void(0)" @click="close">x</a>
        <div class="content">
          <p class="title">直播介绍</p>
          <el-row>
            <el-col :span="4" style="text-align: right">直播名称：</el-col>
            <el-col :span="20">{{detail.live_title}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4" style="text-align: right">开始时间：</el-col>
            <el-col :span="20">{{detail.live_stime}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4" style="text-align: right">结束时间：</el-col>
            <el-col :span="20">{{detail.live_etime}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4" style="text-align: right">状态：</el-col>
            <el-col :span="20">{{detail.state}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4" style="text-align: right">详情：</el-col>
            <el-col :span="20">{{detail.live_desc}}</el-col>
          </el-row>
          <el-row>
            <el-col :offset="4" :span="20">
              <el-button type="primary" @click="watchLive(detail.channelId)">进入直播间</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['total', 'videoList', 'showDetail', 'detail'],
  data() {
    return {
      typeText1: '',
      searchTxt: '',//搜索关键字
      checkTypeList: [
        { name: '未开始', value: 1 }, { name: '进行中', value: 2 }
      ],//直播状态
      checkType: '',//选中的状态
      zb_id:""
    }
  },
  methods: {
    //创建直播
    addOnline() {
      this.$emit('addShow')
    },
    //选择直播状态
    selectChange(val) {
      this.checkType = val;
      this.videoList=[];
      this.$emit('searchList', this.checkType, this.searchTxt)
    },
    handleIconClick() {
      this.videoList=[];
      this.$emit('searchList', this.checkType, this.searchTxt)
    },
    //禁用直播
    chooseBan(id, state,rwo) { 
      if (state) {
        this.$emit('liveCancel', id, 1,rwo)
      } else {
        this.$emit('liveCancel', id, 2,rwo)
      }
    },
    //查看直播详情
    liveDetail(id) {  
      this.zb_id=id;
      this.$emit('detailLive', id)
    },
    //关闭详情
    close() {
      this.$emit('detailLive')
    },
    //观看直播
    watchLive(id) { 
      console.log(this.detail)
      if(this.detail.channelid){ 
        window.open(`http://live.polyv.cn/splash/${this.detail.channelid}`);
      }else{
         this.$message({
          message: '暂无直播间',
          type: 'success'
        });
      }
    },
    //删除直播
    deleteLive(id) {
      this.$emit('liveDelete', id)
    },
    //编辑直播
    editLive(id) {
      this.$emit('liveEdit', id);
    },
    //关闭直播
    closeLive(id) {
      this.$emit('liveClose', id);
    },
    resh(){
      // 刷新
      
      this.videoList=[];
      this.$emit('searchList', this.checkType, this.searchTxt)
    }
  }
}
</script>
<style lang="less" type="text/less">
.live_detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .8);
  z-index: 100;
  a {
    position: absolute;
    top: 8px;
    right: 9px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    background: #5b5b5b;
    font-size: 16px;
    border-radius: 15px;
    z-index: 100;
    &:hover {
      background: #545454;
    }
  }
  &>div {
    z-index: 200;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 600px;
    background: #fff;
    border-radius: 10px;
    overflow: auto;
    padding: 10px;
    box-sizing: border-box;
  }
  .content {
    .title {
      color: #1d90e6;
      font-size: 24px;
      line-height: 50px;
      border-bottom: 1px solid #f5f5f5;
      margin-bottom: 20px;
      padding-left: 20px;
      box-sizing: border-box;
    }
  }
}
</style>
