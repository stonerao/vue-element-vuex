import {api} from '@/api/index'
export default {
    teacher_list(){
        this.$http(api.teacher_list,{
            params:{
                curpage:this.tracherList.curpage,
                teacher_name:this.tracherList.teacher_name,
                teacher_sex:this.tracherList.teacher_sex,
                teach_subject:this.tracherList.teach_subject,
                one_pagenum:this.tracherList.one_pagenum,
            }
        }).then((res)=>{
            if(res.status===200){
                this.t_data = res.data.teacher_list;
            }
        })
    }
}