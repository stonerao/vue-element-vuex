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
}