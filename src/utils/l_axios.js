import {api} from '@/api/grade'
import {getToken} from '@/utils/auth'
import {removeToken} from '@/utils/auth'
import {encodeUnicode} from '@/utils/auth'

export default {

        //总课表数据上方搜索框数据加载
        gradeSearch(obj) {
            this.$http(api.gradeSearch, {
                params: {
                    token: getToken(),
                    pid: obj.p_id
                }
            }).then((res) => {
                if (res.status === 200) {
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
                console.log(res);
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
                                special_tag: x.special_tag,
                                add_status: x.add_status,
                                info_status: x.info_status
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
            if(obj.classType == 2){  //虚拟班排课开始
                this.tab_0 = false;
                this.tab_x_1 = true;
                return;
            }
            this.$http(api.scheduleData, {
                params: {
                    token: getToken(),
                    id: obj.departId,
                    type: obj.classType
                }
            }).then((res) => {
                console.log(res);
                this.model = {};
                if (res.status === 200) {
                    if(obj.classType == 1){
                        if(res.data.code!=400){
                            this.tableData = [];
                            this.loading = false;
                            this.tab_0 = false;
                            this.tab_1 = true;
                            this.model = {
                                id: res.data.data.model_id,
                                type: res.data.data.model_type,
                                deparId: res.data.data.department_id
                            };
                            let tableData = res.data.data.class_time;
                            tableData.forEach((x) => {
                                let days = x.teaching_days.split(",");
                                let obj = {};
                                for (var k in days) {
                                    obj[`day${days[k]}`] = {
                                        teacher_id: '',
                                        s_id: '',
                                        common_id: x.common_id,
                                        week_day: parseInt(`${days[k]}`),
                                    };
                                }
                                x.timetable = obj;
                                x.length = days.length;
                                this.tableData.push(x)
                            });
                            console.log(this.tableData);
                            this.ajax();  //请求科目列表
                            this.editData.scheTableOrder = res.data.data.department_name;
                        }else{
                            this.loading = false;
                            this.$notify.error({
                                message: res.data.data.error
                            });
                        }
                    } else if(obj.classType == 2){
                        if(res.data.code!=400){
                            this.loading = false;
                            this.tab_0 = false;
                            this.tab_x_1 = true;
                            
                        }else{
                            this.loading = false;
                            this.$notify.error({
                                message: res.data.data.error
                            });
                        }
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
                    this.teacher = [];
                }
            })
        },

        //编辑初始获取科目
        subjectEdit() {
            this.$http(api.subjectData, {
                params: {
                    token: getToken(),
                }
            }).then((res) => {
                if (res.status === 200) {
                    let data = res.data.data;
                    data.forEach((x)=> {
                        if(x.s_id!=''&&x.s_id!=0){
                            this.ajax(x.s_id);
                        }
                    })
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
                // console.log(res);
                this.teacher = [];
                if (res.status === 200) {
                    this.teacher = res.data.data;
                }
            })
        },

        //班级课表--添加--保存数据
        scheduleSave(mod,search) {
            if(search.startTime != '' && search.endTime != ''){
                search.startTime = search.startTime.getFullYear() + '-' + (search.startTime.getMonth() + 1) + '-' + search.startTime.getDate();
                search.endTime = search.endTime.getFullYear() + '-' + (search.endTime.getMonth() + 1) + '-' + search.endTime.getDate();
            }
            let _begin = this.tableData;
            _begin.forEach((data) => {   //进入每一行
                let time = data.timetable;  //进入每一个的timetable
                let circle =[time.day1, time.day2, time.day3, time.day4, time.day5, time.day6, time.day7];
                circle.forEach((x) => {
                    if(x){
                        this.taData.push(x);
                    }
                })
            });
            console.log(this.taData);
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
                    timetable: encodeUnicode(JSON.stringify(this.taData)),
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
                        this.taData = [];
                    }
                }else {
                    this.$notify.error({
                        message: res.data.data.error
                    });
                    this.taData = [];
                }
            })
        },

        // 查看班级课表--表头
        classSche(deparId) {
            this.$http(api.classSche, {
                params: {
                    token: getToken(),
                    id: deparId 
                }
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        this.schedule_id = res.data.data[0].schedule_id;
                        this.scheduleId = this.schedule_id;   //编辑实体班课表时用
                        this.scheTableHeader = res.data.data
                        this.Ajax(this.schedule_id);
                    }else{
                        this.$notify.error({
                            message: res.data.data.error
                        });
                        this.loading = false;
                    }
                }else {
                    this.$notify.error({
                        message: res.data.data.error
                    });
                }
            })
        },

        // 查看班级课表---详细
        checkGradeSche(deparId,scheid) {
            this.$http(api.checkGradeSche, {
                params: {
                    token: getToken(),
                    id: deparId,
                    schedule_id: scheid
                }
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        Date.prototype.toLocaleString = function() {
                            return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate();
                        };
                        let unixTimestamps = new Date( res.data.data.schedule_start_time*1000),
                            unixTimestampe = new Date( res.data.data.schedule_end_time*1000);
                        this.scheHeader={
                            name: res.data.data.schedule_name,
                            start_time: unixTimestamps.toLocaleString(),
                            end_time: unixTimestampe.toLocaleString(),
                        }
                        this.schedData = res.data.data.model_common;
                        // console.log(this.schedData);
                        if(res.data.data.school_time_type == 1){
                            this.sesson = '夏季节次'
                        }else if(res.data.data.school_time_type == 2){
                            this.sesson = '冬季节次'
                        }else if(res.data.data.school_time_type == 3){
                            this.sesson = '全年节次'
                        }

                        //编辑实体班课表初始数据绑定
                        this.vloading = false;
                        this.searchInlin = {
                            name: res.data.data.schedule_name,
                            startTime: unixTimestamps,
                            endTime: unixTimestampe
                        }
                        this.classGrade = res.data.data.department_name;
                        this.model = {
                            id: res.data.data.schedule_id,
                            mid: res.data.data.model_id,
                            type: res.data.data.class_type,
                            deparId: res.data.data.department_id
                        };
                    }else{
                        this.$notify.error({
                            message: res.data.data.error
                        });
                        this.loading = false;
                    }
                }else {
                    this.$notify.error({
                        message: res.data.data.error
                    });
                }
            })
        },

        //实体班级课表--编辑--保存数据
        editSubstSave(mod,search) {
            if(search.startTime != '' && search.endTime != ''){
                search.startTime = search.startTime.getFullYear() + '-' + (search.startTime.getMonth() + 1) + '-' + search.startTime.getDate();
                search.endTime = search.endTime.getFullYear() + '-' + (search.endTime.getMonth() + 1) + '-' + search.endTime.getDate();
            }
            let _begin = this.schedData;
            _begin.forEach((data) => {   //进入每一行
                let time = data.content;  //进入每一个的timetable
                let circle =[time.day1, time.day2, time.day3, time.day4, time.day5, time.day6, time.day7];
                circle.forEach((x) => {
                    if(x){
                        delete x.contents_id;
                        delete x.s_name;
                        delete x.school_identify;
                        delete x.teacher_name;
                        delete x.schedule_id;
                        this.taData.push(x);
                    }
                })
            });
            console.log(this.taData);
            this.$http({
                url: api.scheduleEditSave,
                method: 'post',
                data: {
                    token: getToken(),
                    id: mod.id,
                    name: search.name,  //学期名字
                    start_time: search.startTime,
                    end_time: search.endTime,
                    model_type: mod.type,
                    model_id: mod.mid,
                    department_id: mod.deparId,   //班级id
                    timetable: encodeUnicode(JSON.stringify(this.taData)),
                }
            }).then((res) => {
                console.log(res)
                if (res.status == 200) {
                    this.model={};
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
                        this.taData = [];
                    }
                }else {
                    this.$notify.error({
                        message: res.data.data.error
                    });
                    this.taData = [];
                }
            })
        },

        // 虚拟班排课第一步
        virtualArrangeA(departId) {
            this.$http(api.virtualA, {
                params: {
                    token: getToken(),
                    department_id: departId
                }
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        this.moduleName = res.data.data.department_name;
                    }else{
                        this.$notify.error({
                            message: res.data.data.error
                        });
                        this.loading = false;
                    }
                }else {
                    this.$notify.error({
                        message: res.data.data.error
                    });
                }
            })
        },

        // 虚拟班排课第一步--保存
        virtualArrangeB(departId,teachStr,teachNum,hourType,time) {
            if(teachStr){
                let newWeek = teachStr;
                for(var i=0;i<newWeek.length;i++){
                    newWeek[i]++;
                };
                this.week_checkList_string = newWeek.sort().join(",");
            }
            if(hourType == 2){
                time.start = this.formatDate(time.start);
                time.end = this.formatDate(time.end);
                time.start_w = this.formatDate(time.start_w);
                time.end_w = this.formatDate(time.end_w);
            }
            this.$http({
                url: api.virtualB,
                method: 'post',
                data: {
                    token: getToken(),
                    department_id: departId,
                    model_name: this.moduleName,
                    teaching_day: this.week_checkList_string,
                    teaching_num: teachNum,
                    hours_type: hourType,   //作息方式
                    summer_hours_start_time: time.start,
                    summer_hours_end_time: time.end,   
                    winter_hours_start_time: time.start_w,   
                    winter_hours_end_time: time.end_w,   
                }
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        this.modelId = res.data.model_id;
                        this.$notify({
                            message: res.data.data,
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.virtual_1 = false;
                                this.virtual_2 = true;
                            }
                        });
                    }else{
                        this.$notify.error({
                            message: res.data.data.error
                        });
                        this.loading = false;
                        this.week_checkList= [];
                    }
                }else {
                    this.$notify.error({
                        message: res.data.data.error
                    });
                }
            })
        },

        // 虚拟班排课第二步--展示页面
        virtualArrangeC(id) {
            this.$http(api.virtualC, {
                params: {
                    token: getToken(),
                    model_id: id,
                }
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        this.moduleName = res.data.data.model_name;
                        this.studyType = res.data.data.time_line;
                        this.model.deparId = res.data.data.department_id;
                        this.default_day = res.data.data.default_day;
                        this.loading = false;
                        
                        let virtStep2Data = res.data.data.list;
                        virtStep2Data.forEach((x) => {
                            x.class_timeS = [];
                            x.class_timeW = [];
                            x.class_time = [];
                            x.teachDay = [];
                            this.virtStep2Data.push(x)
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

        //虚拟班排课第二步--保存
        virtualArrangeD(mod,search) {
            // 有效期转换
            if(search.startTime != '' && search.endTime != ''){
                search.startTime = search.startTime.getFullYear() + '-' + (search.startTime.getMonth() + 1) + '-' + search.startTime.getDate();
                search.endTime = search.endTime.getFullYear() + '-' + (search.endTime.getMonth() + 1) + '-' + search.endTime.getDate();
            }
            let _handle = this.virtStep2Data;
            _handle.forEach((data) => {   //进入每一行
                let time = data.timetable;  //进入每一个的timetable对象
                let circle =[time.day1, time.day2, time.day3, time.day4, time.day5, time.day6, time.day7];
                let rownull = 0;
                let circul = 0;
                let split = "#";
                let classTime = data.class_time;
                let clasTimeS = data.class_timeS;  
                let clasTimeW = data.class_timeW;
                if(this.studyType == 1){ //全年制数据
                    if(classTime.length == 2){
                        classTime = this.formatHourM(classTime[0]) + "-" + this.formatHourM(classTime[1]);
                    }
                    this.allYeartime += classTime + ",";
                } else if(this.studyType == 2){
                    if(clasTimeS.length == 2){
                        clasTimeS = this.formatHourM(clasTimeS[0]) + "-" + this.formatHourM(clasTimeS[1]);
                    }
                    this.summerYearTime += clasTimeS + ",";

                    if(clasTimeW.length == 2){
                        clasTimeW = this.formatHourM(clasTimeW[0]) + "-" + this.formatHourM(clasTimeW[1]);
                    }
                    this.winerYearTime += clasTimeW + ",";
                }

                circle.forEach((x) => {
                    if(x){
                        circul++;
                        if(x.s_id != ''){  //进入每一个对象筛选s_sid是否为空
                            data.teachDay.push(x.week_day);

                            if(this.studyType == 1){
                                x.class_time = classTime;
                            } else if(this.studyType == 2){
                                x.class_time += clasTimeS + "," + clasTimeW;
                            }
                            this.virtDataTable.push(x);
                        } else{
                            rownull++;
                        }
                    }
                });
                if(rownull == circul){
                    split = this.default_day + "#";
                };
                this.teachingsDay += data.teachDay.sort().join(",") + split;

            });
            this.teachingsDay = this.teachingsDay.substring(0,this.teachingsDay.length-1);
            if(this.studyType == 1){
                this.summerYearTime = "";
                this.winerYearTime = "";
                this.allYeartime = this.allYeartime.substring(0,this.allYeartime.length-1);
            }else if(this.studyType == 2){
                this.allYeartime = "";
                this.summerYearTime = this.summerYearTime.substring(0,this.summerYearTime.length-1);
                this.winerYearTime = this.winerYearTime.substring(0,this.winerYearTime.length-1);
            }

            // console.log(this.virtDataTable);
            this.$http({
                url: api.virtualD,
                method: 'post',
                data: {
                    token: getToken(),
                    name: search.name,  //学期名字
                    model_id: mod.id,
                    department_id: mod.deparId,   //班级id
                    end_time: search.endTime,
                    start_time: search.startTime,
                    teaching_each_day: this.teachingsDay,
                    summer_hours_time: this.summerYearTime,
                    winter_hours_time: this.winerYearTime,
                    year_hours_time: this.allYeartime,
                    timetable: encodeUnicode(JSON.stringify(this.virtDataTable)),
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

        // 年级列表
        gradeAllList(obj) {
            this.$http(api.gradeAllList, {
                params: {
                    token: getToken(),
                    page: obj.curpage,
                    curpage: obj.one_pagenum,
                }
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        let data = res.data.data;
                        if (data.length != 0) {
                            this.hasData = true;
                            data.forEach((x) => {
                                this.gradList.push({
                                    department_id: x.department_id,
                                    department_name: x.department_name,
                                    class_num: x.class_num,
                                    student_num: x.student_num,
                                    model_id: x.model_id,
                                    special_tag: x.special_tag,
                                    have_model_status: x.have_model_status
                                })
                                this.gradeParams.curpage = res.data.page;
                                this.gradeParams.page_count = res.data.all_pagecount;
                                this.gradeParams.total_num = parseInt(res.data.page_total);
                            })
                        }else{
                            this.hasData = false;
                            this.gradeParams.total_num = parseInt(res.data.page_total);
                        }
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

        // 年级列表查看模板详情
        gradeCheckModle(id) {
            this.$http(api.gradeCheckModle, {
                params: {
                    token: getToken(),
                    model_id: id,
                }
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        this.switch_0 = false;
                        this.switch_1 = true;
                        this.loading = false;
                    }else{
                        this.$notify.error({
                            message: res.data.data.error
                        });
                        this.loading = false;
                    }
                }else {
                    this.$notify.error({
                        message: res.data.data.error
                    });
                }
            })
        },

        // 标准中国时间转换获取月日
        formatDate(date) {  
            let y = date.getFullYear();  
            let m = date.getMonth() + 1;  
                m = m < 10 ? '0' + m : m;  
            let d = date.getDate();  
                d = d < 10 ? ('0' + d) : d;  
            return  m + d;  
        }, 

        // 标准中国时间转换获取时分
        formatHM(date) {  
            let h = date.getHours();  
            let m = date.getMinutes();  
            return  h + ":" + m  
        }, 
}