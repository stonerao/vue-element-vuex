import {
    api
} from '@/api/grade'
import {
    getToken
} from '@/utils/auth'
import {
    removeToken
} from '@/utils/auth'
const key = getToken()

export default {

    //总课表数据上方搜索框数据加载
    gradeSearch(obj) {
            this.$http(api.gradeSearch, {
                params: {
                    token: key,
                    pid: obj.p_id
                }
            }).then((res) => {
                // removeToken();
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
                    token: key,
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
                    token: key,
                    id: obj.departId,
                    type: obj.classType
                }
            }).then((res) => {
                this.show = !this.show;
                // this.loading = false;
                // console.log(res);
                this.tableData = []
                let tableData = res.data.data.class_time;
                tableData.forEach((x) => {
                    let days = x.teaching_days.split(",");

                    let arr = {}
                        // days.forEach((x,index)=>{ 
                        //     arr.push(day);

                    // })
                    for (var k in days) { 
                        arr[`day${days[k]}`] = {
                            teacher_id: '',
                            s_id: '',
                            commos_id: x.common_id,
                            week_day: k
                        };
                    }
                    // console.log(arr) 
                    x.timetable = arr
                        // x.children = {
                        //     "day1":{
                        //         name:'',
                        //         class:''
                        //     },
                        //     "day2":{
                        //         name:'',
                        //         class:''
                        //     },
                        // }
                    this.tableData.push(x)
                })
                console.log(this.tableData)
                if (res.status === 200) {
                    this.editData.scheTableOrder = res.data.data.department_name;
                }
            })
        }



}