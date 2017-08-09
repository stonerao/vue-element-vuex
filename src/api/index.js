export const api = { 
    teacher_list:'/Admin/teacher/teacher_list',//teacher list data
    teacher_kemu:'/Admin/teacher/teacher_kemu',//teacher 科目列表
    teacher_add:'/Admin/teacher/teacher_add',//增加老师
    teacher_edit:'/Admin/teacher/teacher_edit',//编辑老师
    teacher_delete:'/Admin/teacher/teacher_delete',//删除老师
    studentlist:'/Student/SchoolStudent/studentlist',//学生列表
    department_list:'/Admin/Department/department_list',//所有组织结构关系表
    studentListMent:'/Student/SchoolStudent/department_list',//学生组织结构关系
    areaList:"Student/SchoolStudent/area_list",//省 列表
    addStundet:"Student/SchoolStudent/studentadd",//添加学生
    setStundet:"Student/SchoolStudent/studentedit",//编辑学生
    studentdelete:"Student/SchoolStudent/studentdelete",//删除学生
    grade_list:"Student/SchoolStudent/grade_list",//二级联动-年级
    class_list:"Student/SchoolStudent/class_list",//二级联动-班级
}