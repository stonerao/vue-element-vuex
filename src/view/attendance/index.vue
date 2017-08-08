<template>
    <div class="kd-app-main kd-z-main">
        <titleItem :titleText="$route.name.substring(1)"></titleItem>
        <div class="kd-box">
            <div class="kd-app-box">
                <titleActive :titles="titleItem" @Transfer="emitTransfer" :state="state"></titleActive>
            </div>
            <div class="kd-box-content">
                <description :prompts="prompts" @PromPts="promptsTem"></description>
                <!--模块开始  -->
                <!--请假管理-->
                <div v-if="state==0&&addState!=1">
                  <el-row class="class-header">
                    <el-col :span="4" class="class-titles">
                        <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共 111 条记录
                    </el-col>
                    <el-col :span="8">
                      <el-button type="primary" @click="addState=1"><b>+</b>请假申请</el-button>
                    </el-col>
                    <el-col :span="12">
                      <el-select v-model="typeText1" placeholder="请选择审核状态" size="small" class="rt">
                        <el-option v-for="item in checkTypeList"
                                   :key="item.value"
                                   :label="item.name"
                                   :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <div>
                    <el-table :data="leaveList" style="width: 100%">
                      <template scope="scope">
                        <el-table-column prop="leaveId" label="ID" width="80">
                        </el-table-column>
                        <el-table-column prop="msg" label="请假事由"  show-overflow-tooltip >
                        </el-table-column>
                        <el-table-column prop="startTime" label="请假开始时间" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="endTime" label="请假结束时间"  show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="time" label="时长（小时）" width="120">
                        </el-table-column>
                        <el-table-column prop="askTime" label="提交时间"  show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column  label="审批状态" width="100">
                          <template scope="scope"><span :class="scope.row.typeId==1 ? 'blue':(scope.row.typeId==2 ? 'warning':'danger')">{{scope.row.type}}</span></template>
                        </el-table-column>
                        <el-table-column prop="typeId" label="审批状态" width="100">
                        </el-table-column>
                        <el-table-column prop="approve" label="审批人" width="80">
                        </el-table-column>
                      </template>
                    </el-table>
                    <div class="kd-page">
                      <el-row>
                        <el-col :span="12" style="padding-left:15px">
                          <!--<el-checkbox label="全选"></el-checkbox>-->
                          <el-select v-model="leaveMsg" placeholder="请选择" size="small" class="margin-left">
                            <el-option v-for="item in leaveList" :key="item.msg" :label="item.msg" :value="item.leaveId">
                            </el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="12">
                          <el-pagination class="float-right" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="600">
                          </el-pagination>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
                <!--调课管理-->
                <div v-if="state==1&&addState!=1">
                <el-row class="class-header">
                  <el-col :span="4" class="class-titles">
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共 111 条记录
                  </el-col>
                  <el-col :span="8">
                    <el-button type="primary"><b>+</b>申请代理</el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-select v-model="typeText2" placeholder="请选择审核状态" size="small" class="rt">
                      <el-option v-for="item in checkTypeList"
                                 :key="item.value"
                                 :label="item.name"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-table :data="relieveList">
                  <!--<el-table-column type="selection" width="55">-->
                  <!--</el-table-column>-->
                  <el-table-column prop="Id" label="ID" width="80">
                  </el-table-column>
                  <el-table-column prop="msg" label="请假事由" show-overflow-tooltip >
                  </el-table-column>
                  <el-table-column prop="relieveTime" label="调课时间" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="askTime" label="提交时间"  show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="审批状态" width="100">
                    <template scope="scope"><span :class="scope.row.typeId==1 ? 'blue':(scope.row.typeId==2 ? 'warning':'danger')">{{scope.row.type}}</span></template>
                  </el-table-column>
                  <el-table-column prop="approve" label="审批人" width="80">
                  </el-table-column>
                </el-table>
                <div class="kd-page">
                  <el-row>
                    <el-col :span="12" style="padding-left:15px">
                      <!--<el-checkbox label="全选"></el-checkbox>-->
                      <el-select v-model="leaveMsg" placeholder="请选择" size="small" class="margin-left">
                        <el-option v-for="item in leaveList" :key="item.msg" :label="item.msg" :value="item.leaveId">
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="12">
                      <el-pagination class="float-right" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="600">
                      </el-pagination>
                    </el-col>
                  </el-row>
                </div>
              </div>
                <!--代课管理-->
                <div v-if="state==2&&addState!=1">
                  <el-row class="class-header">
                    <el-col :span="4" class="class-titles">
                      <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共 111 条记录
                    </el-col>
                    <el-col :span="8">
                      <el-button type="primary"><b>+</b>申请代理</el-button>
                    </el-col>
                    <el-col :span="12">
                      <el-select v-model="typeText2" placeholder="请选择审核状态" size="small" class="rt">
                        <el-option v-for="item in checkTypeList"
                                   :key="item.value"
                                   :label="item.name"
                                   :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-table :data="relieveList">
                      <!--<el-table-column type="selection" width="55">-->
                      <!--</el-table-column>-->
                      <el-table-column prop="Id" label="ID" width="80">
                      </el-table-column>
                      <el-table-column prop="msg" label="请假事由" show-overflow-tooltip >
                      </el-table-column>
                      <el-table-column prop="relieveTime" label="调课时间" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="askTime" label="提交时间"  show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column label="审批状态" width="100">
                        <template scope="scope"><span :class="scope.row.typeId==1 ? 'blue':(scope.row.typeId==2 ? 'warning':'danger')">{{scope.row.type}}</span></template>
                      </el-table-column>
                      <el-table-column prop="approve" label="审批人" width="80">
                      </el-table-column>
                    </el-table>
                  <div class="kd-page">
                      <el-row>
                        <el-col :span="12" style="padding-left:15px">
                          <!--<el-checkbox label="全选"></el-checkbox>-->
                          <el-select v-model="leaveMsg" placeholder="请选择" size="small" class="margin-left">
                            <el-option v-for="item in leaveList" :key="item.msg" :label="item.msg" :value="item.leaveId">
                            </el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="12">
                          <el-pagination class="float-right" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="600">
                          </el-pagination>
                        </el-col>
                      </el-row>
                    </div>
              </div>
                <!--考勤统计-->
                <div v-if="state==3&&addState!=1">
                <el-row class="class-header">
                  <el-col :span="4" class="class-titles">
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs cursor"/>刷新-共 111 条记录
                  </el-col>
                  <el-col :span="20">
                    <el-date-picker v-model="value6" type="daterange" placeholder="选择日期范围" class="rt">
                    </el-date-picker>
                  </el-col>
                </el-row>
                <div>
                  <div>
                    <el-table :data="leaveList" style="width: 100%">
                      <!--<el-table-column type="selection" width="55">-->
                      <!--</el-table-column>-->
                      <el-table-column prop="askTime" label="日期"  show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="time" label="应出勤课时">
                      </el-table-column>
                      <el-table-column prop="time" label="实际勤课时">
                      </el-table-column>
                      <el-table-column prop="time" label="缺勤课时">
                      </el-table-column>
                      <el-table-column prop="time" label="请假课时">
                      </el-table-column>
                    </el-table>
                    <div class="kd-page">
                      <el-row>
                        <el-col :span="12" style="padding-left:15px">
                          <!--<el-checkbox label="全选"></el-checkbox>-->
                          <el-select v-model="leaveMsg" placeholder="请选择" size="small" class="margin-left">
                            <el-option v-for="item in leaveList" :key="item.msg" :label="item.msg" :value="item.leaveId">
                            </el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="12">
                          <el-pagination class="float-right" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="600">
                          </el-pagination>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </div>
                <!--填写申请-->
                <div v-if="addState==1">
                <relieve :state="state" @changeAddState="changeAdd"></relieve>
              </div>
            </div>
            <bottomItem></bottomItem>
        </div>
    </div>
