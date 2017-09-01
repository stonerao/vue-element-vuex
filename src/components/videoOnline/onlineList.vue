<template>
  <div>
    <el-row class="class-header">
      <el-col :span="4" class="class-titles">
        <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共{{total}}条记录
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="addOnline"><b>+</b>创建直播</el-button>
      </el-col>
      <el-col :span="7">
        <el-select v-model="typeText1" @change="selectChange" placeholder="请选择直播状态" size="small" class="rt">
          <el-option v-for="item in checkTypeList" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-input placeholder="请输入关键字" icon="search" v-model="searchTxt" :on-icon-click="handleIconClick" size="small"></el-input>
      </el-col>
    </el-row>
    <el-table :data="videoList" style="width: 100%">
        <el-table-column prop="live_id" label="ID" width="50"></el-table-column>
        <el-table-column prop="live_title" label="直播名称" show-overflow-tooltip></el-table-column>
        <el-table-column label="直播时间"  width="170" show-overflow-tooltip>
          <template scope="scope">
            <p>{{scope.row.live_stime}}</p>
            <p>{{scope.row.live_etime}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="channelId" label="房间" width="80" show-overflow-tooltip></el-table-column>
        <el-table-column prop="creater_name" label="创建人" width="80" show-overflow-tooltip></el-table-column>
        <el-table-column  label="状态" width="100">
          <template scope="scope">
            <span v-if="scope.row.state==1" class="blue">未开始</span>
            <span v-else-if="scope.row.state==2" class="warning">已结束</span>
            <span v-else class="danger">进行中</span>
          </template>
        </el-table-column>

        <el-table-column  label="禁播" width="150">
          <template scope="scope">
          <el-switch v-model="scope.row.cancel_state" on-color="#13ce66" off-color="#1998e4" @change="chooseBan(scope.row.live_id,scope.row.cancel_state)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template scope="scope">
            <div>
              <el-button type="primary" size="small" @click="liveDetail(scope.row.live_id)">查看</el-button>
              <el-button size="small" v-if="scope.row.show_status==1">编辑</el-button>
              <el-button size="small" v-if="scope.row.show_status==1">删除</el-button>
              <el-button size="small" v-if="scope.row.is_show_close==1">关闭</el-button>
            </div>
          </template>
        </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default{
    props:['total','videoList'],
    data(){
      return{
        typeText1:'',
        searchTxt:'',//搜索关键字
        checkTypeList:[
          {name:'未开始',value:1},{name:'进行中',value:2}
        ],//直播状态
        checkType:'',//选中的状态
      }
    },
    methods:{
      //创建直播
      addOnline(){
        this.$emit('addShow')
      },
      //选择直播状态
      selectChange(val){
        this.checkType=val;
        this.$emit('searchList',this.checkType,this.searchTxt)
      },
      handleIconClick(){
        this.$emit('searchList',this.checkType,this.searchTxt)
      },
      //禁用直播(待做，接口数据有点问题)
      chooseBan(id,state){
        console.log(id,state)
      },
      //查看直播详情
      liveDetail(id){
        console.log(id)
      },
    }
  }
</script>
<style lang="less" type="text/less">

</style>
