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
                                special_tag: x.special_tag,
                                add_status: x.add_status,
                                info_status: x.info_status
                            })
                        })
                        this.gradeListParams.curpage = res.data.data.page;
                        this.gradeListParams.page_count = res.data.data.page_count;
                        this.gradeListParams.total_num = parseInt(res.data.data.rows);
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
                // console.log(res);
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
                            // console.log(this.tableData);
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

        // 调课第一步
        adjustStepA(sid,type) {
            this.$http(api.adjustStepA, {
                params: {
                    token: getToken(),
                    id: sid,
                    type: type
                }
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        this.lookover = false;
                        this.class_adjust = true;
                        this.adj_step1 = true;
                       this.adjArea = res.data.data.range_name;
                    }else{
                        this.$notify({
                            message: res.data.data.error,
                            type: 'error',
                            duration: 1000,
                            onClose: () => {
                                // history.go(0);
                            }
                        });
                        this.loading = false;
                    }
                }else {
                    this.$notify.error({
                        message: res.data.data.error
                    });
                    window.location.reload(true);
                }
            })
        },

        // 调课第二步
        adjustStepB(rec) {
            this.$http(api.adjustStepB, {
                params: {
                    token: getToken(),
                    record_id: rec
                }
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        this.changetype = res.data.data.change_type;
                        if(this.changetype == 1){
                            this.adj_step1 = false;
                            this.adj_step2_A = true;
                        } else if(this.changetype == 2){
                            this.adj_step1 = false;
                            this.adj_step2_B = true;
                            this.timelineList = res.data.data.line;
                        }
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

        //调课第二步--保存
        adjustStepBs(recid,adjTime1,adjTime2) {
            if(String(adjTime1.A).length != 0 && String(adjTime1.B).length != 0){
                adjTime1.A = adjTime1.A.getFullYear() + '-' + (adjTime1.A.getMonth() + 1) + '-' + adjTime1.A.getDate();
                adjTime1.B = adjTime1.B.getFullYear() + '-' + (adjTime1.B.getMonth() + 1) + '-' + adjTime1.B.getDate();
            }
            if(this.changetype == 1){
                adjTime2 = {
                    A : 0,
                    B : 0
                }
            }
            this.$http({
                url: api.adjustStepBs,
                method: 'post',
                data: {
                    token: getToken(),
                    record_id: recid,
                    change_time1: adjTime1.A,  
                    change_time2: adjTime1.B,
                    school_time1: adjTime2.A,
                    school_time2: adjTime2.B,
                }
            }).then((res) => {
                // console.log(res)
                if (res.status == 200) {
                    if(res.data.code!=400){
                        this.$notify({
                            message: '操作成功！',
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

        //调课第一步--保存
        adjustStepAs(sid,type,cType,reason) {
            this.$http({
                url: api.adjustStepAs,
                method: 'post',
                data: {
                    token: getToken(),
                    id: sid,
                    type: type,
                    change_type: cType,
                    operate_reason: reason
                }
            }).then((res) => {
                // console.log(res)
                if (res.status == 200) {
                    if(res.data.code!=400){
                        this.recordId = res.data.data.record_id;    //日志
                        this.$notify({
                            message: '操作成功！',
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.adjustAjax(res.data.data.record_id);
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


        //班级课表--添加--保存数据
        scheduleSave(mod,search) {
            if(search.startTime != '' && search.endTime != ''){
                if(String(search.startTime).indexOf('-') == -1 ){
                    search.startTime = search.startTime.getFullYear() + '-' + (search.startTime.getMonth() + 1) + '-' + search.startTime.getDate();
                }
                if(String(search.endTime).indexOf('-') == -1 ){
                    search.endTime = search.endTime.getFullYear() + '-' + (search.endTime.getMonth() + 1) + '-' + search.endTime.getDate();
                }
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
                        this.ScheduID = this.schedule_id;   //编辑虚拟班时用
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
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        if(res.data.data.schedule_status != 1){
                            this.WhetherShowDel = true;
                        }else{
                            this.WhetherShowDel = false;
                        }
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

                        //代课
                        this.scheduleId = res.data.data.schedule_id;
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

        //实体班级--停课--保存数据
        classStopSave(type,stoPtime,reason) {
            if(stoPtime.start != '' &&  stoPtime.end != ''){
                stoPtime.start = stoPtime.start.getFullYear() + '-' + (stoPtime.start.getMonth()+1) + '-' + stoPtime.start.getDate() + ' ' + stoPtime.start.getHours() + ':' + stoPtime.start.getMinutes();
                stoPtime.end = stoPtime.end.getFullYear() + '-' + (stoPtime.end.getMonth()+1) + '-' + stoPtime.end.getDate() + ' ' + stoPtime.end.getHours() + ':' + stoPtime.end.getMinutes();
            } else{
                return;
            }
            this.$http({
                url: api.classStopSave,
                method: 'post',
                data: {
                    token: getToken(),
                    stop_start_time: stoPtime.start,
                    stop_end_time: stoPtime.end,
                    operate_reason: reason
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
                        this.stoPtime.start = '';
                        this.stoPtime.end = '';
                        // window.location.reload(true);
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
            // console.log(this.taData);
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
                // console.log(res)
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

        // 代课根据时间获取科目
        takeTiToSub(sid,time) {
            this.$http(api.timeToSub, {
                params: {
                    token: getToken(),
                    schedule_id: sid,
                    replace_start_time: time.start,
                    replace_end_time: time.end
                }
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        this.subject = res.data.data;
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

        // 代课根据科目获取老师
        takeSubToTeac(sid,time,subId) {
            this.$http(api.subToteacher, {
                params: {
                    token: getToken(),
                    schedule_id: sid,
                    subject_id: subId,
                    replace_start_time: time.start,
                    replace_end_time: time.end
                }
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        this.teacher = res.data.data;
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

        // 停课初始数据获取
        classStopBegin(sid) {
            if(this.tabsStatus){
                this.allFormData = {
                    token: getToken(),
                    id: sid,
                    type: this.classType
                }
            }else if(this.stopGrade){
                this.allFormData = {
                    token: getToken(),
                    id: sid.MID,
                    type: sid.TYPE
                }
            }
            this.$http(api.classStopBegin, {
                params: this.allFormData
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        this.lookover = false;
                        this.class_stop = true;
                        this.stopArea = res.data.data.range_name;
                    }else{
                        this.$notify({
                            message: res.data.data.error,
                            type: 'error',
                            duration: 1000,
                            onClose: () => {
                                window.location.reload(true);
                            }
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

        // 虚拟班代课第一步--保存
        takeoverSubmit(sid,time,subId) {
            this.$http({
                url: api.takeoverSubmit,
                method: 'post',
                data: {
                    token: getToken(),
                    schedule_id: sid,
                    subject_id: subId,
                    teacher_id: this.teacherVal,
                    replace_start_time: time.start,
                    replace_end_time: time.end,
                    operate_reason: this.textareaVal
                }
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
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
            if(this.backFirst){  //第二步返回到这一步
                time = {
                    start: this.startTimeVal,
                    end: this.endTimeVal,
                    start_w: this.startTimeVal_W,
                    end_w: this.endTimeVal_W
                };
            };
            // console.log(time);
            if(teachStr){
                let newWeek = [].concat(teachStr);
                for(var i=0;i<newWeek.length;i++){
                    newWeek[i]++;
                };
                this.week_checkList_string = newWeek.sort().join(",");
            }
            if(hourType == 2){
                // let _time = [time.start ,time.end, time.start_w, time.end_w];  //处理编辑情况第一步时间处理
                // _time.forEach((x)=> {
                //     console.log(x);
                //     if((String(x)).indexOf('-') != -1){  
                //         x = (x).split('-')[1] + (x).split('-')[2];
                //     }else{
                //         x = this.formatDate(x);
                //     };
                // })
                if((String(time.start)).indexOf('-') != -1){
                    time.start= String(time.start).split('-')[1] + String(time.start).split('-')[2];
                }else{
                    if(String(time.start).length > 4){
                        time.start= this.formatDate(time.start);
                    }
                }
                if((String(time.end)).indexOf('-') != -1){
                    time.end= String(time.end).split('-')[1] + String(time.end).split('-')[2];
                }else{
                    if(String(time.end).length > 4){
                         time.end= this.formatDate(time.end);
                    }
                }
                if((String(time.start_w)).indexOf('-') != -1){
                    time.start_w= String(time.start_w).split('-')[1] + String(time.start_w).split('-')[2];
                }else{
                    if(String(time.start_w).length > 4){
                        time.start_w= this.formatDate(time.start_w);
                    }
                }
                if((String(time.end_w)).indexOf('-') != -1){
                    time.end_w= String(time.end_w).split('-')[1] + String(time.end_w).split('-')[2];
                }else{
                    if(String(time.end_w).length > 4){
                        time.end_w= this.formatDate(time.end_w);
                    }
                }
                // console.log(time.start);
            }
            this.formData = {
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
            };
            if(this.distinguish){
                this.urlData = api.virtualB;
            }else{  
                this.urlData = api.EditVirtStep_A;
                this.formData.schedule_id = this.editScheID;
            }
            this.$http({
                url: this.urlData,
                method: 'post',
                data: this.formData
            }).then((res) => {
                if (res.status === 200) {
                    if(res.data.code!=400){
                        if(this.distinguish){
                            this.modelId = res.data.data.model_id;
                            this.$notify({
                                message: res.data.data.data,
                                type: 'success',
                                duration: 1000,
                                onClose: () => {
                                    this.virtual_1 = false;
                                    this.virtual_2 = true;
                                }
                            });
                        }else{   //编辑虚拟班提交
                            let _change = [this.formData.department_id, this.formData.model_name, this.formData.teaching_day, this.formData.teaching_num, this.formData.hours_type, this.formData.summer_hours_start_time, this.formData.summer_hours_end_time, this.formData.winter_hours_start_time, this.formData.winter_hours_end_time];
                            let _changeBefore = [this.editVirBeginData.department_id, this.editVirBeginData.department_name, this.editVirBeginData.teaching_day, this.editVirBeginData.teaching_num, this.editVirBeginData.hours_type, this.editVirBeginData.summer_hours_start_time, this.editVirBeginData.summer_hours_end_time, this.editVirBeginData.winter_hours_start_time, this.editVirBeginData.winter_hours_end_time];
                            let _status = false;  //数据没改变
                            _change.forEach((data,index)=> {
                                if(data != _changeBefore[index]){
                                    _status = true;
                                    return false;
                                }
                                return false;
                            })
                            this.editStatus = true;
                            this.editModelID = res.data.data.model_id;  //编辑第二步展示页面传输数据
                            if(_status){
                                this.editStepTwoA = true;
                                this.$notify({    
                                    message: '初始变更！',
                                    type: 'success',
                                    duration: 1000,
                                    onClose: () => {
                                        this.virtual_1 = false;
                                        this.virtual_2 = true;
                                    }
                                });
                            }else{
                                this.editStepTwoB = true;
                                this.derpartID = res.data.data.department_id;
                                this.$notify({
                                    message: '初始未改变！',
                                    type: 'success',
                                    duration: 1000,
                                    onClose: () => {
                                        this.virtual_1 = false;
                                        this.virtual_2 = true;
                                    }
                                });
                            }
                            // console.log(this.editVirBeginData);
                        }
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
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        this.moduleName = res.data.data.model_name;
                        this.studyType = res.data.data.time_line;
                        this.model.deparId = res.data.data.department_id;
                        this.default_day = res.data.data.default_day;
                        this.loading = false;
                        this.virtStep2Data = [];

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
                            message: res.data.data
                        });
                    }
                }else {
                    this.$notify.error({
                        message: res.data.data
                    });
                }
            })
        },

        //虚拟班排课第二步--保存
        virtualArrangeD(mod,search,sid) {
            // 有效期转换
            if(search.startTime != '' && search.endTime != ''){
                if(String(search.startTime).indexOf('-') == -1){
                    search.startTime = search.startTime.getFullYear() + '-' + (search.startTime.getMonth() + 1) + '-' + search.startTime.getDate();
                }
                if(String(search.endTime).indexOf('-') == -1){
                    search.endTime = search.endTime.getFullYear() + '-' + (search.endTime.getMonth() + 1) + '-' + search.endTime.getDate();
                }
            }   

            let _handle = this.virtStep2Data;
            _handle.forEach((data) => {   //进入每一行
                let time = data.timetable;  //进入每一个的timetable对象
                let circle =[time.day1, time.day2, time.day3, time.day4, time.day5, time.day6, time.day7];
                let rownull = 0;
                let circul = 0;
                let split = "#";
                let classTime = data.class_time;  //全年制
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
                        } else{
                            rownull++;
                        }
                        if(this.studyType == 1){
                            x.class_time = classTime;
                        } else if(this.studyType == 2){
                            x.class_time += clasTimeS + "," + clasTimeW;
                        }
                        this.virtDataTable.push(x);
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

            this.formDataA = {
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
            if(this.editVStakeover){  //编辑第二步保存
                this.formDataA.schedule_id = sid;
                this.apiURL = api.EditVirtStep_B1;
            }else{
                this.apiURL = api.virtualD;
            }

            // let form={
            //         token: getToken(),
            //         name: search.name,  //学期名字
            //         model_id: mod.id,
            //         department_id: mod.deparId,   //班级id
            //         end_time: search.endTime,
            //         start_time: search.startTime,
            //         teaching_each_day: this.teachingsDay,
            //         summer_hours_time: this.summerYearTime,
            //         winter_hours_time: this.winerYearTime,
            //         year_hours_time: this.allYeartime,
            //         timetable: this.virtDataTable,
            // }
            // console.log(form)

            this.$http({
                url: this.apiURL,
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
                        this.teachingsDay = '';
                        this.summerYearTime = '';
                        this.winerYearTime = '';
                        this.allYeartime = '';
                        this.virtDataTable = [];
                    }
                }else {
                    this.$notify.error({
                        message: res.data.data.error
                    });
                }
            })
        },

        // 虚拟班-编辑-第一步-展示页面
        EditVirtStep_a(sid) {
            this.$http(api.EditVirtStep_a, {
                params: {
                    token: getToken(),
                    schedule_id: sid
                }
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        this.moduleName = res.data.data.department_name;   
                        this.editVirBeginData = res.data.data;
                        this.editScheID = res.data.data.schedule_id;   //编辑第二步
                        let week_begin = (res.data.data.teaching_day).split(',');
                            week_begin.forEach((x)=> {
                                x = parseInt(x) - 1;
                                this.week_checkList.push(x);   //虚拟班初始星期日
                            });
                        let studyNum_begin = (res.data.data.teaching_num).split(',');
                        let study_cache = [];
                            studyNum_begin.forEach((x)=> {
                                x = parseInt(x);
                                study_cache.push(x);   //虚拟班初始星期日
                            });
                        this.studyNum = {   //虚拟班初始初始科目数
                            morbefore: study_cache[0],
                            morning: study_cache[1],
                            afternoon: study_cache[2],
                            night: study_cache[3]
                        }
                        this.rest_checkList.push(parseInt(res.data.data.hours_type)-1);
                        if(this.rest_checkList[0] == 1){  //分季节
                            this.startTimeVal = this.formatMd(res.data.data.summer_hours_start_time);
                            this.endTimeVal = this.formatMd(res.data.data.summer_hours_end_time);
                            this.startTimeVal_W = this.formatMd(res.data.data.winter_hours_start_time);
                            this.endTimeVal_W = this.formatMd(res.data.data.winter_hours_end_time);
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

        // 虚拟班-编辑-第二步展示页面
        EditVirtStep_b(mid,sid,did) {
            if(this.editStepTwoA){
                this.ApiUrlData = api.EditVirtStep_b;
                this.editFormData = {
                    token: getToken(),
                    model_id: mid,
                    schedule_id: sid,
                }
            }else if(this.editStepTwoB){
                this.ApiUrlData = api.checkGradeSche;
                this.editFormData = {
                    token: getToken(),
                    id: did,
                    schedule_id: sid,
                }
            }
            this.$http(this.ApiUrlData, {
                params: this.editFormData
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                       if(this.editStepTwoA){
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
                        }else if(this.editStepTwoB){
                            let virtStep2Data = res.data.data.model_common;
                            //时间戳转换年月日
                            Date.prototype.toLocaleString = function() {
                                return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
                            };
                            let unixTimestamps = new Date( res.data.data.schedule_start_time*1000),
                                unixTimestampe = new Date( res.data.data.schedule_end_time*1000);
                            this.searchInline={
                                name: res.data.data.schedule_name,
                                startTime: unixTimestamps.toLocaleString(),
                                endTime: unixTimestampe.toLocaleString(),
                            }
                            this.moduleName = res.data.data.department_name;
                            this.virtStep2Data = [];

                            if(parseInt(res.data.data.time_line) != 3){  
                                this.studyType = 2;
                            }else{
                                this.studyType = 1;
                            }
                            if(this.studyType == 1){  //全年类型
                                virtStep2Data.forEach((x) => {
                                    x.class_timeS = [];
                                    x.class_timeW = [];
                                    x.class_time = [new Date(2016, 9, 10, String(x.schedule_time).split('-')[0].split(':')[0], String(x.schedule_time).split('-')[0].split(':')[1]),new Date(2016, 9, 10, String(x.schedule_time).split('-')[1].split(':')[0], String(x.schedule_time).split('-')[0].split(':')[1])];
                                    x.teachDay = [];
                                    x.timetable = x.content;
                                    this.virtStep2Data.push(x);
                                });
                            }else{
                                virtStep2Data.forEach((x) => {
                                    x.class_timeS = [new Date(2016, 9, 10, String(x.schedule_time).split(',')[0].split('-')[0].split(':')[0], String(x.schedule_time).split(',')[0].split('-')[0].split(':')[1]),new Date(2016, 9, 10, String(x.schedule_time).split(',')[0].split('-')[1].split(':')[0], String(x.schedule_time).split(',')[0].split('-')[1].split(':')[1])];
                                    x.class_timeW = [new Date(2016, 9, 10, String(x.schedule_time).split(',')[1].split('-')[0].split(':')[0], String(x.schedule_time).split(',')[1].split('-')[0].split(':')[1]),new Date(2016, 9, 10, String(x.schedule_time).split(',')[1].split('-')[1].split(':')[0], String(x.schedule_time).split(',')[1].split('-')[1].split(':')[1])];
                                    x.class_time = [];
                                    x.teachDay = [];
                                    x.timetable = x.content;
                                    this.virtStep2Data.push(x);
                                });
                            }
                        }
                        this.loading =false;
                    }else{
                        this.$notify({
                            message: res.data.data.error,
                            type: 'error',
                            duration: '1000',
                            onClose: () => {
                                window.location.reload(true);
                            }
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

        //虚拟班-编辑-第二步--保存（初始数据改变了）
        EditVirtStep_B1(mod,search,sid) {
            if(!this.editVStake){
                this.ApUrlData =  api.EditVirtStep_B1;
            }else{
                this.ApUrlData =  api.EditVirtStep_B2;
            }
            // 有效期转换
            if(search.startTime != '' && search.endTime != ''){
                if((String(search.startTime)).indexOf('-') != -1){

                }else{
                    search.startTime = search.startTime.getFullYear() + '-' + (search.startTime.getMonth() + 1) + '-' + search.startTime.getDate();
                };
                if((String(search.endTime)).indexOf('-') != -1){

                }else{
                    search.endTime = search.endTime.getFullYear() + '-' + (search.endTime.getMonth() + 1) + '-' + search.endTime.getDate();
                };
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
            // console.log(this.virtDataTable)
            this.$http({
                url: this.ApUrlData,
                method: 'post',
                data: {
                    token: getToken(),
                    schedule_id: sid,
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
                        this.virtDataTable = [];
                        this.teachingsDay = '';
                        this.summerYearTime = '';
                        this.winerYearTime = '';
                        this.allYeartime = '';
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
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        let data = res.data.data;
                        this.gradList = [];

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
                            })
                            this.gradeParams.curpage = res.data.page;
                            this.gradeParams.page_count = res.data.all_pagecount;
                            this.gradeParams.total_num = parseInt(res.data.page_total);
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
                        this.loading = false;
                        this.moduleName = res.data.data.model_name;
                        this.studyType = res.data.data.time_line;
                        this.EditGradeData = res.data.data.list;
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

        // 年级模板创建--第一步-展示
        creatGradeModela(did) {
            if(this.creatGrade){
                this.commonSubmit_a = {
                    apiUrl: api.creatGradeModela,
                    formData: {
                        token: getToken(),
                        department_id: did,
                    }
                }
            }else if(this.editDrade){
                this.commonSubmit_a = {
                    apiUrl: api.editGradeModel_a,
                    formData: {
                        token: getToken(),
                        model_id: this.EditModuleID,
                    }
                }
            }
            this.$http(this.commonSubmit_a.apiUrl, {
                params: this.commonSubmit_a.formData
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        if(this.creatGrade){  //创建模板
                            this.moduleName = res.data.data.department_name;
                        }else if(this.editDrade){  //编辑模板-第一步-展示
                            this.moduleName = res.data.data.model_name;
                            this.EditBeginData = res.data.data;   //储存编辑初始数据
                            let week_begin = (res.data.data.teaching_day).split(',');
                                week_begin.forEach((x)=> {
                                    x = parseInt(x) - 1;
                                    this.week_checkList.push(x);   //虚拟班初始星期日
                                });
                            let studyNum_begin = (res.data.data.teaching_num).split(',');
                            let study_cache = [];
                                studyNum_begin.forEach((x)=> {
                                    x = parseInt(x);
                                    study_cache.push(x);   //虚拟班初始星期日
                                });
                            this.studyNum = {   //虚拟班初始初始科目数
                                morbefore: study_cache[0],
                                morning: study_cache[1],
                                afternoon: study_cache[2],
                                night: study_cache[3]
                            }
                            this.rest_checkList.push(parseInt(res.data.data.hours_type)-1);
                            if(this.rest_checkList[0] == 1){  //分季节
                                this.startTimeVal = this.formatMd(res.data.data.summer_hours_start_time);
                                this.endTimeVal = this.formatMd(res.data.data.summer_hours_end_time);
                                this.startTimeVal_W = this.formatMd(res.data.data.winter_hours_start_time);
                                this.endTimeVal_W = this.formatMd(res.data.data.winter_hours_end_time);
                            }
                        }
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

        // 创建年级模板-第一步--保存
        creatGradeModelA(departId,teachStr,teachNum,hourType,time) {
            if(this.backFirst){  //第二步返回到这一步
                time = {
                    start: this.startTimeVal,
                    end: this.endTimeVal,
                    start_w: this.startTimeVal_W,
                    end_w: this.endTimeVal_W
                };
            };
            if(teachStr){
                // let newWeek = teachStr;  //这种方法会改变原有数据
                let newWeek = [].concat(teachStr);
                for(var key in newWeek){
                    newWeek[key]++;
                };
                this.week_checkList_string = newWeek.sort().join(",");
            }
            if(hourType == 2){  //冬夏作息
                if((String(time.start)).indexOf('-') != -1){
                    time.start= String(time.start).split('-')[1] + String(time.start).split('-')[2];
                }else{
                    if(String(time.start).length > 4){
                        time.start= this.formatDate(time.start);
                    }
                }
                if((String(time.end)).indexOf('-') != -1){
                    time.end= String(time.end).split('-')[1] + String(time.end).split('-')[2];
                }else{
                    if(String(time.end).length > 4){
                        time.end= this.formatDate(time.end);
                    }
                }
                if((String(time.start_w)).indexOf('-') != -1){
                    time.start_w= String(time.start_w).split('-')[1] + String(time.start_w).split('-')[2];
                }else{
                    if(String(time.start_w).length > 4){
                        time.start_w= this.formatDate(time.start_w);
                    }
                }
                if((String(time.end_w)).indexOf('-') != -1){
                    time.end_w= String(time.end_w).split('-')[1] + String(time.end_w).split('-')[2];
                }else{
                    if(String(time.end_w).length > 4){
                        time.end_w= this.formatDate(time.end_w);
                    }
                }
            }
            this.commonSubmit_A.formData = {
                token: getToken(),
                model_name: this.moduleName,
                teaching_day: this.week_checkList_string,
                teaching_num: teachNum,
                hours_type: hourType,   //作息方式
                summer_hours_start_time: time.start,
                summer_hours_end_time: time.end,   
                winter_hours_start_time: time.start_w,   
                winter_hours_end_time: time.end_w,   
            };
            if(this.creatGrade){  //创建
                this.commonSubmit_A.apiUrl = api.creatGradeModelA;
                this.commonSubmit_A.formData.department_id = this.departID;
                // this.commonSubmit_A.formData.department_id = this.departId;
            }else if(this.editDrade){   //编辑
                this.commonSubmit_A.apiUrl = api.editGradeModel_A;
                this.commonSubmit_A.formData.model_id = this.EditModuleID;
            }


            this.$http({
                url: this.commonSubmit_A.apiUrl,
                method: 'post',
                data: this.commonSubmit_A.formData
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        if(this.creatGrade){
                            this.backModel_id = res.data.data.model_id;  //为第二步展示页面用
                            this.$notify({
                                message: '进入下一步',
                                type: 'success',
                                duration: 1000,
                                onClose: () => {
                                    this.loading = true;
                                    this.gradeModel_1 = false;
                                    this.gradeModel_2 = true;
                                    this.creatStep_b(this.backModel_id);
                                }
                            });
                        }else if(this.editDrade){   //编辑
                            let _change = [this.commonSubmit_A.formData.teaching_day, this.commonSubmit_A.formData.teaching_num, this.commonSubmit_A.formData.hours_type, this.commonSubmit_A.formData.summer_hours_start_time, this.commonSubmit_A.formData.summer_hours_end_time, this.commonSubmit_A.formData.winter_hours_start_time, this.commonSubmit_A.formData.winter_hours_end_time];
                            let _changeBefore = [this.EditBeginData.teaching_day, this.EditBeginData.teaching_num, this.EditBeginData.hours_type, this.EditBeginData.summer_hours_start_time, this.EditBeginData.summer_hours_end_time, this.EditBeginData.winter_hours_start_time, this.EditBeginData.winter_hours_end_time];
                            let _status = false;  //数据没改变

                            _change.forEach((data,index)=> {
                                if(data != _changeBefore[index]){
                                    _status = true;
                                    this.EditStatus = _status;
                                    return false;
                                }
                                return false;
                            })
                            if(_status){
                                this.$notify({    
                                    message: '初始变更！',
                                    type: 'success',
                                    duration: 1000,
                                    onClose: () => {
                                        this.gradeModel_1 = false;
                                        this.gradeModel_2 = true;
                                        this.editStepTwo(this.EditModuleID);
                                    }
                                });
                            }else{
                                this.$notify({    
                                    message: '初始未变更！',
                                    type: 'success',
                                    duration: 1000,
                                    onClose: () => {
                                        this.loading = true;
                                        this.gradeModel_1 = false;
                                        this.gradeModel_2 = true;
                                        this.editStepTwo(this.EditModuleID);
                                    }
                                });
                            }
                        }
                    }else{
                        this.$notify.error({
                            message: res.data.data.error
                        });
                        this.loading = false;
                        this.week_checkList = [];
                        this.week_checkList_string = '';
                        teachNum = '';
                    }
                }else {
                    this.$notify.error({
                        message: res.data.data.error
                    });
                }
            })
        },

        // 年级模板创建--第二步-展示
        creatGradeModelb(mid) {
            if(this.creatGrade){  //创建
                this.commonSubmit_b = {
                    apiUrl: api.creatGradeModelb,
                    formData: {
                        token: getToken(),
                        model_id: mid,
                    }
                }
            }else if(this.editDrade){   //编辑
                this.commonSubmit_b = {
                    apiUrl: api.editGradeModel_b,
                    formData: {
                        token: getToken(),
                        model_id: mid,
                    }
                }
            }
            this.$http(this.commonSubmit_b.apiUrl, {
                params: this.commonSubmit_b.formData
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        if(this.creatGrade){
                            this.loading = false;
                            this.studyType = res.data.data.time_line;
                            this.default_day = res.data.data.default_day;
                            this.moduleName = res.data.data.model_name;
                            this.EditGradeData = [];   //点击上一步返回在进行下一步时数据清空
                            let EditGradeData = res.data.data.list;   //初始创建字段
                            EditGradeData.forEach((x) => {
                                x.class_timeS = [];
                                x.class_timeW = [];
                                x.class_time = [];
                                x.teachDay = [];
                                this.EditGradeData.push(x);
                            });
                        }else if(this.editDrade){
                            this.loading = false;
                            this.studyType = res.data.data.time_line;
                            this.default_day = res.data.data.default_day;
                            this.moduleName = res.data.data.model_name;
                            this.EditGradeData = [];
                            if(this.EditStatus){  //初始数据变更
                                let EditGradeData = res.data.data.list;   //初始创建字段
                                EditGradeData.forEach((x) => {
                                    x.class_timeS = [];
                                    x.class_timeW = [];
                                    x.class_time = [];
                                    x.teachDay = [];
                                    let timetable = x.timetable;
                                    let day = [x.timetable.day1,x.timetable.day2,x.timetable.day3,x.timetable.day4,x.timetable.day5,x.timetable.day6,x.timetable.day7];
                                        day.forEach((data) => {
                                            if(data){
                                                data.is_check = true;
                                            }
                                        })
                                    this.EditGradeData.push(x);
                                });
                            }else{
                                if(this.studyType == 1){
                                    let EditGradeData = res.data.data.list;   //初始创建字段
                                    EditGradeData.forEach((x) => {
                                        x.class_timeS = [];
                                        x.class_timeW = [];
                                        x.class_time = [new Date(2016, 9, 10, String(x.year_time).split('-')[0].split(':')[0], String(x.year_time).split('-')[0].split(':')[1]),new Date(2016, 9, 10, String(x.year_time).split('-')[1].split(':')[0], String(x.year_time).split('-')[0].split(':')[1])];
                                        x.teachDay = [];
                                        this.EditGradeData.push(x);
                                    });
                                }else{
                                    let EditGradeData = res.data.data.list;   //初始创建字段
                                    EditGradeData.forEach((x) => {
                                        x.class_timeS = [new Date(2016, 9, 10, String(x.sumber_time).split('-')[0].split(':')[0], String(x.sumber_time).split('-')[0].split(':')[1]),new Date(2016, 9, 10, String(x.sumber_time).split('-')[1].split(':')[0], String(x.sumber_time).split('-')[1].split(':')[1])];
                                        x.class_timeW = [new Date(2016, 9, 10, String(x.winer_time).split('-')[0].split(':')[0], String(x.winer_time).split('-')[0].split(':')[1]),new Date(2016, 9, 10, String(x.winer_time).split('-')[1].split(':')[0], String(x.winer_time).split('-')[1].split(':')[1])];
                                        x.class_time = [];
                                        x.teachDay = [];
                                        this.EditGradeData.push(x);
                                    });
                                }
                            }
                        } 
                    }else{
                        this.$notify.error({
                            message: res.data.data
                        });
                    }
                }else {
                    this.$notify.error({
                        message: res.data.data
                    });
                }
            })
        },

         //年级排课第二步--保存
        creatGradeModelB(mid) {
            let _handle = this.EditGradeData;
            _handle.forEach((data) => {   //进入每一行
                let time = data.timetable;  //进入每一个的timetable对象
                let circle =[time.day1, time.day2, time.day3, time.day4, time.day5, time.day6, time.day7];
                let rownull = 0;
                let circul = 0;
                let split = "#";
                let classTime = data.class_time;  //全年制时间
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
                        if(x.is_check){  //看每一行的单元格是否被选中
                            data.teachDay.push(x.week_day);
                            if(this.studyType == 1){
                                x.class_time = classTime;
                            } else if(this.studyType == 2){
                                x.class_time += clasTimeS + "," + clasTimeW;
                            }
                            this.EditSubmitData.push(x);
                        } else{
                            rownull++;
                        }
                    }
                });
                if(rownull == circul){   //如果这一行都没选
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
            // console.log(this.EditSubmitData)
            this.commonSubmit_B.formData = {
                token: getToken(),
                model_id: mid,
                teaching_each_day: this.teachingsDay,
                summer_hours_time: this.summerYearTime,
                winter_hours_time: this.winerYearTime,
                year_hours_time: this.allYeartime,
            }
            if(this.creatGrade){  //创建
                this.commonSubmit_B.apiUrl = api.creatGradeModelB;
            }else if(this.editDrade){
                this.commonSubmit_B.apiUrl = api.editGradeModel_B;
            }


            this.$http({
                url: this.commonSubmit_B.apiUrl,
                method: 'post',
                data: this.commonSubmit_B.formData
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
                        this.EditSubmitData = [];
                        this.teachingsDay = '';
                        this.summerYearTime = '';
                        this.winerYearTime = '';
                        this.allYeartime = '';
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

        // 年级课表模板是否展示按钮
        whetherShowBtn(mid) {
            this.$http(api.whetherShowBtn, {
                params: {
                    token: getToken(),
                    id: mid,
                }
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        if(res.data.data.is_show == 1){
                            this.whertherShow = true;
                        }else if(res.data.data.is_show == 2){
                            this.whertherShow = false;
                        }
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

        // 年级课表模板-删除
        deleteGrade(mid) {
            this.$http(api.deleteGrade, {
                params: {
                    token: getToken(),   //这个key有误
                    model_id: mid,
                }
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        this.$notify({
                            message: '删除成功',
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

        // 班级课表模板-删除
        deleteClass(id) {
            this.$http(api.deleteClass, {
                params: {
                    token: getToken(),   //这个key有误
                    id: id,
                }
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        this.$notify({
                            message: '删除成功',
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

        //全校停课---全日志
        suspendLog(obj, start, end) {
            if(start.length != 0 && end.length != 0){
                start =  Date.parse(new Date(start)) / 1000;
                end =  Date.parse(new Date(end)) / 1000;
            }else if(start.length != 0){
                start =  Date.parse(new Date(start)) / 1000;
            }else if(end.length != 0){
                end =  Date.parse(new Date(end)) / 1000;
            }
            this.$http(api.suspendLog, {
                params: {
                    token: getToken(),
                    page: obj.curpage,
                    curpage: obj.one_pagenum,
                    operate_start_time: start,
                    operate_end_time: end
                }
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                        this.suspendData = [];  
                        let _data = res.data.data;
                        _data.forEach((x) => {
                            this.suspendData.push({
                                start: x.stop_start_time,
                                end: x.stop_end_time,
                                why: x.operate_reason,
                                who: x.operate_person,
                                when: this.formatAll(new Date(parseInt(x.operate_time)*1000)),
                                whether: x.show_cancel,
                                record: x.record_id,   //取消停课id
                            })
                        })
                        this.pageParams.hasmore = res.data.hasmore;   
                        this.pageParams.curpage = res.data.page;    //当前第几页
                        this.pageParams.page_count = res.data.all_pagecount;  //总共多少页
                        this.pageParams.total_num = parseInt(res.data.page_total);   //总共多少条数据
                    }
            })
        },

        //全校停课-添加
        suspendAdd(start,end,reason) {
            if(start.length == 0 || end.length == 0){
                return
            }else{
                start = this.formatAll(start);
                end = this.formatAll(end);
            }
            this.$http({
                url: api.suspendAdd,
                method: 'post',
                data: {
                    token: getToken(),
                    stop_start_time: start,
                    stop_end_time: end,
                    operate_reason: reason
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

        //全校停课-取消
        suspendCancel(rid) {
            this.$http({
                url: api.suspendCancel,
                method: 'post',
                data: {
                    token: getToken(),
                    record_id: rid,
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

        //班级年级日志
       classGradeLog(id,obj,start,end,type) {
            if(start.length != 0 && end.length != 0){
                start =  Date.parse(new Date(start)) / 1000;
                end =  Date.parse(new Date(end)) / 1000;
            }else if(start.length != 0){
                start =  Date.parse(new Date(start)) / 1000;
            }else if(end.length != 0){
                end =  Date.parse(new Date(end)) / 1000;
            }
            this.$http(api.classGradeLog, {
                params: {
                    token: getToken(),
                    department_id: id,
                    page: obj.curpage,
                    curpage: obj.one_pagenum,
                    operate_start_time: start,
                    operate_end_time: end,
                    operate_type: type
                }
            }).then((res) => {
                // console.log(res);
                if (res.status == 200) {
                    if(res.data.code!=400){
                        this.suspendData = [];  
                        let _data = res.data.data;
                        _data.forEach((x) => {
                            this.suspendData.push({
                                why: x.operate_reason,
                                who: x.operate_person,
                                when: x.operate_time,
                                whether: x.show_cancel,
                                type: x.operate_type,
                                record: x.record_id,   
                                detial: x.detail,
                            })
                        })
                        this.pageParams.hasmore = res.data.hasmore;   
                        this.pageParams.curpage = res.data.page;    //当前第几页
                        this.pageParams.page_count = res.data.all_pagecount;  //总共多少页
                        this.pageParams.total_num = parseInt(res.data.page_total);   //总共多少条数据
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

        //班级年级日志详情
        logDetail(rid) {
            this.$http({
                url: api.logDetail,
                method: 'post',
                data: {
                    token: getToken(),
                    record_id: rid,
                }
            }).then((res) => {
                // console.log(res)
                if (res.status == 200) {
                    if(res.data.code!=400){
                        this.dailogDetail = { 
                            time: res.data.data.operate_time,
                            type: res.data.data.operate_person_type,
                            people: res.data.data.operate_person,
                            reason: res.data.data.operate_reason,
                        }
                        this.Dailog = true;
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

        // 标准中国时间转换获取月日
        formatDate(date) {
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

        // 月日拼接
        formatMD(data) {  
            let date = new Date;
            let year = date.getFullYear(); 
            let _begin = data.split('');
            return  year + '-' + _begin[0] + _begin[1] + '-' + _begin[2] + _begin[3];  
        }, 

        //年月日时分秒
        formatYMDHMS(data){
            return data = data.getFullYear() + '-' + (data.getMonth()+1) + '-' + data.getDate() + ' ' + data.getHours() + ':' + data.getMinutes();
        },




        //素材库---素材管理-列表
        materManaList_s(obj, cid, content) {
            let apiUrl = api.materManaList_s;
            let formData = {
                    token: getToken(),
                    page: obj.curpage,
                    pagesize: obj.one_pagenum,
                    cid: cid,
                    search: content
                };
            if(this.isClassLogin == 2){
                if(this.commonMaterial){
                    apiUrl = api.materManaList_t_all;
                }else{
                    apiUrl = api.materManaList_t;
                }
            }
            this.$http(apiUrl, {
                params: formData
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        this.materManaList = [];  
                        let _data = res.data.data.list;
                        _data.forEach((x) => {
                            if(parseInt(x.is_share) == 1){
                                x.is_share = true;
                            }else if(parseInt(x.is_share) == 2){
                                x.is_share = false;
                            }
                            this.materManaList.push({
                                id: x.id,
                                name: x.title,
                                size: x.file_size,
                                time: x.add_time,
                                people: x.user_name,
                                url: x.file_url,
                                share: x.is_share
                            })
                        })
                        this.materialParams.curpage = res.data.data.page;    //当前第几页
                        this.materialParams.page_count = res.data.data.page_count;  //总共多少页
                        this.materialParams.total_num = parseInt(res.data.data.rows);   //总共多少条数据
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

        //素材库---素材管理-一级分类
        materManaType1_s(obj) {
            let apiUrl = api.materManaType1_s;
            let formData = {
                    token: getToken(),
                    pid: obj.pid,
                    type: obj.type
                };
            if(this.teacherManageCenter){
                apiUrl = api.materManaType1_t
            }
            this.$http(apiUrl, {
                params: formData
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        switch(this.requestDiff) {
                            case 2:     
                                if((res.data.data.list).length != 0){   //一级分类变更，请求到二级数据
                                    this.manaDisable.cant2 = false;
                                    this.Levelist.Levelist_2 = res.data.data.list;
                                }else{
                                    this.manaDisable.cant2 = true;
                                    this.searchlist.Level2 = '';
                                    this.searchlist.Level3 = '';
                                    this.searchlist.Level4 = '';
                                    this.searchlist.Level5 = '';
                                    this.Levelist.Levelist_2 = []; 
                                    this.Levelist.Levelist_3 = []; 
                                    this.Levelist.Levelist_4 = []; 
                                    this.Levelist.Levelist_5 = []; 
                                };
                                break;
                            case 3:
                                if((res.data.data.list).length != 0){
                                    this.manaDisable.cant3 = false;
                                    this.Levelist.Levelist_3 = res.data.data.list;
                                }else{
                                    this.manaDisable.cant3 = true;
                                    this.searchlist.Level3 = '';
                                    this.searchlist.Level4 = '';
                                    this.searchlist.Level5 = '';
                                    this.Levelist.Levelist_3 = []; 
                                    this.Levelist.Levelist_4 = []; 
                                    this.Levelist.Levelist_5 = []; 
                                };
                                break;
                            case 4:
                                if((res.data.data.list).length != 0){
                                    this.manaDisable.cant4 = false;
                                    this.Levelist.Levelist_4 = res.data.data.list;
                                }else{
                                    this.manaDisable.cant4 = true;
                                    this.searchlist.Level4 = '';
                                    this.searchlist.Level5 = '';
                                    this.Levelist.Levelist_4 = []; 
                                    this.Levelist.Levelist_5 = []; 
                                };
                                break;
                            case 5:
                                if((res.data.data.list).length != 0){
                                    this.manaDisable.cant5 = false;
                                    this.Levelist.Levelist_5 = res.data.data.list;
                                }else{
                                    this.manaDisable.cant5 = true;
                                    this.searchlist.Level5 = '';
                                    this.Levelist.Levelist_5 = []; 
                                };
                                break;
                            default:
                                if((res.data.data.list).length != 0){
                                    this.Levelist.Levelist_1 = res.data.data.list;
                                };
                                break;
                        }
                    }else{
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

        //素材库---素材管理--编辑初始详情
        materManaEdit_b_s(id) {
            let apiUrl = api.materManaEdit_b_s;
            let formData = {
                token: getToken(),
                id: id
            };
            if(this.teacherManageCenter){
                apiUrl = api.materManaEdit_b_t;
            }
            this.$http(apiUrl, {
                params: formData
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                   if(res.data.code!=400){
                        if(!this.mertailDetail){
                            let _begin = res.data.data;
                            let _circleID = [_begin.cid1,_begin.cid2,_begin.cid3,_begin.cid4,_begin.cid5];
                            let _circleVal = [_begin.cname1,_begin.cname2,_begin.cname3,_begin.cname4,_begin.cname5];
                            this.create={
                                theme: res.data.data.title,
                                themeAdd: '备注信息文字',
                                conferContent: res.data.data.content,
                                isShare: parseInt(res.data.data.is_share),
                            };
                            this.floorHelp(1);
                            _circleID.forEach((x,index)=> {
                                if(String(x).length != 0){
                                   this.searchlist[`Level${index+1}`] = x;
                                   this.manaDisable[`cant${index+1}`] = false;
                                   this.firstSelect.pid = x;
                                   this.floorHelp(index+2);
                                }else{
                                    return;
                                }
                            });
                        }else{  //详情
                            this.Dailog = true;
                            let _detail = res.data.data;
                            this.merDetail={
                                name: _detail.title,
                                time: _detail.add_time,
                                detail: _detail.content,
                            };
                            if(_detail.is_share == 1){
                                this.merDetail.share = '是';
                            }else{
                                this.merDetail.share = '否';
                            }
                        }
                   }else{
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

        //素材库---素材管理-编辑铺数据
        materManaType0_s(obj,index) {
            let apiUrl = api.materManaType1_s;
            let formData = {
                token: getToken(),
                pid: obj.pid,
                type: obj.type
            };
            if(this.teacherManageCenter){
                apiUrl = api.materManaType1_t;
            }
            this.$http(apiUrl, {
                params: formData
            }).then((res) => {
                if (res.status === 200) {
                    if(res.data.code!=400){
                        switch(index) {
                            case 2:     
                                this.Levelist.Levelist_2 = res.data.data.list;
                                break;
                            case 3:
                                this.Levelist.Levelist_3 = res.data.data.list;
                                break;
                            case 4:
                                this.Levelist.Levelist_4 = res.data.data.list;
                                break;
                            case 5:
                                this.Levelist.Levelist_5 = res.data.data.list;
                                break;
                            default:
                                this.Levelist.Levelist_1 = res.data.data.list;
                                break;
                        }
                    }else{
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

        //素材库---素材管理-编辑-保存
        materManaEdit_s(scid,obj,lid) {
            let apiURL = api.materManaEdit_s;
            if(this.teacherManageCenter){
                apiURL = api.materManaEdit_t;
            }
            this.$http({
                url: api.materManaEdit_s,
                method: 'post',
                data: {
                    token: getToken(),
                    id: scid,
                    title: obj.theme,
                    category_id: lid,
                    content: obj.conferContent,
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

        //素材库---素材管理-删除
        materManadel_s(id) {
            if(id.length == 0){
                return
            }
            let apiUrl = api.materManadel_s;
            if(this.delStatus){   //多删除！
                id.forEach((x)=> {
                    this.IDString.push(x.id);
                })
                this.IDString = (this.IDString).sort().join(",");
            }else{
                this.IDString = id;
            }
            if(this.teacherManageCenter){
                apiUrl = api.materManadel_t;
            }
            this.$http(apiUrl, {
                params: {
                    token: getToken(),
                    ids: this.IDString,
                }
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
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
                }else{
                    this.$notify.error({
                        message: res.data.data.error
                    });
                }
            })
        },

        //素材库---素材管理-添加
        materManadd_s(obj,lid) {
            let apiUrl = api.materManadd_s;
            if(this.teacherManageCenter){
                apiUrl = api.materManadd_t;
            }
            this.$http({
                url: apiUrl,
                method: 'post',
                data: {
                    token: getToken(),
                    title: obj.theme,
                    category_id: lid,
                    content: obj.conferContent,
                    is_share: obj.isShare
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


        //会议管理--列表
        conferMeetList_s(obj, status, seData) {
            let apiUrl = api.conferMeetList_s;
            let formData = {
                    token: getToken(),
                    page: obj.curpage,
                    pagesize: obj.one_pagenum,
                    status: status,
                    search: seData
                };
            if(this.schoolManageCenter){
                
            }else if(this.teacherManageCenter){
                apiUrl = api.conferMeetList_t;
            }
            this.$http(apiUrl, {
                params: formData
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        this.conferManaList = [];  
                        let _data = res.data.data.list;
                        _data.forEach((x) => {
                            this.conferManaList.push({
                                id: x.id,
                                theme: x.title,
                                time_s: x.start_time,
                                time_e: x.end_time,
                                creTime: x.add_time,
                                people: x.user_name,
                                status: parseInt(x.status),
                                channelId: x.channelId,
                            })
                        })
                        this.materialParams.curpage = res.data.data.page;    //当前第几页
                        this.materialParams.page_count = res.data.data.page_count;  //总共多少页
                        this.materialParams.total_num = parseInt(res.data.data.rows);   //总共多少条数据
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

        //会议-删除
        conferMeetdel_s(id) {
            if(id.length == 0){
                return
            }
            if(this.delStatus){   //多删除！
                id.forEach((x)=> {
                    this.IDString.push(x.id);
                })
                this.IDString = (this.IDString).sort().join(",");
            }else{
                this.IDString = id;
            }
            this.$http(api.conferMeetdel_s, {
                params: {
                    token: getToken(),
                    ids: this.IDString,
                }
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
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
                }else{
                    this.$notify.error({
                        message: res.data.data.error
                    });
                }
            })
        },

        //会议详情
        conferMeetDetail_s(id) {
            let apiURL = api.conferMeetDetail_s;
            if(this.teacherManageCenter){
                apiURL = api.conferMeetDetail_t
            }
            this.$http(apiURL, {
                params: {
                    token: getToken(),
                    id: id,
                }
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        if(!this.EDITCARD){
                            let _data = res.data.data;
                            this.confDetail = {
                                name: _data.name,
                                time_s: _data.start_time,
                                time_e: _data.end_time,
                                content: _data.content,
                                url: _data.channel_url,
                                status: '',
                                eclo: [],   //附件
                            };
                            if(_data.status == 1){
                                this.confDetail.status = '未开始';
                            }else if(_data.status == 2){
                                this.confDetail.status = '进行中';
                            }else if(_data.status == 3){
                                this.confDetail.status = '已结束';
                            }
                            this.Dailog = true;
                        }else{  //编辑会议初始详情
                            let _data = res.data.data;
                            this.create={
                                theme: _data.title,
                                themeAdd: '备注信息文字',
                                timeStart: _data.start_time,
                                timeEnd: _data.end_time,
                                confPeople: _data.teachers.split(','),
                                conferContent: _data.content,
                                isShow: parseInt(_data.is_show),
                            };
                            this.channelName = _data.name;
                            this.channelID = _data.channelid;
                        }
                    }else{
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

        //会议管理--创建会议
        conferMeetCreate_s(obj,chanid) {
            if(String(obj.timeStart).length == 0 || String(obj.timeEnd).length == 0){
                return
            }else{
                if((String(obj.timeStart)).indexOf('-') != -1){

                }else{
                    if(String(obj.timeStart).length > 4){
                        obj.timeStart= this.formatAll(obj.timeStart);
                    }
                }
                if((String(obj.timeEnd)).indexOf('-') != -1){

                }else{
                    if(String(obj.timeEnd).length > 4){
                        obj.timeEnd= this.formatAll(obj.timeEnd);
                    }
                }
            }
            let apiURL = api.conferMeetCreate_s;
            let formData = {
                token: getToken(),
                title: obj.theme,
                start_time: obj.timeStart,
                end_time: obj.timeEnd,
                teachers: obj.confPeople,
                content: obj.conferContent,
                is_show: obj.isShow,
                channelId: chanid,
            }
            if(this.creatStatus){   //创建会议
                console.log(formData)
            }else if(this.EDITCARD){
                apiURL = api.conferMeetEdit_s;
                formData.id = this.CONFERID;
            }
            this.$http({
                url: apiURL,
                method: 'post',
                data: formData
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
                        this.create={
                            theme: '',
                            themeAdd: '',
                            timeStart: '',
                            timeEnd: '',
                            confPeople: [],
                            conferContent: '',
                            isShow: 1,
                        }
                    }
                }else {
                    this.$notify.error({
                        message: res.data.data.error
                    });
                }
            })
        },

         //会议管理--创建会议---老师列表
        conferMeetTeacher_s(id) {
            this.$http(api.conferMeetTeacher_s, {
                params: {
                    token: getToken(),
                }
            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    if(res.data.code!=400){
                        this.conferPeoList = res.data.data;
                    }else{
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

        //会议管理--创建会议
        conferVideoCreate_s(obj) {
            this.$http({
                url: api.conferVideoCreate_s,
                method: 'post',
                data: {
                    token: getToken(),
                    name: obj.name,
                    channelPasswd: obj.code,
                }
            }).then((res) => {
                // console.log(res)
                if (res.status == 200) {
                    if(res.data.code!=400){
                        this.channelID = channelId;
                        this.$notify({
                            message: '创建成功！',
                            type: 'success',
                            duration: 1000,
                        });
                    }else{
                        this.$notify({
                            message: res.data.data,
                            type: 'error',
                            duration: 1000,
                            onClose: () => {
                                this.Dailog = false;
                                this.dailogDetail={
                                    name: '',
                                    code: '',
                                }
                            }
                        });
                    }
                }else {
                    this.$notify.error({
                        message: res.data.data.error
                    });
                }
            })
        },

        //会议管理-开始会议
        conferBegin_s(id) {
            this.$http(api.conferBegin_s, {
                params: {
                    token: getToken(),
                    id: id,
                }
            }).then((res) => {
                // console.log(res)
                if (res.status == 200) {
                    if(res.data.code!=400){
                        this.$notify({
                            message: '开始会议！',
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

        //会议管理-通知
        conferMessage_s(id) {
            this.$http(api.conferMessage_s, {
                params: {
                    token: getToken(),
                    id: id,
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

        //会议管理--结束
        conferClose_s(chid) {
            this.$http({
                url: api.conferClose_s,
                method: 'post',
                data: {
                    token: getToken(),
                    channelId: chid,
                }
            }).then((res) => {
                // console.log(res)
                if (res.status == 200) {
                    if(res.data.code!=400){
                        this.channelID = channelId;
                        this.$notify({
                            message: res.data.data,
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                window.location.reload(true);
                            }
                        });
                    }else{
                        this.$notify({
                            message: res.data.data,
                            type: 'error',
                            duration: 1000,
                        });
                    }
                }else {
                    this.$notify.error({
                        message: res.data.data.error
                    });
                }
            })
        },

        //老师素材- 是否共享按钮
        materManaShare_t(id,share) {
            if(share){
                share = 1;
            }else{
                share = 2;
            }
            this.$http(api.materManaShare_t, {
                params: {
                    token: getToken(),
                    id: id,
                    is_share: share,
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
                                // window.location.reload(true);
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

        //老师素材- 是否共享按钮
        materAllDetail_t(id) {
            this.$http(api.materAllDetail_t, {
                params: {
                    token: getToken(),
                    id: id,
                }
            }).then((res) => {
                if (res.status == 200) {
                    if(res.data.code!=400){
                        this.Dailog = true;
                        let _detail = res.data.data;
                        this.merDetail={
                            name: _detail.title,
                            time: _detail.add_time,
                            detail: _detail.content,
                        };
                        if(_detail.is_share == 1){
                            this.merDetail.share = '是';
                        }else{
                            this.merDetail.share = '否';
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

        
}