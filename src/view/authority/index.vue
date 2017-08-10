<template>
  <div class="kd-app-main kd-z-main">
    <titleItem :titleText="$route.name.substring(1)"></titleItem>
    <div class="kd-box">
      <div class="kd-app-box">
        <titleActive :titles="titleItem" @Transfer="emitTransfer" :state="state"></titleActive>
      </div>
      <div class="kd-box-content">
        <description :prompts="prompts" @PromPts="promptsTem"></description>
        <div v-if="state==0 && editShow!=1">
          <el-row class="class-header">
            <el-col :span="20" class="class-titles">
              <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共 {{total}} 条记录
            </el-col>
            <el-col :span="4">
              <el-input v-model="searchTxt" :on-icon-click="searchGroup" placeholder="请输入名称" icon="search" size="small" class="rt">
              </el-input>
            </el-col>
          </el-row>
          <el-table ref="multipleTable" :data="list">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="gname" label="权限组名称"></el-table-column>
            <el-table-column label="操作" width="200">
              <template scope="scope">
                <el-button icon="edit" size="small" @click="editGroup(scope.row.gid)">编辑</el-button>
                <el-button icon="delete2" size="small" @click="deleteGroup(scope.row.gid)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="kd-page">
            <el-row>
              <el-col :span="12" :offset="12">
                <el-pagination class="float-right" :current-page="currentPage" :page-sizes="[10, 15, 20, 25]" :page="10" layout="total,sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                </el-pagination>
              </el-col>
            </el-row>
          </div>
        </div>
        <div v-if="state==1 || editShow==1">
          <div class="att-main">
            <el-row>
              <el-col :span="4">
                <div class="att-name rt">权限组名称：</div>
              </el-col>
              <el-col :span="8">
                <el-input v-model="groupName" placeholder="请输入权限组名称"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <div class="att-name rt">设置权限组：</div>
              </el-col>
              <el-col :span="15">
                <div class="authority_checkbox">
                  <el-checkbox-group v-model="groupCtrList">
                    <el-checkbox v-for="item in ctrList" :label="item.name"></el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="4" :span="100">
                <el-button size="large" type="primary" @click="addGroup">提交</el-button>
                <el-button size="large" v-if="editShow==1" @click="cancelEdit">取消</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import titleItem from '@/components/main/title.vue'
  import titleActive from '@/components/main/titleActive.vue'
  import description from '@/components/main/description.vue'
  import bottomItem from '@/components/bottom/bottom.vue'
  import group from '@/utils/group'

  export default {
    data() {
      return {
        titleItem: [
          { name: "权限组", index: 0 },
          { name: "添加权限组", index: 1 },
        ],
        prompts: [
          `该页面展示管理员的操作日志，可进行删除。`,
          `侧边栏可以进行高级搜索`
        ],
        state: 0,
        editShow:0,//编辑权限组
        promptsPad: true,
        list:[],//权限组列表
        total:0,//总条数
        currentPage:1,//当前页
        pageSize:10,//每页显示数量
        ctrList:[],//控制器列表
        groupName:'',//添加权限组名字
        groupCtrList:[],//添加权限控制器名
        gid:'',//权限组ID
        searchTxt:'',//搜索框文本
      }
    },
    created() {
      group.group_list(this);
      group.controller_list.call(this);

    },
    components: {
      titleItem, titleActive, description, bottomItem
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
      //添加、编辑权限组
      addGroup(){
        if(this.editShow==0){
          this.$confirm('确定添加权限组吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            group.add_group.call(this);
            this.groupName='';
            this.groupCtrList=[];
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消添加'
            });
          })
        }else{
          this.$confirm('此操作将修改该权限组, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            group.edit_group.call(this);
            this.groupName='';
            this.groupCtrList=[];
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消修改'
            });
          });
        }
      },
      //编辑权限组
      editGroup(gid){
        this.editShow=1;
        this.gid=gid;
        group.group_detail(this,gid);
      },
      //取消编辑
      cancelEdit(){
        this.editShow=0;
      },
      //删除权限组
      deleteGroup(gid){
        this.$confirm('此操作将永久删除该权限组, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          group.delete_group(this,gid);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //每页条数变化
      handleSizeChange(val) {
        this.pageSize=val;
        group.group_list(this);

      },
      //点击翻页
      handleCurrentChange(val) {
        this.currentPage=val;
        group.group_list(this);
      },
      //搜索权限组
      searchGroup(){
        group.group_list(this);
      }
    },
    watch:{
      state(){
        this.editShow=0;
        this.groupName='';
        this.groupCtrList=[];
        group.group_list(this);
      },
    }
  }
</script>
<style lang="less" type="text/less">

</style>
