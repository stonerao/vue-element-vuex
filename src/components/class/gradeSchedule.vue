<template>
    <div>
        <!-- 班级查看课表 -->
        <div class="check_schedule sche_list_header">
            <ul class="clearfloat">
                <li v-for="(sche,index) in scheTableHeader" @click="scheduleTab(sche.schedule_id,index)" v-bind:class="{ active: isActive==index }">{{sche.schedule_name}}</li>
            </ul>
        </div>
        <div class="l_search1">
            <el-row class="l_check_outer">
                <el-col  :gutter="20" :span="12" class="check_header">
                    <div class="term_name">学期名称：<span class="blue_1">{{scheHeader.name}}</span></div>
                    <div class="schedule_time">课表有效期：<span class="blue_1">{{scheHeader.start_time}}</span> 至 <span class="blue_1">{{scheHeader.end_time}}</span></div>
                </el-col>
                <el-col :span="12" class="check_handle">
                    <el-button-group>
                      <el-button type="primary" icon="plus" size="small">代课</el-button>
                      <el-button type="primary" icon="plus" size="small">停课</el-button>
                      <el-button type="primary" icon="plus" size="small">调课</el-button>
                      <el-button type="primary" icon="plus" size="small">编辑</el-button>
                      <el-button type="primary" icon="plus" size="small" @click="back">返回</el-button>
                    </el-button-group>
                </el-col>
            </el-row>
        </div>
        <div class="sche_table">
            <el-table :data="schedData" border style="width: 100%">
                <el-table-column label="时段">
                    <template scope="scope">
                        <span v-if="scope.row.lesson == 1">早读</span>
                        <span v-if="scope.row.lesson == 2">上午</span>
                        <span v-if="scope.row.lesson == 3">下午</span>
                        <span v-if="scope.row.lesson == 4">晚上</span>
                    </template>
                </el-table-column>
                <el-table-column label="节次">
                    <template scope="scope">{{scope.row.school_time}}</template>
                </el-table-column>
                <el-table-column label="星期一">
                    <template scope="scope">
                        <div v-if="scope.row.content.day1">
                           <!--  <span v-html="scope.row.content.day1.s_name"></span> - 
                            <span v-html="scope.row.content.day1.teacher_name"></span> -->
                            {{scope.row.content.day1.s_name}} - {{scope.row.content.day1.teacher_name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="星期二">
                    <template scope="scope">
                       <div v-if="scope.row.content.day2">
                            {{scope.row.content.day2.s_name}} - {{scope.row.content.day2.teacher_name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="星期三">
                    <template scope="scope">
                        <div v-if="scope.row.content.day3">
                            {{scope.row.content.day3.s_name}} - {{scope.row.content.day3.teacher_name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="星期四">
                    <template scope="scope">
                        <div v-if="scope.row.content.day4">
                            {{scope.row.content.day4.s_name}} - {{scope.row.content.day4.teacher_name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="星期五">
                    <template scope="scope">
                        <div v-if="scope.row.content.day5">
                            {{scope.row.content.day5.s_name}} - {{scope.row.content.day5.teacher_name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="星期六">
                    <template scope="scope">
                        <div v-if="scope.row.content.day6">
                            {{scope.row.content.day6.s_name}} - {{scope.row.content.day6.teacher_name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="星期日">
                    <template scope="scope">
                        <div v-if="scope.row.content.day7">
                            {{scope.row.content.day7.s_name}} - {{scope.row.content.day7.teacher_name}}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import info from '@/utils/l_axios'
export default {
    props: ['tabsStatus', 'derpartId'],
    data() {
        return {
            schedData: [],
            scheTableHeader: [],
            scheHeader: {
                name: '',
                start_time: '',
                end_time: '',
            },
            schedule_id: 0, //课表id
            isActive: 0,  //表头切换active效果
        }
    },
    created() {
        if(!this.tabsStatus){
            // 课表名称
            info.classSche.call(this,this.derpartId);
        }
    },
    components: {
        
    },
    methods: {
        scheduleTab(id,index){
            this.isActive = index;
            this.schedule_id = id;
            info.checkGradeSche.call(this,this.derpartId,this.schedule_id);
        },
        Ajax(schedule){
            // 课表数据
            info.checkGradeSche.call(this,this.derpartId,schedule);
        },
        back(){
           this.$emit("BackCli")
        }
    },
    watch:{
        
    }
}
</script>
 
<style scoped>
</style>
