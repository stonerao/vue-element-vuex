import {api} from '@/api/tree'
import {getToken} from '@/utils/auth'

export default {
        //素材分类
        materType(pid) {
            // console.log(this.LoadChild)
            this.$http(api.materType, {
                params: {
                    token: getToken(),
                    pid: pid,
                }
            }).then((res) => { 
                if (res.status == 200) {
                    if(res.data.code!=400){
                        if(this.rTreeGrid){  //自己身份证
                            if(!this.LoadChild){
                                this.materData = res.data.data.list;
                            }else{
                                this.childrenData = res.data.data.list;
                            }
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
        
        //素材分类-编辑分类
        materTypeEdit(id,name,sort) {
            if(String(name).length == 0 || String(sort).length == 0){
                return
            }
            this.$http(api.materTypeEdit, {
                params: {
                    token: getToken(),
                    id: id,
                    name: name,
                    sort: sort,
                }
            }).then((res) => {
                // console.log(res);
                if (res.status == 200) {
                    if(res.data.code!=400){
                        // this.$notify({
                        //     message: res.data.data,
                        //     type: 'success',
                        //     duration: 1000,
                        //     onClose: () => {
                        //     }
                        // });
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

        //素材分类--编辑-是否显示
        materTypeEdit_show(id,show) {
            if(show){
                show = 0;
            }else{
                show = 1;
            }
            this.$http(api.materTypeEdit_show, {
                params: {
                    token: getToken(),
                    id: id,
                    status: show,
                }
            }).then((res) => { 
                // console.log(res);
                if (res.status == 200) {
                    if(res.data.code!=400){
                        this.$notify({
                            message: '操作成功！',
                            type: 'success',
                            duration: 1000
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
        
        //素材分类--删除数据
        materTypeEdit_del(id) {
            if(id instanceof Array){ 
                id = id.sort().join(",");
            }
            this.$http(api.materTypeEdit_del, {
                params: {
                    token: getToken(),
                    ids: id,
                }
            }).then((res) => { 
                // console.log(res);
                if (res.status == 200) {
                    if(res.data.code!=400){
                        this.$notify({
                            message: res.data.data,
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.$emit('RELOADATA');
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

        //组织部门-添加部门初始
        commonDepart_handle(id) {
            let apiUrl = api.commonDepart_handle;
            let formData = {
                token: getToken(),
                department_id: id,
            }
            this.$http(apiUrl, {
                params: formData
            }).then((res) => { 
                // console.log(res);
                if (res.status == 200) {
                    if(res.data.code!=400){
                        if(this.DIST){  //添加组织
                            this.create.id = res.data.data.root_id;
                            this.Toptions = res.data.data.teacher_list;
                            this.whetherShow = {
                                grade: res.data.data.show_year,
                                virtual: res.data.data.show_virtual,
                                entity: res.data.data.show_entity,
                                normal: res.data.data.show_normal,
                                teacher: res.data.data.show_head_teacher,
                            };
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

        //组织部门-添加部门-提交
        commonDepart_add(obj,tid) {
            let apiUrl = api.commonDepart_add;
            let formData = {
                token: getToken(),
                department_id: obj.id,
                department_name: obj.name,
                special_tag: obj.tag,
                department_info: obj.intro,
                status: obj.status,
                head_teacher_id: tid,
            };
            if(!this.DIST){

            }
            this.$http({
                url: apiUrl,
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
                                if(this.DIST){
                                    this.addSuccess(); //添加成功刷新数据
                                }else{
                                    // this.reloadChildren(this.createNewData.index, this.createNewData.item);
                                }
                            }
                        });
                    }else{
                        if(this.DIST){  //添加部门标识
                            this.create = {
                                id: this.DerpartID,
                                name: '',
                                tag: 1,
                                intro: '',
                                status: 0,
                            }
                        }
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

}

