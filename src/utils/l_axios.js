import {api} from '@/api/grade'
import {getToken} from '@/utils/auth'
import {removeToken} from '@/utils/auth'

export default {

    //总课表数据上方搜索框数据加载
    gradeSearch(obj) {
            this.$http(api.gradeSearch, {
                params: {
                    token: getToken(),
                    pid: obj.p_id
                }
            }).then((res) => {
                // removeToken();
                if (res.status === 200) {
                    // this.$notify({
                    //     title: '成功',
                    //     message: res.data.data,
                    //     type: 'success'
                    // });
                    if (obj.p_id == 0) {
                        this.grade_search = res.data.data;
                    }
                    if (obj.p_id != 0) {
                        this.class_search = res.data.data;
                    }
                }
            })
        },

        //总课表数据初始加载
        timeTable(obj, objId) {
            this.$http(api.timeTable, {
                params: {
                    token: getToken(),
                    page: obj.curpage,
                    pagesize: obj.one_pagenum,
                    pid: objId.p_id,
                    id: objId.c_id
                }
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    let data = res.data.data.list;
                    if (data.length != 0) {
                        this.hasData = true;
                        this.hasNoData = false;
                        //先清除原有数据（比如在查询数据显示前清空数据）
                        this.gradeList = [];
                        data.forEach((x) => {
                            this.gradeList.push({
                                department_id: x.department_id,
                                department_name: x.department_name,
                                head_teacher_id: x.head_teacher_id,
                                head_teacher_name: x.head_teacher_name,
                                p_name: x.p_name,
                                pid: x.pid,
                                student_num: x.student_num,
                                special_tag: x.special_tag
                            })
                            this.gradeListParams.curpage = res.data.data.page;
                            this.gradeListParams.page_count = res.data.data.page_count;
                            this.gradeListParams.total_num = parseInt(res.data.data.rows);
                        })
                    } else {
                        this.hasData = false;
                        this.hasNoData = true;
                        this.gradeListParams.total_num = parseInt(res.data.data.rows);
                    }

                }
            })
        },

        //总课表处点击排课后进行排课初始数据获取
        scheduleBegin(obj) {
            this.$http(api.scheduleData, {
                params: {
                    token: getToken(),
                    id: obj.departId,
                    type: obj.classType
                }
            }).then((res) => {
                // console.log(res);
                this.model = {};
                if (res.status === 200) {
                    if(res.data.code!=400){
                        this.tableData = [];
                        this.loading = false;
                        this.show = !this.show;
                        this.model = {
                            id: res.data.data.model_id,
                            type: res.data.data.model_type,
                            deparId: res.data.data.department_id
                        };
                        let tableData = res.data.data.class_time;
                        tableData.forEach((x) => {
                            let days = x.teaching_days.split(",");
                            let arr = {};
                            for (var k in days) {
                                arr[`day${days[k]}`] = {
                                    teacher_id: '',
                                    s_id: '',
                                    common_id: x.common_id,
                                    week_day: k,
                                    lesson: x.lesson,
                                };
                            }
                            x.timetable = arr;
                            x.length = days.length;
                            this.tableData.push(x)
                        });
                        // console.log(this.tableData)
                        this.ajax();  //请求科目列表
                        this.editData.scheTableOrder = res.data.data.department_name;
                    }else{
                        this.loading = false;
                        this.$notify.error({
                            message: res.data.data.error
                        });
                    }
                }else{
                    this.$notify.error({
                        message: res.data.data.error
                    });
                }
            })
        },

        //初始获取科目
        subjectData() {
            this.$http(api.subjectData, {
                params: {
                    token: getToken(),
                }
            }).then((res) => {
                if (res.status === 200) {
                    let data = res.data.data;
                    this.subject = data;
                }
            })
        },

        // 联动获取老师
        teacherData(id) {
            this.$http(api.teacherData, {
                params: {
                    token: getToken(),
                    s_id: id
                }
            }).then((res) => {
                console.log(res);
                this.teacher = [];
                if (res.status === 200) {
                    this.teacher = res.data.data;
                }
            })
        },

        //保存数据
        scheduleSave(mod,search) {
            if(search.startTime != '' && search.endTime != ''){
                search.startTime = search.startTime.getFullYear() + '-' + (search.startTime.getMonth() + 1) + '-' + search.startTime.getDate();
                search.endTime = search.endTime.getFullYear() + '-' + (search.endTime.getMonth() + 1) + '-' + search.endTime.getDate();
            }
            let _begin = this.tableData;
            _begin.forEach((data) => {   //进入每一行
                let time = data.timetable;  //进入每一个的timetable
                let circle =[time.day1, time.day2, time.day3, time.day4, time.day5, time.day6, time.day7]
                circle.forEach((x) => {
                    if(x){
                        this.taData.push(x);
                    }
                })
            });
            // console.log(this.taData);
            this.$http({
                url: api.scheduleSave,
                method: 'post',
                data: {
                    token: getToken(),
                    name: search.name,  //学期名字
                    start_time: search.startTime,
                    end_time: search.endTime,
                    model_type: mod.type,
                    model_id: mod.id,
                    department_id: mod.deparId,   //班级id
                    timetable: this.taData,
                }
            }).then((res) => {
                // console.log(res)
                if (res.status == 200) {
                    if(res.data.code!=400){
                        this.$notify({
                            message: res.data.data,
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                window.location.reload(true);
                            }
                        });
                    }else{
                        this.$notify.error({
                            message: res.data.data.error
                        });
                    }
                }else {
                    this.$notify.error({
                        message: res.data.data.error
                    });
                }
            })
        },
}