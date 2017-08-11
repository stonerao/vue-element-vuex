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
    department_index:"Admin/Department/department_index",//组织架构 列表 首页
    show_teacher_member:"Admin/Department/show_teacher_member",//展示老师列表
    save_member_maintain:"Admin/Department/save_member_maintain",//展示老师列表
    organize_number_delete:"Admin/StoreGroup/organize_number_delete",//user 删除用户 组织架构中
    choose_job:"Admin/StoreGroup/choose_job",//职位列表
    organize_member_add:"Admin/StoreGroup/organize_member_add",//增加用户
    get_group_list:"Admin/StoreGroup/get_group_list",//增加用户 权限组列表
    department_teacher_delete:"Admin/Department/department_teacher_delete",//删除组织部门-成员关系
}