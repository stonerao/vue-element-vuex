<template>
    <div>
        <!-- 班级查看课表 -->
        <div class="check_schedule sche_list_header">
            <ul class="clearfloat">
                <!-- <li>初2017级年级1班课表1</li> -->
                <li>课表1</li>
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
                <el-table-column prop="time" label="时段">
                    <template scope="scope">
                        <!-- 判断值: 1为早上 -->
                        <span v-if="scope.row.timetable.day1.lesson == 1">早读</span>
                        <span v-if="scope.row.timetable.day1.lesson == 2">上午</span>
                        <span v-if="scope.row.timetable.day1.lesson == 3">下午</span>
                        <span v-if="scope.row.timetable.day1.lesson == 4">晚上</span>
                    </template>
                </el-table-column>
                <el-table-column prop="school_time" label="节次"></el-table-column>
                <el-table-column label="星期一">
                    <template scope="scope">
                        <div v-if="show_select&&scope.row.timetable.day1">
                            <el-select v-model="scope.row.timetable.day1.s_id" placeholder="科目" @change="teachLoad(scope.row.timetable.day1.s_id)">
                                <el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
                            </el-select>
                            <el-select v-model="scope.row.timetable.day1.teacher_id" :disabled="scope.row.timetable.day1.s_id==''" placeholder="老师" @click.native="teacClear">
                                <el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
                            </el-select>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="星期二">
                    <template scope="scope">
                        <div v-if="show_select&&scope.row.timetable.day2">
                            <el-select v-model="scope.row.timetable.day2.s_id" placeholder="科目" @change="teachLoad(scope.row.timetable.day2.s_id)">
                                <el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
                            </el-select>
                            <el-select v-model="scope.row.timetable.day2.teacher_id" :disabled="scope.row.timetable.day2.s_id==''" placeholder="老师">
                                <el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
                            </el-select>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="星期三">
                    <template scope="scope">
                        <div v-if="show_select&&scope.row.timetable.day3">
                            <el-select v-model="scope.row.timetable.day3.s_id" placeholder="科目" @change="teachLoad(scope.row.timetable.day3.s_id)">
                                <el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
                            </el-select>
                            <el-select v-model="scope.row.timetable.day3.teacher_id" :disabled="scope.row.timetable.day3.s_id==''" placeholder="老师">
                                <el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
                            </el-select>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="星期四">
                    <template scope="scope">
                        <div v-if="show_select&&scope.row.timetable.day4">
                            <el-select v-model="scope.row.timetable.day4.s_id" placeholder="科目" @change="teachLoad(scope.row.timetable.day4.s_id)">
                                <el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
                            </el-select>
                            <el-select v-model="scope.row.timetable.day4.teacher_id" :disabled="scope.row.timetable.day4.s_id==''" placeholder="老师">
                                <el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
                            </el-select>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="星期五">
                    <template scope="scope">
                        <div v-if="show_select&&scope.row.timetable.day5">
                            <el-select v-model="scope.row.timetable.day5.s_id" placeholder="科目" @change="teachLoad(scope.row.timetable.day5.s_id)">
                                <el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
                            </el-select>
                            <el-select v-model="scope.row.timetable.day5.teacher_id" :disabled="scope.row.timetable.day5.s_id==''" placeholder="老师">
                                <el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
                            </el-select>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="星期六">
                    <template scope="scope">
                        <div v-if="show_select&&scope.row.timetable.day6">
                            <el-select v-model="scope.row.timetable.day6.s_id" placeholder="科目" @change="teachLoad(scope.row.timetable.day6.s_id)">
                                <el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
                            </el-select>
                            <el-select v-model="scope.row.timetable.day6.teacher_id" :disabled="scope.row.timetable.day6.s_id==''" placeholder="老师">
                                <el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
                            </el-select>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="星期日">
                    <template scope="scope">
                        <div v-if="show_select&&scope.row.timetable.day7">
                            <el-select v-model="scope.row.timetable.day7.s_id" placeholder="科目" @change="teachLoad(scope.row.timetable.day7.s_id)">
                                <el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
                            </el-select>
                            <el-select v-model="scope.row.timetable.day7.teacher_id" :disabled="scope.row.timetable.day7.s_id==''" placeholder="老师">
                                <el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
                            </el-select>
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
            scheHeader: {
                name: '',
                start_time: '',
                end_time: '',
            },
        }
    },
    created() {
        if(!this.tabsStatus){
            info.checkGradeSche.call(this,this.derpartId)
        }
    },
    components: {
        
    },
    methods: {
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
