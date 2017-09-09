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
    		token: toke,
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
    		token: toke,
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
    		token: toke,
    		s_name: obj.name
    	}
    	if(this.whetherEdit){ //编辑
    		apiUrl = api.subjectListEdit_s;
	    	formData = {
	    		token: toke,
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

}