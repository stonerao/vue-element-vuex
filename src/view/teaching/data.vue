<template>
  <div class="app">
    <div id="header">
      <HeadSide></HeadSide>
    </div>
    <div id="box" class="r-shoping l_layout_outer">
      <div class="r-shoping-head">
        <el-row>
          <el-col :span="12">
            <el-breadcrumb separator="》" class="r-shoping-line">
              <el-breadcrumb-item :to="{ path: '/' }">学生管理中心</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/teaching' }">教材中心</el-breadcrumb-item>
              <el-breadcrumb-item><span style="color: #48576a;">{{datas[0].paper_name}} - 相关资料</span></el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
      </div>
      <div class="r-shoping-info">
          <el-row style="padding-top: 19px;border-top: 1px solid #1997e4;">
              <el-col :span="24">
                  <img src="../../assets/index/shuaxin.png" class="icon-img-xs" @click="share_refresh"/>刷新-共{{materialParams.total_num}}条记录
              </el-col> 
          </el-row>
          <el-table ref="multipleTable" border :data="datas" tooltip-effect="dark" style="width: 100%">
              <el-table-column label="教材名称" prop="paper_name"></el-table-column>
              <el-table-column label="共享资料名称" prop="za_shared_name"></el-table-column>
              <el-table-column label="所在页数" prop="zc_curpage"></el-table-column>
              <el-table-column label="素材文件">
                <template scope="scope">
                    <a :href="scope.row.annex_file_add" v-html="scope.row.pdf ? scope.row.annex_file_name : '-'"></a>
                </template>
              </el-table-column>
              <el-table-column label="视频文件">
                  <template scope="scope">
                    <a :href="scope.row.file_video_add" v-html="scope.row.video ? scope.row.file_video_name : '-'"></a>
                  </template>
              </el-table-column>
              <el-table-column label="操作">
                  <template scope="scope">
                      <el-button type="primary" size="mini" icon="view" @click.native="che_detail(scope.row.zc_id)">查看</el-button>
                  </template>
              </el-table-column>
          </el-table>
          <el-row :span="24">
              <el-col :span="24">
                  <div class="kd-page">
                      <el-pagination class="float-right" :current-page="materialParams.curpage" :page-sizes="[15, 20, 25, 30]" :page-size="materialParams.page_count" layout="total, sizes, prev, pager, next, jumper" :total="materialParams.total_num" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                      </el-pagination>
                  </div>
              </el-col>
          </el-row>
      </div>

      <div class="myPopup" v-if="show_type">
          <div class="Popup" style="width: 720px;">
              <ul class="popHeader clearfloat">
                  <li>详情展示</li>
                  <li @click="l_popclose"><i class="el-icon-circle-close"></i></li>
              </ul>
              <div class="popContent" style="height: auto;padding: 35px;">
                  <div style="width: 100%;height: 100%;">
                      <el-row>
                          <el-col :span="3">直播名称：</el-col>
                          <el-col :span="21"></el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="3">开始时间：</el-col>
                          <el-col :span="21"></el-col>
                      </el-row>
                  </div>
              </div>
          </div>
          <div class="dialog_mask" @click="l_popclose"></div>
      </div>

    </div>
  </div>
</template>
<script>
import { HeadSide } from '@/view/layout/index.js'
import info from '@/utils/l_axios1'
import { isClassLogin } from '@/utils/auth'

export default {
  data() {
    return {
      datas: [],
      thisState: isClassLogin(),
      paper_id: 0,
      materialParams: {   //翻页
          hasmore: true,
          curpage: 1,//当前页数
          one_pagenum: 10,
          page_count: 1,//总页数
          total_num: 0
      },
      show_type: false,
      deData: [],  //详情id
    }
  },
  components: {
    HeadSide
  },
  created() {
    this.paper_id = this.$route.query.pid;
    this.dataAjax();
  },
  methods: {
    l_popclose(){
      this.show_type = !this.show_type;
    },
    dataAjax() {
        info.ShareMaterial_s.call(this,this.materialParams,this.paper_id);
    },
    handleSizeChange(val) {
        // this.materialParams.hasmore = true;
        this.materialParams.one_pagenum = val;
        this.dataAjax();
    },
    handleCurrentChange(val) {
        this.materialParams.curpage = val;
        this.dataAjax();
    },
    share_refresh(){
        this.materialParams.hasmore = true;
        this.datas = [];
        this.dataAjax();
    },
    che_detail(id){ //查看详情
      this.l_popclose();
      info.ShareDatadetail_s.call(this,id);
    }
  },

}
</script>

<style>
.r-shoping-listinfo .el-input-number__decrease,
.el-input-number__increase {
  top: 3px;
}
</style>
