// 组织架构
import { api } from '@/api/index'
import { getToken } from '@/utils/auth'
import { encodeUnicode } from '@/utils/auth'
const key = getToken()
export default {
    department_list(obj) {
        this.$http(api.department_list, {
            params: {
                token: getToken()
            }
        }).then((res) => {
            this.sdata = res.data.department_list;
        })
    },
    department_index(obj, items) {
        obj.token = getToken();
        this.$http(api.department_index, {
            params: obj
        }).then((res) => {
            this.t_data = res.data.number_list;
            this.obj.department_id = res.data.department_root.department_id;
            this.bm_page_count = res.data.rows;
        })
    },
    addDladogUser(id) {
        // 成员列表
        this.$http(api.show_teacher_member, {
            params: {
                token: getToken(),
                department_id: id,
                keywords: ''
            }

        }).then((res) => {
            this.data2 = [];
            let data = res.data.data.teacher_list;
            data.forEach((x, index) => {
                x.label = x.teacher_name;
                x.key = index;
                x.disabled = false;
                this.data2.push(x)
            })
        })
    },
    dladogUserPush(id) {
        // 提交
        this.$http({
            method: "post",
            url: api.save_member_maintain,
            data: {
                token: getToken(),
                department_id: id,
                teacher_ids: this.value2.join(",")
            }
        }).then((res) => {
            if (res.status == 200) {
                this.is_dialog = false;
                if (res.data.code == 200) {
                    this.$notify({
                        title: '成功',
                        message: res.data.data,
                        type: 'success',

                    });
                    this.dataAjax();
                } else {
                    this.$notify({
                        title: '失败',
                        message: res.data.data.error,
                    });
                }
            }
        })
    },
    deleteUser(id) {
        this.$http({
            method: "post",
            url: api.organize_number_delete,
            data: {
                number_id: id,
                token: getToken()
            }
        }).then((res) => {

        })
    },
    getPosition() {
        this.$http(api.choose_job, {
            params: {
                token: getToken()
            }
        }).then((res) => {
            this.options = res.data.position_list
        })
    },
    addPositionUser(obj) {
        obj.token = getToken();
        this.$http({
            method: 'post',
            url: api.organize_member_add,
            data: obj
        }).then((res) => {
            if (res.data.status == 'true') {
                this.$notify({
                    title: '成功',
                    message: res.data.msg,
                    type: 'success'
                });
                // 清楚默认
                this.obj = {
                    member_name: '',
                    password: '',
                    member_role: [],
                    user_name: '',
                    user_sex: '',
                    user_phone: '',
                    position_id: [],
                    gpermission_id: [],
                    avatar: '',
                    token: '',
                }
            }
        })
    },
    get_group_list() {
        // 权限组列表
        this.$http(api.get_group_list, {
            params: {
                token: getToken()
            }
        }).then((res) => {
            this.option_list = res.data.group_list;
        })
    },
    department_teacher_delete(obj, state) {
        obj.token = getToken();
        if (state == 1) {
            obj.ids = obj.ids;
        } else {
            obj.ids = encodeUnicode(obj.ids)
        }
        this.$http({
            url: api.department_teacher_delete,
            method: "post",
            data: obj
        }).then((res) => {
            this.$message({
                type: 'success',
                message: res.data.data
            });
            this.dataAjax()
        })
    },
    organize_member_list() {
        // 用户管理列表
        this.$http(api.organize_member_list, {
            params: {
                token: getToken(),
                page: this.userList.page,
                curpage: this.userList.curpage,
                keywords: this.userList.search
            }
        }).then((res) => {
            let list = this.userList;
            if (res.data.code == 200) {
                let data = res.data;
                list.page_total = parseInt(data.page_total);
                list.items = data.data;
            }
        })
    },
    position_add(name) {
        this.$http({
            method: "post",
            url: api.position_add,
            data: {
                token: getToken(),
                position_name: name
            }
        }).then((res) => {
            if (res.data.status == 'true') {
                this.$notify({
                    title: '成功',
                    message: res.data.msg,
                    type: 'success'
                });
            } else {
                this.$notify.info({
                    message: res.data.msg
                });
            }
        })
    },
    position_edit(id, name) {
        this.$http({
            method: "post",
            url: api.position_edit,
            data: {
                position_id: id,
                position_name: name,
                token: getToken()
            }
        }).then((res) => {
            if (res.data.status == 'true') {
                this.$notify({
                    title: '成功',
                    message: res.data.msg,
                    type: 'success'
                });
            } else {
                this.$notify.info({
                    message: res.data.msg
                });
            }
        })
    },
    position_delete(id, name) {
        this.$http({
            method: "post",
            url: api.position_delete,
            data: {
                position_id: id, 
                token: getToken()
            }
        }).then((res) => {
            if (res.data.status == 'true') {
                this.$notify({
                    title: '成功',
                    message: res.data.msg,
                    type: 'success'
                });
            } else {
                this.$notify.info({
                    message: res.data.msg
                });
            }
        })
    },
    position_list(name,page){ 
        this.$http(api.position_list,{
            params:{
                token:getToken(),
                position_name:name,
                curpage:this.positionList.curpage,
                page:this.positionList.page
            }
        }).then((res)=>{
            this.positionList.items = res.data.data
            this.positionList.page_total = parseInt(res.data.page_total);//总数量
            this.positionList.all_pagecount = parseInt(res.data.all_pagecount);//总页数

        })
    }
}