export const api = { 
    gradeSearch:'Admin/Grade/get_zdepartment_list',  //年或班级管理之总课表数据
    timeTable:'Admin/Grade/class_list',  //年或班级管理之总课表数据
    scheduleData:'Admin/Grade/get_class_grade',  //总课表处点击排课后进行排课初始数据获取
    subjectData:'Admin/Grade/get_subject',  //科目总数据
    teacherData:'Admin/Grade/get_teacher',  //老师总数据
    scheduleSave:'Admin/Grade/class_add',  //课表添加保存提交
    checkGradeSche:'Admin/Grade/class_info',  //查看班级课程表
    classSche:'Admin/Grade/class_schedule',  //查看班级课程表--课表名字列表
    virtualA:'Admin/Grade/show_virtual_schedule_model',  //虚拟班排课第一步
    virtualB:'Admin/Grade/add_virtual_schedule_model',  //虚拟班排课第一步保存
    gradeAllList:'Admin/Grade/grade_list',  //年级课表总列表
    gradeCheckModle:'Admin/Grade/show_grade_info',  //年级课表总列表--查看模板
}
