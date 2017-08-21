<template>
  <div>
    <el-row class="class-header">
      <el-col :span="4" class="class-titles">
        <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共{{total}} 条记录
      </el-col>
      <el-col :span="20">
        <el-select v-model="typeText2" @change="selectChange" placeholder="请选择审核状态" size="small" class="rt">
          <el-option v-for="item in checkTypeList" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table :data="list">
      <el-table-column prop="operate_type" label="调课/代课" width="100">
      </el-table-column>
      <el-table-column prop="operate_person" label="申请人" show-overflow-tooltip >
      </el-table-column>
      <el-table-column prop="operate_reason" label="原因" show-overflow-tooltip >
      </el-table-column>
      <el-table-column prop="change_time" label="调换时间" show-overflow-tooltip>
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
      <el-table-column prop="manager_name" label="操作" width="150">
        <template scope="scope">
          <div v-if="scope.row.status=='待审批'">
            <el-button type="primary" size="small" @click="approveChoose(2,scope.row.record_id)">同意</el-button>
            <el-button size="small" @click="approveChoose(3,scope.row.record_id)">拒绝</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default{
    props:['total','list','checkTypeList'],
    data(){
      return{
        typeText2:'',//管理审核状态
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
      //审批同意或拒绝
      approveChoose(num,id){
        this.$emit('chooseApprove',num,id)
      }
    }
  }
</script>
<style lang="less" type="text/less">

</style>
