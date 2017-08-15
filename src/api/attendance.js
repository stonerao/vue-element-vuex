export const api={
  leaveList:'Teacher/Timetag/leave_list',//老师请假记录
  applyLeave:'Teacher/Timetag/teacher_leave',//老师请假申请
  changeClass:'Teacher/Timetag/adjust_list',//调课列表
  applyChange:'Teacher/Timetag/adjust_course',//老师调课申请
  myClass:'Teacher/Timetag/get_me_course',//根据指定日期获取当天的课程
  otherClass:'Teacher/Timetag/get_other_course',//根据指定日期获取当天的其他老师的课程
  relieveList:'Teacher/Timetag/substitute_list',//代课列表
  relieveTeacher:'Teacher/Timetag/substitute_teacher',//获取同科目的老师
  applyRelieve:'Teacher/Timetag/substitute',//老师代课申请
  attendanceList:'Teacher/Timetag/sign_list',//老师的考勤记录
  approveList:'Teacher/Timetag/approve_list',//审核调课/代课列表
}
