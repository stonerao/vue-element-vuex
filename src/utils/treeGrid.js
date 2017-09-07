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
                    category_name: name,
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

        //素材分类--添加分类
        materTypeEdit_add(obj) {
            if(String(obj.name).length == 0 || String(obj.sort).length == 0){
                return
            }
            this.$http({
                url: api.materTypeEdit_add,
                method: 'post',
                data: {
                    token: getToken(),
                    pid: obj.id,
                    cate_name: obj.name,
                    sort: obj.sort,
                    is_show: obj.show,
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
                                this.reloadChildren(this.createNewData.index, this.createNewData.item);
                            }
                        });
                    }else{
                        this.$notify({
                            message: res.data.data,
                            type: 'error',
                            duration: 1000,
                        });
                        this.createNewData = {
                            id: 0,
                            name: '',
                            sort: '',
                            show: 1,
                        };
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
}

