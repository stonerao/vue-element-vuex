<template>
  <div>
    <el-row class="class-header">
      <el-col :span="4" class="class-titles">
        <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共{{total}}条记录
      </el-col>
      <el-col :span="20">
        <el-select v-model="type" @change="selectChange" placeholder="请选择审核状态" size="small" class="rt">
          <el-option v-for="item in checkTypeList" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%">
      <template scope="scope">
        <el-table-column prop="sign_leaveid" label="ID" width="100">
        </el-table-column>
        <el-table-column prop="leave_desc" label="请假事由"  show-overflow-tooltip >
        </el-table-column>
        <el-table-column prop="start_time" label="请假开始时间" min-width="120" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="end_time" label="请假结束时间" min-width="120" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="duration" label="时长（小时）" width="120">
        </el-table-column>
        <el-table-column prop="apply_time" label="提交时间"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column  label="审批状态" width="100">
          <template scope="scope">
            <span v-if="scope.row.apply_stutas==1" class="blue">待审批</span>
            <span v-else-if="scope.row.apply_stutas==2" class="warning">同意</span>
            <span v-else class="danger">未批准</span>
          </template>
        </el-table-column>
        <el-table-column prop="manager_name" label="审批人" width="80">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template scope="scope">
            <div v-if="scope.row.apply_stutas==1">
              <el-button type="primary" size="small" @click="applyLeave(2,scope.row.sign_leaveid)">同意</el-button>
              <el-button size="small" @click="applyLeave(3,scope.row.sign_leaveid)">拒绝</el-button>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
  export default{
    props:['list','total'],
    data(){
      return{
        type:'',//审核状态
        checkTypeList:[{name:'待审批',value:1},{name:'同意',value:2},{name:'未批准',value:3}],

      }
    },
    methods:{
      //选择审批状态
      selectChange(val){
        this.$emit('typeChange',val)
      },
      //老师同意学生请假申请
      applyLeave(num,id){
        this.$emit('leaveApply',num,id)
      },
    }
  }
</script>
<style lang="less" type="text/less">

</style>
