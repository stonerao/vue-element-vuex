import { api } from '@/api/index'
import { getToken } from '@/utils/auth'

export default {
    teachingList(id, state) {
        state = this.state; 
        this.$http(state == '2' ? api.Teacher_teaching_interface : api.teaching_interface, {
            params: {
                page: this.currentPage,//当前页数
                curpage: this.pageSize,//页面数量
                tc_id: id || '',
                paper_name: this.seach,
                token: getToken()
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.items = res.data.datas;
                this.all_pagecount = parseInt(res.data.page_total)
            }
        })
    },
    teaching_classlist(id, state) {
        // 登录状态 2是老师3是学生
        let status = this.state;
        state = parseInt(state)
        this.$http(status == '2' ? api.Teacher_teaching_classlist : api.teaching_classlist, {
            params: {
                tc_id: id,
                token: getToken()
            }
        }).then((res) => {
            let data = res.data.datas;
            switch (state) {
                case 1:
                    this.classList.obj1.items = data;
                    break;
                case 2:
                    this.classList.obj2.items = data;
                    break;
                case 3:
                    this.classList.obj3.items = data;
                    break;
                case 4:
                    this.classList.obj4.items = data;
                    break;
                case 5:
                    this.classList.obj5.items = data;
                    break;
            }

        })
    },
    teaching_info() {
        // 教材详情
        let state = this.thisState;
        this.$http(state == '2' ? api.Teacher_teaching_info : api.teaching_info, {
            params: {
                token: getToken(),
                paper_id: this.$route.query.id
            }
        }).then((res) => {
            this.datas = res.data.datas;
        })
    },
    teaching_collect(id) {
        this.$http({
            method: 'post',
            url: api.teaching_collect,
            data: {
                paper_id: id, token: getToken()
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.$message({
                    type: 'success',
                    message: res.data.datas
                });
            } else {
                this.$message({
                    type: 'success',
                    message: res.data.datas.error
                });
            }
        })
    },
    space_list() {
        // 空间购买列表 
        this.$http(this.listUrl, {
            params: {
                token: getToken(),
                page: this.page,
                curpage: this.curpage,
                search: this.seach
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.page_total = parseInt(res.data.page_total);
                this.t_data = res.data.datas;
                this.used = res.data.used_flow;
                this.unused = res.data.Residual_flow
            }
        })
    },
    space_pay(id) {
        // 空间购买列表 
        this.$http(this.space_pay, {
            params: {
                token: getToken(),
                id: id
            }
        }).then((res) => {
            if (res.data.code == 200) {
                this.$message({
                    type: 'success',
                    message: res.data.datas
                });
            } else {
                this.$message({
                    type: 'success',
                    message: res.data.datas.error
                });
            }
        })
    },
    teaching_interface() {
        this.$http(api.teaching_interface, {
            params: {
                token: getToken(),
                page: '',
                curpage: '',
                tc_id: '',
                paper_name: '',
            }
        })
    },
    teaching_list(state) { 
        if (!state && state != '1') { return }
        let url = (state == '2') ? api.teaching_interface_Teacher : api.student_teaching_list;//判断接口 
        function time(time) {
            return time ? Date.parse(time)/1000 : ''
        }
        this.$http.get(url, {
            params: {
                token: getToken(),
                page: this.page,
                curpage: this.curpage,
                query_start_time: time(this.time1),
                query_end_time: time(this.time2)
            }
        }).then((res)=>{
            if(res.data.code==200){
                this.items = res.data.data;
                this.page_total = parseInt(res.data.page_total?res.data.page_total:0)
            }
        })

    },
    teaching_pay_shop(id){
        this.$http({
            method:'get',
            params:{
                token:getToken(),
                paper_id:id
            }
        }).then((res)=>{
            if (res.data.code == 200) {
                this.$message({
                    type: 'success',
                    message: res.data.datas
                });
            } else {
                this.$message({
                    type: 'success',
                    message: res.data.datas.error
                });
            }
        })
    },
    teacher_paper_preview(){
        // 试读
        this.$http(this.thisState=='2'?api.teacher_paper_preview:api.student_paper_preview,{
            params:{
                token:getToken(),
                paper_id:this.$route.query.id
            }
        }).then((res)=>{
            this.isTest=true;
            this.data=res.data.data;
        })
    },
}