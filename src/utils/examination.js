import { api } from '@/api/index'
import { getToken } from '@/utils/auth'
export default {
    Studentexamination_list() {
        this.$http(api.Studentexamination_list, {
            params: {
                token: getToken(),
                e_title: this.seach,
                page: this.page,
                curpage: this.curpage
            }
        }).then((res)=>{
            if(res.data.code==200){
                this.t_data = res.data.data;
            }
        })
    },
    examination_info(){
        this.$http(api.examination_info,{
            params:{
                token:getToken(),
                e_id:this.e_id
            }
        }).then((res)=>{
            if(res.data.code==200){
                this.items=[];
                this.obj = res.data.data
                let data = res.data.data.question_list;
                for(var key in data){
                    for(var j in data[key]){
                        data[key][j].answer=''
                        this.items.push(data[key][j])
                    }
                }
                data=null; 
                console.log(this.items)
            }
        })
    }
}