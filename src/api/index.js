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
    question_classlist:"Admin/Examinationcenter/question_classlist",//题库分类列表 
    teacher_question_classlist:"Teacher/Examinationcenter/teacher_question_classlist",//题库分类列表 
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
    pushAnswer:"Student/SchoolStudent/answer",//学生提交答案
    add_notice:"Admin/Notice/add_notice",//发布通知
    receive_list:"Admin/Notice/receive_list",//接收人列表
    AdminNotice_list:"Admin/Notice/notice_list",//学校通知列表
    student_notice_list:"Student/Notice/student_notice_list",//学生通知列表
    teacher_notice_list:"Teacher/Notice/teacher_notice_list",//老师通知列表
    show_studentanswerlist:"Teacher/Examinationcenter/show_studentanswerlist",//查看某场考试下的老师提交的答案 
    student_answer_info:"Teacher/Examinationcenter/answer_info",//查看具体某个答题信息详情
    student_answer_grade:"Teacher/Examinationcenter/grade",//提交阅卷
    show_teacher_review:"Student/SchoolStudent/show_teacher_review",//学生查看老师评阅内容    
    teacher_edit_task:"Teacher/Examinationcenter/edit_task",//老师编辑作业    
    question_classadd:"Admin/Examinationcenter/question_classadd",//添加分类    
    delete_questionclass:"Admin/Examinationcenter/delete_questionclass",//删除分类    
    edit_questionclass:"Admin/Examinationcenter/edit_questionclass",//编辑分类     
    addline_examination:"Teacher/Examinationcenter/addline_examination",//创建线下考试     
    del_line_examination:"Teacher/Examinationcenter/del_line_examination",//删除线下考试     
    edit_line_examination:"Teacher/Examinationcenter/edit_line_examination",//编辑线下考试     
    line_examlist:"Teacher/Examinationcenter/line_examlist",//线下考试列表       
    line_gradeslist:"Teacher/Examinationcenter/line_gradeslist",//线下考试成绩列表       
    del_line_gradeslist:"Teacher/Examinationcenter/del_line_gradeslist",//删除线下考试成绩       
    line_grades_static:"Teacher/Examinationcenter/line_grades_static",//统计线下考试成绩
    export_word:"Teacher/Examinationcenter/download_word",//导出试卷 
    Studentline_examlist:"Student/SchoolStudent/line_examlist",//学生线下成绩列表 
    Studentline_gradeslist:"Student/SchoolStudent/line_gradeslist",//线下考试成绩列表 
    Studentline_grades_static:"Student/SchoolStudent/line_grades_static",//统计线下考试成绩列表  
    sign_setting_info:"Admin/System/sign_setting_info",//签到信息配置   
    sign_setting:"Admin/System/sign_setting",//签到设置   
    mobile_setting:"Admin/System/mobile_setting",//短信包设置   
    mobile_setting_info:"Admin/System/mobile_setting_info",//短信宝配置信息   
    student_sign_1:"Student/SchoolStudent/student_sign",//学生签到   
    teacher_sign_1:"Teacher/Timetag/teacher_sign",//老师签到   
    techaerclass_info:"Teacher/index/class_info",//老师中心主页列表   
    studentclass_info:"Student/SchoolStudent/class_info",//学生中心主页列表  
    studentIndexHome:"Student/SchoolStudent/index",//学生中心主页数据 
    lock_setting:"Admin/Lock/lock_setting",//锁屏设置 
    school_questionlist:"Teacher/Examinationcenter/school_questionlist",//共享题库列表
    school_deletequestion:"Teacher/Examinationcenter/school_deletequestion",//删除题库列表
    school_download:"Teacher/Examinationcenter/school_download",//下载学校
    send_znotice:"Teacher/Examinationcenter/send_znotice",//老师发布通知接口
    student_teaching_list:"Student/SchoolStudent/student_teaching_list",//学生-个人书架列表
    teaching_interface_Teacher:"Teacher/Teaching/teacher_teaching_list",//教材列表 
    teaching_pay_shop:"Student/SchoolStudent/teaching_pay",//教材购买 
    virtual_class_list:"Admin/teacher/virtual_class_list",//admin 学生 虚拟班列表 
    virtual_class_studentlist:"Admin/teacher/virtual_class_studentlist",//admin 学生 虚拟班列表 
    thawstudent:"Admin/teacher/thawstudent",//admin激活学生
    testpaper_info:"Teacher/Examinationcenter/testpaper_info",//考试试卷详情
    edit_testpaper:"Teacher/Examinationcenter/edit_testpaper",//编辑试卷
    teacher_testpaper:"Teacher/Examinationcenter/teacher_testpaper",//老师分享题库
    edit_sharetestpaper:"Teacher/Examinationcenter/edit_sharetestpaper",//分享试题库成为自己的
    online_grades_static:"Teacher/Examinationcenter/online_grades_static",//统计成绩
    AdminSchool_questionlist:"Admin/teacher/school_questionlist",//学校中心共享题库
    AdminSchool_deletequestion:"Admin/teacher/school_deletequestion",//删除学校中心共享题
    testpaper_statice:"Teacher/Examinationcenter/testpaper_statice",//试卷统计
    question_statice:"Teacher/Examinationcenter/question_statice",//试题统计
    student_paper_preview:"Student/SchoolStudent/student_paper_preview",//学生预览教材
    teacher_paper_preview:"Teacher/Teaching/teacher_paper_preview",//老师预览教材
    
}