<template>
    <div>
        <div v-loading="vloading">
            <div class="l_schedule_outer">
                <div class="sche_list_header">
                    <ul class="clearfloat">
                        <li v-bind:class="{ active: isActive }">{{classGrade}}</li>
                    </ul>
                </div>
                <div class="l_search0">
                    <el-row :gutter="20" class="l_search_outer">
                        <el-col :span="24" class="class-searchs">
                            <el-form :inline="true" :model="searchInlin" id="search_form1">
                                <el-form-item label="学期名称：">
                                    <el-input v-model="searchInlin.name" placeholder="2017-2018学年第一学期"></el-input>
                                </el-form-item>
                                <el-form-item label="课表有效期：">
                                    <el-date-picker v-model="searchInlin.startTime" type="date" format="yyyy-MM-dd" placeholder="年月日"></el-date-picker>
                                    <span class="middle-pad0">至</span>
                                    <el-date-picker v-model="searchInlin.endTime" format="yyyy-MM-dd" placeholder="年月日"></el-date-picker>
                                </el-form-item>
                            </el-form>
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
                        <el-table-column :label="sesson">
                            <template scope="scope">{{scope.row.school_time}}</template>
                        </el-table-column> 

                        <el-table-column label="星期一">
                            <template scope="scope">
                                <div v-if="scope.row.content.day1">
                                    <el-select v-model="scope.row.content.day1.s_id" placeholder="科目" @change="teachLoad(scope.row.content.day1.s_id)">
                                        <el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
                                    </el-select>
                                    <el-select v-model="scope.row.content.day1.teacher_id" :disabled="scope.row.content.day1.s_id==''" placeholder="老师" @change="clearTeacher">
                                        <el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
                                    </el-select>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="星期二">
                            <template scope="scope">
                                <div v-if="scope.row.content.day2">
                                    <el-select v-model="scope.row.content.day2.s_id" placeholder="科目" @change="teachLoad(scope.row.content.day2.s_id)">
                                        <el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
                                    </el-select>
                                    <el-select v-model="scope.row.content.day2.teacher_id" :disabled="scope.row.content.day2.s_id==''" placeholder="老师" @change="clearTeacher">
                                        <el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
                                    </el-select>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="星期三">
                            <template scope="scope">
                                <div v-if="scope.row.content.day3">
                                    <el-select v-model="scope.row.content.day3.s_id" placeholder="科目" @change="teachLoad(scope.row.content.day3.s_id)">
                                        <el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
                                    </el-select>
                                    <el-select v-model="scope.row.content.day3.teacher_id" :disabled="scope.row.content.day3.s_id==''" placeholder="老师" @change="clearTeacher">
                                        <el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
                                    </el-select>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="星期四">
                            <template scope="scope">
                                <div v-if="scope.row.content.day4">
                                    <el-select v-model="scope.row.content.day4.s_id" placeholder="科目" @change="teachLoad(scope.row.content.day4.s_id)">
                                        <el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
                                    </el-select>
                                    <el-select v-model="scope.row.content.day4.teacher_id" :disabled="scope.row.content.day4.s_id==''" placeholder="老师" @change="clearTeacher">
                                        <el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
                                    </el-select>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="星期五">
                            <template scope="scope">
                                <div v-if="scope.row.content.day5">
                                    <el-select v-model="scope.row.content.day5.s_id" placeholder="科目" @change="teachLoad(scope.row.content.day5.s_id)">
                                        <el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
                                    </el-select>
                                    <el-select v-model="scope.row.content.day5.teacher_id" :disabled="scope.row.content.day5.s_id==''" placeholder="老师" @change="clearTeacher">
                                        <el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
                                    </el-select>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="星期六">
                            <template scope="scope">
                                <div v-if="scope.row.content.day6">
                                    <el-select v-model="scope.row.content.day6.s_id" placeholder="科目" @change="teachLoad(scope.row.content.day6.s_id)">
                                        <el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
                                    </el-select>
                                    <el-select v-model="scope.row.content.day6.teacher_id" :disabled="scope.row.content.day6.s_id==''" placeholder="老师" @change="clearTeacher">
                                        <el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
                                    </el-select>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="星期天">
                            <template scope="scope">
                                <div v-if="scope.row.content.day7">
                                    <el-select v-model="scope.row.content.day7.s_id" placeholder="科目" @change="teachLoad(scope.row.content.day7.s_id)">
                                        <el-option v-for="options in subject" :key="options.s_id" :label="options.s_name" :value="options.s_id"></el-option>
                                    </el-select>
                                    <el-select v-model="scope.row.content.day7.teacher_id" :disabled="scope.row.content.day7.s_id==''" placeholder="老师" @change="clearTeacher">
                                        <el-option v-for="option in teacher" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
                                    </el-select>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="l_save">
                    <el-button type="primary" @click.native="editSave">保存</el-button>
                    <el-button @click.native="goLookover">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import info from '@/utils/l_axios'

export default {
    props: ['derpartId', 'classType', 'scheduleId'],
    data() {
        return {
            isActive: true,
            vloading: true,
            searchInlin: {  //按年级班级搜索
              name: '',
              startTime: '',
              endTime: ''
            },
            schedData:[],  //表数据
            subject: [],  //学习科目数据
            teacher: [], //老师数据 
            model:{},  //初始储存model_id,model_type,department_id三个属性
            taData: [],  //提交的json数据
            sesson: '',
            classGrade: '',
        }
    },
    created() {
        // console.log(this.derpartId)
        // console.log(this.classType)
        // console.log(this.scheduleId)
        info.checkGradeSche.call(this,this.derpartId,this.scheduleId);
        info.subjectEdit.call(this);  //加载科目数据
    },
    components: {
        
    },
    methods: {
        editSave(){
            console.log(this.schedData);
            info.editSubstSave.call(this,this.model,this.searchInlin);
        },
        goLookover(){
            this.$emit("EDITBACK");
        },
        teachLoad(id){
            info.teacherData.call(this,id);
            this.teacher = [];
        },
        clearTeacher(){
            this.teacher = [];
        },
        ajax(sId){
           info.teacherData.call(this,sId); 
        }
    },
    watch:{
        
    }
}
</script>
 
<style scoped>

</style>
