import {api} from '@/api/tree'
import {getToken} from '@/utils/auth'

export default {
        //素材分类
        materType(pid) {
            let apiUrl = api.materType;
            let formData = {
                token: getToken(),
                pid: pid,
            };
            if(this.zTreeGrid){
                apiUrl = api.videoList;
                formData = {
                    token: getToken(),
                    keywords: '',
                };
                if(this.loadNext){
                    apiUrl = api.videoList_next;
                    formData = {
                        token: getToken(),
                        vc_id: pid,
                    };
                }
            }
            this.$http(apiUrl, {
                params: formData
            }).then((res) => { 
                if (res.status == 200) {
                    if(res.data.code!=400){
                        if(!this.LoadChild){
                            if(this.zTreeGrid){
                                this.materData = res.data.data;
                                this.materData.forEach((x)=>{
                                    if(x.vc_show_status == 1){
                                        x.vc_show_status = true;
                                    }else{
                                        x.vc_show_status = false;
                                    }
                                });
                            }else{
                                this.materData = res.data.data.list;
                            }
                        }else{
                            if(this.zTreeGrid){
                                this.childrenData = res.data.data;
                                this.childrenData.forEach((x)=>{
                                    if(x.vc_show_status == 1){
                                        x.vc_show_status = true;
                                    }else{
                                        x.vc_show_status = false;
                                    }
                                });
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
            let apiURL = api.materTypeEdit;
            let formData = {
                token: getToken(),
                id: id,
                name: name,
                sort: sort,
            };
            if(this.zTreeGrid){
                apiURL = api.videoList_edit;
                formData = {
                    token: getToken(),
                    vc_id: id,
                    vc_name: name,
                    vc_sort: sort,
                };
            }
            this.$http(apiURL, {
                params: formData
            }).then((res) => {
                if (res.status == 200) {
                    if(res.data.code!=400){
                        
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

        //素材分类-编辑分类
        videoTypeEdit(id,name,sort) {
            if(String(name).length == 0 || String(sort).length == 0){
                return
            }
            let apiURL = api.videoList_edit;
            let formData = {
                token: getToken(),
                vc_id: id,
                vc_name: name,
                vc_sort: sort,
            };
            this.$http({
                url: api.videoList_edit,
                method: 'post',
                data: formData
            }).then((res) => {
                if (res.status == 200) {
                    if(res.data.code!=400){
                        
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

        //是否显示
        videoList_show(id,show) {
            if(show){
                show = 1;
            }else{
                show = 2;
            }
            this.$http({
                url: api.videoList_show,
                method: 'post',
                data: {
                    token: getToken(),
                    type: 1,
                    vc_id: id,
                    show_status: show,
                    sort: '',
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
            let apiURL = api.materTypeEdit_del;
            let formData = {
                token: getToken(),
                department_id: id,
            };
            if(this.zTreeGrid){
                apiURL = api.videoList_del;
                formData = {
                    token: getToken(),
                    del_id: id,
                };
            }
            this.$http(apiURL, {
                params: formData
            }).then((res) => { 
                // console.log(res);
                if (res.status == 200) {
                    if(res.data.code!=400){
                        this.$notify({
                            message: '删除成功！',
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
                        let num = 0;
                        if(this.DIST){  //添加组织
                            this.create.id = res.data.data.root_id;
                        }
                        this.Toptions = res.data.data.teacher_list;
                        this.whetherShow = {
                            grade: res.data.data.show_year,
                            virtual: res.data.data.show_virtual,
                            entity: res.data.data.show_entity,
                            normal: res.data.data.show_normal,
                            teacher: res.data.data.show_head_teacher,
                        };
                        for(var key in this.whetherShow){
                            if(!this.whetherShow[key]){
                                num++;
                            }
                        }
                        if(num == 5){
                            this.allHidden = false;
                        }else{
                            this.allHidden = true;
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
                                    this.addNextSuccess();
                                }
                            }
                        });
                    }else{
                        if(this.DIST){  //添加部门标识
                            this.create = {
                                id: 0,
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

