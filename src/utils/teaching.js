import { api } from '@/api/index'
import { getToken } from '@/utils/auth'
export default {
    teachingList(id, name) {
        this.$http(api.teaching_interface, {
            params: {
                page: this.currentPage,//当前页数
                curpage: this.pageSize,//页面数量
                tc_id: id||'',
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
        state = parseInt(state)
        this.$http(api.teaching_classlist, {
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
    teaching_info(){
        // 教材详情
        this.$http(api.teaching_info,{
            params:{
                token:getToken(),
                paper_id:this.$route.query.id
            }
        }).then((res)=>{
            this.datas = res.data.datas;
        })
    }
}