export const api = { 
    gradeSearch:'Admin/Grade/get_zdepartment_list',  //年或班级管理之总课表数据
    timeTable:'Admin/Grade/class_list',  //年或班级管理之总课表数据
    scheduleData:'Admin/Grade/get_class_grade',  //总课表处点击排课后进行排课初始数据获取
    subjectData:'Admin/Grade/get_subject',  //科目总数据
    teacherData:'Admin/Grade/get_teacher',  //老师总数据
    scheduleSave:'Admin/Grade/class_add',  //课表添加保存提交
    scheduleEditSave:'Admin/Grade/class_edit',  //课表编辑保存提交
    timeToSub:'Admin/Grade/show_replace_subject_list',  //代课根据时间获取科目
    subToteacher:'Admin/Grade/show_replace_teacher_list',  //代课根据时间获取科目
    takeoverSubmit:'Admin/Grade/confirm_replace_class',  //代课表单提交
    classStopBegin:'Admin/Grade/show_class_stop',  //停课初始获取数据
    classStopSave:'Admin/Grade/confirm_class_stop',  //停课保存
    adjustStepA:'Admin/Grade/show_class_change_step_one',  //调课第一步
    adjustStepAs:'Admin/Grade/class_change_step_one',  //调课第一步提交
    adjustStepB:'Admin/Grade/show_class_change_step_two',  //调课第二步初始
    adjustStepBs:'Admin/Grade/class_change_step_two',  //调课第二步提交
    checkGradeSche:'Admin/Grade/class_info',  //查看班级课程表
    classSche:'Admin/Grade/class_schedule',  //查看班级课程表--课表名字列表
    virtualA:'Admin/Grade/virtual_schedule_model_show',  //虚拟班排课第一步
    virtualB:'Admin/Grade/virtual_schedule_model_add',  //虚拟班排课第一步保存
    virtualC:'Admin/Grade/virtual_schedule_show',  //虚拟班排课第二步展示页面
    virtualD:'Admin/Grade/virtual_schedule_add',  //虚拟班排课第二步保存页面
    gradeAllList:'Admin/Grade/grade_list',  //年级课表总列表
    gradeCheckModle:'Admin/Grade/show_grade_info',  //年级课表总列表--查看模板
}
