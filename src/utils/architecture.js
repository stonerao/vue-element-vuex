// 组织架构
import { api } from '@/api/index'
import { getToken } from '@/utils/auth'
import { encodeUnicode } from '@/utils/auth'
const key = getToken()
export default {
    department_list(obj) {
        this.$http(api.department_list, {
            params: {
                token: key
            }
        }).then((res) => {
            this.sdata = res.data.department_list;
        })
    },
    department_index(obj, items) {
        obj.token = key;
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
                token: key,
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
                token: key,
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
                token: key
            }
        }).then((res) => {

        })
    },
    getPosition() {
        this.$http(api.choose_job, {
            params: {
                token: key
            }
        }).then((res) => {
            this.options = res.data.position_list
        })
    },
    addPositionUser(obj) {
        obj.token = key;
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
                token: key
            }
        }).then((res) => {
            this.option_list = res.data.group_list;
        })
    },
    department_teacher_delete(obj) {
        obj.token = key;
        obj.ids = encodeUnicode(obj.ids)
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
    }
}