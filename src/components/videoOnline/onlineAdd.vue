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
        <el-date-picker v-model="time" type="datetimerange" placeholder="选择时间范围">
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="2">
        <div class="att-name rt">参与班级：</div>
      </el-col>
      <el-col :span="8">
        <el-select v-model="className" multiple placeholder="请选择" @change="classChoose">
          <el-option v-for="item in addShowList.department_list" :label="item.department_name" :value="item.department_id"></el-option>
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
      <el-col :offset="6">
        <el-button type="primary" @click="add">立即创建</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getToken, getClass } from '@/utils/auth'
import store from '@/utils/videoOnline'
export default {
  props: ['addShowList_1'],
  data() {
    return {
      time: '',
      className: [],
      teacherName: '',
      houseName: '',
      text: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      data: {
        token: getToken(),
        live_title: '',//直播名称
        live_stime: '',
        live_etime: '',
        department_ids: '',
        teacher_id: '',
        house_name: '',
        context: '',
      },
      liveId: '',//直播id
      addShowList: []
    }
  },
  methods: {
    //班级选择
    classChoose(val) {
      this.data.department_ids = val.join(',');
    },
    //老师选择
    teacherChoose(val) {
      this.data.teacher_id = val;
    },

    //创建直播提交
    add() {
      this.$emit('liveSubmit', this.data, this.liveId)
    },
    //取消
    cancel() {
      this.$emit('cancelAdd')
    }
  },
  created() {
    console.log(this.addShowList_1)
    if (typeof this.addShowList_1 == 'object') {

      this.addShowList = this.addShowList_1;
      let obj = this.addShowList.live_info;

      let department_ids = '';
      let ids = [];

      if (this.addShowList.relation_list) {
        let classObj = this.addShowList.relation_list;
        for (let i = 0; i < classObj.length; i++) {
          ids.push(classObj[i].department_id);

        }
        department_ids = ids.join(',');
      }
      if (this.addShowList.live_info) {
        this.data = {
          token: getToken(),
          live_title: obj.live_title,
          live_stime: obj.live_stime,
          live_etime: obj.live_etime,
          department_ids: department_ids,
          teacher_id: obj.teacher_id,
          house_name: obj.house_name,
          context: obj.live_desc
        };
        this.time = [
          new Date(obj.live_stime), new Date(obj.live_etime)
        ]
        this.teacherName = obj.teacher_id;
        this.liveId = obj.live_id;
      }

      this.className = ids;
    } else {
      store.live_add.call(this)
    }
  },
  mounted() {

  },
  watch: {
    time(arr) {
      this.data.live_stime = Date.parse(arr[0]) / 1000;
      this.data.live_etime = Date.parse(arr[1]) / 1000;
    }
  }
}
</script>
<style>
.att-name {
  line-height: 30px;
}
</style>
