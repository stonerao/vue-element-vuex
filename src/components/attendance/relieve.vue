<template>
  <div class="att-main">
    <div v-if="state!=0">
      <el-row :gutter="20">
        <el-col :span="4">
          <div v-if="state==2" class="att-name rt">代课课时：</div>
          <div v-else class="att-name rt">调换课时：</div>
        </el-col>
        <el-col :span="20">
          <div class="att-time">
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions0">
            </el-date-picker>
          </div>
          <div class="att-checkbox">
            <el-radio class="radio" v-model="radio" label="1">高2017级2班早读节次1</el-radio>
            <el-radio class="radio" v-model="radio" label="2">高2017级2班上午节次1</el-radio>
            <el-radio class="radio" v-model="radio" label="3">初2018级晚自习节次1</el-radio>
            <el-radio class="radio" v-model="radio" label="4">高2017级2班上午节次1</el-radio>
            <el-radio class="radio" v-model="radio" label="5">初2018级晚自习节次1 </el-radio>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div v-if="state==2" class="att-name rt">请选择代课老师：</div>
          <div v-else class="att-name rt">找人调课：</div>
        </el-col>
        <el-col :span="20" v-if="state==2">
          <el-select v-model="name" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="20" v-else>
          <div class="att-time">
            <el-date-picker
              v-model="value2"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions0">
            </el-date-picker>
          </div>
          <div class="att-checkbox">
            <el-radio class="radio" v-model="radio" label="1">高2017级2班早读节次1</el-radio>
            <el-radio class="radio" v-model="radio" label="2">高2017级2班上午节次1</el-radio>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="20" v-if="state==0">
      <el-col :span="4">
        <div class="att-name rt">请假时间：</div>
      </el-col>
      <el-col :span="20">
        <el-date-picker
          v-model="value6"
          type="daterange"
          placeholder="选择日期范围">
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 30px">
      <el-col :span="4">
        <div class="att-name rt">申请代课原因：</div>
      </el-col>
      <el-col :span="20">
        <el-form>
          <el-form-item>
            <el-input type="textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交申请</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default({
    props:['state'],
    data(){
      return{
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        value1:'',
        value2:'',
        value6: '',
        radio:'1',
        options:[
          {value: '选项1', label: '黄金糕'}
        ],
        name:''
      }
    },
    watch:{
      state(){
        this.$emit('changeAddState');
        this.value1='';
        this.value2='';
        this.value6='';
        this.name='';
      }
    }
  })
</script>
<style lang="less" type="text/less">

</style>
