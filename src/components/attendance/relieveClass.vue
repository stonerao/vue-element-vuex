<template>
  <div>
    <el-row class="class-header">
      <el-col :span="4" class="class-titles">
        <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共 {{total}} 条记录
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="apply"><b>+</b>申请代课</el-button>
      </el-col>
      <el-col :span="12">
        <el-select v-model="typeText2" placeholder="请选择审核状态" size="small" class="rt">
          <el-option v-for="item in checkTypeList" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table :data="attList">
      <el-table-column prop="sign_leaveid" label="ID" width="80">
      </el-table-column>
      <el-table-column prop="leave_desc" label="请假事由" show-overflow-tooltip >
      </el-table-column>
      <el-table-column prop="relieveTime" label="调课时间" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="apply_time" label="提交时间"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="审批状态" width="100">
        <template scope="scope"><span :class="scope.row.typeId==1 ? 'blue':(scope.row.typeId==2 ? 'warning':'danger')">{{scope.row.type}}</span></template>
      </el-table-column>
      <el-table-column prop="approve" label="审批人" width="80">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default{
    props:['total','attList','checkTypeList'],
    data(){
      return{

      }
    },
    methods:{
      apply(){
        this.$emit('apply')
      }
    }
  }
</script>
<style lang="less" type="text/less">

</style>
