<template>
  <div>
    <el-row class="class-header">
      <el-col :span="4" class="class-titles">
        <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共{{total}} 条记录
      </el-col>
      <el-col :span="8">
        <el-button @click="apply" type="primary"><b>+</b>申请调课</el-button>
      </el-col>
      <el-col :span="12">
        <uteacher :underTeacherList="underTeacherList" @teacherChoose="teacher" class="lf"></uteacher>
        <el-select v-model="typeText2" @change="selectChange" placeholder="请选择审核状态" size="small" class="rt">
          <el-option v-for="item in checkTypeList" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table :data="list">
      <el-table-column prop="record_id" label="ID" width="80">
      </el-table-column>
      <el-table-column prop="operate_reason" label="请假事由" show-overflow-tooltip >
      </el-table-column>
      <el-table-column prop="change_time" label="调课时间" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="operate_time" label="提交时间"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="审批状态" width="100">
        <template scope="scope">
          <span v-if="scope.row.status=='待审批'" class="blue">待审批</span>
          <span v-else-if="scope.row.status=='同意'" class="warning">同意</span>
          <span v-else class="danger">未批准</span>
        </template>
      </el-table-column>
      <el-table-column prop="manager_name" label="审批人" width="80">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import uteacher from '@/components/attendance/underTeacher'
  export default{
    props:['total','list','checkTypeList','underTeacherList'],
    data(){
      return{
        typeText2:'',//代课管理审核状态
      }
    },
    components:{
      uteacher
    },
    methods:{
      apply(){
        this.$emit('apply')
      },
      //选择审批状态
      selectChange(val){
        this.$emit('typeChange',val)
      },
      //选中节点下的老师
      teacher(){
        this.$emit('ChooseTeacher')
      }
    }
  }
</script>
<style lang="less" type="text/less">

</style>