</template>

<script>
import titleItem from '@/components/main/title.vue'
import titleActive from '@/components/main/titleActive.vue'
import description from '@/components/main/description.vue'
import bottomItem from '@/components/bottom/bottom.vue'
import relieve from '@/components/attendance/relieve'
export default {
    data() {
        return {
            titleItem: [
                { name: "请假管理", index: 0 },
                { name: "调课管理", index: 1 },
                { name: "代课管理", index: 2 },
                { name: "考勤统计", index: 3 },
            ],
            prompts: [
                `该页面展示管理员的操作日志，可进行删除。`,
                `侧边栏可以进行高级搜索`
            ],
            state: 0,
            addState:0,//显示申请页面
            promptsPad: true,
            typeText1:'',//请假管理审核状态
            typeText2:'',//代课管理审核状态
            checkTypeList:[
              {name:'待审批',value:'1'},
              {name:'同意', value:'2'},
              {name:'未批准', value:'3'}
            ],
            leaveList:[
              {leaveId:'001',msg:'去参加全国电子技能大赛，特此不能上课',startTime:'2017-08-19 16:40:27',endTime:'2017-08-19 16:40:27',time:'3.6',askTime:'2017-08-19 16:40:27',type:'待审批',approve:'汪峰',typeId:'1'},
              {leaveId:'001',msg:'去参加全国电子技能大赛，特此不能上课',startTime:'2017-08-19 16:40:27',endTime:'2017-08-19 16:40:27',time:'3.6',askTime:'2017-08-19 16:40:27',type:'同意',approve:'汪峰',typeId:'2'},
              {leaveId:'001',msg:'去参加全国电子技能大赛，特此不能上课',startTime:'2017-08-19 16:40:27',endTime:'2017-08-19 16:40:27',time:'3.6',askTime:'2017-08-19 16:40:27',type:'未批准',approve:'汪峰',typeId:'3'},
            ],//请假管理列表
            leaveMsg:'',
            relieveList:[
              {Id:'001',msg:'去参加全国电子技能大赛，特此不能上课',relieveTime:'2017-08-19 16:40:27',askTime:'2017-08-19 16:40:27',type:'待审批',approve:'汪峰',typeId:'1'},
              {Id:'001',msg:'去参加全国电子技能大赛，特此不能上课',relieveTime:'2017-08-19 16:40:27',askTime:'2017-08-19 16:40:27',type:'同意',approve:'汪峰',typeId:'2'},
              {Id:'001',msg:'去参加全国电子技能大赛，特此不能上课',relieveTime:'2017-08-19 16:40:27',askTime:'2017-08-19 16:40:27',type:'未批准',approve:'汪峰',typeId:'3'},
            ],//代课管理列表
            currentPage:1,
            value6:'',//考勤统计日期选择

        }
    },
    created() {
    },
    components: {
        titleItem, titleActive, description, bottomItem,relieve
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
        },
        changeAdd(){
          this.addState=0;
        },
    },

}
</script>

<style scoped>

</style>
