import {api} from '@/api/grade'
import {getToken} from '@/utils/auth'
import {removeToken} from '@/utils/auth'
import {encodeUnicode} from '@/utils/auth'
let toke = getToken();

export default {
    //科目管理-列表
    subjectList_s(obj,sname) {
    	if(!obj.hasmore){
    		return
    	}
    	let apiUrl = api.subjectList_s;
    	let formData = {
    		token:  getToken(),
    		s_name: sname,
    		page: obj.curpage,
    		curpage: obj.one_pagenum,
    	}
        this.$http(apiUrl, {
            params: formData
        }).then((res) => {
            // console.log(res)
            if (res.status == 200) {
                if(res.data.code!=400){
                	let _begin = res.data.data;
                		this.subjectManaList = [];
                		_begin.forEach((x)=>{
                			this.subjectManaList.push({
                				id: x.s_id,
                				name: x.s_name
                			})
                		})
	                	this.materialParams.hasmore = res.data.hasmore;
	                   	this.materialParams.curpage = parseInt(res.data.page);
	                    this.materialParams.page_count = parseInt(res.data.all_pagecount);
	                    this.materialParams.total_num = parseInt(res.data.page_total); 
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

    //科目管理-列表-删除
    subjectListDel_s(id) {
    	let arr = [];
    	if(id instanceof Array){
    		if(id.length != 0){
	    		id.forEach((x)=>{
	    			arr.push(x.id);
	    		})
	    		id = arr.sort().join(',');
    		}else{
    			id = 0;  //没勾选
    		}
    	}
    	let apiUrl = api.subjectListDel_s;
    	let formData = {
    		token:  getToken(),
    		del_id: id,
    		// s_id: id,
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
                        	// window.location.reload(true);
                            this.L_refresh3();
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

    //科目管理-添加
    subjectListAdd_s(obj) {
    	let apiUrl = api.subjectListAdd_s;
    	let formData = {
    		token:  getToken(),
    		s_name: obj.name
    	}
    	if(this.whetherEdit){ //编辑
    		apiUrl = api.subjectListEdit_s;
	    	formData = {
	    		token:  getToken(),
	    		s_id: obj.id,
	    		s_name: obj.name
	    	}
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

    //学生数据搜索
    S_Search_List(obj,keyword) {
        if(!obj.hasmore){
            return
        }
        let apiUrl = api.S_Search,
            formData = {
                token:  getToken(),
                keywords: keyword,
                page: obj.curpage,
                curpage: obj.one_pagenum,
            }
        if(this.DISTINGUISH == 2){  //老师
            apiUrl = api.T_Search
        }
        this.$http(apiUrl, {
            params: formData
        }).then((res) => {
            // console.log(res)
            if (res.status == 200) {
                if(res.data.code!=400){
                    let _begin = res.data.data;
                    this.S_SData = [];
                    this.S_SData = _begin;
                    this.materialParams.hasmore = res.data.hasmore;
                    this.materialParams.curpage = parseInt(res.data.page);
                    this.materialParams.page_count = parseInt(res.data.all_pagecount);
                    this.materialParams.total_num = parseInt(res.data.page_total); 
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

    //学生数据搜索-详情
    S_Search_Detail(id,type) {
        // 初始-直播
        let apiUrl = api.S_Search_Detail,
            formData = {
                token:  getToken(),
                live_id: id,
            }
        if(this.DISTINGUISH == 2){  //老师
            if(type == 1){  //直播
                apiUrl = api.T_Search_Detail;
            }else if(type == 2){  //会议
                apiUrl = api.conferMeetDetail_t;
                formData = {
                    token:  getToken(),
                    id: id,
                };
            }else if(type == 3){
                apiUrl = api.materManaEdit_b_t;
                formData = {
                    token:  getToken(),
                    id: id,
                };
            }
        }
        this.$http(apiUrl, {
            params: formData
        }).then((res) => {
            // console.log(res)
            if (res.status == 200) {
                if(res.data.code!=400){
                    this.S_Type = type;
                    if(type == 1){ //直播
                        this.S_Detail.ZhiBo = res.data.data;
                    }
                    if(this.DISTINGUISH == 2){
                         let  _data = res.data.data;
                         if(type == 2){
                            this.T_Detail.HuiYi = _data;
                            if(_data.status == 1){
                                this.T_Detail.HuiYi.status = '未开始';
                            }else if(_data.status == 2){
                                this.T_Detail.HuiYi.status = '进行中';
                            }else if(_data.status == 3){
                                this.T_Detail.HuiYi.status = '已结束';
                            }
                         }else if(type == 3){
                            this.T_Detail.ShuCai = _data;
                            this.T_Detail.ShuCai.add_time = this.Searchformat(parseInt(_data.add_time)*1000);
                            if(_data.is_share == 1){
                                this.T_Detail.is_share = '是';
                            }else{
                                this.T_Detail.is_share = '否';
                            }
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

    //查看科目详情
    subject_Detail(sid) {
        let apiUrl = api.subject_Detail,
            formData = {
                token:  getToken(),
                s_id: sid,
            }
        this.$http(apiUrl, {
            params: formData
        }).then((res) => {
            // console.log(res)
            if (res.status == 200) {
                if(res.data.code!=400){
                    this.Dailog = !this.Dailog;
                    let _data = res.data.data;
                    this.subjectInfo = {
                        sname: _data.subject.s_name,
                        tnum: _data.teacher_count,
                        tlist: _data.teacher_list,
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

    //学生共享 - 列表
    ShareMaterial_s(obj,pid) {
        if(!obj.hasmore){
            return
        }
        let apiUrl = api.ShareMaterial_s,  //学生中心
            formData = {
                token:  getToken(),
                paper_id: pid,
                page: obj.curpage,
                curpage: obj.one_pagenum
            };

        if(this.thisState == 2){  //老师中心
            apiUrl = api.ShareMaterial_t;
        };

        if(this.sureUpdate){ //确定要更新共享资料
            apiUrl = api.updateShare;
        }
        this.$http(apiUrl, {
            params: formData
        }).then((res) => {
            // console.log(res)
            if (res.status == 200) {
                if(res.data.code!=400){
                    let _data = res.data.data;
                    this.datas = [];
                    if(_data.length != 0){
                        this.subName = _data[0].paper_name;
                    }
                    _data.forEach((x)=>{
                        x.fileType = ((x.annex_file_name).split('.').pop()).toLowerCase();
                        if(String(x.annex_file_name).length == 0){
                            x.pdf = false;
                        }else{
                            x.pdf = true;
                        };
                        if(String(x.file_video_name).length == 0){
                            x.video = false;
                        }else{
                            x.video = true;
                        };
                    });
                    this.datas = _data;
                    this.materialParams.hasmore = res.data.hasmore;
                    this.materialParams.curpage = parseInt(res.data.page);
                    this.materialParams.page_count = parseInt(res.data.all_pagecount);
                    this.materialParams.total_num = parseInt(res.data.page_total); 

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
    //共享蔬菜是否更新
    ShareWhetherUpdate() {
        let apiUrl = api.ShareWhetherUpdate,  //学生中心
            formData = {
                token:  getToken(),
            };
        this.$http(apiUrl, {
            params: formData
        }).then((res) => {
            if (res.status == 200) {
                if(res.data.code!=400){
                    if(parseInt(res.data.data) == 1){  //可以更新
                        this.$confirm('共享资料可以更新, 是否更新?', '提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning'
                        }).then(() => {
                            this.sureUpdate = true;
                            this.materialParams = {   //翻页
                              hasmore: true,
                              curpage: 1,//当前页数
                              one_pagenum: 10,
                              page_count: 1,//总页数
                              total_num: 0
                            };
                            this.dataAjaxUp();
                        })
                    }else{
                        this.sureUpdate = false;
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

    //学生共享-详情
    ShareDatadetail_s(id) {
        let apiUrl = api.ShareDatadetail_s,  //学生中心
            formData = {
                token:  getToken(),
                id: id,
            };
        if(this.thisState == 2){  //老师中心
            apiUrl = api.ShareMaterial_t;
        };
        this.$http(apiUrl, {
            params: formData
        }).then((res) => {
            if (res.status == 200) {
                if(res.data.code!=400){
                    let _data = res.data.data;
                    this.deData = [];

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