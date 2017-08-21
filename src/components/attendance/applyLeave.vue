<template>
  <div>
    <el-row class="class-header">
      <el-col :span="4" class="class-titles">
        <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共{{total}}条记录
      </el-col>
      <el-col v-if="isClassLogin!=1" :span="8">
        <el-button type="primary" @click="apply"><b>+</b>请假申请</el-button>
      </el-col>
      <el-col v-if="isClassLogin!=1" :span="12">
        <el-select v-model="typeText1" @change="selectChange" placeholder="请选择审核状态" size="small" class="rt">
          <el-option v-for="item in checkTypeList" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col v-else :span="20">
        <el-select v-model="typeText1" @change="selectChange" placeholder="请选择审核状态" size="small" class="rt">
          <el-option v-for="item in checkTypeList" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%">
      <template scope="scope">
        <el-table-column prop="sign_leaveid" label="ID" width="50">
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
            <span v-if="scope.row.apply_stutas=='待审批'" class="blue">待审批</span>
            <span v-else-if="scope.row.apply_stutas=='同意'" class="warning">同意</span>
            <span v-else class="danger">未批准</span>
          </template>
        </el-table-column>
        <el-table-column prop="manager_name" label="审批人" width="80">
        </el-table-column>
        <el-table-column v-if="isClassLogin==1" label="操作" width="150">
          <template scope="scope">
            <div v-if="scope.row.apply_stutas=='待审批'">
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
    props:['total','list','checkTypeList','isClassLogin'],
    data(){
      return{
        typeText1:'',//请假管理审核状态
      }
    },
    methods:{
      apply(){
       this.$emit('apply')
      },
      //选择审批状态
      selectChange(val){
        this.$emit('typeChange',val)
      },
      //学校中心同意老师请假申请
      applyLeave(num,id){
        this.$emit('leaveApply',num,id)
      }
    }
  }
</script>
<style lang="less" type="text/less">

</style>
