export const api = { 
    teacher_list:'/Admin/teacher/teacher_list',//teacher list data
    teacher_kemu:'/Admin/teacher/teacher_kemu',//teacher 科目列表
    teacher_add:'/Admin/teacher/teacher_add',//增加老师
    teacher_edit:'/Admin/teacher/teacher_edit',//编辑老师
    teacher_delete:'/Admin/teacher/teacher_delete',//删除老师
    studentlist:'Admin/teacher/studentlist',//学生列表
    department_list:'/Admin/Department/department_list',//所有组织结构关系表
    studentListMent:'Admin/teacher/department_list',//学生组织结构关系
    areaList:"Student/StudentIndex/area_list",//省 列表
    addStundet:"Admin/teacher/studentadd",//添加学生
    setStundet:"Admin/teacher/studentedit",//编辑学生
    studentdelete:"Admin/teacher/studentdelete",//删除学生
    grade_list:"Admin/teacher/grade_list",//二级联动-年级
    class_list:"Admin/teacher/class_list",//二级联动-班级
    department_index:"Admin/Department/department_index",//组织架构 列表 首页
    show_teacher_member:"Admin/Department/show_teacher_member",//展示老师列表
    save_member_maintain:"Admin/Department/save_member_maintain",//展示老师列表
    organize_number_delete:"Admin/StoreGroup/organize_number_delete",//user 删除用户 组织架构中
    choose_job:"Admin/StoreGroup/choose_job",//职位列表
    organize_member_add:"Admin/StoreGroup/organize_member_add",//增加用户
    get_group_list:"Admin/StoreGroup/get_group_list",//增加用户 权限组列表
    department_teacher_delete:"Admin/Department/department_teacher_delete",//删除组织部门-成员关系
    organize_member_list:"Admin/StoreGroup/organize_member_list",//用户管理列表
    position_add:"Admin/position/position_add",//增加职位
    position_edit:"Admin/position/position_edit",//编辑职位
    position_delete:"Admin/position/position_delete",//删除职位
    position_list:"Admin/position/position_list",//职位列表
    teaching_interface:"Student/SchoolStudent/teaching_interface",//教材列表
    teaching_classlist:"Student/SchoolStudent/teaching_classlist",//教材分类
    Teacher_teaching_classlist:"Teacher/Teaching/teaching_classlist",//老师 教材分类
    teaching_info:"Student/SchoolStudent/teaching_info",//教材详情
    Teacher_teaching_info:"Teacher/Teaching/teaching_info",//教材详情
    Teacher_teaching_interface:"Teacher/Teaching/teaching_interface",//老师 教材详情
    teaching_collect:"Teacher/Teaching/teaching_collect",//教材领取老师 
    question_type:"Teacher/Examinationcenter/question_type",//题干类型 
    question_classlist:"Teacher/Examinationcenter/question_classlist",//题库分类列表 
    questions_add:"Teacher/Examinationcenter/questions_add",//添加试题 
    question_list:"Teacher/Examinationcenter/question_list",//试题列表 
    question_delete:"Teacher/Examinationcenter/question_delete",//删除题库 
    question_info:"Teacher/Examinationcenter/question_info",//试题详情 
    question_edit:"Teacher/Examinationcenter/question_edit",//试题编辑 
    space_list:"Teacher/Teacherspace/space_list",//空间购买列表 
    space_pay:"Teacher/Teacherspace/space_pay",//空间购买   
    StudentSpace_list:"Student/Studentspace/space_list",//学生空间列表 
    Studentspace_pay:"Student/Studentspace/space_pay",//学生购买
    add_testpaper:"Teacher/Examinationcenter/add_testpaper",//添加试卷
    testpaper_addquestion:"Teacher/Examinationcenter/testpaper_addquestion",//添加试卷时添加试题
    testpaper_list:"Teacher/Examinationcenter/testpaper_list",//考试列表
    testpaper_delete:"Teacher/Examinationcenter/testpaper_delete",//删除考试试卷
    add_examination:"Teacher/Examinationcenter/add_examination",//创建考试
    Teacherclass_list:"Teacher/Examinationcenter/class_list",//创建考试
    examination_list:"Teacher/Examinationcenter/examination_list",//老师考试列表
    edit_examination:"Teacher/Examinationcenter/edit_examination",//编辑考试
    Studentexamination_list:"Student/SchoolStudent/examination_list",//学生 考试列表
    examination_info:"Student/SchoolStudent/examination_info",//考试详情
    task_list:"Teacher/Examinationcenter/task_list",//作业列表
    add_task:"Teacher/Examinationcenter/add_task",//添加作业
    studentTask_list:"Student/SchoolStudent/task_list",//学生查看我的作业列表
    show_task:"Student/SchoolStudent/show_student_task",//学生查看当前作业
    addztask:"Student/SchoolStudent/addztask",//学生作业提交
    teacher_tasklist:"Teacher/Examinationcenter/teacher_tasklist",//老师查看学生提交的作业列表
    show_student_task:"Teacher/Examinationcenter/show_student_task",//老师查看学生提交作业的详情
    show_addtesklist:"Teacher/Examinationcenter/show_addtesklist",//查看作业下的提交作业列表
    teacher_review:"Teacher/Examinationcenter/teacher_review",//老师作业评阅
}