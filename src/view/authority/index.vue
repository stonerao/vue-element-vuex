<template>
  <div class="kd-app-main kd-z-main">
    <titleItem :titleText="$route.name.substring(1)"></titleItem>
    <div class="kd-box">
      <div class="kd-app-box">
        <titleActive :titles="titleItem" @Transfer="emitTransfer" :state="state"></titleActive>
      </div>
      <div class="kd-box-content">
        <description :prompts="prompts" @PromPts="promptsTem"></description>
        <div v-if="state==0">
          <el-row class="class-header">
            <el-col :span="4" class="class-titles">
              <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共 111 条记录
            </el-col>
            <el-col :span="20">
              <el-input placeholder="请输入名称" icon="search" size="small">
              </el-input>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import titleItem from '@/components/main/title.vue'
  import titleActive from '@/components/main/titleActive.vue'
  import description from '@/components/main/description.vue'
  import bottomItem from '@/components/bottom/bottom.vue'
  export default {
    data() {
      return {
        titleItem: [
          { name: "科目管理", index: 0 },
          { name: "增加科目", index: 1 },
        ],
        prompts: [
          `该页面展示管理员的操作日志，可进行删除。`,
          `侧边栏可以进行高级搜索`
        ],
        state: 0,
        promptsPad: true
      }
    },
    created() {
    },
    components: {
      titleItem, titleActive, description, bottomItem
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
      }
    }
  }
</script>
<style lang="less" type="text/less">

</style>
