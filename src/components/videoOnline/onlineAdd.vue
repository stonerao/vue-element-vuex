<template>
    <div>
      <el-row>
        <el-col :span="4" :offset="2">
          <div class="att-name rt">直播名称：</div>
        </el-col>
        <el-col :span="8">
          <el-input v-model="data.live_title" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="2">
          <div class="att-name rt">直播时间：</div>
        </el-col>
        <el-col :span="8">
          <el-date-picker v-model="time" type="datetimerange" placeholder="选择时间范围" @change="timeChange">
          </el-date-picker>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="2">
          <div class="att-name rt">参与班级：</div>
        </el-col>
        <el-col :span="8">
          <el-select v-model="className" multiple placeholder="请选择" @change="classChoose">
            <el-option v-for="item in addShowList.department_list"  :label="item.department_name" :value="item.department_id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="2">
          <div class="att-name rt">设置老师：</div>
        </el-col>
        <el-col :span="8">
          <el-select v-model="teacherName" placeholder="请选择" @change="teacherChoose">
            <el-option v-for="item in addShowList.teacher_list" :label="item.teacher_name" :value="item.teacher_id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="2">
          <div class="att-name rt">房间名称：</div>
        </el-col>
        <el-col :span="8">
          <el-input v-model="data.house_name" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="2">
          <div class="att-name rt">直播描述：</div>
        </el-col>
        <el-col :span="8">
          <el-input type="textarea" v-model="data.context"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="6" >
          <el-button type="primary" @click="add">立即创建</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-col>
      </el-row>
    </div>
</template>
<script>
  import { getToken ,getClass} from '@/utils/auth'
export default{
  props:['addShowList'],
    data(){
        return{
          time:'',
          className:'',
          teacherName:'',
          houseName:'',
          text:'',
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }],
          data:{
            token:getToken(),
            live_title:'',//直播名称
            live_stime:'',
            live_etime:'',
            department_ids:'',
            teacher_id:'',
            house_name:'',
          },
        }
    },
    methods:{
//      时间选择
      timeChange(val){
        let arr=val.split(' - ');
        console.log(arr)
        this.data.live_stime=arr[0];
        this.data.live_etime=arr[1];
      },
      //班级选择
      classChoose(val){
       this.data.department_ids= val.join(',');
      },
      //老师选择
      teacherChoose(val){
        this.data.teacher_id=val;
      },

      //创建直播提交
      add(){
        console.log(this.data)
        this.$emit('liveSubmit',this.data)
      },
      //取消
      cancel(){
        this.$emit('cancelAdd')
      }
    },
    created(){

    },
    mounted(){

    },
    watch:{

    }
}
</script>
<style>
  .att-name{
    line-height: 30px;
  }
</style>
