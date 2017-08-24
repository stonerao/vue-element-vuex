<template>
  <div class="kd-app-main">
    <titleItem :titleText="$route.name.substring(1)"></titleItem>
    <div class="kd-box">
      <div class="kd-app-box">
        <titleActive :titles="titleItem" @Transfer="emitTransfer" :state="state"></titleActive>
      </div>
      <div class="kd-box-content">
        <description :prompts="prompts" @PromPts="promptsTem"></description>
        <!--班级管理 -->
        <div v-if="detailShow==0">
          <el-row class="class-header">
            <el-col :span="10" class="class-titles">
              <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共{{total}}条记录
            </el-col>
            <el-col :span="7">
              <el-select @change="teacherChoose" v-model="teacher" v-if="isShow==1" placeholder="选择老师" size="small" class="rt">
                <el-option v-for="(item,index) in teacherList" :label="item.teacher_name" :value="index">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="6" :offset="isShow==1 ? 1:8">
              <el-input placeholder="请输入班级名称(例：1班)" icon="search" size="small" v-model="keywords" :on-icon-click="handleIconClick">
              </el-input>
            </el-col>
          </el-row>
          <el-table :data="classList">
            <template scope="scope">
              <el-table-column prop="department_id" label="ID" width="100">
              </el-table-column>
              <el-table-column prop="class_name" label="年/班级名称"  show-overflow-tooltip >
              </el-table-column>
              <el-table-column prop="subject_name" label="教学科目" min-width="120" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="head_teacher_name" label="班主任" min-width="100" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="student_num" label="班级人数（人）" width="180">
              </el-table-column>
              <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="classDetail(scope.row.department_id)">查看</el-button>
                </template>
              </el-table-column>
            </template>
          </el-table>
        </div>
        <!--班级详情-->
        <div v-else>
          <classDetail :total="total" @return_list="returnList" @detailList="classListDetail" :classInfo="classInfo" :listDetail="listDetail"></classDetail>
        </div>
        <div class="kd-page">
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
  import my from '@/utils/myClass'
  import classDetail from '@/components/myClass/classDetail'
  export default {
    data() {
      return {
        titleItem: [
          { name: "班级管理", index: 0 },
        ],
        prompts: [
          `该页面展示管理员的操作日志，可进行删除。`,
          `侧边栏可以进行高级搜索`
        ],
        state: 0,
        detailShow:0,//班级详情(1:显示，0:不显示)
        total:0,//总条数
        currentPage:1,//当前页
        pageSize:10,//每页显示数量
        ids:"",//组织部门ID+老师ID
        keywords:"",//年/班级名称
        classList:[],//班级列表
        teacherList:[],//获取某老师所处节点及向下所有节点的组织部门ID+老师ID+老师姓名
        isShow:'',//是否展示选择老师
        teacher:"",//选择老师
        classInfo:{},//班级信息
        listDetail:[],//班级详情列表
        sex:'',//性别
        stuName:'',//学生姓名
        classId:'',//查看班级Id
      }
    },
    created() {
      this.refreshList();
    },
    components: {
      titleItem, titleActive, description, bottomItem,classDetail
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
        if(this.detailShow==0){
          my.class_list.call(this);
          my.under_list.call(this);
        }else{
          my.class_detail.call(this)
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
      //选择老师
      teacherChoose(val){
        let obj=this.teacherList[val];
        this.ids=`${obj.department_id},${obj.teacher_id}`;
        this.refreshList();
      },
      //班级搜索
      handleIconClick(){
        this.refreshList();
      },
      //班级详情
      classDetail(id){
        this.detailShow=1;
        this.classId=id;
        this.refreshList();
      },
      returnList(val){
        this.detailShow=val;
      },
      classListDetail(sex,name){
        this.stuName=name;
        this.sex=sex;
        this.refreshList();
      }
    },
    watch:{
      detailShow(){
        this.refreshList();
      }
    }
  }
</script>

<style scoped>

</style>
