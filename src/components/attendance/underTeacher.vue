<template>
  <div>
    <el-select v-if="underTeacherList.is_show!=2" v-model="uteacher" @change="uteacherChoose" placeholder="请选择老师">
      <el-option v-for="item in underTeacherList.teacher_list" :key="item.teacher_id" :label="item.teacher_name" :value="item.teacher_id"></el-option>
    </el-select>
  </div>
</template>
<script>
  export default{
    props:['underTeacherList'],
    data(){
      return{
        uteacher:'',//选中的下级老师姓名
      }
    },
    methods:{
      uteacherChoose(val){
        console.log(val)
        this.$emit('teacherChoose')
      }
    }
  }
</script>
<style lang="less" type="text/less">

</style>
